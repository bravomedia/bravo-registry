import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

type ShortcutCardProps = React.ComponentProps<"a"> & {
  asChild?: boolean
  icon?: React.ReactNode
}

function ShortcutCard({
  className,
  asChild = false,
  icon,
  children,
  ...props
}: ShortcutCardProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="shortcut-card"
      className={cn(
        "flex min-w-70.5 items-center gap-3 rounded-xl bg-bg-content-base px-8 py-6 font-body text-xl font-semibold leading-7 wrap-break-word text-text-primary inset-ring-1 inset-ring-border-light transition-colors outline-none hover:bg-bg-content-base-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-subtle-focus",
        className
      )}
      {...props}
    >
      <span
        data-slot="shortcut-card-icon"
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-10"
      >
        {icon ?? <ArrowRight />}
      </span>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}

export { ShortcutCard, type ShortcutCardProps }