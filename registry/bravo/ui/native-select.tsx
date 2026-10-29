"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"
import { inputVariants } from "@/registry/bravo/ui/input"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
  /** Rendered as an empty-value first option. */
  placeholder?: string
}

function NativeSelect({
  className,
  size = "default",
  placeholder,
  children,
  ...props
}: NativeSelectProps) {
  const field = useFieldControl(props)

  return (
    <div
      data-slot="native-select-wrapper"
      className="group/native-select relative w-full"
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          inputVariants,
          "cursor-pointer appearance-none pr-12 data-[size=sm]:py-2 has-[option[value='']:checked]:text-text-muted [&_option]:bg-bg-content-base [&_option]:text-text-primary",
          className
        )}
        {...field.props}
      >
        {placeholder !== undefined && (
          <NativeSelectOption value="">{placeholder}</NativeSelectOption>
        )}
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        data-slot="native-select-icon"
        className="pointer-events-none absolute top-1/2 right-4 size-6 -translate-y-1/2 text-text-primary select-none group-has-[select:disabled]/native-select:text-text-muted group-has-[select[aria-invalid=true]]/native-select:text-text-error"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-bg-content-base text-text-primary", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-bg-content-base text-text-primary", className)}
      {...props}
    />
  )
}

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  type NativeSelectProps,
}
