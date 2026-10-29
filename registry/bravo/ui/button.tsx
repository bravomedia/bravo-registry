import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-base font-semibold leading-6 whitespace-nowrap transition-[background-color,box-shadow,color] outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none aria-invalid:inset-ring-2 aria-invalid:inset-ring-border-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        default:
          "bg-bg-content-brand text-text-primary-inverse hover:bg-bg-content-brand-hover focus-visible:outline-border-brand-focus disabled:bg-bg-content-brand-disabled",
        destructive:
          "bg-bg-content-destructive text-text-primary-inverse hover:bg-bg-content-destructive-hover focus-visible:outline-border-desctructive-focus disabled:bg-bg-content-desctructive-disabled",
        outline:
          "inset-ring-2 inset-ring-border-dark bg-transparent text-text-primary hover:inset-ring-transparent hover:bg-bg-content-subtle focus-visible:outline-offset-4 focus-visible:outline-border-subtle-focus disabled:inset-ring-border-disabled disabled:text-text-disabled",
        secondary:
          "bg-bg-content-base text-text-primary hover:bg-bg-content-base-hover focus-visible:outline-border-subtle-focus-inverse disabled:bg-bg-content-base-disabled disabled:text-text-disabled",
        inverse:
          "bg-bg-content-base text-text-primary hover:bg-bg-content-base-hover focus-visible:outline-border-subtle-focus-inverse disabled:bg-bg-content-base-disabled disabled:text-text-disabled",
        "outline-inverse":
          "inset-ring-2 inset-ring-border-inverse bg-transparent text-text-primary-inverse hover:inset-ring-transparent hover:bg-bg-content-strong focus-visible:outline-offset-4 focus-visible:outline-border-subtle-focus-inverse disabled:inset-ring-border-disabled disabled:text-text-disabled",
        ghost:
          "text-text-primary hover:bg-bg-content-subtle focus-visible:outline-border-subtle-focus disabled:text-text-disabled",
        link: "text-text-brand underline-offset-4 hover:text-text-brand-hover hover:underline focus-visible:outline-border-brand-focus disabled:text-text-brand-disabled",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        xs: "min-h-8 gap-1 rounded-md px-2 py-1 text-xs leading-4 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-10 gap-1.5 px-4 py-2 text-sm leading-5",
        lg: "min-h-14 px-7 py-4 text-lg leading-6",
        icon: "size-12 p-3",
        "icon-xs":
          "size-8 rounded-md p-1.5 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10 p-2",
        "icon-lg": "size-14 p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
