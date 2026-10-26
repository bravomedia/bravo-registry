import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-base font-semibold leading-6 whitespace-nowrap transition-[background-color,border-color,box-shadow,color] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        default:
          "bg-[#0965c0] text-white hover:bg-[#1680de] focus-visible:ring-[#0965c0] disabled:bg-[#bddbfa]",
        destructive:
          "bg-[#c10007] text-white hover:bg-[#e7000b] focus-visible:ring-[#c10007] disabled:bg-[#ffc9c9]",
        outline:
          "border-2 border-[#525252] bg-white text-black hover:bg-[#f5f5f5] focus-visible:ring-[#525252] disabled:border-[#a3a3a3] disabled:text-[#a3a3a3]",
        secondary:
          "bg-white text-black hover:bg-[#fafafa] focus-visible:ring-[#f5f5f5] disabled:bg-[#f5f5f5] disabled:text-[#a3a3a3]",
        inverse:
          "bg-white text-black hover:bg-[#fafafa] focus-visible:ring-[#f5f5f5] disabled:bg-[#f5f5f5] disabled:text-[#a3a3a3]",
        "outline-inverse":
          "border-2 border-white bg-transparent text-white hover:bg-[#404040] focus-visible:ring-white disabled:border-[#a3a3a3] disabled:text-[#a3a3a3]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        xs: "min-h-8 gap-1 rounded-md px-2 py-1 text-xs leading-4 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-10 gap-1.5 px-4 py-2 text-sm leading-5",
        lg: "min-h-14 px-7 py-4 text-lg leading-6",
        icon: "size-12 p-3",
        "icon-xs": "size-8 rounded-md p-1.5 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10 p-2",
        "icon-lg": "size-14 p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
