import { convertPixelTokens } from "../shared.mjs"

// Figma names are bare (sm, md, lg), so prefix them: sm -> breakpoint-sm.
export function convertBreakpoints(exported) {
  return convertPixelTokens(exported, "breakpoint", "breakpoint-")
}
