"use client"

import * as React from "react"

import { cn } from "@/registry/bravo/lib/utils"

type ButtonLinkProps = React.ComponentProps<"a"> & {
  disabled?: boolean
}

function ButtonLink({
  className,
  disabled = false,
  onClick,
  tabIndex,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      data-slot="button-link"
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        "inline-flex items-center gap-2 text-base font-semibold leading-6 text-text-brand underline decoration-solid underline-offset-2 transition-colors hover:text-text-brand-hover focus-visible:rounded-lg focus-visible:outline-solid focus-visible:outline-[2px] focus-visible:outline-offset-[6px] focus-visible:outline-[var(--border-brand-focus)] aria-disabled:pointer-events-none aria-disabled:text-text-brand-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault()
          return
        }

        onClick?.(event)
      }}
      {...props}
    />
  )
}

export { ButtonLink, type ButtonLinkProps }