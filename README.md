# Waslu Frontend

Waslu is an open-source tool that lets small sellers open an online store in minutes: add a product from a photo, share a link, and get paid. This repository holds the **frontend**: the apps buyers and sellers see in the browser. The backend lives in a separate repository (`waslu-backend`).

> **Status: Week 1 of a 5-week sprint.** The foundation is in place (project setup, design tokens, shared components, translations, API client). The seller dashboard and the storefront pages are still to come. See [What exists today](#what-exists-today).

## Contents

- [What exists today](#what-exists-today)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Commands](#commands)
- [Environment variables](#environment-variables)
- [Working with the code](#working-with-the-code)
- [Testing and CI](#testing-and-ci)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

## What exists today

| Part                                                      | State                                                                       |
| --------------------------------------------------------- | --------------------------------------------------------------------------- |
| Monorepo (pnpm and Turborepo), CI, lint, typecheck, tests | Done                                                                        |
| Design tokens and Tailwind preset                         | Done                                                                        |
| Shared UI components (`@waslu/ui`)                        | Done                                                                        |
| Translations (`t("...")` helper and string check)         | Done                                                                        |
| API client with mock and live mode                        | Done, but not typed yet: it needs `contracts/openapi.yaml` from the backend |
| Seller app shell (navigation, routes)                     | Not started                                                                 |
| Seller sign-up and login screens                          | Not started                                                                 |
| Storefront pages (listing, product, cart, checkout)       | Not started                                                                 |

Both apps currently show a simple welcome page so you can check that everything runs. Done via issue 2

## Tech stack

| Tool                                                            | Used for                               |
| --------------------------------------------------------------- | -------------------------------------- |
| [Next.js](https://nextjs.org) 16 (App Router) and React 19      | The two apps                           |
| TypeScript (strict mode)                                        | All code                               |
| [Tailwind CSS](https://tailwindcss.com) 3                       | Styling, through our shared preset     |
| [pnpm](https://pnpm.io) 12 and [Turborepo](https://turbo.build) | Packages and running tasks across them |
| [Vitest](https://vitest.dev) and Testing Library                | Unit tests                             |
| ESLint and Prettier                                             | Code quality and formatting            |
| [Zod](https://zod.dev)                                          | Reading API error responses            |

## Quick start

You need **Node.js 20 or newer** and **pnpm 12**.

```bash
# 1. Install pnpm if you do not have it
npm install -g pnpm@12.16.1

# 2. Get the code and install everything
git clone https://github.com/haaflah/waslu-frontend.git
cd waslu-frontend
pnpm install

# 3. Create the settings file for each app
cp .env.example apps/storefront/.env.local
cp .env.example apps/seller/.env.local

# 4. Start both apps
pnpm dev
```

Open:

- Storefront: http://localhost:3000
- Seller app: http://localhost:3001

Stop the apps with `Ctrl+C`.

## Project structure

```
waslu-frontend/
├── apps/
│   ├── storefront/        Buyer-facing store (port 3000)
│   └── seller/            Seller dashboard (port 3001)
├── packages/
│   ├── ui/                Shared components and design tokens (@waslu/ui)
│   ├── api-client/        Talks to the backend, with mock mode (@waslu/api-client)
│   └── config/            Shared TypeScript, ESLint and translation settings (@waslu/config)
├── docs/                  Guides: design tokens and translations
├── scripts/               Helper scripts (the hard-coded string check)
├── .github/               CI workflow, issue and pull request templates
└── .env.example           Settings to copy into each app
```

Inside each app, the pages are in `src/app/` and the translation files are in `src/i18n/`.

## Commands

Run these from the repository root.

| Command              | What it does                                            |
| -------------------- | ------------------------------------------------------- |
| `pnpm dev`           | Starts both apps with live reload                       |
| `pnpm build`         | Builds both apps for production                         |
| `pnpm lint`          | Checks code style and common mistakes                   |
| `pnpm typecheck`     | Checks TypeScript types                                 |
| `pnpm test`          | Runs all unit tests                                     |
| `pnpm check:strings` | Fails if there is text written directly in a component  |
| `pnpm format`        | Checks formatting with Prettier (does not change files) |
| `pnpm regen:api`     | Rebuilds API types from `contracts/openapi.yaml`        |

To fix formatting, run `pnpm prettier --write .`.

To run a command for one package only, use `--filter`:

```bash
pnpm --filter @waslu/ui test
pnpm --filter @waslu/seller dev
```

## Environment variables

Next.js reads `.env.local` from **each app folder**, not from the repository root. After you change a value, restart `pnpm dev`.

| Variable                   | Default                 | Meaning                                                        |
| -------------------------- | ----------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_API_MODE`     | `mock`                  | `mock` uses built-in fake data. `live` calls the real backend. |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | Backend address. Only used when the mode is `live`.            |

The names must start with `NEXT_PUBLIC_`. Without that prefix the browser cannot see the value and quietly stays in mock mode.

## Working with the code

### Showing text

Never write text inside a component. Put it in a JSON file and show it with `t`:

```tsx
import { t } from "@/i18n";

<h1>{t("seller.home.title")}</h1>;
```

Steps to add a string: add the key to the right JSON file, use `t("...")`, run `pnpm check:strings`. Full guide: [docs/i18n.md](docs/i18n.md).

### Using shared components

```tsx
import { Button, Card } from "@waslu/ui";
import { t } from "@/i18n";

<Card>
  <Button variant="primary">{t("seller.home.cta")}</Button>
</Card>;
```

All components, and the props each one takes, are listed in [packages/ui/README.md](packages/ui/README.md). Some components need a text label from you (for example `Sheet` needs `closeLabel`) so that screen readers get a translated name.

### Colors, spacing and sizes

Use the Tailwind classes from our preset (`bg-brand-600`, `text-neutral-900`, `rounded-md`, `xs:p-6`) instead of custom values. The full list, with contrast ratios, is in [docs/design-tokens.md](docs/design-tokens.md). The smallest screen we support is 360 px wide.

### Talking to the backend

```ts
import { createApiClient } from "@waslu/api-client";

const api = createApiClient();
const result = await api.get<{ status: string }>("/health");
```

- In `mock` mode the client answers from built-in fake data.
- In `live` mode it calls `NEXT_PUBLIC_API_BASE_URL`.
- Failed calls throw one consistent error shape with a safe `userMessage` you can show to the user.

More detail: [packages/api-client/README.md](packages/api-client/README.md).

## Testing and CI

Before you push, run:

```bash
pnpm lint && pnpm check:strings && pnpm typecheck && pnpm test && pnpm build
```

Every pull request runs the same checks on GitHub (`.github/workflows/ci.yml`):

| Job                      | What it does                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `verify`                 | Install, lint, string check, typecheck, tests, build                                              |
| `playwright-placeholder` | A placeholder until end-to-end tests are added                                                    |
| `lighthouse`             | Measures the storefront and uploads a report. It only reports for now and does not fail the build |

A pull request should only be merged when all checks are green.

## Contributing

1. Pick one issue and say so in its comments. Issues are named like `FE-W1-07` (frontend, week 1, item 7) and are released week by week.
2. Create a branch from `main`, for example `fe-w1-07-seller-shell`.
3. Keep the pull request to that one issue.
4. Run the checks above, then open a pull request and fill in the checklist.
5. Ask for one review.

Changes to `packages/ui` and `packages/api-client` go in their own small pull requests. Details are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Troubleshooting

| Problem                                                | Fix                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `pnpm install` complains about the pnpm version        | Run `npm install -g pnpm@12.16.1`                                                                            |
| "Port 3000 is already in use"                          | Stop the other program using it, or stop an old `pnpm dev`                                                   |
| The app keeps using fake data even though I set `live` | Check the variable starts with `NEXT_PUBLIC_`, that it is in `apps/<app>/.env.local`, and restart `pnpm dev` |
| A key like `seller.home.title` appears on screen       | That translation key is missing. Add it to the JSON file, or fix the spelling                                |
| `pnpm check:strings` fails                             | Move the text it points to into a JSON file and use `t("...")`                                               |
| `pnpm regen:api` says the contract is not found        | `contracts/openapi.yaml` does not exist yet. It comes from the backend (BE-W1-05)                            |
| Lint or type errors after pulling new code             | Run `pnpm install` again                                                                                     |

## Roadmap

Planned over five weeks, in the order the issues are released:

1. **Week 1, foundations:** project setup, design system, API client, seller app shell, sign-up and store setup.
2. **Week 2, core commerce:** product management, storefront browsing, cart, checkout and payment, and the Waslu homepage.
3. **Week 3, what makes Waslu different:** buy links (a product link that opens checkout directly), recording sales made outside the platform, store homepage templates.
4. **Week 4, integration and quality:** snap-to-list (create a product from a photo), live demo, accessibility and performance work.
5. **Week 5, launch:** fixes from pilot sellers, documentation, version 0.1.0.

## License

MIT. See [LICENSE](LICENSE).