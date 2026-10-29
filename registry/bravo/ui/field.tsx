"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleAlert, CircleHelp } from "lucide-react"
import { Tooltip } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { Label } from "@/registry/bravo/ui/label"
import { Separator } from "@/registry/bravo/ui/separator"

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

type FieldProps = Omit<React.ComponentProps<"div">, "id"> &
  VariantProps<typeof fieldVariants> & {
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

const fieldVariants = cva("group/field flex w-full gap-1", {
  variants: {
    orientation: {
      vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
      horizontal: [
        "flex-row items-center gap-3",
        "[&>[data-slot=field-label]]:flex-auto",
        "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
      responsive: [
        "flex-col @md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-3 [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
        "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
        "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

function Field({
  id,
  label,
  tooltip,
  tooltipLabel = "Mer information",
  description,
  error,
  disabled,
  orientation = "vertical",
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
        role="group"
        data-slot="field"
        data-orientation={orientation}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn(fieldVariants({ orientation }), className)}
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

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1 leading-snug",
        className
      )}
      {...props}
    />
  )
}

/** Defaults `htmlFor` to the surrounding `Field`'s control id. */
function FieldLabel({
  className,
  htmlFor,
  ...props
}: React.ComponentProps<typeof Label>) {
  const field = React.useContext(FieldContext)

  return (
    <Label
      data-slot="field-label"
      htmlFor={htmlFor ?? field?.id}
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 font-body text-sm leading-snug font-medium text-text-primary group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "font-body text-sm leading-5 font-medium text-text-muted",
        "group-has-[[data-orientation=horizontal]]/field:text-balance",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-text-brand-hover",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          data-slot="field-separator-content"
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
        >
          {children}
        </span>
      )}
    </div>
  )
}

type FieldErrorProps = React.ComponentProps<"div"> & {
  /** Inertia `errors.field` strings, or shadcn-style `{ message }` objects. */
  errors?: Array<string | { message?: string } | null | undefined>
}

function FieldError({ errors, className, children, ...props }: FieldErrorProps) {
  const messages = children
    ? [children]
    : [
        ...new Set(
          (errors ?? [])
            .map((error) => (typeof error === "string" ? error : error?.message))
            .filter((message): message is string => Boolean(message))
        ),
      ]

  if (messages.length === 0) {
    return null
  }

  return (
    <div
      data-slot="field-error"
      role="alert"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {messages.map((message, index) => (
        <p
          key={index}
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

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  fieldVariants,
  useFieldControl,
  type FieldErrorProps,
  type FieldProps,
}
