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
          "bg-surface-brand text-text-on-brand hover:bg-surface-brand-hover focus-visible:outline-border-focus-brand disabled:bg-surface-brand-disabled disabled:aria-busy:bg-surface-brand",
        destructive:
          "bg-surface-destructive text-text-primary-inverse hover:bg-surface-destructive-hover focus-visible:outline-border-focus-destructive disabled:bg-surface-desctructive-disabled disabled:aria-busy:bg-surface-destructive",
        outline:
          "inset-ring-2 inset-ring-border-strong bg-transparent text-text-primary hover:inset-ring-transparent hover:bg-surface-base-hover focus-visible:outline-offset-4 focus-visible:outline-border-focus disabled:inset-ring-border-disabled disabled:text-text-disabled disabled:aria-busy:inset-ring-border-strong disabled:aria-busy:text-text-primary",
        secondary:
          "bg-surface-subtle text-text-primary hover:bg-surface-subtle-hover focus-visible:outline-border-focus disabled:bg-surface-subtle-disabled disabled:text-text-disabled disabled:aria-busy:bg-surface-subtle disabled:aria-busy:text-text-primary",
        inverse:
          "bg-surface-base text-text-primary hover:bg-surface-base-hover focus-visible:outline-border-focus-inverse disabled:bg-surface-base-disabled disabled:text-text-disabled disabled:aria-busy:bg-surface-base disabled:aria-busy:text-text-primary",
        "outline-inverse":
          "inset-ring-2 inset-ring-border-inverse bg-transparent text-text-primary-inverse hover:inset-ring-transparent hover:bg-surface-strong focus-visible:outline-offset-4 focus-visible:outline-border-focus-inverse disabled:inset-ring-border-disabled disabled:text-text-disabled disabled:aria-busy:inset-ring-border-inverse disabled:aria-busy:text-text-primary-inverse",
        ghost:
          "text-text-primary hover:bg-surface-base-hover focus-visible:outline-border-focus disabled:text-text-disabled disabled:aria-busy:text-text-primary",
        "ghost-inverse":
          "text-text-primary-inverse hover:bg-surface-strong focus-visible:outline-border-focus-inverse disabled:text-text-disabled disabled:aria-busy:text-text-primary-inverse",
        link: "text-text-brand underline-offset-4 hover:text-text-brand-hover hover:underline focus-visible:outline-border-focus-brand disabled:text-text-brand-disabled",
      },
      size: {
        default: "min-h-12 px-4 py-3",
        xs: "min-h-8 gap-1 rounded-md px-2 py-1 text-xs leading-4 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-10 gap-1.5 px-4 py-2 text-sm leading-5",
        md: "min-h-10 px-3 py-2",
        lg: "min-h-12 px-4 py-3",
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
