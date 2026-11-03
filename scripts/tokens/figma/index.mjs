import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { readJson } from "../shared.mjs"
import { convertBorderRadius } from "./border-radius.mjs"
import { convertBreakpoints } from "./breakpoints.mjs"
import { convertPalette, convertSemanticColors } from "./colors.mjs"
import { convertSectionMargin } from "./section-margin.mjs"
import { convertTypeScale, convertTypography } from "./typography.mjs"

export const BASE_EXPORT_DIR = fileURLToPath(new URL("./export-files/", import.meta.url))

// One export file per Figma collection.
const COLLECTIONS = {
  "color-palette.json": convertPalette,
  "color-tokens.json": convertSemanticColors,
  "section-margin.json": convertSectionMargin,
  "type-properties.json": convertTypography,
  "type-scale.json": convertTypeScale,
  "border-radius.json": convertBorderRadius,
  "breakpoints.json": convertBreakpoints,
}

export async function readFigmaTokens(dir = BASE_EXPORT_DIR) {
  const collections = await Promise.all(
    Object.entries(COLLECTIONS).map(async ([file, convert]) => {
      try {
        return convert(await readJson(join(dir, file)))
      } catch (error) {
        throw new Error(`${file}: ${error.message}`, { cause: error })
      }
    })
  )

  return merge(...collections)
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
