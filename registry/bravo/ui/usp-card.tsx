import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { House } from "lucide-react"

import { cn } from "@/registry/bravo/lib/utils"
import { Button } from "@/registry/bravo/ui/button"

const uspCardVariants = cva(
  "flex min-w-0 flex-col items-start gap-6 rounded-default p-8 inset-ring-1",
  {
    variants: {
      variant: {
        default: "bg-surface-base text-text-primary inset-ring-border-subtle",
        inverse: "bg-surface-strong text-text-primary-inverse inset-ring-border-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type UspCardProps = Omit<React.ComponentProps<"article">, "children"> &
  VariantProps<typeof uspCardVariants> & {
    icon?: React.ReactNode
    heading: React.ReactNode
    headingAs?: "h2" | "h3" | "h4" | "h5" | "h6"
    description: React.ReactNode
  } & (
    | { asChild: true; children: React.ReactElement; href?: never; linkText?: never }
    | { asChild?: false; children?: never; href: string; linkText: React.ReactNode }
    | { asChild?: false; children?: never; href?: never; linkText?: never }
  )

function UspCard({
  icon = <House />,
  heading,
  headingAs: Heading = "h3",
  description,
  variant = "default",
  asChild = false,
  href,
  linkText,
  children,
  className,
  ...props
}: UspCardProps) {
  return (
    <article data-slot="usp-card" data-variant={variant} className={cn(uspCardVariants({ variant }), className)} {...props}>
      <span data-slot="usp-card-icon" aria-hidden className="flex size-10 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-10">
        {icon}
      </span>
      <div data-slot="usp-card-content" className="flex min-w-0 w-full flex-col gap-2">
        <Heading data-slot="usp-card-heading" className="font-heading text-2xl leading-8 font-bold wrap-break-word">{heading}</Heading>
        <p data-slot="usp-card-description" className={cn("font-body text-base leading-6 font-regular wrap-break-word", variant === "inverse" ? "text-text-secondary-inverse" : "text-text-secondary")}>{description}</p>
      </div>
      {(asChild || href) && (
        <Button asChild variant={variant === "inverse" ? "outline-inverse" : "outline"} className="font-medium">
          {asChild ? children : <a href={href}>{linkText}</a>}
        </Button>
      )}
    </article>
  )
}

export { UspCard, uspCardVariants, type UspCardProps }