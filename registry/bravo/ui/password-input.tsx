"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { useFieldControl } from "@/registry/bravo/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/bravo/ui/input-group"

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
    <InputGroup data-slot="password-input" className={className}>
      <InputGroupInput
        type={visible ? "text" : "password"}
        autoComplete="current-password"
        {...props}
        id={field.props.id}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-sm"
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          aria-controls={field.props.id}
          disabled={field.disabled}
          onClick={() => setVisible((value) => !value)}
        >
          <Icon aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput, type PasswordInputProps }
