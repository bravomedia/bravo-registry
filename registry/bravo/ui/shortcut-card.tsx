import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/registry/bravo/lib/utils"

type ShortcutCardProps = React.ComponentProps<"a"> & {
  icon?: React.ReactNode
}

function ShortcutCard({ className, children, icon, ...props }: ShortcutCardProps) {
  return (
    <a
      data-slot="shortcut-card"
      className={cn(
        "flex min-w-70.5 items-center gap-3 rounded-xl bg-bg-content-base px-8 py-6 font-body text-xl font-semibold leading-7 text-text-primary inset-ring-1 inset-ring-border-light transition-colors hover:bg-bg-content-base-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-subtle-focus",
        className
      )}
      {...props}
    >
      <span className="flex size-10 shrink-0 items-center justify-center" aria-hidden="true">
        {icon ?? <ArrowRight className="size-10" />}
      </span>
      <span className="min-w-0 flex-1 wrap-break-word">{children}</span>
    </a>
  )
}

export { ShortcutCard, type ShortcutCardProps }