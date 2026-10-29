---
name: figma-component
description: 'Implement a Bravo registry component from a Figma design. Use when given a figma.com URL, or asked to build, update, or match a component to Figma (design to code, Figma variables to Tailwind tokens, states, dimensions).'
argument-hint: 'Figma URL with node-id'
---

# Figma → Bravo component

## Figma file

- File key: `3QHSp7JqozDbsj9rvtCvAV` ("Laravel Sektioner (grundutförande)")
- Known nodes:
  - form inputs: `4259:4068`
  - typography: `4180:334`
  - shortcut card: `4182:884`
- URL `node-id=4182-884` → nodeId `4182:884`

## Procedure

1. Get the design context and screenshot for the node with the Figma MCP. If it returns 401, ask the user to reconnect Figma or send a screenshot. Never guess the design.
2. Check for a matching component in `registry/bravo/ui/`. Extend it before creating a new one.
3. If none exists, fetch the shadcn original as the base (see "Base on shadcn" in the component instructions). Restyle what Figma shows, add missing Figma variants, and remove nothing.
4. Translate the generated code (it is a reference, not final code). Follow `.github/instructions/components.instructions.md` and the mappings below.
5. Register the component in `registry.json`, add an example to `app/page.tsx`, and run the verify command from `AGENTS.md`.
6. Check the rendered size against the Figma frame (width, height, padding) on `npm run dev` at http://localhost:3000.

## Mapping Figma variables to Tailwind

| Figma variable | Tailwind |
|---|---|
| `--background/content/base/bg-content-base` | `bg-bg-content-base` |
| `--text-&-icon/text-primary` | `text-text-primary` |
| `--border/border-light` (stroke) | `inset-ring-1 inset-ring-border-light` |
| `--border/focus/border-subtle-focus` | `outline-border-subtle-focus` |
| `--space-N` | `p-N` / `gap-N` (4px scale: `--space-8` = 32px = `px-8`) |
| `--rounded-xl` | `rounded-xl` |
| `--family/body`, `--family/heading` | `font-body`, `font-heading` |
| `--text-xl/font-size` + `line-heigt` | `text-xl leading-7` |
| Text style `Body/lg-bold` etc. | `Text` / `Heading` from `typography.tsx` |

The rule: take the last path segment of the variable and find it in `theme.css`.

## Pitfalls

- **Strokes vs. borders**: Figma strokes sit inside the frame, but CSS `border` adds to it (a 1px border makes an 88px card 90px). Use `inset-ring`.
- **States**: a Figma `state` variant (Default/Hover/Focus/Disabled) maps to CSS pseudo-classes, not a prop.
- **Focus rings**: Figma often draws them as an absolute layer at `inset-[-4px]`. Use `focus-visible:outline-2 focus-visible:outline-offset-2` instead.
- **Fixed widths**: `w-[282px]` on the root is usually the frame width in Figma. Keep `min-w-*` and let the consumer set the width.
- **Icons**: replace Figma icon assets with the nearest `lucide-react` icon (e.g. `icon/Arrow Right Alt` → `ArrowRight`). Don't download SVGs for icons.
- **Generated code**: drop `data-node-id`, absolute positioning, and `var(--x, fallback)` arbitrary values.
