"use client";

import * as React from "react";

import { cn } from "@/registry/bravo/lib/utils";
import { useFieldControl } from "@/registry/bravo/ui/field";

// Borders are inset rings so the 1px -> 2px focus state doesn't shift layout.
const inputBase =
  "w-full min-w-0 rounded-input bg-surface-base font-body text-base leading-6 font-(--font-weight-regular) text-text-primary inset-ring inset-ring-border-strong transition-[box-shadow,background-color]";

const inputVariants = cn(
  inputBase,
  "block p-4 outline-none placeholder:text-text-muted focus:inset-ring-2 aria-invalid:bg-surface-error aria-invalid:inset-ring-2 aria-invalid:inset-ring-border-error disabled:cursor-not-allowed disabled:bg-surface-base-disabled disabled:text-text-muted disabled:inset-ring-border-disabled",
);

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  const field = useFieldControl(props);

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants, className)}
      {...field.props}
    />
  );
}

export { Input, inputBase, inputVariants };
