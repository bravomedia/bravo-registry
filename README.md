# Bravo Registry

React components for Bravo customer websites (Laravel + Inertia + React + Tailwind v4), distributed with the [shadcn CLI](https://ui.shadcn.com/docs/registry). The CLI copies each component's source into the customer project, so the site owns the code and can adjust it.

## Add Bravo components to a customer website

### 1. Check the prerequisites

The customer project needs:

- Laravel with Inertia.js and React (the Laravel React starter kit works as-is)
- Tailwind CSS v4
- A `components.json` in the project root. If it is missing, run `npx shadcn@latest init`.

### 2. Point the project at the Bravo registry

Add `@bravo` under `registries` in the customer's `components.json`:

```json
{
  "registries": {
    "@bravo": "http://localhost:3000/r/{name}.json"
  }
}
```

`localhost:3000` works while this repo runs locally with `npm run dev`. Use the deployed registry URL once it is published.

### 3. Install the base (once per project)

```sh
npx shadcn@latest add @bravo/bravo-base
```

This installs the theme (`theme.css`), the `cn()` helper and the shared npm packages.

Then import the theme in the main stylesheet (`resources/css/app.css`), directly after Tailwind:

```css
@import "tailwindcss";
@import "./theme.css"; /* use the path the CLI printed */
```

The theme provides the Bravo colors, fonts, text sizes, breakpoints and section spacing as Tailwind utilities (`bg-bg-content-brand`, `text-text-secondary`, `py-section`, ...).

### 4. Add the components you need

```sh
npx shadcn@latest add @bravo/button @bravo/field @bravo/input
```

Dependencies are installed automatically. For example, `@bravo/input` also adds `@bravo/field`. Files are written to the folders set in `components.json` (usually `resources/js/components/ui`).

### 5. Use them with Inertia

Links: components that render a link accept `asChild`, so Inertia's `<Link>` can be used:

```tsx
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

<Button asChild>
  <Link href="/kontakt">Kontakta oss</Link>
</Button>;
```

Forms: form controls render native, named elements, so Inertia's `<Form>` can submit them. Pass validation errors to `Field`:

```tsx
import { Form } from "@inertiajs/react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

<Form action="/kontakt" method="post">
  {({ errors }) => (
    <Field label="E-post" error={errors.email}>
      <Input name="email" type="email" />
    </Field>
  )}
</Form>;
```

## Content platform pages (sections)

Pages built in the Bravo content platform can be rendered with one component.

1. Make sure the customer project has the content platform type packages in `package.json` (`@bravomedia/content-platform`, `@bravomedia/laravel-media-library` and one `@bravomedia/content-platform-section-*` package per section type).
2. Install the template. It also installs every section component it renders:

   ```sh
   npx shadcn@latest add @bravo/sections-page-template
   ```

3. Render it in the Inertia page component:

   ```tsx
   import { Link } from "@inertiajs/react";
   import type { Page as ContentPage } from "@bravomedia/content-platform";
   import { SectionsPageTemplate } from "@/components/ui/sections-page-template";

   export default function Page({ page }: { page: ContentPage }) {
     if (page.template !== "sections") return null;

     return <SectionsPageTemplate content={page.content} linkAs={Link} />;
   }
   ```

`linkAs={Link}` makes internal (`route`) links in the sections navigate with Inertia. External links and links that open in a new tab stay plain `<a>` tags. Without `linkAs`, all links are plain `<a>` tags and cause a full page load.

Individual sections can also be used on their own, e.g. `<MediaTextSection {...section.data} linkAs={Link} />`.

## Available components

| Item | What it is |
|---|---|
| `bravo-base` | Theme, `cn()` helper and shared packages. Install first. |
| `button`, `button-link` | Buttons and inline link actions |
| `field`, `label`, `input`, `textarea`, `native-select`, `select`, `number-input`, `password-input`, `date-input`, `input-group` | Form controls with label, description and error handling |
| `card`, `shortcut-card`, `separator` | Layout and navigation cards |
| `typography`, `prose`, `tiptap` | Headings, text styles and rich text (Tiptap JSON) rendering |
| `spotlight-section`, `media-text-section` | Content platform sections |
| `sections-page-template` | Renders all sections of a content platform page |
| `format`, `string` | Date/number and string helpers |

See every component in action by running this repo (`npm run dev`) and opening http://localhost:3000.

## Updating components on a customer website

The CLI never updates files silently. To see what changed in the registry:

```sh
npx shadcn@latest add @bravo/button --diff
```

Merge the changes by hand if the site has local edits, or overwrite with `--overwrite` if it has none.

## Working on this registry

- Run the showcase: `npm run dev` (http://localhost:3000)
- Add or change a component: see [AGENTS.md](AGENTS.md)
- Verify before committing:

  ```sh
  npx tsc --noEmit -p . && npx eslint registry/bravo app/page.tsx && npx shadcn build
  ```

### Updating the theme from Figma

Export the Figma `Color palette`, `Color tokens`, `Section margin`, and `Type properties` collections into `scripts/tokens/figma/export-files/` (as `color-palette.json`, `color-tokens.json`, `section-margin.json`, and `type-properties.json`), then run:

```sh
npm run tokens:build
```

This converts the Figma exports and writes `registry/bravo/styles/theme.css`. Each Figma collection has its own converter in `scripts/tokens/figma/`.
