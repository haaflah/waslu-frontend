import { z } from "zod";
import type { NormalizedApiError } from "./types";

const validationSchema = z.object({
  errors: z.array(z.object({ message: z.string() })).optional(),
  message: z.string().optional()
});

const defaultMessages: Record<NormalizedApiError["type"], string> = {
  network: "Unable to reach the server. Please check your connection and try again.",
  validation: "Some data is invalid. Please review your input.",
  unauthorized: "Your session has expired. Please sign in again.",
  forbidden: "You do not have permission to perform this action.",
  not_found: "The requested resource could not be found.",
  rate_limited: "Too many requests. Please wait and try again.",
  server: "Something went wrong on our side. Please try again shortly.",
  http: "The request failed. Please try again.",
  invalid_response: "We received an unexpected response. Please try again.",
  unknown: "An unexpected error occurred. Please try again."
};

export function normalizeApiError(input: {
  status?: number;
  payload?: unknown;
  cause?: unknown;
}): NormalizedApiError {
  const { status, payload, cause } = input;

  if (!status && cause instanceof TypeError) {
    return { type: "network", userMessage: defaultMessages.network, details: cause.message };
  }

  if (status === 401) {
    return { type: "unauthorized", status, userMessage: defaultMessages.unauthorized, details: payload };
  }
  if (status === 403) {
    return { type: "forbidden", status, userMessage: defaultMessages.forbidden, details: payload };
  }
  if (status === 404) {
    return { type: "not_found", status, userMessage: defaultMessages.not_found, details: payload };
  }
  if (status === 429) {
    return { type: "rate_limited", status, userMessage: defaultMessages.rate_limited, details: payload };
  }
  if (status && status >= 500) {
    return { type: "server", status, userMessage: defaultMessages.server, details: payload };
  }

  if (status === 400 || status === 422) {
    const parsed = validationSchema.safeParse(payload);
    return {
      type: "validation",
      status,
      userMessage: parsed.success && parsed.data.message ? parsed.data.message : defaultMessages.validation,
      details: payload
    };
  }

  if (status) {
    return { type: "http", status, userMessage: defaultMessages.http, details: payload };
  }

  return { type: "unknown", userMessage: defaultMessages.unknown, details: payload ?? cause };
}
