import * as React from "react";
import type { Section, SectionsTemplate } from "@bravomedia/content-platform";

import { MediaTextSection } from "@/registry/bravo/ui/media-text-section";
import { SpotlightSection } from "@/registry/bravo/ui/spotlight-section";

type SectionsPageTemplateProps = Omit<
  React.ComponentProps<"div">,
  "children" | "content"
> & {
  content: SectionsTemplate;
  /** Renders internal (`route`) links, e.g. Inertia's `<Link>`. */
  linkAs?: React.ElementType;
};

function renderSection(
  section: Section,
  key: React.Key,
  linkAs?: React.ElementType,
) {
  switch (section.type) {
    case "mediaText":
      return <MediaTextSection key={key} {...section.data} linkAs={linkAs} />;
    case "spotlight":
      return <SpotlightSection key={key} {...section.data} linkAs={linkAs} />;
    default:
      return null;
  }
}

function SectionsPageTemplate({
  content,
  linkAs,
  ...props
}: SectionsPageTemplateProps) {
  return (
    <div data-slot="sections-page-template" {...props}>
      {content.sections.map((section, index) =>
        renderSection(section, index, linkAs),
      )}
    </div>
  );
}

export { SectionsPageTemplate, type SectionsPageTemplateProps };
