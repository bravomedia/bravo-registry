import { isMetadataKey, toTokenName } from "../shared.mjs"

const FONT_WEIGHTS = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
}

// Mirrors Figma variable names: family/heading -> family-heading, weight/bold -> weight-bold.
export function convertTypography(exported) {
  const families = Object.entries(exported.family).map(([key, token]) => [
    `family-${toTokenName(key)}`,
    { $type: "fontFamily", $value: token.$value },
  ])

  const weights = Object.entries(exported.weight).map(([key, token]) => {
    const weight = FONT_WEIGHTS[token.$value]
    if (!weight) {
      throw new Error(`Unsupported Figma font style: ${token.$value}`)
    }

    return [`weight-${toTokenName(key)}`, { $type: "fontWeight", $value: weight }]
  })

  return Object.fromEntries([...families, ...weights])
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
