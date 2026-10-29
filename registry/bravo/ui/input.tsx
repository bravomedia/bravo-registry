"use client";

import * as React from "react";

import { cn } from "@/registry/bravo/lib/utils";
import { useFieldControl } from "@/registry/bravo/ui/field";

// Borders are inset rings so the 1px -> 2px focus state doesn't shift layout.
const inputBase =
  "w-full min-w-0 rounded-[4px] bg-bg-content-base font-body text-base leading-6 font-normal text-text-primary inset-ring inset-ring-border-dark transition-[box-shadow,background-color]";

const inputVariants = cn(
  inputBase,
  "block p-4 outline-none placeholder:text-text-muted focus:inset-ring-2 aria-invalid:bg-bg-content-error aria-invalid:inset-ring-border-error disabled:cursor-not-allowed disabled:bg-bg-content-base-disabled disabled:text-text-muted",
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
