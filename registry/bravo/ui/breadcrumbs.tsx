"use client"

import * as React from "react"
import { ChevronRight, Home, MoreHorizontal } from "lucide-react"
import { Slot } from "radix-ui"

import { useBravoStrings, type BravoStrings } from "@/registry/bravo/lib/i18n"
import { cn } from "@/registry/bravo/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/bravo/ui/dropdown-menu"

type BreadcrumbHref = string | { url: string; method: string }
type BreadcrumbEntry = { title: string; href: BreadcrumbHref }

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  const t = useBravoStrings("breadcrumbs")

  return <nav aria-label={t.label} data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-2 font-body text-base leading-6 font-regular wrap-anywhere", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex min-w-0 items-center", className)} {...props} />
}

function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("text-text-muted outline-none hover:text-text-primary hover:underline focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className={cn("font-medium text-text-primary", className)} {...props} />
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn("shrink-0 text-text-muted [&>svg]:size-4", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  const t = useBravoStrings("breadcrumbs")

  return (
    <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" className={cn("flex size-5 items-center justify-center", className)} {...props}>
      <MoreHorizontal className="size-5" />
      <span className="sr-only">{t.more}</span>
    </span>
  )
}

type BreadcrumbsProps = Omit<React.ComponentProps<"nav">, "children"> & {
  breadcrumbs: BreadcrumbEntry[]
  home?: BreadcrumbEntry | false
  linkAs?: React.ElementType
  labels?: Partial<BravoStrings["breadcrumbs"]>
}

function Breadcrumbs({
  breadcrumbs,
  home: homeProp,
  linkAs,
  labels,
  className,
  ...props
}: BreadcrumbsProps) {
  const t = useBravoStrings("breadcrumbs", labels)

  if (breadcrumbs.length === 0) return null

  const home = homeProp ?? { title: t.home, href: "/" }
  const Link = linkAs ?? "a"
  const hrefFor = (href: BreadcrumbHref) => linkAs || typeof href === "string" ? href : href.url

  function renderList(mobile: boolean) {
    const collapsed = breadcrumbs.length >= (mobile ? 3 : 5)
    const visibleCount = mobile ? 1 : 3
    const hidden = collapsed ? breadcrumbs.slice(0, -visibleCount) : []
    const visible = collapsed ? breadcrumbs.slice(-visibleCount) : breadcrumbs

    return (
      <BreadcrumbList className={mobile ? "md:hidden" : "hidden md:flex"}>
        {home && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={hrefFor(home.href)} aria-label={home.title}><Home aria-hidden className="size-5" /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {hidden.length > 0 && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger aria-label={t.showHidden} className="rounded-xs text-text-muted outline-none hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus">
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    {hidden.map((entry, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <Link href={hrefFor(entry.href)}>{entry.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {visible.map((entry, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === visible.length - 1 ? (
                <BreadcrumbPage>{entry.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild><Link href={hrefFor(entry.href)}>{entry.title}</Link></BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    )
  }

  return <Breadcrumb data-slot="breadcrumbs" aria-label={t.label} className={className} {...props}>{renderList(true)}{renderList(false)}</Breadcrumb>
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Breadcrumbs,
  type BreadcrumbEntry,
  type BreadcrumbsProps,
}