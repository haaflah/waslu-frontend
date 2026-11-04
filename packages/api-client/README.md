# @waslu/api-client

Typed API package with mock/live mode.

## Regenerate from OpenAPI
```bash
pnpm regen:api
```

Expected contract location: `contracts/openapi.yaml`.
If missing, generation is intentionally blocked pending BE-W1-05.

## Runtime mode
- `API_MODE=mock`
- `API_MODE=live`

The mode switch is env-only; feature code does not change.
