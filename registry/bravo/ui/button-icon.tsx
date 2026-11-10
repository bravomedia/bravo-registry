import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";
import { buttonVariants } from "@/registry/bravo/ui/button";

const buttonIconVariants = cva("", {
  variants: {
    size: {
      default: "size-12 p-3",
      lg: "size-12 p-3",
      md: "size-10 p-2",
      sm: "size-8 p-2 [&_svg:not([class*='size-'])]:size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function ButtonIcon({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  Pick<VariantProps<typeof buttonVariants>, "variant"> &
  VariantProps<typeof buttonIconVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button-icon"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size: null }), buttonIconVariants({ size }), className)}
      {...props}
    />
  );
}

export { ButtonIcon, buttonIconVariants };