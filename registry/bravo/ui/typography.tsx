import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";

const typographyVariantClassNames = {
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
} as const;

const typographyVariants = cva("", {
  variants: {
    variant: typographyVariantClassNames,
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

type HeadingProps = Omit<TypographyProps<React.ElementType>, "variant">;
type TextProps = Omit<TypographyProps<React.ElementType>, "variant">;
type LargeProps = Omit<TypographyProps<React.ElementType>, "variant">;
type SmallProps = Omit<TypographyProps<React.ElementType>, "variant">;
type LeadProps = Omit<TypographyProps<React.ElementType>, "variant">;
type MutedProps = Omit<TypographyProps<React.ElementType>, "variant">;
type BlockquoteProps = Omit<TypographyProps<React.ElementType>, "variant">;
type CodeProps = Omit<TypographyProps<React.ElementType>, "variant">;
type KbdProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Display(props: HeadingProps) {
  return <Typography as="h1" variant="display" {...props} />;
}

function H1(props: HeadingProps) {
  return <Typography as="h1" variant="h1" {...props} />;
}

function H2(props: HeadingProps) {
  return <Typography as="h2" variant="h2" {...props} />;
}

function H3(props: HeadingProps) {
  return <Typography as="h3" variant="h3" {...props} />;
}

function H4(props: HeadingProps) {
  return <Typography as="h4" variant="h4" {...props} />;
}

function H5(props: HeadingProps) {
  return <Typography as="h5" variant="h5" {...props} />;
}

function H6(props: HeadingProps) {
  return <Typography as="h6" variant="h6" {...props} />;
}

function Text(props: TextProps) {
  return <Typography as="p" variant="p" {...props} />;
}

function Large(props: LargeProps) {
  return <Typography as="div" variant="large" {...props} />;
}

function Small(props: SmallProps) {
  return <Typography as="small" variant="small" {...props} />;
}

function Lead(props: LeadProps) {
  return <Typography as="p" variant="lead" {...props} />;
}

function Muted(props: MutedProps) {
  return <Typography as="p" variant="muted" {...props} />;
}

function Blockquote(props: BlockquoteProps) {
  return <Typography as="blockquote" variant="blockquote" {...props} />;
}

function Code(props: CodeProps) {
  return <Typography as="code" variant="code" {...props} />;
}

function Kbd(props: KbdProps) {
  return <Typography as="kbd" variant="kbd" {...props} />;
}

export {
  Blockquote,
  Code,
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Kbd,
  Large,
  Lead,
  Muted,
  Small,
  Text,
  Typography,
  typographyVariantClassNames,
  typographyVariants,
};
export type {
  BlockquoteProps,
  CodeProps,
  HeadingProps,
  KbdProps,
  LargeProps,
  LeadProps,
  MutedProps,
  SmallProps,
  TextProps,
  TypographyProps,
  TypographyVariant,
};
