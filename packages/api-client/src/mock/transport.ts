import { normalizeApiError } from "../errors";
import type { MockFixture } from "./fixtures";
import type { ApiTransport, RequestMethod, RequestOptions } from "../types";

export function createMockTransport(fixtures: MockFixture[]): ApiTransport {
  return {
    async request<T>(method: RequestMethod, path: string, options?: RequestOptions): Promise<T> {
      void options;
      const fixture = fixtures.find((item) => item.method === method && item.path === path);

      if (!fixture) {
        throw normalizeApiError({ status: 404, payload: { message: "Fixture not found" } });
      }

      if (fixture.status >= 400) {
        throw normalizeApiError({ status: fixture.status, payload: fixture.body });
      }

      return fixture.body as T;
    }
  };
}
