import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

const imageCardVariants = cva(
  "group/image-card relative flex min-w-0 items-end rounded-default p-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
  {
    variants: {
      variant: {
        default: "text-text-primary",
        inverse: "text-text-primary-inverse",
      },
      aspectRatio: {
        "1:1": "aspect-square",
        "3:2": "aspect-3/2",
      },
    },
    defaultVariants: {
      variant: "default",
      aspectRatio: "1:1",
    },
  }
)

type ImageCardProps = Omit<React.ComponentProps<"a">, "children"> &
  VariantProps<typeof imageCardVariants> & {
    src: string
    alt: string
    label: React.ReactNode
  } & (
    | { asChild: true; children: React.ReactElement }
    | { asChild?: false; children?: never }
  )

function ImageCard({
  asChild = false,
  src,
  alt,
  label,
  variant = "default",
  aspectRatio = "1:1",
  className,
  children,
  ...props
}: ImageCardProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="image-card"
      data-variant={variant}
      data-aspect-ratio={aspectRatio}
      className={cn(imageCardVariants({ variant, aspectRatio }), className)}
      {...props}
    >
      <img data-slot="image-card-image" src={src} alt={alt} className="absolute inset-0 size-full rounded-default object-cover" />
      <span
        data-slot="image-card-label"
        className={cn(
          "relative max-w-full rounded-inner bg-surface-base p-4 font-heading text-2xl leading-8 font-bold wrap-break-word text-text-primary",
          variant === "inverse" && "bg-surface-strong text-text-primary-inverse"
        )}
      >
        {label}
      </span>
      <span data-slot="image-card-overlay" aria-hidden className="pointer-events-none absolute inset-0 rounded-default bg-surface-overlay/20 opacity-0 transition-opacity duration-300 group-hover/image-card:opacity-100 motion-reduce:transition-none" />
      {asChild && <Slot.Slottable>{children}</Slot.Slottable>}
    </Comp>
  )
}

export { ImageCard, imageCardVariants, type ImageCardProps }