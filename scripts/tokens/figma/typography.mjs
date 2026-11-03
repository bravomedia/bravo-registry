import { isMetadataKey, toTokenName } from "../shared.mjs"

const FONT_STYLE_WEIGHTS = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

// Mirrors Figma variable names: family/heading -> family-heading, weight/bold -> weight-bold.
export function convertTypography(exported) {
  const families = Object.entries(exported.family).map(([key, token]) => [
    `family-${toTokenName(key)}`,
    { $type: "fontFamily", $value: token.$value },
  ])

  const weights = Object.entries(exported.weight).map(([key, token]) => [
    `weight-${toTokenName(key)}`,
    { $type: "fontWeight", $value: toFontWeight(token.$value) },
  ])

  return Object.fromEntries([...families, ...weights])
}

// Figma weights are either numbers ("700") or font style names ("Semi Bold").
function toFontWeight(value) {
  const numeric = Number(value)
  const weight = Number.isInteger(numeric)
    ? numeric
    : FONT_STYLE_WEIGHTS[String(value).toLowerCase().replace(/[\s_-]/g, "")]

  if (!(weight >= 1 && weight <= 1000)) {
    throw new Error(`Unsupported Figma font weight: ${value}`)
  }

  return weight
}

// Mirrors Figma variable names: text-xs/font-size -> text-xs-font-size. Pixel values become rem.
export function convertTypeScale(exported) {
  return Object.fromEntries(
    Object.entries(exported)
      .filter(([key]) => !isMetadataKey(key))
      .flatMap(([key, step]) => {
        const name = toTokenName(key)
        // Figma export currently spells it "line-heigt".
        const lineHeight = step["line-height"] ?? step["line-heigt"]

        return [
          [`${name}-font-size`, { $type: "fontSize", $value: toRem(step["font-size"].$value) }],
          [`${name}-line-height`, { $type: "lineHeight", $value: toRem(lineHeight.$value) }],
        ]
      })
  )
}

function toRem(px) {
  return `${px / 16}rem`
}
