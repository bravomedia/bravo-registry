import * as React from "react";

import { cn } from "@/registry/bravo/lib/utils";

function Grid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "mx-auto grid w-full grid-cols-4 gap-x-4 px-4 md:grid-cols-8 md:gap-x-6 md:px-6 lg:grid-cols-12 lg:px-10 2xl:max-w-306 2xl:px-0",
        className,
      )}
      {...props}
    />
  );
}

export { Grid };