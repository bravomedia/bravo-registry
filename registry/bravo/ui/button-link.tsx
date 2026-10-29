"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

type ButtonLinkProps = React.ComponentProps<"a"> & {
  asChild?: boolean
  disabled?: boolean
}

function ButtonLink({
  className,
  asChild = false,
  disabled = false,
  onClick,
  tabIndex,
  ...props
}: ButtonLinkProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="button-link"
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        "inline-flex items-center gap-2 text-base font-semibold leading-6 text-text-brand underline decoration-solid underline-offset-2 transition-colors outline-none hover:text-text-brand-hover focus-visible:rounded-lg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-border-brand-focus aria-disabled:pointer-events-none aria-disabled:text-text-brand-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
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