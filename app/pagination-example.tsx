"use client"

import { PaginationNavigation } from "@/registry/bravo/ui/pagination"

function PaginationExample({ currentPage }: { currentPage: number }) {
  return (
    <PaginationNavigation
      currentPage={currentPage}
      totalPages={50}
      getPageHref={(page) => `?page=${page}#pagination`}
    />
  )
}

export { PaginationExample }
