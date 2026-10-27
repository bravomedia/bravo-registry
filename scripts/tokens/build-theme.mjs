import { parseArgs } from "node:util"

import { EXPORT_FILES, readFigmaTokens } from "./figma/index.mjs"
import { writeOutput } from "./shared.mjs"

const BASE_BREAKPOINT = "430px"

// Tablet is omitted: it shares the mobile value and has no agreed min-width yet.
const SECTION_MARGIN_STEPS = [
  { token: "section-margin-mobile" },
  { token: "section-margin-laptop", minWidth: "1024px" },
  { token: "section-margin-large-desktop", minWidth: "1440px" },
]

// Maps each token type to the Tailwind theme namespace that generates its utilities.
const THEME_VARIABLE = {
  color: (name) => `--color-${name}`,
  fontFamily: (name) => `--font-${name.replace(/^family-/, "")}`,
  fontWeight: (name) => `--font-weight-${name.replace(/^weight-/, "")}`,
}

const { values: args } = parseArgs({
  options: {
    palette: { type: "string", default: EXPORT_FILES.palette },
    colors: { type: "string", default: EXPORT_FILES.colors },
    "section-margin": { type: "string", default: EXPORT_FILES.sectionMargin },
    typography: { type: "string", default: EXPORT_FILES.typography },
    out: { type: "string", default: "registry/bravo/styles/theme.css" },
  },
})

const tokens = await readFigmaTokens({
  palette: args.palette,
  colors: args.colors,
  sectionMargin: args["section-margin"],
  typography: args.typography,
})

const css = [
  "/* Generated from Figma exports by scripts/tokens/build-theme.mjs. Do not edit directly. */",
  rootVariables(tokens),
  sectionMarginMediaQueries(),
  themeVariables(tokens),
  baseStyles(),
].join("\n\n")

await writeOutput(args.out, `${css}\n`)
console.log(`Wrote ${args.out}`)

function rootVariables(tokens) {
  const [mobile] = SECTION_MARGIN_STEPS
  const declarations = [
    ...Object.entries(tokens).map(([name, token]) => `--${name}: ${toCssValue(token)};`),
    `--section-margin: var(--${mobile.token});`,
  ]

  return block(":root", declarations)
}

function sectionMarginMediaQueries() {
  return SECTION_MARGIN_STEPS.filter((step) => step.minWidth)
    .map((step) =>
      block(`@media (min-width: ${step.minWidth})`, [
        block(":root", [`--section-margin: var(--${step.token});`]),
      ])
    )
    .join("\n\n")
}

function themeVariables(tokens) {
  const declarations = [
    `--breakpoint-base: ${BASE_BREAKPOINT};`,
    "--spacing-section: var(--section-margin);",
    ...Object.entries(tokens)
      .filter(([, token]) => THEME_VARIABLE[token.$type])
      .map(([name, token]) => `${THEME_VARIABLE[token.$type](name)}: var(--${name});`),
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
