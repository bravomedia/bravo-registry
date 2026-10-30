import * as React from "react";
import type { SpotlightSection as SpotlightSectionData } from "@bravomedia/content-platform-section-spotlight";

import { cn } from "@/registry/bravo/lib/utils";
import { Button } from "@/registry/bravo/ui/button";
import { TiptapContent } from "@/registry/bravo/ui/tiptap";
import { Heading, PreHeading } from "@/registry/bravo/ui/typography";

type SpotlightLink = SpotlightSectionData["links"][number];

type SpotlightSectionProps = Omit<React.ComponentProps<"section">, "children"> &
  SpotlightSectionData & {
    /** Renders internal (`route`) links, e.g. Inertia's `<Link>`. */
    linkAs?: React.ElementType;
  };

function linkAttributes(link: SpotlightLink) {
  const rel = [
    link.newTab && "noopener noreferrer",
    link.nofollow && "nofollow",
    link.sponsored && "sponsored",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    href: link.url,
    target: link.newTab ? "_blank" : undefined,
    rel: rel || undefined,
  };
}

function SpotlightSection({
  media,
  headline,
  label,
  body,
  links,
  linkAs,
  className,
  ...props
}: SpotlightSectionProps) {
  const visibleLinks = links.filter((link) => link.url);

  return (
    <section
      data-slot="spotlight-section"
      className={cn(
        "relative flex flex-col items-center overflow-hidden px-4 py-40 md:px-6 xl:px-10 3xl:px-8",
        className,
      )}
      {...props}
    >
      {media.type === "video" ? (
        <video
          data-slot="spotlight-section-media"
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
          data-slot="spotlight-section-media"
          src={media.url}
          alt={media.alt ?? ""}
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div
        data-slot="spotlight-section-container"
        className="relative grid w-full max-w-363 xl:grid-cols-2 xl:gap-6"
      >
        <div
          data-slot="spotlight-section-card"
          className="flex min-w-0 flex-col gap-8 rounded-xl bg-bg-section-base p-8 md:p-10"
        >
          <div data-slot="spotlight-section-content" className="flex flex-col gap-4">
            {(label || headline) && (
              <div data-slot="spotlight-section-header" className="flex flex-col gap-2">
                {label && <PreHeading>{label}</PreHeading>}
                {headline && (
                  <Heading size="xl" className="wrap-break-word">
                    {headline}
                  </Heading>
                )}
              </div>
            )}
            <TiptapContent
              data-slot="spotlight-section-body"
              content={body}
              className="max-w-178.5 font-body text-xl text-text-secondary [&_p]:text-xl [&_p]:text-text-secondary"
            />
          </div>
          {visibleLinks.length > 0 && (
            <div data-slot="spotlight-section-actions" className="flex flex-wrap gap-4">
              {visibleLinks.map((link, index) => {
                const Comp =
                  linkAs && link.type === "route" && !link.newTab
                    ? linkAs
                    : "a";

                return (
                  <Button
                    key={index}
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                  >
                    <Comp {...linkAttributes(link)}>
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

export { SpotlightSection, type SpotlightSectionProps };