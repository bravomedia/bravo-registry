"use client"

import * as React from "react"
import { Calendar } from "lucide-react"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"
import { InputGroup, inputGroupControl } from "@/registry/bravo/ui/input"

type DateInputProps = Omit<React.ComponentProps<"input">, "type">

function DateInput({ className, ref, onChange, ...props }: DateInputProps) {
  const field = useFieldControl(props)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [hasValue, setHasValue] = React.useState(
    Boolean(props.value ?? props.defaultValue)
  )
  const empty = props.value !== undefined ? !props.value : !hasValue

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === "function") return ref(node)
      if (ref) ref.current = node
    },
    [ref]
  )

  return (
    <InputGroup
      invalid={field.invalid}
      disabled={field.disabled}
      className={className}
    >
      <input
        ref={setRefs}
        type="date"
        data-slot="date-input"
        data-empty={empty || undefined}
        className={cn(
          inputGroupControl,
          "[&::-webkit-calendar-picker-indicator]:hidden data-empty:[&::-webkit-datetime-edit]:text-text-muted"
        )}
        onChange={(event) => {
          setHasValue(event.currentTarget.value !== "")
          onChange?.(event)
        }}
        {...field.props}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        disabled={field.disabled}
        onClick={() => {
          inputRef.current?.focus()
          inputRef.current?.showPicker?.()
        }}
        className="mx-2 inline-flex size-9 shrink-0 items-center justify-center text-text-primary group-data-disabled/input:text-text-muted group-data-invalid/input:text-text-error disabled:cursor-not-allowed"
      >
        <Calendar className="size-5" />
      </button>
    </InputGroup>
  )
}

export { DateInput, type DateInputProps }
