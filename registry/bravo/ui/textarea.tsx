"use client";

import * as React from "react";

import { cn } from "@/registry/bravo/lib/utils";
import { useFieldControl } from "@/registry/bravo/ui/field";
import { inputVariants } from "@/registry/bravo/ui/input";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const field = useFieldControl(props);

  return (
    <textarea
      data-slot="textarea"
      className={cn(inputVariants, "min-h-28 resize-y", className)}
      {...field.props}
    />
  );
}

export { Textarea };
