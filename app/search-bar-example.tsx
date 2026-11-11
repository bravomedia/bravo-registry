"use client"

import * as React from "react"

import { Field } from "@/registry/bravo/ui/field"
import { SearchBar } from "@/registry/bravo/ui/search-bar"

function SearchBarExample() {
  const [query, setQuery] = React.useState("Söktext")

  return (
    <Field label="Sök (ifylld)">
      <SearchBar
        name="query_filled"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </Field>
  )
}

export { SearchBarExample }