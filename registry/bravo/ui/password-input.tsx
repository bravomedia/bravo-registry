"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/registry/bravo/lib/utils"
import { useFieldControl } from "@/registry/bravo/ui/field"
import { InputGroup, inputGroupControl } from "@/registry/bravo/ui/input"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  showLabel?: string
  hideLabel?: string
}

function PasswordInput({
  className,
  showLabel = "Visa lösenord",
  hideLabel = "Dölj lösenord",
  ...props
}: PasswordInputProps) {
  const field = useFieldControl(props)
  const [visible, setVisible] = React.useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <InputGroup
      invalid={field.invalid}
      disabled={field.disabled}
      className={className}
    >
      <input
        type={visible ? "text" : "password"}
        data-slot="password-input"
        autoComplete="current-password"
        className={inputGroupControl}
        {...field.props}
      />
      <button
        type="button"
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        aria-controls={field.props.id}
        disabled={field.disabled}
        onClick={() => setVisible((value) => !value)}
        className={cn(
          "mx-2 inline-flex size-9 shrink-0 items-center justify-center rounded-[4px] text-text-primary outline-none group-data-invalid/input:text-text-error",
          "focus-visible:outline-2 focus-visible:outline-border-subtle-focus disabled:cursor-not-allowed"
        )}
      >
        <Icon aria-hidden className="size-5" />
      </button>
    </InputGroup>
  )
}

export { PasswordInput, type PasswordInputProps }
