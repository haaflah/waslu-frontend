# @waslu/api-client

Small API package with a mock mode and a live mode.

## Mock or live

Set this in `apps/<app>/.env.local` (see `.env.example` in the repo root):

- `NEXT_PUBLIC_API_MODE=mock` uses built-in fake data (default)
- `NEXT_PUBLIC_API_MODE=live` calls the backend at `NEXT_PUBLIC_API_BASE_URL`

The name must start with `NEXT_PUBLIC_`. Without it, the browser cannot see the value and always uses mock mode.

## Regenerate types from the OpenAPI contract

```bash
pnpm regen:api
```

This needs `contracts/openapi.yaml`. If the file is missing, the command stops with a message. The file comes from BE-W1-05.
