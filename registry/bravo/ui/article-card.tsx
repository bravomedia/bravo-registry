"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { ButtonLink } from "@/registry/bravo/ui/button-link"

const articleCardImageVariants = cva("w-full rounded-default object-cover", {
  variants: {
    aspectRatio: {
      "4:3": "aspect-4/3",
      "3:2": "aspect-3/2",
      "2:1": "aspect-2/1",
    },
  },
  defaultVariants: {
    aspectRatio: "4:3",
  },
})

type ArticleCardProps = Omit<React.ComponentProps<"article">, "children"> &
  VariantProps<typeof articleCardImageVariants> & {
    src: string
    alt: string
    heading: React.ReactNode
    headingAs?: "h2" | "h3" | "h4" | "h5" | "h6"
    summary?: React.ReactNode
    date?: React.ReactNode
    dateTime?: string
  } & (
    | { asChild: true; children: React.ReactElement; href?: never; linkText?: never }
    | { asChild?: false; children?: never; href: string; linkText: React.ReactNode }
  )

function ArticleCard({
  src,
  alt,
  heading,
  headingAs: Heading = "h3",
  summary,
  date,
  dateTime,
  aspectRatio = "4:3",
  asChild = false,
  href,
  linkText,
  children,
  className,
  ...props
}: ArticleCardProps) {
  return (
    <article data-slot="article-card" data-aspect-ratio={aspectRatio} className={cn("flex min-w-0 flex-col gap-4", className)} {...props}>
      <img data-slot="article-card-image" src={src} alt={alt} className={cn(articleCardImageVariants({ aspectRatio }))} />
      <div data-slot="article-card-content" className="flex min-w-0 flex-col items-start gap-2">
        {date && <time data-slot="article-card-date" dateTime={dateTime} className="font-body text-sm leading-5 font-regular text-text-muted">{date}</time>}
        <Heading data-slot="article-card-heading" className="w-full font-heading text-xl leading-7 font-bold wrap-break-word text-text-primary">{heading}</Heading>
        {summary && <p data-slot="article-card-summary" className="w-full font-body text-base leading-6 font-regular wrap-break-word text-text-secondary">{summary}</p>}
        <ButtonLink asChild={asChild} href={href}>
          <ArrowRight aria-hidden />
          <Slot.Slottable>{asChild ? children : linkText}</Slot.Slottable>
        </ButtonLink>
      </div>
    </article>
  )
}

export { ArticleCard, articleCardImageVariants, type ArticleCardProps }