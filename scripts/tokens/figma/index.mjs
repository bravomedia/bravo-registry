import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { readJson } from "../shared.mjs"
import { convertBorderRadius } from "./border-radius.mjs"
import { convertBreakpoints } from "./breakpoints.mjs"
import { convertPalette, convertSemanticColors } from "./colors.mjs"
import { convertSectionMargin } from "./section-margin.mjs"
import { convertTypeScale, convertTypography } from "./typography.mjs"

export const BASE_EXPORT_DIR = fileURLToPath(new URL("./export-files/", import.meta.url))

export async function readFigmaTokens(dir = BASE_EXPORT_DIR) {
  const [palette, colors, sectionMargin, typography, typeScale, borderRadius, breakpoints] =
    await Promise.all(
      [
        "color-palette.json",
        "color-tokens.json",
        "section-margin.json",
        "type-properties.json",
        "type-scale.json",
        "border-radius.json",
        "breakpoints.json",
      ].map((file) => readJson(join(dir, file)))
    )

  return merge(
    convertPalette(palette),
    convertSemanticColors(colors),
    convertSectionMargin(sectionMargin),
    convertTypography(typography),
    convertTypeScale(typeScale),
    convertBorderRadius(borderRadius),
    convertBreakpoints(breakpoints)
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
