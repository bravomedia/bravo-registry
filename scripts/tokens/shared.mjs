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

export function convertPixelTokens(exported, $type, prefix = "") {
  return Object.fromEntries(
    Object.entries(exported)
      .filter(([key]) => !isMetadataKey(key))
      .map(([key, token]) => [
        `${prefix}${toTokenName(key)}`,
        { $type, $value: `${token.$value}px` },
      ])
  )
}
