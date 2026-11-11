"use client"

import * as React from "react"
import { CircleIcon } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const field = useFieldControl(props)

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("group/radio-group grid gap-2", className)}
      {...field.props}
      aria-labelledby={
        props["aria-labelledby"] ?? (props["aria-label"] ? undefined : field.labelId)
      }
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer relative inline-flex size-6 shrink-0 items-center justify-center rounded-full text-text-primary outline-none",
        "before:absolute before:inset-0.5 before:rounded-full before:inset-ring-2 before:inset-ring-text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "aria-invalid:before:inset-ring-border-error group-aria-invalid/radio-group:before:inset-ring-border-error disabled:cursor-not-allowed disabled:text-text-disabled disabled:before:inset-ring-border-disabled",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon aria-hidden className="size-2.5 fill-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }