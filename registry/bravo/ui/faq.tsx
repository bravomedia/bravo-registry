"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

const faqVariants = cva("group/faq w-full font-body", {
  variants: {
    variant: {
      default: "text-text-primary",
      inverse: "text-text-primary-inverse",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Faq({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & VariantProps<typeof faqVariants>) {
  return (
    <AccordionPrimitive.Root
      data-slot="faq"
      data-variant={variant}
      className={cn(faqVariants({ variant }), className)}
      {...props}
    />
  )
}

function FaqItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="faq-item"
      className={cn(
        "relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border-subtle last:after:absolute last:after:inset-x-0 last:after:bottom-0 last:after:h-px last:after:bg-border-subtle",
        className
      )}
      {...props}
    />
  )
}

function FaqTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header data-slot="faq-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="faq-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-6 pr-1 text-left text-base leading-6 font-bold outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus group-data-[variant=inverse]/faq:focus-visible:outline-border-focus-inverse disabled:pointer-events-none disabled:opacity-50 data-[state=open]:pb-0 motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-in-out [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown aria-hidden className="pointer-events-none size-8 shrink-0 transition-transform duration-300 ease-in-out motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function FaqContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="faq-content"
      className="overflow-hidden motion-safe:data-[state=open]:animate-accordion-down motion-safe:data-[state=closed]:animate-accordion-up motion-safe:duration-300 motion-safe:ease-in-out"
      {...props}
    >
      <div className={cn("max-w-178.5 pt-4 pb-8 text-base leading-6 font-regular text-text-secondary group-data-[variant=inverse]/faq:text-text-secondary-inverse", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Faq, FaqItem, FaqTrigger, FaqContent, faqVariants }