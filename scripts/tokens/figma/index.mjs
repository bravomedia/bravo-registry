import { readJson } from "../shared.mjs"
import { convertPalette, convertSemanticColors } from "./colors.mjs"
import { convertSectionMargin } from "./section-margin.mjs"
import { convertTypography } from "./typography.mjs"

export const EXPORT_FILES = {
  palette: "scripts/tokens/figma/export-files/color-palette.json",
  colors: "scripts/tokens/figma/export-files/color-tokens.json",
  sectionMargin: "scripts/tokens/figma/export-files/section-margin.json",
  typography: "scripts/tokens/figma/export-files/type-properties.json",
}

export async function readFigmaTokens(files = EXPORT_FILES) {
  const [palette, colors, sectionMargin, typography] = await Promise.all([
    readJson(files.palette),
    readJson(files.colors),
    readJson(files.sectionMargin),
    readJson(files.typography),
  ])

  return merge(
    convertPalette(palette),
    convertSemanticColors(colors),
    convertSectionMargin(sectionMargin),
    convertTypography(typography)
  )
}

function merge(...collections) {
  const tokens = {}

  for (const collection of collections) {
    for (const [name, token] of Object.entries(collection)) {
      if (tokens[name]) {
        throw new Error(`Token "${name}" is defined in more than one Figma collection`)
      }
      tokens[name] = token
    }
  }

  return tokens
}
