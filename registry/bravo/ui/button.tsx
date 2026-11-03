import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-button text-base font-bold leading-6 whitespace-nowrap transition-[background-color,box-shadow,color] outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none aria-invalid:inset-ring-2 aria-invalid:inset-ring-border-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        default:
          "bg-surface-brand text-text-on-brand hover:bg-surface-brand-hover focus-visible:outline-border-focus-brand disabled:bg-surface-brand-disabled",
        destructive:
          "bg-surface-destructive text-text-primary-inverse hover:bg-surface-destructive-hover focus-visible:outline-border-focus-destructive disabled:bg-surface-desctructive-disabled",
        outline:
          "inset-ring-2 inset-ring-border-strong bg-transparent text-text-primary hover:inset-ring-transparent hover:bg-surface-subtle focus-visible:outline-offset-4 focus-visible:outline-border-focus disabled:inset-ring-border-disabled disabled:text-text-disabled",
        secondary:
          "bg-surface-base text-text-primary hover:bg-surface-base-hover focus-visible:outline-border-focus-inverse disabled:bg-surface-base-disabled disabled:text-text-disabled",
        inverse:
          "bg-surface-base text-text-primary hover:bg-surface-base-hover focus-visible:outline-border-focus-inverse disabled:bg-surface-base-disabled disabled:text-text-disabled",
        "outline-inverse":
          "inset-ring-2 inset-ring-border-inverse bg-transparent text-text-primary-inverse hover:inset-ring-transparent hover:bg-surface-strong focus-visible:outline-offset-4 focus-visible:outline-border-focus-inverse disabled:inset-ring-border-disabled disabled:text-text-disabled",
        ghost:
          "text-text-primary hover:bg-surface-subtle focus-visible:outline-border-focus disabled:text-text-disabled",
        link: "text-text-brand underline-offset-4 hover:text-text-brand-hover hover:underline focus-visible:outline-border-focus-brand disabled:text-text-brand-disabled",
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
