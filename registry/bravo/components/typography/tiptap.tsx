import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";
import { typographyVariantClassNames } from "./typography";

type TiptapHtmlAttributes = Record<string, unknown> & {
  class?: string;
};

type TiptapHeadingLevel = keyof typeof tiptapTypographyClassNames.heading;

const tiptapTypographyClassNames = {
  editor: "tiptap text-foreground",
  paragraph: typographyVariantClassNames.p,
  heading: {
    1: typographyVariantClassNames.h1,
    2: typographyVariantClassNames.h2,
    3: typographyVariantClassNames.h3,
    4: typographyVariantClassNames.h4,
    5: typographyVariantClassNames.h5,
    6: typographyVariantClassNames.h6,
  },
  blockquote: typographyVariantClassNames.blockquote,
  code: typographyVariantClassNames.code,
  kbd: typographyVariantClassNames.kbd,
  link: "font-medium text-primary underline underline-offset-4",
  list: {
    ordered: "my-6 ml-6 list-decimal [&>li]:mt-2",
    unordered: "my-6 ml-6 list-disc [&>li]:mt-2",
    item: "pl-1",
  },
  mark: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline underline-offset-4",
    strike: "line-through",
  },
  textAlign: {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  },
  table: {
    wrapper: "my-6 w-full overflow-y-auto",
    table: "w-full caption-bottom text-sm",
    header: "border-b",
    body: "[&_tr:last-child]:border-0",
    row: "border-b transition-colors hover:bg-muted/50",
    head: "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
    cell: "p-2 align-middle",
  },
} as const;

function withTiptapTypographyClass(
  htmlAttributes: TiptapHtmlAttributes,
  className: string,
) {
  return {
    ...htmlAttributes,
    class: cn(className, htmlAttributes.class),
  };
}

type TiptapTypographyProps = React.ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
};

function TiptapTypography({
  asChild = false,
  className,
  ...props
}: TiptapTypographyProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="tiptap-typography"
      className={cn(tiptapTypographyClassNames.editor, className)}
      {...props}
    />
  );
}

export {
  TiptapTypography,
  tiptapTypographyClassNames,
  withTiptapTypographyClass,
};
export type {
  TiptapHeadingLevel,
  TiptapHtmlAttributes,
  TiptapTypographyProps,
};
