# Design tokens

The tokens live in two files that must be changed together:

- `packages/ui/src/tokens.ts`
- `packages/ui/tailwind-preset.js`

A test (`packages/ui/src/__tests__/tokens.test.ts`) fails if the colors or breakpoints in the two files stop matching.

## Colors

| Name | Shades | Values |
|---|---|---|
| `brand` | 50 to 900 | 50 `#eef4ff`, 100 `#dce9ff`, 200 `#bdd5ff`, 300 `#92b8ff`, 400 `#5f90ff`, 500 `#3c6ef8`, 600 `#2f56d6`, 700 `#2543ab`, 800 `#223986`, 900 `#22346a` |
| `neutral` | 50 to 900 | 50 `#f8fafc`, 100 `#f1f5f9`, 200 `#e2e8f0`, 300 `#cbd5e1`, 400 `#94a3b8`, 500 `#64748b`, 600 `#475569`, 700 `#334155`, 800 `#1e293b`, 900 `#0f172a` |
| `success` | 100, 700 | 100 `#dcfce7`, 700 `#15803d` |
| `warning` | 100, 700 | 100 `#fef3c7`, 700 `#b45309` |
| `danger` | 100, 700 | 100 `#fee2e2`, 700 `#b91c1c` |

## Text sizes

`text-xs` 12px, `text-sm` 14px, `text-base` 16px, `text-lg` 18px, `text-xl` 20px, `text-2xl` 24px.

## Spacing

Steps `1, 2, 3, 4, 5, 6, 8, 10` (0.25rem each step: `4` is 1rem).

## Corner radius

`rounded-sm` 0.25rem, `rounded-md` 0.5rem, `rounded-lg` 0.75rem, `rounded-xl` 1rem.

## Shadows

`shadow-sm`, `shadow-md`, `shadow-lg`.

## Breakpoints

`xs` 360px (smallest phone we support), `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.

## Contrast (WCAG AA)

Normal text needs at least 4.5 to 1. Borders of form controls need at least 3 to 1.

| Use | Colors | Ratio |
|---|---|---|
| Primary button | white on `brand-600` | 6.1 |
| Danger button | white on `danger-700` | 6.5 |
| Secondary button | `neutral-900` on `neutral-200` | 14.5 |
| Body text | `neutral-900` on white | 17.9 |
| Hint and meta text | `neutral-600` on white | 7.6 |
| Placeholder | `neutral-500` on white | 4.8 |
| Success badge | `success-700` on `success-100` | 4.6 |
| Warning badge | `warning-700` on `warning-100` | 4.5 |
| Danger badge and error text | `danger-700` on `danger-100` | 5.3 |
| Input border | `neutral-500` on white | 4.8 |

Do not use `neutral-300` for the border of an input. On white it is only 1.5 to 1.
