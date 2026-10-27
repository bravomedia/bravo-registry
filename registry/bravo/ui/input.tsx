"use client"

import * as React from "react"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"

// Borders are inset rings so the 1px -> 2px focus state doesn't shift layout.
const inputBase =
  "w-full min-w-0 rounded-[4px] bg-bg-content-base font-body text-base leading-6 font-normal text-text-primary inset-ring inset-ring-border-dark transition-[box-shadow,background-color]"

const inputVariants = cn(
  inputBase,
  "block p-4 outline-none placeholder:text-text-muted focus:inset-ring-2 aria-invalid:bg-bg-content-error aria-invalid:inset-ring-border-error disabled:cursor-not-allowed disabled:bg-bg-content-base-disabled disabled:text-text-muted"
)

const inputGroupControl =
  "min-w-0 flex-1 self-stretch bg-transparent py-4 pl-4 outline-none placeholder:text-text-muted disabled:cursor-not-allowed"

/** Box for controls with adornments; the inner control should use `inputGroupControl`. */
function InputGroup({
  invalid,
  disabled,
  className,
  ...props
}: React.ComponentProps<"div"> & { invalid?: boolean; disabled?: boolean }) {
  return (
    <div
      data-slot="input-group"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        inputBase,
        "group/input relative flex items-center focus-within:inset-ring-2 data-disabled:cursor-not-allowed data-disabled:bg-bg-content-base-disabled data-disabled:text-text-muted data-invalid:bg-bg-content-error data-invalid:inset-ring-border-error",
        className
      )}
      {...props}
    />
  )
}

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  const field = useFieldControl(props)

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants, className)}
      {...field.props}
    />
  )
}

export { Input, InputGroup, inputVariants, inputGroupControl }
