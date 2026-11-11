"use client"

import * as React from "react"
import { Check, Minus } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const field = useFieldControl(props)

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative inline-flex size-6 shrink-0 items-center justify-center text-text-primary-inverse outline-none",
        "before:absolute before:inset-0.75 before:inset-ring-2 before:inset-ring-text-primary",
        "data-[state=checked]:before:rounded-xs data-[state=checked]:before:bg-text-primary data-[state=indeterminate]:before:rounded-xs data-[state=indeterminate]:before:bg-text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "aria-invalid:before:inset-ring-border-error disabled:cursor-not-allowed disabled:before:inset-ring-border-disabled disabled:data-[state=checked]:before:bg-text-disabled disabled:data-[state=indeterminate]:before:bg-text-disabled",
        className
      )}
      {...field.props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="relative grid place-content-center text-current data-[state=checked]:[&_.checkbox-minus]:hidden data-[state=indeterminate]:[&_.checkbox-check]:hidden"
      >
        <Check aria-hidden className="checkbox-check size-4" />
        <Minus aria-hidden className="checkbox-minus size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }