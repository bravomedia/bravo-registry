import * as React from "react";

import { cn } from "@/registry/bravo/lib/utils";

type ProseProps = React.ComponentPropsWithoutRef<"article">;

function Prose({ className, ...props }: ProseProps) {
  return (
    <article
      data-slot="prose"
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        className,
      )}
      {...props}
    />
  );
}

export { Prose };
export type { ProseProps };
