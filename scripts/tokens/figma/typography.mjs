import { toTokenName } from "../shared.mjs"

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
