"use client"

import * as React from "react"

import { PaginationProgressive } from "@/registry/bravo/ui/pagination-progressive"

function PaginationProgressiveExample() {
  const [visibleCount, setVisibleCount] = React.useState(8)
  const totalCount = 40

  return (
    <div className="flex flex-col items-center gap-8">
      <ul className="flex flex-wrap justify-center gap-2 font-body text-sm text-text-primary">
        {Array.from({ length: visibleCount }, (_, index) => (
          <li key={index} className="rounded-sm bg-surface-subtle px-3 py-1">Resultat {index + 1}</li>
        ))}
      </ul>
      <PaginationProgressive
        visibleCount={visibleCount}
        totalCount={totalCount}
        buttonProps={{ onClick: () => setVisibleCount((count) => Math.min(count + 8, totalCount)) }}
      />
    </div>
  )
}

export { PaginationProgressiveExample }