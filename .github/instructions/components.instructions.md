---
description: "Use when creating or editing Bravo registry UI components: props, styling with theme tokens, variants, focus states, form field wiring."
applyTo: "registry/bravo/ui/**"
---

# Component conventions

## Base on shadcn

- If shadcn has an equivalent component, start from its current source (`https://ui.shadcn.com/r/styles/new-york-v4/<name>.json`), not from memory.
- Copy it into `registry/bravo/ui/<name>.tsx` and modify it there. Don't import and wrap shadcn components.
- Keep everything that comes with shadcn: parts, exports, variants, sizes, `data-slot`s, Radix primitives, and the prop API (`variant`, `size`, `asChild`). Don't remove anything, even when Figma doesn't use it.
- Modify only what the design requires: restyle the parts, variants, and states that Figma shows, using Bravo tokens.
- Add variants or sizes that exist in Figma but not in shadcn (e.g. `inverse` and `outline-inverse` in `button.tsx`).
- Leave shadcn classes on parts the design doesn't cover. `bravo-base` maps shadcn variables (`bg-card`, `text-muted-foreground`, `ring`) to Bravo tokens.
- If no shadcn component matches the semantics (e.g. a navigation card is an `<a>`, not `Card`), build it from scratch following these conventions.

## Shape

- One file per component. Use named exports at the bottom: `export { Thing, thingVariants, type ThingProps }`.
- Type props as `React.ComponentProps<"el">` plus extras. Spread the rest of `props` onto the root element.
- Every element gets `data-slot="<component-name>"` (and `data-slot="<component>-<part>"` for its parts).
- Merge classes with `cn(base, className)` from `@/registry/bravo/lib/utils`. Put `className` last.
- Add `"use client"` only when the file uses hooks, context, or event handlers.
- For variants, use `cva` (see `button.tsx`). Mirror variant props to `data-variant` / `data-size`.
- Use `asChild` via `Slot.Root` from `radix-ui` when the element must be swappable.

## Styling

- Style what the design specifies with Bravo token utilities. Look up names in `registry/bravo/styles/theme.css` (`--color-*`, `--font-*`). Some token names keep Figma typos, e.g. `border-desctructive-focus`.
- Draw borders with `inset-ring` / `inset-ring-2`, not `border`. This matches Figma strokes, which don't add size, and lets state changes from 1px to 2px happen without layout shift.
- Focus: `outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-subtle-focus`. Use `border-brand-focus` for brand elements and `*-inverse` on dark backgrounds.
- Express hover, focus, and disabled as CSS states (`hover:`, `focus-visible:`, `disabled:`, `aria-invalid:`, `aria-disabled:`), never as a `state` prop.
- Icons: `lucide-react`, mark them `aria-hidden` when decorative, and size them with `[&_svg:not([class*='size-'])]:size-6` or an explicit `size-*`.

## Inertia

Consumers are Laravel + Inertia.js (React) apps, often with SSR. The Next.js app here is only a showcase.

- Links: every component that renders an `<a>` accepts `asChild` (via `Slot.Root`) so Inertia's `<Link>` can take its place. If the component renders its own inner content (icons etc.), wrap `children` in `Slot.Slottable` (see `shortcut-card.tsx`):

  ```tsx
  <ShortcutCard asChild><Link href="/kontakt">Kontakt</Link></ShortcutCard>
  <Button asChild><Link href="/logout" method="post" as="button">Logga ut</Link></Button>
  ```

- Don't import `@inertiajs/react` or `next/*` in `registry/`. Components stay router-agnostic through `asChild`.
- Forms: see "Form controls" below. Inertia's `<Form>` reads values from native named elements, so custom controls must render one (e.g. Radix Select renders a hidden native `<select>` when given `name`).
- Errors come as `errors.field` (string, or string[] with `withAllErrors`). `Field`'s `error` and `FieldError`'s `errors` accept them directly.
- SSR: don't touch `window`/`document` during render, only in effects and event handlers.

## Form controls

- Wrap controls in `Field` (`field.tsx`). The props API (`label`, `description`, `error`, `tooltip`) is the default. The shadcn parts (`FieldSet`, `FieldLegend`, `FieldGroup`, `FieldLabel`, `FieldError`, ...) are for composed layouts.
- Controls call `useFieldControl(props)` and spread `field.props`. This wires `id`, `disabled`, `aria-invalid`, and `aria-describedby`. Call it once per control: wrappers that render `Input`/`InputGroupInput` pass the raw props through instead.
- Reuse `inputVariants` for standalone controls. For controls with adornments, compose `InputGroup` + `InputGroupInput` + `InputGroupAddon`/`InputGroupText`/`InputGroupButton` (see `number-input.tsx`, `password-input.tsx`). The group reads focus, error, and disabled states from the control via `has-[...]`.
- Every control must render a native element with `name` so Inertia `<Form>` can serialize it.

## Example

```tsx
import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/registry/bravo/lib/utils"

function ShortcutCard({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="shortcut-card"
      className={cn(
        "flex items-center gap-3 rounded-xl bg-bg-content-base px-8 py-6 inset-ring-1 inset-ring-border-light hover:bg-bg-content-base-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-subtle-focus",
        className
      )}
      {...props}
    >
      <ArrowRight aria-hidden className="size-10" />
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}

export { ShortcutCard }
```
