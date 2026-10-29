"use client"

import * as React from "react"
import { Calendar } from "lucide-react"

import { useFieldControl } from "@/registry/bravo/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/bravo/ui/input-group"

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
    <InputGroup data-slot="date-input" className={className}>
      <InputGroupInput
        ref={setRefs}
        type="date"
        data-empty={empty || undefined}
        className="[&::-webkit-calendar-picker-indicator]:hidden data-empty:[&::-webkit-datetime-edit]:text-text-muted"
        onChange={(event) => {
          setHasValue(event.currentTarget.value !== "")
          onChange?.(event)
        }}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-sm"
          tabIndex={-1}
          aria-hidden
          disabled={field.disabled}
          onClick={() => {
            inputRef.current?.focus()
            inputRef.current?.showPicker?.()
          }}
        >
          <Calendar />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { DateInput, type DateInputProps }
