# @waslu/ui

Shared components and design tokens for the Waslu apps.

Rules for every component:

- No user-facing text is written inside a component. Text always comes in through props, so it can be translated.
- Components work with the keyboard and have an accessible name.
- Colors and spacing come from the Tailwind preset (see `docs/design-tokens.md`).

All components also accept the normal HTML props of the element they render (for example `disabled`, `onClick`, `className`).

## Components and their props

| Component | Props you set | Example |
|---|---|---|
| `Button` | `variant`: primary, secondary, ghost or danger. `size`: sm, md or lg | `<Button variant="primary">{t("seller.home.cta")}</Button>` |
| `IconButton` | `label` (required, the accessible name). `size`: sm or md | `<IconButton label={t("common.actions.close")}>x</IconButton>` |
| `Input` | none extra | `<Input placeholder={t("auth.email")} />` |
| `Textarea` | none extra | `<Textarea />` |
| `Select` | none extra. Put `<option>` elements inside | `<Select><option>...</option></Select>` |
| `Checkbox` | none extra. Give it an `aria-label` or wrap it in a label | `<Checkbox aria-label={t("auth.remember")} />` |
| `FormField` | `label` (required), `hint`, `error`, `required`. Children is a function that gives you `fieldId`, `hintId`, `errorId` | see below |
| `Card` | none extra | `<Card>...</Card>` |
| `Badge` | `tone`: neutral, success, warning or danger | `<Badge tone="success">{t("order.paid")}</Badge>` |
| `Sheet` | `open`, `title`, `closeLabel` (required), `description`, `onOpenChange` | `<Sheet open title={t("x")} closeLabel={t("common.actions.close")} onOpenChange={setOpen}>...</Sheet>` |
| `Toast` | `open`, `title`, `dismissLabel` (required), `description`, `status`: info, success, warning or error, `onDismiss` | `<Toast open title={t("x")} dismissLabel={t("common.actions.dismiss")} onDismiss={close} />` |
| `Skeleton` | none extra. Set the size with `className` | `<Skeleton className="h-4 w-20" />` |
| `Spinner` | `label` (required, read by screen readers) | `<Spinner label={t("common.status.loading")} />` |

### FormField example

```tsx
<FormField label={t("auth.email")} error={emailError} required>
  {({ fieldId, errorId }) => (
    <Input id={fieldId} aria-invalid={Boolean(emailError)} aria-describedby={errorId} />
  )}
</FormField>
```

## Adding a component

1. Create `src/components/MyThing.tsx`. Take all text as props.
2. Export it from `src/index.ts`.
3. Add a test in `src/__tests__/components.test.tsx`.
4. Add a row to the table above.
