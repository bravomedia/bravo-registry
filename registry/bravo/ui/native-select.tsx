"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { useFieldControl } from "@/registry/bravo/ui/field"
import { InputGroup } from "@/registry/bravo/ui/input"

type NativeSelectProps = React.ComponentProps<"select"> & {
  /** Rendered as an empty-value first option. */
  placeholder?: string
}

function NativeSelect({
  className,
  placeholder,
  children,
  ...props
}: NativeSelectProps) {
  const field = useFieldControl(props)

  return (
    <InputGroup
      invalid={field.invalid}
      disabled={field.disabled}
      className={className}
    >
      <select
        data-slot="native-select"
        className="w-full min-w-0 cursor-pointer appearance-none bg-transparent py-4 pr-12 pl-4 outline-none disabled:cursor-not-allowed has-[option[value='']:checked]:text-text-muted [&_option]:bg-bg-content-base [&_option]:text-text-primary"
        {...field.props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 size-6 text-text-primary group-data-disabled/input:text-text-muted group-data-invalid/input:text-text-error"
      />
    </InputGroup>
  )
}

export { NativeSelect, type NativeSelectProps }
