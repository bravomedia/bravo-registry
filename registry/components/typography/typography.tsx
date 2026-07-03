import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/registry/lib/index";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display:
        "scroll-m-20 text-5xl font-extrabold tracking-tight text-balance lg:text-6xl",
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-balance first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-balance",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight text-balance",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight text-balance",
      h6: "scroll-m-20 text-base font-semibold tracking-tight text-balance",
      body: "leading-7 [&:not(:first-child)]:mt-6",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      kbd: "rounded border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground shadow-xs",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type TypographyVariant = VariantProps<typeof typographyVariants>["variant"];

type TypographyProps<T extends React.ElementType = "p"> = {
  as?: T;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children"> &
  VariantProps<typeof typographyVariants>;

function Typography<T extends React.ElementType = "p">({
  as,
  asChild = false,
  className,
  variant,
  ...props
}: TypographyProps<T>) {
  const Comp = asChild ? Slot.Root : (as ?? "p");

  return (
    <Comp
      data-slot="typography"
      data-variant={variant ?? "p"}
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
export type { TypographyProps, TypographyVariant };
