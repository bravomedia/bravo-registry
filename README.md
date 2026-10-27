# bravo-registry

## Getting Started

This is a template for creating a custom registry using Next.js.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item are compatible with the `shadcn` CLI.
- We have also added v0 integration using the `Open in v0` api.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.

## Theme Tokens

Install the generated Tailwind v4 theme in a consumer project:

```sh
npx shadcn@latest add @bravo/bravo-theme
```

Import `theme.css` after `tailwindcss` in the consumer's main stylesheet. It provides primitive variables such as `--neutral-700` and Tailwind utilities such as `text-text-secondary`, `bg-bg-content-brand`, and `border-border-dark`.

To update the theme, export the Figma `Color palette`, `Color tokens`, `Section margin`, and `Type properties` collections into `scripts/tokens/figma/export-files/` (as `color-palette.json`, `color-tokens.json`, `section-margin.json`, and `type-properties.json`), then run:

```sh
npm run tokens:build
```

This converts the Figma exports and writes `registry/bravo/styles/theme.css`. Each Figma collection has its own converter in `scripts/tokens/figma/`.
