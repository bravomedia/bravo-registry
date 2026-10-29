import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";
import { typographyVariantClassNames } from "@/registry/bravo/ui/typography";

type TiptapHtmlAttributes = Record<string, unknown> & {
  class?: string;
};

type TiptapHeadingLevel = keyof typeof tiptapTypographyClassNames.heading;

/** Structurally compatible with `JSONContent` from `@tiptap/core`. */
type TiptapJSONContent = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: TiptapJSONContent[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  text?: string;
};

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

const safeUrlSchemes = ["http", "https", "mailto", "tel"];

function safeHref(href: unknown) {
  if (typeof href !== "string") return undefined;

  // Browsers ignore whitespace and control characters in schemes ("java\tscript:").
  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(href.replace(/[^\x21-\x7e]/g, ""));

  return !scheme || safeUrlSchemes.includes(scheme[1].toLowerCase())
    ? href
    : undefined;
}

function stringAttr(value: unknown) {
  return typeof value === "string" && value ? value : undefined;
}

function renderMark(
  mark: NonNullable<TiptapJSONContent["marks"]>[number],
  children: React.ReactNode,
) {
  const { mark: marks } = tiptapTypographyClassNames;

  switch (mark.type) {
    case "bold":
      return <strong className={marks.bold}>{children}</strong>;
    case "italic":
      return <em className={marks.italic}>{children}</em>;
    case "underline":
      return <u className={marks.underline}>{children}</u>;
    case "strike":
      return <s className={marks.strike}>{children}</s>;
    case "code":
      return (
        <code className={tiptapTypographyClassNames.code}>{children}</code>
      );
    case "link": {
      const href = safeHref(mark.attrs?.href);
      if (!href) return children;

      const target = stringAttr(mark.attrs?.target);

      return (
        <a
          href={href}
          target={target}
          rel={
            stringAttr(mark.attrs?.rel) ??
            (target === "_blank" ? "noopener noreferrer" : undefined)
          }
          className={tiptapTypographyClassNames.link}
        >
          {children}
        </a>
      );
    }
    default:
      return children;
  }
}

function renderNode(node: TiptapJSONContent, key: number): React.ReactNode {
  const children = node.content?.map(renderNode);
  const textAlign = stringAttr(node.attrs?.textAlign);
  const alignClassName =
    textAlign && textAlign in tiptapTypographyClassNames.textAlign
      ? tiptapTypographyClassNames.textAlign[
          textAlign as keyof typeof tiptapTypographyClassNames.textAlign
        ]
      : undefined;

  switch (node.type) {
    case "text":
      return (
        <React.Fragment key={key}>
          {(node.marks ?? []).reduce<React.ReactNode>(
            (child, mark) => renderMark(mark, child),
            node.text,
          )}
        </React.Fragment>
      );
    case "paragraph":
      return (
        <p
          key={key}
          className={cn(tiptapTypographyClassNames.paragraph, alignClassName)}
        >
          {children}
        </p>
      );
    case "heading": {
      const level = Math.min(
        Math.max(Number(node.attrs?.level) || 1, 1),
        6,
      ) as TiptapHeadingLevel;
      const Tag = `h${level}` as const;

      return (
        <Tag
          key={key}
          className={cn(
            tiptapTypographyClassNames.heading[level],
            alignClassName,
          )}
        >
          {children}
        </Tag>
      );
    }
    case "bulletList":
      return (
        <ul key={key} className={tiptapTypographyClassNames.list.unordered}>
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol
          key={key}
          start={Number(node.attrs?.start) || undefined}
          className={tiptapTypographyClassNames.list.ordered}
        >
          {children}
        </ol>
      );
    case "listItem":
      return (
        <li key={key} className={tiptapTypographyClassNames.list.item}>
          {children}
        </li>
      );
    case "blockquote":
      return (
        <blockquote key={key} className={tiptapTypographyClassNames.blockquote}>
          {children}
        </blockquote>
      );
    case "hardBreak":
      return <br key={key} />;
    case "horizontalRule":
      return <hr key={key} />;
    default:
      return <React.Fragment key={key}>{children}</React.Fragment>;
  }
}

type TiptapContentProps = Omit<TiptapTypographyProps, "children" | "content"> & {
  content: TiptapJSONContent | null | undefined;
};

/** Renders stored Tiptap JSON without an editor instance (SSR-safe). */
function TiptapContent({ content, ...props }: TiptapContentProps) {
  if (!content) return null;

  return (
    <TiptapTypography data-slot="tiptap-content" {...props}>
      {renderNode(content, 0)}
    </TiptapTypography>
  );
}

export {
  TiptapContent,
  TiptapTypography,
  tiptapTypographyClassNames,
  withTiptapTypographyClass,
};
export type {
  TiptapContentProps,
  TiptapHeadingLevel,
  TiptapHtmlAttributes,
  TiptapJSONContent,
  TiptapTypographyProps,
};
