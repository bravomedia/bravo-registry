import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

const [tokensPath, outputPath] = process.argv.slice(2)

if (!tokensPath || !outputPath) {
  console.error("Usage: node scripts/build-tailwind-theme.mjs <tokens.json> <theme.css>")
  process.exitCode = 1
} else {
  const tokens = JSON.parse(await readFile(tokensPath, "utf8"))
  const entries = Object.entries(tokens)

  const css = `/* Generated from ${tokensPath}. Do not edit directly. */

:root {
${entries.map(([name, token]) => `  --${name}: ${toCssValue(token.$value)};`).join("\n")}
}

@theme inline {
${entries.map(([name]) => `  --color-${name}: var(--${name});`).join("\n")}
}
`

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, css)
}

function toCssValue(value) {
  const reference = typeof value === "string" && /^\{(.+)\}$/.exec(value)
  return reference ? `var(--${reference[1]})` : value
}