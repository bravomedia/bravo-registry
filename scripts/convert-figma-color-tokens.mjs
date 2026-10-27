import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

const [palettePath, semanticPath, outputPath] = process.argv.slice(2)

if (!palettePath || !semanticPath || !outputPath) {
  console.error(
    "Usage: npm run tokens:convert -- <palette.json> <semantic.json> <output.json>"
  )
  process.exitCode = 1
} else {
  const [palette, semantic] = await Promise.all([
    readJson(palettePath),
    readJson(semanticPath),
  ])

  const tokens = {
    ...flattenTokens(palette),
    ...flattenTokens(semantic, [], {}, false),
  }

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(tokens, null, 2)}\n`)
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"))
}

function flattenTokens(group, path = [], tokens = {}, includeGroupNames = true) {
  for (const [name, value] of Object.entries(group)) {
    if (name.startsWith("$")) {
      continue
    }

    const tokenPath = [...path, name]

    if (isToken(value)) {
      const tokenName = normalizeName(
        includeGroupNames ? tokenPath.join("-") : name
      )
      if (tokens[tokenName]) {
        throw new Error(`Duplicate token name: ${tokenName}`)
      }

      const alias = value.$extensions?.["com.figma.aliasData"]
      const token = {
        $type: value.$type,
        $value: alias
          ? `{${normalizeName(alias.targetVariableName)}}`
          : value.$value.hex ?? value.$value,
      }

      if (value.$description) {
        token.$description = value.$description
      }

      tokens[tokenName] = token
      continue
    }

    flattenTokens(value, tokenPath, tokens, includeGroupNames)
  }

  return tokens
}

function isToken(value) {
  return typeof value === "object" && value !== null && "$value" in value
}

function normalizeName(name) {
  return name.trim().replace(/[\s/&]+/g, "-").replace(/-+/g, "-")
}