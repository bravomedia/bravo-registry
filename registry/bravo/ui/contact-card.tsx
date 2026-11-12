import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

type ContactCardProps = Omit<React.ComponentProps<"a">, "children"> & {
  src: string
  alt: string
  name: string
  jobTitle?: React.ReactNode
  email?: React.ReactNode
  phone?: React.ReactNode
  headingAs?: "h2" | "h3" | "h4" | "h5" | "h6"
} & (
  | { asChild: true; children: React.ReactElement }
  | { asChild?: false; children?: never }
)

function ContactCard({
  asChild = false,
  src,
  alt,
  name,
  jobTitle,
  email,
  phone,
  headingAs: Heading = "h3",
  className,
  children,
  ...props
}: ContactCardProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="contact-card"
      className={cn(
        "group/contact-card flex min-w-0 items-start gap-6 rounded-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        className
      )}
      {...props}
    >
      <img data-slot="contact-card-image" src={src} alt={alt} className="size-32 shrink-0 rounded-default object-cover" />
      <div data-slot="contact-card-content" className="flex min-h-32 min-w-0 flex-1 flex-col justify-between gap-4">
        <div data-slot="contact-card-heading" className="flex min-w-0 flex-col gap-1">
          <Heading data-slot="contact-card-name" className="truncate font-heading text-xl leading-7 font-bold text-text-primary group-hover/contact-card:underline group-focus-visible/contact-card:underline">{name}</Heading>
          {jobTitle && <p data-slot="contact-card-title" className="font-body text-sm leading-5 font-bold wrap-break-word text-text-muted">{jobTitle}</p>}
        </div>
        {(email || phone) && (
          <div data-slot="contact-card-details" className="flex min-w-0 flex-col gap-1 font-body text-base leading-6 font-regular wrap-break-word text-text-primary">
            {email && <p data-slot="contact-card-email">{email}</p>}
            {phone && <p data-slot="contact-card-phone">{phone}</p>}
          </div>
        )}
      </div>
      {asChild && <Slot.Slottable>{children}</Slot.Slottable>}
    </Comp>
  )
}

export { ContactCard, type ContactCardProps }