"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-1 font-body text-sm leading-5 font-medium text-text-primary select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
