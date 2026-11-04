import { resolveApiConfig } from "./config";
import { normalizeApiError } from "./errors";
import { createLiveTransport } from "./live-transport";
import { defaultFixtures } from "./mock/fixtures";
import { createMockTransport } from "./mock/transport";
import type { ApiTransport, AuthProvider, RequestMethod, RequestOptions } from "./types";

export function createApiClient(authProvider?: AuthProvider, transport?: ApiTransport) {
  const config = resolveApiConfig();

  async function request<T>(method: RequestMethod, path: string, options?: RequestOptions): Promise<T> {
    const authHeaders = authProvider ? await authProvider.getAuthHeaders() : {};
    const selectedTransport =
      transport ??
      (config.mode === "mock"
        ? createMockTransport(defaultFixtures)
        : createLiveTransport(config.liveBaseUrl, authHeaders));

    try {
      return await selectedTransport.request<T>(method, path, options);
    } catch (error) {
      const normalized =
        typeof error === "object" && error && "type" in error
          ? error
          : normalizeApiError({ cause: error });

      if (
        authProvider?.onUnauthorized &&
        typeof normalized === "object" &&
        normalized &&
        "type" in normalized &&
        normalized.type === "unauthorized"
      ) {
        authProvider.onUnauthorized();
      }

      throw normalized;
    }
  }

  return {
    get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
    post: <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options),
    put: <T>(path: string, options?: RequestOptions) => request<T>("PUT", path, options),
    patch: <T>(path: string, options?: RequestOptions) => request<T>("PATCH", path, options),
    del: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options)
  };
}
