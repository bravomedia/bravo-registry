import { convertPixelTokens } from "../shared.mjs"

export function convertBorderRadius(exported) {
  return convertPixelTokens(exported, "radius")
}
