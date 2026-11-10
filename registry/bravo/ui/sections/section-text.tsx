import * as React from "react";
import type { TextSection as TextSectionData } from "@bravomedia/content-platform-section-text";
import { cva } from "class-variance-authority";

import { cn } from "@/registry/bravo/lib/utils";
import { Button } from "@/registry/bravo/ui/button";
import { TiptapContent } from "@/registry/bravo/ui/tiptap";
import { Heading, PreHeading } from "@/registry/bravo/ui/typography";

const textSectionVariants = cva("", {
  variants: {
    variant: {
      base: "bg-background-base",
      subtle: "bg-background-subtle",
      strong: "bg-background-strong",
    },
  },
  defaultVariants: { variant: "base" },
});

type TextSectionProps = Omit<React.ComponentProps<"section">, "children"> &
  TextSectionData & {
    linkAs?: React.ElementType;
  };

function TextSection({
  headline,
  label,
  body,
  links,
  variant,
  linkAs,
  className,
  ...props
}: TextSectionProps) {
  const colorVariant =
    variant === "subtle" || variant === "strong" ? variant : "base";
  const visibleLinks = links.filter((link) => link.url);

  return (
    <section
      data-slot="text-section"
      data-variant={colorVariant}
      className={cn(
        "flex justify-center px-4 py-section md:px-6 xl:px-10 3xl:px-8",
        textSectionVariants({ variant: colorVariant }),
        className,
      )}
      {...props}
    >
      <div
        data-slot="text-section-container"
        className="flex w-full max-w-363 flex-col gap-8 xl:items-center xl:text-center"
      >
        <div data-slot="text-section-content" className="flex w-full flex-col gap-4 xl:items-center">
          {(label || headline) && (
            <div data-slot="text-section-header" className="flex w-full flex-col gap-2">
              {label && (
                <PreHeading
                  className={cn(
                    colorVariant === "strong"
                      ? "text-text-muted-inverse"
                      : colorVariant === "subtle"
                        ? "text-text-brand"
                        : "text-text-muted",
                  )}
                >
                  {label}
                </PreHeading>
              )}
              {headline && (
                <Heading
                  size="lg"
                  className={cn(
                    "wrap-break-word",
                    colorVariant === "strong" && "text-text-primary-inverse",
                  )}
                >
                  {headline}
                </Heading>
              )}
            </div>
          )}
          <TiptapContent
            data-slot="text-section-body"
            content={body}
            className={cn(
              "w-full max-w-178.5 font-body text-xl [&_p]:text-xl",
              colorVariant === "strong"
                ? "text-text-primary-inverse [&_p]:text-text-primary-inverse [&_h1]:text-text-primary-inverse [&_h2]:text-text-primary-inverse [&_h3]:text-text-primary-inverse [&_h4]:text-text-primary-inverse [&_h5]:text-text-primary-inverse [&_h6]:text-text-primary-inverse [&_a]:text-text-primary-inverse"
                : "text-text-secondary [&_p]:text-text-secondary",
            )}
          />
        </div>
        {visibleLinks.length > 0 && (
          <div data-slot="text-section-actions" className="flex flex-wrap gap-4 xl:justify-center">
            {visibleLinks.map((link, index) => {
              const Comp = linkAs && link.type === "route" && !link.newTab ? linkAs : "a";
              const rel = [
                link.newTab && "noopener noreferrer",
                link.nofollow && "nofollow",
                link.sponsored && "sponsored",
              ].filter(Boolean).join(" ");

              return (
                <Button
                  key={index}
                  asChild
                  variant={index === 0 ? "default" : colorVariant === "strong" ? "outline-inverse" : "outline"}
                >
                  <Comp href={link.url} target={link.newTab ? "_blank" : undefined} rel={rel || undefined}>
                    {link.label ?? link.url}
                  </Comp>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export { TextSection, textSectionVariants, type TextSectionProps };