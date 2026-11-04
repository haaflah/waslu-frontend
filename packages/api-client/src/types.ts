export type ApiMode = "mock" | "live";

export interface ApiClientConfig {
  mode: ApiMode;
  liveBaseUrl: string;
  mockBaseUrl: string;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
}

export interface AuthProvider {
  getAuthHeaders: () => Promise<Record<string, string>> | Record<string, string>;
  onUnauthorized?: () => void;
}

export interface NormalizedApiError {
  type:
    | "network"
    | "validation"
    | "unauthorized"
    | "forbidden"
    | "not_found"
    | "rate_limited"
    | "server"
    | "http"
    | "invalid_response"
    | "unknown";
  status?: number;
  userMessage: string;
  details?: unknown;
}

export interface ApiTransport {
  request: <T>(method: RequestMethod, path: string, options?: RequestOptions) => Promise<T>;
}
