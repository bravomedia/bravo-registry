import { convertPixelTokens } from "../shared.mjs"

export function convertSectionMargin(exported) {
  return convertPixelTokens(exported, "dimension")
}
