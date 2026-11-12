import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { Badge } from "@/registry/bravo/ui/badge"

type ProductCardPrice = {
  amount: string
  fraction?: string
  separator?: string
}

type ProductCardProps = Omit<React.ComponentProps<"a">, "children"> & {
  src: string
  alt: string
  title: string
  metadata?: React.ReactNode
  badge?: React.ReactNode
  price: ProductCardPrice
  originalPrice?: ProductCardPrice
} & (
  | { asChild: true; children: React.ReactElement }
  | { asChild?: false; children?: never }
)

function ProductPrice({ price }: { price: ProductCardPrice }) {
  return (
    <span className="inline-flex items-baseline font-heading text-2xl leading-8 font-bold whitespace-nowrap">
      {price.amount}
      {price.fraction && (
        <>
          <span className="sr-only">{price.separator ?? ","}</span>
          <span className="relative -top-1 text-base leading-8">{price.fraction}</span>
        </>
      )}
    </span>
  )
}

function ProductCard({
  asChild = false,
  src,
  alt,
  title,
  metadata,
  badge,
  price,
  originalPrice,
  className,
  children,
  ...props
}: ProductCardProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="product-card"
      className={cn(
        "flex min-w-0 flex-col gap-4 rounded-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        className
      )}
      {...props}
    >
      <div data-slot="product-card-media" className="relative aspect-square w-full">
        <img data-slot="product-card-image" src={src} alt={alt} className="size-full rounded-default object-cover" />
        {badge && <Badge data-slot="product-card-badge" className="absolute top-4 left-4">{badge}</Badge>}
      </div>
      <div data-slot="product-card-content" className="flex min-w-0 flex-col gap-4">
        <div data-slot="product-card-details" className="font-body font-bold">
          <div data-slot="product-card-title" className="truncate text-base leading-6 text-text-primary">{title}</div>
          {metadata && <div data-slot="product-card-metadata" className="text-sm leading-5 wrap-break-word text-text-muted">{metadata}</div>}
        </div>
        <div data-slot="product-card-prices" className="flex flex-wrap items-baseline gap-2">
          <span data-slot="product-card-price" className={originalPrice ? "text-text-error" : "text-text-primary"}>
            <ProductPrice price={price} />
          </span>
          {originalPrice && (
            <del data-slot="product-card-original-price" className="text-text-disabled">
              <ProductPrice price={originalPrice} />
            </del>
          )}
        </div>
      </div>
      {asChild && <Slot.Slottable>{children}</Slot.Slottable>}
    </Comp>
  )
}

export { ProductCard, type ProductCardPrice, type ProductCardProps }