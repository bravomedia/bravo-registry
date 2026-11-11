import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"
import { ButtonIcon } from "@/registry/bravo/ui/button-icon"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Sidnumrering" data-slot="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex items-center gap-2", className)} {...props} />
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  isActive?: boolean
  asChild?: boolean
  size?: "icon" | "default" | "xs" | "sm" | "md" | "lg" | null
}

function PaginationLink({ className, isActive, asChild = false, size = "icon", ...props }: PaginationLinkProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      data-size={size}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-button font-body text-base leading-6 font-medium text-text-primary outline-none hover:bg-surface-base-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        size === "icon" && "size-10",
        size === "default" && "min-h-12 px-4 py-3",
        size === "xs" && "min-h-8 px-2 py-1 text-xs leading-4",
        size === "sm" && "min-h-10 px-4 py-2 text-sm leading-5",
        size === "md" && "min-h-10 px-3 py-2",
        size === "lg" && "min-h-12 px-4 py-3",
        isActive && "inset-ring-2 inset-ring-border-strong focus-visible:outline-offset-4",
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, asChild = false, children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Föregående sida" asChild={asChild} className={cn("[&_svg]:size-6", className)} {...props}>
      <ChevronLeft aria-hidden />
      <Slot.Slottable>{children}</Slot.Slottable>
    </PaginationLink>
  )
}

function PaginationNext({ className, asChild = false, children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Nästa sida" asChild={asChild} className={cn("[&_svg]:size-6", className)} {...props}>
      <Slot.Slottable>{children}</Slot.Slottable>
      <ChevronRight aria-hidden />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-hidden="true" data-slot="pagination-ellipsis" className={cn("flex size-10 shrink-0 items-center justify-center font-body text-base leading-6 text-text-muted", className)} {...props}>…</span>
}

function pageTokens(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1)
  if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages]
  if (currentPage >= totalPages - 3) return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
}

type PaginationNavigationProps = Omit<React.ComponentProps<"nav">, "children"> & {
  currentPage: number
  totalPages: number
  getPageHref: (page: number) => string
  linkAs?: React.ElementType
}

function PaginationNavigation({ currentPage, totalPages, getPageHref, linkAs, className, ...props }: PaginationNavigationProps) {
  if (!Number.isInteger(totalPages) || totalPages < 1 || !Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) return null

  const Link = linkAs ?? "a"
  const previous = currentPage > 1
  const next = currentPage < totalPages

  return (
    <Pagination className={cn(totalPages === 1 && "hidden md:flex", className)} {...props}>
      <PaginationContent className="w-56 justify-between md:w-auto md:justify-start">
        <PaginationItem>
          {previous ? <PaginationPrevious asChild><Link href={getPageHref(currentPage - 1)} /></PaginationPrevious> : <ButtonIcon variant="ghost" size="md" disabled aria-label="Föregående sida"><ChevronLeft aria-hidden /></ButtonIcon>}
        </PaginationItem>
        <PaginationItem className="flex-1 text-center font-body text-base leading-6 text-text-primary md:hidden">Sida {currentPage} av {totalPages}</PaginationItem>
        {pageTokens(currentPage, totalPages).map((page, index) => (
          <PaginationItem key={page === "ellipsis" ? `ellipsis-${index}` : page} className="hidden md:block">
            {page === "ellipsis" ? <PaginationEllipsis /> : <PaginationLink asChild isActive={page === currentPage}><Link href={getPageHref(page)} aria-label={`Sida ${page}`}>{page}</Link></PaginationLink>}
          </PaginationItem>
        ))}
        <PaginationItem>
          {next ? <PaginationNext asChild><Link href={getPageHref(currentPage + 1)} /></PaginationNext> : <ButtonIcon variant="ghost" size="md" disabled aria-label="Nästa sida"><ChevronRight aria-hidden /></ButtonIcon>}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationNavigation, type PaginationLinkProps, type PaginationNavigationProps }