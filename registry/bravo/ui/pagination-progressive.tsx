"use client"

import * as React from "react"

import { interpolate, useBravoStrings, type BravoStrings } from "@/registry/bravo/lib/i18n"
import { cn } from "@/registry/bravo/lib/utils"
import { Button } from "@/registry/bravo/ui/button"

type PaginationProgressiveProps = React.ComponentProps<"div"> & {
  visibleCount: number
  totalCount: number
  buttonProps?: React.ComponentProps<typeof Button>
  labels?: Partial<BravoStrings["paginationProgressive"]>
}

function PaginationProgressive({
  visibleCount,
  totalCount,
  buttonProps,
  labels,
  className,
  ...props
}: PaginationProgressiveProps) {
  const t = useBravoStrings("paginationProgressive", labels)

  if (!Number.isInteger(totalCount) || totalCount < 0 || !Number.isInteger(visibleCount) || visibleCount < 0 || visibleCount > totalCount) return null

  const progress = totalCount === 0 ? 0 : (visibleCount / totalCount) * 100
  const status = interpolate(t.status, { visible: visibleCount, total: totalCount })

  return (
    <div data-slot="pagination-progressive" className={cn("flex w-full max-w-61 flex-col items-center gap-8", className)} {...props}>
      <div data-slot="pagination-progressive-status" className="flex w-full flex-col gap-4">
        <p className="text-center font-body text-sm leading-5 font-regular text-text-primary">{status}</p>
        <div
          data-slot="pagination-progressive-bar"
          role="progressbar"
          aria-label={t.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={status}
          className="h-1 w-full overflow-hidden rounded-sm bg-surface-strong-disabled"
        >
          <div className="h-full rounded-l-sm bg-surface-strong" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Button type="button" variant="secondary" size="md" {...buttonProps} disabled={visibleCount >= totalCount || buttonProps?.disabled} className={cn("font-medium", buttonProps?.className)}>
        {buttonProps?.children ?? t.loadMore}
      </Button>
    </div>
  )
}

export { PaginationProgressive, type PaginationProgressiveProps }