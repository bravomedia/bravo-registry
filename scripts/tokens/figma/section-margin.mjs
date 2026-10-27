import { isMetadataKey, toTokenName } from "../shared.mjs"

export function convertSectionMargin(exported) {
  return Object.fromEntries(
    Object.entries(exported)
      .filter(([key]) => !isMetadataKey(key))
      .map(([key, token]) => [
        toTokenName(key),
        { $type: "dimension", $value: `${token.$value}px` },
      ])
  )
}
