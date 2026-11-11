"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { useBravoStrings } from "@/registry/bravo/lib/i18n"
import { cn } from "@/registry/bravo/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/bravo/ui/input-group"

type SearchBarProps = Omit<React.ComponentProps<"input">, "type"> & {
  clearLabel?: string
}

function SearchBar({
  className,
  clearLabel,
  placeholder,
  ...props
}: SearchBarProps) {
  const t = useBravoStrings("searchBar", { clear: clearLabel, placeholder })

  return (
    <InputGroup
      data-slot="search-bar"
      className={cn(
        "h-11 rounded-full! inset-ring-border-subtle focus-within:inset-ring-2 focus-within:inset-ring-border-strong",
        className
      )}
    >
      <InputGroupInput
        type="search"
        placeholder={t.placeholder || " "}
        className="peer h-full py-3 text-sm leading-5 [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      <InputGroupAddon className="pl-3">
        <Search aria-hidden className="size-5" />
      </InputGroupAddon>
      <InputGroupAddon
        align="inline-end"
        className="pr-1 peer-placeholder-shown:hidden peer-disabled:hidden peer-read-only:hidden"
      >
        <InputGroupButton
          size="icon-sm"
          className="text-text-muted"
          aria-label={t.clear}
          title={t.clear}
          onClick={(event) => {
            const input = event.currentTarget.closest('[data-slot="search-bar"]')?.querySelector("input")
            if (!input) return

            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "")
            input.dispatchEvent(new Event("input", { bubbles: true }))
            input.focus()
          }}
        >
          <X aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { SearchBar, type SearchBarProps }