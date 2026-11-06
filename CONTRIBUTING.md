# Contributing

## Setup
1. Install Node.js 20 or newer and pnpm.
2. Run `pnpm install`.
3. Copy `.env.example` to `apps/storefront/.env.local` and `apps/seller/.env.local`.
4. Run `pnpm dev`.

## Working on an issue
1. Pick one issue and say so in the issue comments.
2. Create a branch from `main` named after the issue, for example `fe-w1-07-seller-shell`.
3. Keep the pull request to that one issue.
4. Write commit messages that say what changed, for example `Add seller navigation`.
5. Open a pull request, fill in the checklist, and ask for one review.
6. Do not merge until all checks are green.

## Quality checks (run before you push)
- `pnpm lint`
- `pnpm check:strings`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Rules to remember
- Never write user-facing text inside a component. Use `t("...")`. See `docs/i18n.md`.
- Colors and spacing come from the design tokens. See `docs/design-tokens.md`.
- Changes to `packages/ui` and `packages/api-client` go in their own small pull request.
