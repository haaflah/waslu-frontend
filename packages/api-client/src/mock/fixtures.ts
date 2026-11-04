import type { RequestMethod } from "../types";

export interface MockFixture {
  method: RequestMethod;
  path: string;
  status: number;
  body: unknown;
}

export const defaultFixtures: MockFixture[] = [
  { method: "GET", path: "/health", status: 200, body: { status: "ok" } },
  { method: "GET", path: "/unauthorized", status: 401, body: { message: "Unauthorized" } },
  { method: "GET", path: "/forbidden", status: 403, body: { message: "Forbidden" } },
  { method: "GET", path: "/not-found", status: 404, body: { message: "Not found" } },
  { method: "GET", path: "/rate-limit", status: 429, body: { message: "Too many requests" } },
  { method: "POST", path: "/validation", status: 422, body: { message: "Validation failed", errors: [{ message: "Invalid field" }] } }
];
