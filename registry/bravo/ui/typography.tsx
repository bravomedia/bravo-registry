import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";

const heading = "scroll-m-20 font-heading font-semibold text-text-primary text-balance";
const body = "font-body text-text-primary";
const link =
  "underline decoration-from-font [text-underline-position:from-font]";

// Keys mirror the Figma text styles; legacy keys below map onto them.
const scale = {
  "heading-xl": `${heading} text-5xl`,
  "heading-lg": `${heading} text-4xl`,
  "heading-md": `${heading} text-2xl`,
  "heading-sm": `${heading} text-xl`,
  "pre-heading": `${body} text-xl font-semibold`,
  "body-lg": `${body} text-xl font-normal`,
  "body-lg-bold": `${body} text-xl font-semibold`,
  "body-lg-link": `${body} text-xl font-normal ${link}`,
  body: `${body} text-base font-normal`,
  "body-bold": `${body} text-base font-semibold`,
  "body-link": `${body} text-base font-normal ${link}`,
} as const;

const typographyVariantClassNames = {
  ...scale,
  display: scale["heading-xl"],
  h1: scale["heading-xl"],
  h2: scale["heading-lg"],
  h3: scale["heading-md"],
  h4: scale["heading-sm"],
  h5: scale["heading-sm"],
  h6: scale["heading-sm"],
  p: `${scale.body} [&:not(:first-child)]:mt-6`,
  lead: scale["body-lg"],
  large: scale["body-lg-bold"],
  small: "font-body text-sm font-medium",
  muted: "font-body text-sm font-medium text-text-muted",
  link,
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

type HeadingSize = "xl" | "lg" | "md" | "sm";
type TextSize = "default" | "lg";

type HeadingLevelProps = Omit<TypographyProps<React.ElementType>, "variant">;
type HeadingProps = HeadingLevelProps & { size?: HeadingSize };
type PreHeadingProps = Omit<TypographyProps<React.ElementType>, "variant">;
type TextProps = Omit<TypographyProps<React.ElementType>, "variant"> & {
  size?: TextSize;
  weight?: "regular" | "bold";
};
type TextLinkProps = Omit<TypographyProps<React.ElementType>, "variant"> & {
  size?: TextSize;
};
type LargeProps = Omit<TypographyProps<React.ElementType>, "variant">;
type SmallProps = Omit<TypographyProps<React.ElementType>, "variant">;
type LeadProps = Omit<TypographyProps<React.ElementType>, "variant">;
type MutedProps = Omit<TypographyProps<React.ElementType>, "variant">;
type BlockquoteProps = Omit<TypographyProps<React.ElementType>, "variant">;
type CodeProps = Omit<TypographyProps<React.ElementType>, "variant">;
type KbdProps = Omit<TypographyProps<React.ElementType>, "variant">;

/** Visual size is independent of the heading level (`as`). */
function Heading({ as = "h2", size = "lg", ...props }: HeadingProps) {
  return <Typography as={as} variant={`heading-${size}`} {...props} />;
}

function PreHeading(props: PreHeadingProps) {
  return <Typography as="p" variant="pre-heading" {...props} />;
}

function Display(props: HeadingLevelProps) {
  return <Typography as="h1" variant="display" {...props} />;
}

function H1(props: HeadingLevelProps) {
  return <Typography as="h1" variant="h1" {...props} />;
}

function H2(props: HeadingLevelProps) {
  return <Typography as="h2" variant="h2" {...props} />;
}

function H3(props: HeadingLevelProps) {
  return <Typography as="h3" variant="h3" {...props} />;
}

function H4(props: HeadingLevelProps) {
  return <Typography as="h4" variant="h4" {...props} />;
}

function H5(props: HeadingLevelProps) {
  return <Typography as="h5" variant="h5" {...props} />;
}

function H6(props: HeadingLevelProps) {
  return <Typography as="h6" variant="h6" {...props} />;
}

function Text({ size = "default", weight = "regular", ...props }: TextProps) {
  const variant = size === "lg" ? "body-lg" : "body";

  return (
    <Typography
      as="p"
      variant={weight === "bold" ? `${variant}-bold` : variant}
      {...props}
    />
  );
}

/** Pass `asChild` to style a router link, e.g. Inertia's `<Link>`. */
function TextLink({ size = "default", ...props }: TextLinkProps) {
  return (
    <Typography
      as="a"
      variant={size === "lg" ? "body-lg-link" : "body-link"}
      {...props}
    />
  );
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
  Heading,
  Kbd,
  Large,
  Lead,
  Muted,
  PreHeading,
  Small,
  Text,
  TextLink,
  Typography,
  typographyVariantClassNames,
  typographyVariants,
};
export type {
  BlockquoteProps,
  CodeProps,
  HeadingLevelProps,
  HeadingProps,
  HeadingSize,
  KbdProps,
  LargeProps,
  LeadProps,
  MutedProps,
  PreHeadingProps,
  SmallProps,
  TextLinkProps,
  TextProps,
  TextSize,
  TypographyProps,
  TypographyVariant,
};
