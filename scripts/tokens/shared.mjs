import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"))
}

export async function writeOutput(path, content) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content)
}

export function isMetadataKey(key) {
  return key.startsWith("$")
}

// Figma names like "neutral/700" or "text & icon" become "neutral-700" and "text-icon".
export function toTokenName(name) {
  return name.trim().replace(/[\s/&]+/g, "-").replace(/-+/g, "-")
}

export function toReference(name) {
  return `{${toTokenName(name)}}`
}

// Yields [path, token] for every token in a Figma export, at any group depth.
export function* walkTokens(group, path = []) {
  for (const [key, value] of Object.entries(group)) {
    if (isMetadataKey(key)) {
      continue
    }

    if ("$value" in value) {
      yield [[...path, key], value]
    } else {
      yield* walkTokens(value, [...path, key])
    }
  }
}

// Tokens are named by their last path segment: border-radius/radius-button -> radius-button.
export function convertPixelTokens(exported, $type, prefix = "") {
  const tokens = {}

  for (const [path, token] of walkTokens(exported)) {
    const name = `${prefix}${toTokenName(path.at(-1))}`
    if (tokens[name]) {
      throw new Error(`Duplicate token: ${name}`)
    }

    tokens[name] = { $type, $value: toPixelValue(token.$value, path) }
  }

  return tokens
}

// Aliases within the same collection are exported as references, e.g. "{rounded-lg}".
function toPixelValue(value, path) {
  const reference = typeof value === "string" && /^\{(.+)\}$/.exec(value)
  if (reference) {
    return toReference(reference[1].split(".").at(-1))
  }

  if (typeof value !== "number") {
    throw new Error(`Expected a number for ${path.join("/")}, got ${JSON.stringify(value)}`)
  }

  return `${value}px`
}
