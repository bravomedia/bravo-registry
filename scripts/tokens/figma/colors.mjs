import { toReference, toTokenName, walkTokens } from "../shared.mjs"

// Palette tokens keep their group path: gray/600 -> gray-600.
export function convertPalette(exported) {
  return convertColors(exported, (path) => path.join("-"))
}

// Semantic tokens use their own name: surface/base/surface-base -> surface-base.
export function convertSemanticColors(exported) {
  return convertColors(exported, (path) => path.at(-1))
}

function convertColors(exported, toName) {
  const tokens = {}

  for (const [path, figmaToken] of walkTokens(exported)) {
    const name = toTokenName(toName(path))
    if (tokens[name]) {
      throw new Error(`Duplicate color token: ${name}`)
    }

    tokens[name] = toColorToken(figmaToken)
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
