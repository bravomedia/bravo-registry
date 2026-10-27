import { isMetadataKey, toReference, toTokenName } from "../shared.mjs"

// Palette tokens keep their group path: brand/600 -> brand-600.
export function convertPalette(exported) {
  return flatten(exported, { keepGroupPath: true })
}

// Semantic tokens use their own name: "text & icon"/text-primary -> text-primary.
export function convertSemanticColors(exported) {
  return flatten(exported, { keepGroupPath: false })
}

function flatten(group, options, path = [], tokens = {}) {
  for (const [key, value] of Object.entries(group)) {
    if (isMetadataKey(key)) {
      continue
    }

    const tokenPath = [...path, key]

    if (!("$value" in value)) {
      flatten(value, options, tokenPath, tokens)
      continue
    }

    const name = toTokenName(options.keepGroupPath ? tokenPath.join("-") : key)
    if (tokens[name]) {
      throw new Error(`Duplicate color token: ${name}`)
    }

    tokens[name] = toColorToken(value)
  }

  return tokens
}

function toColorToken(figmaToken) {
  const alias = figmaToken.$extensions?.["com.figma.aliasData"]
  const token = {
    $type: "color",
    $value: alias ? toReference(alias.targetVariableName) : figmaToken.$value.hex,
  }

  if (figmaToken.$description) {
    token.$description = figmaToken.$description
  }

  return token
}
