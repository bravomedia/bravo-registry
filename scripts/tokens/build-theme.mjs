#!/usr/bin/env node
import { resolve } from "node:path"
import { parseArgs } from "node:util"

import { BASE_EXPORT_DIR, readFigmaTokens } from "./figma/index.mjs"
import { writeOutput } from "./shared.mjs"

// Tablet is omitted: it shares the mobile value and has no agreed breakpoint yet.
// Large desktop has no matching Figma breakpoint, so it uses an arbitrary min-width.
const SECTION_MARGIN_STEPS = [
  { token: "section-margin-mobile" },
  { token: "section-margin-laptop", variant: "lg" },
  { token: "section-margin-large-desktop", variant: "min-[1440px]" },
]

// Maps each token type to the Tailwind theme namespace that generates its utilities.
const THEME_VARIABLE = {
  color: (name) => `--color-${name}`,
  fontFamily: (name) => `--font-${name.replace(/^family-/, "")}`,
  fontWeight: (name) => `--font-weight-${name.replace(/^weight-/, "")}`,
  fontSize: (name) => `--${name.replace(/-font-size$/, "")}`,
  lineHeight: (name) => `--${name.replace(/-line-height$/, "")}--line-height`,
  // rounded-full is a built-in Tailwind utility and must not become a theme key.
  radius: (name) => (name === "rounded-full" ? null : `--radius-${name.replace(/^rounded-/, "")}`),
}

const { values: args } = parseArgs({
  options: {
    in: { type: "string", default: BASE_EXPORT_DIR },
    out: { type: "string", default: "registry/bravo/styles/theme.css" },
    // Emit only :root values, to be loaded after the registry theme.css on customer sites.
    "values-only": { type: "boolean", default: false },
  },
})
const valuesOnly = args["values-only"]

const tokens = await readFigmaTokens(args.in)

if (resolve(args.in) !== resolve(BASE_EXPORT_DIR)) {
  await checkAgainstBase(tokens)
}

const header = "/* Generated from Figma exports by build-theme.mjs. Do not edit directly. */"
const css = valuesOnly
  ? [header, block(":root", tokenDeclarations(tokens)), breakpointVariables(tokens)]
  : [
      header,
      rootVariables(tokens),
      sectionMarginMediaQueries(),
      breakpointVariables(tokens),
      themeVariables(tokens),
      baseStyles(),
    ]

await writeOutput(args.out, `${css.join("\n\n")}\n`)
console.log(`Wrote ${args.out}`)

// Values-only output relies on the base theme for anything missing, but cannot add Tailwind utilities.
async function checkAgainstBase(tokens) {
  const base = await readFigmaTokens(BASE_EXPORT_DIR)
  const missing = Object.keys(base).filter((name) => !tokens[name])
  const unknown = Object.keys(tokens).filter((name) => !base[name])

  const report = (names, message, fatal) => {
    if (!names.length) return false
    const log = fatal ? console.error : console.warn
    log(`${fatal ? "Error" : "Warning"}: ${message}:\n  ${names.join("\n  ")}`)
    return fatal
  }

  const missingFatal = report(
    missing,
    valuesOnly ? "Missing tokens, Bravo defaults will be used" : "Missing tokens",
    !valuesOnly
  )
  const unknownFatal = report(
    unknown,
    valuesOnly
      ? "Tokens not in the Bravo base, add them to the base Figma library first"
      : "Tokens not in the Bravo base",
    valuesOnly
  )

  if (missingFatal || unknownFatal) {
    process.exit(1)
  }
}

function tokenDeclarations(tokens) {
  return Object.entries(tokens)
    .filter(([, token]) => token.$type !== "breakpoint")
    .map(([name, token]) => `--${name}: ${toCssValue(token)};`)
}

function rootVariables(tokens) {
  const [mobile] = SECTION_MARGIN_STEPS
  const declarations = [...tokenDeclarations(tokens), `--section-margin: var(--${mobile.token});`]

  return block(":root", declarations)
}

// @variant follows the breakpoints in the final Tailwind theme, including customer overrides.
function sectionMarginMediaQueries() {
  return block(
    ":root",
    SECTION_MARGIN_STEPS.filter((step) => step.variant).map((step) =>
      block(`@variant ${step.variant}`, [`--section-margin: var(--${step.token});`])
    )
  )
}

// Media queries cannot read CSS variables, so breakpoints must be literal theme values.
function breakpointVariables(tokens) {
  return block(
    "@theme",
    Object.entries(tokens)
      .filter(([, token]) => token.$type === "breakpoint")
      .map(([name, token]) => `--${name}: ${token.$value};`)
  )
}

function themeVariables(tokens) {
  const declarations = [
    "--spacing-section: var(--section-margin);",
    ...Object.entries(tokens)
      .map(([name, token]) => [name, THEME_VARIABLE[token.$type]?.(name)])
      .filter(([, variable]) => variable)
      .map(([name, variable]) => `${variable}: var(--${name});`),
  ]

  return block("@theme inline", declarations)
}

function baseStyles() {
  return block("@layer base", [
    block("h1,\nh2,\nh3,\nh4,\nh5,\nh6", ["font-family: var(--family-heading);"]),
    block("p", ["font-family: var(--family-body);"]),
  ])
}

function toCssValue(token) {
  const reference = typeof token.$value === "string" && /^\{(.+)\}$/.exec(token.$value)
  if (reference) {
    return `var(--${reference[1]})`
  }

  if (token.$type === "fontFamily") {
    return `"${token.$value}", ui-sans-serif, system-ui, sans-serif`
  }

  return String(token.$value)
}

function block(selector, lines) {
  const body = lines.join("\n").replace(/^/gm, "  ")
  return `${selector} {\n${body}\n}`
}
