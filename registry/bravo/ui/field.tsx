"use client"

import * as React from "react"
import { CircleAlert, CircleHelp } from "lucide-react"
import { Tooltip } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { Label } from "@/registry/bravo/ui/label"

type FieldContextValue = {
  id: string
  invalid: boolean
  disabled?: boolean
  describedBy?: string
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

type FieldControlProps = {
  id?: string
  disabled?: boolean
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  "aria-describedby"?: string
}

/** Wires a control to the surrounding `Field` (id, aria-invalid, aria-describedby, disabled). */
function useFieldControl<T extends FieldControlProps>(props: T) {
  const field = React.useContext(FieldContext)

  const ariaInvalid =
    props["aria-invalid"] ?? (field?.invalid ? true : undefined)
  const describedBy =
    [field?.describedBy, props["aria-describedby"]].filter(Boolean).join(" ") ||
    undefined

  return {
    props: {
      ...props,
      id: props.id ?? field?.id,
      disabled: props.disabled ?? field?.disabled,
      "aria-invalid": ariaInvalid,
      "aria-describedby": describedBy,
    },
    invalid: ariaInvalid === true || ariaInvalid === "true",
    disabled: Boolean(props.disabled ?? field?.disabled),
  }
}

type FieldProps = Omit<React.ComponentProps<"div">, "id"> & {
  /** Id of the form control. Generated when omitted. */
  id?: string
  label?: React.ReactNode
  tooltip?: React.ReactNode
  tooltipLabel?: string
  description?: React.ReactNode
  /** Accepts Inertia `errors.field` (string, or string[] with `withAllErrors`). */
  error?: string | string[] | null
  disabled?: boolean
}

function Field({
  id,
  label,
  tooltip,
  tooltipLabel = "Mer information",
  description,
  error,
  disabled,
  className,
  children,
  ...props
}: FieldProps) {
  const generatedId = React.useId()
  const controlId = id ?? generatedId
  const descriptionId = `${controlId}-description`
  const errorId = `${controlId}-error`

  const errors = (Array.isArray(error) ? error : [error]).filter(
    (message): message is string => Boolean(message)
  )
  const invalid = errors.length > 0
  const showDescription = Boolean(description) && !invalid

  const context = React.useMemo<FieldContextValue>(
    () => ({
      id: controlId,
      invalid,
      disabled,
      describedBy: invalid
        ? errorId
        : showDescription
          ? descriptionId
          : undefined,
    }),
    [controlId, invalid, disabled, errorId, descriptionId, showDescription]
  )

  return (
    <FieldContext.Provider value={context}>
      <div
        data-slot="field"
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn("flex w-full flex-col gap-1", className)}
        {...props}
      >
        {(label || tooltip) && (
          <div className="flex items-center gap-1">
            {label && <Label htmlFor={controlId}>{label}</Label>}
            {tooltip && (
              <FieldTooltip label={tooltipLabel}>{tooltip}</FieldTooltip>
            )}
          </div>
        )}
        {children}
        {showDescription && (
          <FieldDescription id={descriptionId}>{description}</FieldDescription>
        )}
        {invalid && <FieldError id={errorId} errors={errors} />}
      </div>
    </FieldContext.Provider>
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "font-body text-sm leading-5 font-medium text-text-muted",
        className
      )}
      {...props}
    />
  )
}

function FieldError({
  errors,
  className,
  ...props
}: React.ComponentProps<"div"> & { errors: string[] }) {
  return (
    <div
      data-slot="field-error"
      role="alert"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {errors.map((message) => (
        <p
          key={message}
          className="flex items-center gap-1 font-body text-sm leading-5 font-medium text-text-error"
        >
          <CircleAlert aria-hidden className="size-5 shrink-0" />
          {message}
        </p>
      ))}
    </div>
  )
}

function FieldTooltip({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label={label}
            className="inline-flex shrink-0 rounded-full text-text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-subtle-focus"
          >
            <CircleHelp aria-hidden className="size-4" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={4}
            className="z-50 max-w-xs rounded-[4px] bg-bg-content-strong px-3 py-2 font-body text-sm leading-5 text-text-primary-inverse"
          >
            {children}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export { Field, FieldDescription, FieldError, useFieldControl, type FieldProps }
