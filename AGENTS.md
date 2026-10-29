# Bravo Registry

A shadcn registry of React components for Bravo sites (Laravel + Inertia). This repo uses Next.js 15, React 19, Tailwind CSS v4, Radix (`radix-ui`), `class-variance-authority`, and `lucide-react`. The package manager is npm (via devenv).

## Structure

- `registry/bravo/ui/*.tsx`: components, one file per registry item
- `registry/bravo/lib/*.ts`: helpers (`cn` in `utils.ts`)
- `registry/bravo/styles/theme.css`: **generated** from Figma tokens by `npm run tokens:build`. Never edit by hand.
- `scripts/tokens/`: the Figma export → `theme.css` pipeline (see README)
- `registry.json`: source of truth for registry items
- `public/r/*.json`: **generated** by `npx shadcn build`. Never edit by hand.
- `app/page.tsx`: showcase page with an example of every component

## Adding or changing a component

1. Create or edit `registry/bravo/ui/<name>.tsx`.
2. Add or update the item in `registry.json`:
   - `dependencies`: npm packages
   - `registryDependencies`: `@bravo/*` items such as `@bravo/utils`, `@bravo/bravo-theme`, `@bravo/field`
3. Add an example to `app/page.tsx`.
4. Verify:

   ```sh
   npx tsc --noEmit -p . && npx eslint registry/bravo app/page.tsx && npx shadcn build
   ```

## Rules

- Base components on the original shadcn component when one exists, and modify only what the design requires (see `.github/instructions/components.instructions.md`).
- Style anything the design specifies with theme token utilities from `theme.css` (`bg-bg-content-base`, `text-text-primary`, `inset-ring-border-dark`, `font-body`). No hex values.
- Icons: use `lucide-react` only, even when Figma uses another icon set.
- Everything must work in Laravel + Inertia.js (React). See "Inertia" in `.github/instructions/components.instructions.md`. In short:
  - Links: anything rendering `<a>` supports `asChild` so Inertia's `<Link>` can be used.
  - Forms: controls render native, `name`d elements so Inertia's `<Form>` can submit them. Errors (`errors.field`) go to `Field`'s `error`.
  - No Next.js APIs (`next/link`, `next/image`, `next/navigation`) in `registry/`; Next.js is only the showcase.
- Prefer semantic native elements: `<a>` for navigation, `<button>` for actions, `<select>` for `NativeSelect`.
- UI text and examples are in Swedish where user-facing (e.g. "Välj alternativ").
- Designs come from Figma. For design-to-code work, follow the `figma-component` skill.
- These rules take precedence over generic skills (`shadcn`, `tailwind-design-system`). In particular, never define new `@theme` tokens or color values; use only what `theme.css` provides.
