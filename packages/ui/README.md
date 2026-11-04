# @waslu/ui

## Design tokens
Use semantic tokens from `@waslu/ui/tokens` and Tailwind utilities from `@waslu/ui/tailwind-preset`.

AA-safe defaults:
- `text-neutral-900` on `bg-white`
- `text-white` on `bg-brand-600`
- `text-danger-700` on `bg-danger-100`

## Component examples
- Button: `<Button variant="primary">Save</Button>`
- IconButton: `<IconButton label="Open menu">☰</IconButton>`
- Input: `<Input placeholder="name@example.com" />`
- Textarea: `<Textarea />`
- Select: `<Select><option>Option</option></Select>`
- Checkbox: `<Checkbox aria-label="Accept terms" />`
- FormField: `<FormField label="Email">{({fieldId}) => <Input id={fieldId} />}</FormField>`
- Card: `<Card>Content</Card>`
- Badge: `<Badge tone="success">Active</Badge>`
- Sheet: `<Sheet open title="Panel" onOpenChange={() => {}}>...</Sheet>`
- Toast: `<Toast open title="Saved" onDismiss={() => {}} />`
- Skeleton: `<Skeleton className="h-4 w-20" />`
- Spinner: `<Spinner />`
