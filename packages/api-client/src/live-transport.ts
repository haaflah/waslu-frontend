import { normalizeApiError } from "./errors";
import type { ApiTransport, RequestMethod, RequestOptions } from "./types";

export function createLiveTransport(baseUrl: string, defaultHeaders: HeadersInit): ApiTransport {
  return {
    async request<T>(method: RequestMethod, path: string, options?: RequestOptions): Promise<T> {
      try {
        const init: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...defaultHeaders,
            ...(options?.headers ?? {})
          },
          body: options?.body ? JSON.stringify(options.body) : null,
          signal: options?.signal ?? null
        };

        const response = await fetch(`${baseUrl}${path}`, init);

        const payload = await response
          .json()
          .catch(() => undefined);

        if (!response.ok) {
          throw normalizeApiError({ status: response.status, payload });
        }

        return payload as T;
      } catch (error) {
        if (typeof error === "object" && error && "type" in error && "userMessage" in error) {
          throw error;
        }
        throw normalizeApiError({ cause: error });
      }
    }
  };
}
