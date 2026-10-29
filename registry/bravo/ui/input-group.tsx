"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/bravo/lib/utils"
import { Button } from "@/registry/bravo/ui/button"
import { Input, inputBase } from "@/registry/bravo/ui/input"
import { Textarea } from "@/registry/bravo/ui/textarea"

// States are read from the control, so `Field` wiring on the input drives the whole group.
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        inputBase,
        "group/input-group relative flex items-center",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        "has-[[data-slot=input-group-control]:focus]:inset-ring-2",
        "has-[[data-slot=input-group-control][aria-invalid=true]]:bg-bg-content-error has-[[data-slot=input-group-control][aria-invalid=true]]:inset-ring-border-error",
        "has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[[data-slot=input-group-control]:disabled]:bg-bg-content-base-disabled has-[[data-slot=input-group-control]:disabled]:text-text-muted",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 text-text-muted select-none group-has-[[data-slot=input-group-control][aria-invalid=true]]/input-group:text-text-error group-has-[[data-slot=input-group-control]:disabled]/input-group:cursor-not-allowed [&>svg:not([class*='size-'])]:size-6",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-4 has-[>button]:pl-2",
        "inline-end": "order-last pr-4 has-[>button]:pr-2",
        "block-start":
          "order-first w-full justify-start px-4 pt-4 group-has-[>input]/input-group:pt-3 [.border-b]:pb-4",
        "block-end":
          "order-last w-full justify-start px-4 pb-4 group-has-[>input]/input-group:pb-3 [.border-t]:pt-4",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 shadow-none group-has-[[data-slot=input-group-control][aria-invalid=true]]/input-group:text-text-error",
  {
    variants: {
      size: {
        xs: "min-h-8 gap-1 rounded-[4px] px-2 py-0 text-sm [&_svg:not([class*='size-'])]:size-4",
        sm: "min-h-9 gap-1.5 rounded-[4px] px-2.5 py-0 text-sm",
        "icon-xs":
          "size-8 min-h-0 rounded-[4px] p-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-sm":
          "size-9 min-h-0 rounded-[4px] p-0 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-2 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 self-stretch rounded-none bg-transparent inset-ring-0 focus:inset-ring-0 aria-invalid:bg-transparent disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none bg-transparent py-3 inset-ring-0 focus:inset-ring-0 aria-invalid:bg-transparent disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
}
