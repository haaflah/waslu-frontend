import type { ApiClientConfig } from "./types";

// Next.js only sends variables that start with NEXT_PUBLIC_ to the browser,
// and only when they are written out in full like below.
// Do not replace these lines with something like env[name].
export function resolveApiConfig(): ApiClientConfig {
  const mode = process.env.NEXT_PUBLIC_API_MODE === "live" ? "live" : "mock";
  const liveBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

  return { mode, liveBaseUrl };
}
