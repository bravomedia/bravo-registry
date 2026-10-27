"use client"

import * as React from "react"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"
import { InputGroup, inputGroupControl } from "@/registry/bravo/ui/input"

type NumberInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  unit?: React.ReactNode
}

function NumberInput({ className, unit, ...props }: NumberInputProps) {
  const field = useFieldControl(props)
  const unitId = React.useId()
  const describedBy =
    [field.props["aria-describedby"], unit ? unitId : undefined]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <InputGroup
      invalid={field.invalid}
      disabled={field.disabled}
      className={className}
    >
      <input
        type="number"
        data-slot="number-input"
        className={cn(
          inputGroupControl,
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          !unit && "pr-4"
        )}
        {...field.props}
        aria-describedby={describedBy}
      />
      {unit && (
        <span
          id={unitId}
          className="shrink-0 pr-4 pl-2 text-text-muted group-data-invalid/input:text-text-error"
        >
          {unit}
        </span>
      )}
    </InputGroup>
  )
}

export { NumberInput, type NumberInputProps }
