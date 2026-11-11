"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

const buttonLinkVariants = cva(
  "inline-flex items-center gap-2 font-body text-base font-medium leading-6 decoration-solid underline-offset-2 transition-colors outline-none hover:underline focus-visible:rounded-lg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-6 aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        default: "text-text-brand focus-visible:outline-border-focus-brand aria-disabled:text-text-brand-disabled",
        secondary: "text-text-primary focus-visible:outline-border-focus aria-disabled:text-text-disabled",
        inverse: "text-text-primary-inverse focus-visible:outline-border-focus-inverse aria-disabled:text-text-disabled-inverse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ButtonLinkProps = React.ComponentProps<"a"> & VariantProps<typeof buttonLinkVariants> & {
  asChild?: boolean
  disabled?: boolean
}

function ButtonLink({
  className,
  variant = "default",
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
      data-variant={variant}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(buttonLinkVariants({ variant }), className)}
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

export { ButtonLink, buttonLinkVariants, type ButtonLinkProps }