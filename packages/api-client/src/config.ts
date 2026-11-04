import type { ApiClientConfig, ApiMode } from "./types";

export function resolveApiConfig(env: Record<string, string | undefined> = process.env): ApiClientConfig {
  const mode = (env.API_MODE ?? "mock") as ApiMode;

  return {
    mode,
    liveBaseUrl: env.API_BASE_URL_LIVE ?? "http://localhost:8000",
    mockBaseUrl: env.API_BASE_URL_MOCK ?? "http://localhost:3000"
  };
}
