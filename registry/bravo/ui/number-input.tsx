"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/bravo/ui/input-group"

type NumberInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  unit?: React.ReactNode
}

function NumberInput({
  className,
  unit,
  "aria-describedby": ariaDescribedBy,
  ...props
}: NumberInputProps) {
  const unitId = React.useId()

  return (
    <InputGroup data-slot="number-input" className={className}>
      <InputGroupInput
        type="number"
        className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-describedby={
          [ariaDescribedBy, unit ? unitId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...props}
      />
      {unit && (
        <InputGroupAddon align="inline-end">
          <InputGroupText id={unitId}>{unit}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

export { NumberInput, type NumberInputProps }
