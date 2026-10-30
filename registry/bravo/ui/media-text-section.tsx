import * as React from "react";
import type { MediaTextSection as MediaTextSectionData } from "@bravomedia/content-platform-section-media-text";
import { cva } from "class-variance-authority";

import { cn } from "@/registry/bravo/lib/utils";
import { Button } from "@/registry/bravo/ui/button";
import { TiptapContent } from "@/registry/bravo/ui/tiptap";
import { Heading, PreHeading } from "@/registry/bravo/ui/typography";

const mediaTextSectionVariants = cva("", {
  variants: {
    variant: {
      base: "bg-bg-section-base",
      subtle: "bg-bg-section-subtle",
      strong: "bg-bg-section-strong",
    },
  },
  defaultVariants: { variant: "base" },
});

type MediaTextSectionProps = Omit<React.ComponentProps<"section">, "children"> &
  MediaTextSectionData & {
    linkAs?: React.ElementType;
  };

function MediaTextSection({
  media,
  mediaPosition,
  headline,
  label,
  body,
  links,
  variant,
  linkAs,
  className,
  ...props
}: MediaTextSectionProps) {
  const colorVariant =
    variant === "subtle" || variant === "strong" ? variant : "base";
  const visibleLinks = links.filter((link) => link.url);

  return (
    <section
      data-slot="media-text-section"
      data-variant={colorVariant}
      data-media-position={mediaPosition}
      className={cn(
        "flex justify-center px-4 py-section md:px-6 xl:px-10 3xl:px-8",
        mediaTextSectionVariants({ variant: colorVariant }),
        className,
      )}
      {...props}
    >
      <div
        data-slot="media-text-section-container"
        className="grid w-full max-w-363 items-center gap-14 xl:grid-cols-2 xl:gap-28"
      >
        <div
          data-slot="media-text-section-media"
          className={cn(
            "relative aspect-714/586 min-w-0 overflow-hidden rounded-xl",
            mediaPosition === "right" && "xl:order-2",
          )}
        >
          {media.type === "video" ? (
            <video
              data-slot="media-text-section-video"
              src={media.url}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <img
              data-slot="media-text-section-image"
              src={media.url}
              alt={media.alt ?? ""}
              className="absolute inset-0 size-full object-cover"
            />
          )}
        </div>
        <div
          data-slot="media-text-section-content"
          className="flex min-w-0 flex-col gap-8"
        >
          <div className="flex flex-col gap-4" data-slot="media-text-section-text">
            {(label || headline) && (
              <div className="flex flex-col gap-2" data-slot="media-text-section-header">
                {label && (
                  <PreHeading
                    className={cn(
                      colorVariant === "strong"
                        ? "text-neutral-200"
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
              data-slot="media-text-section-body"
              content={body}
              className={cn(
                "font-body text-base [&_p]:text-base",
                colorVariant === "strong"
                  ? "text-text-secondary-inverse [&_p]:text-text-secondary-inverse [&_h1]:text-text-primary-inverse [&_h2]:text-text-primary-inverse [&_h3]:text-text-primary-inverse [&_h4]:text-text-primary-inverse [&_h5]:text-text-primary-inverse [&_h6]:text-text-primary-inverse [&_a]:text-text-primary-inverse"
                  : "text-text-secondary [&_p]:text-text-secondary",
              )}
            />
          </div>
          {visibleLinks.length > 0 && (
            <div data-slot="media-text-section-actions" className="flex flex-wrap gap-4">
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
      </div>
    </section>
  );
}

export { MediaTextSection, mediaTextSectionVariants, type MediaTextSectionProps };