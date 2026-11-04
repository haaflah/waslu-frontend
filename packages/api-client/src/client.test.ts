import { createApiClient } from "./client";
import { normalizeApiError } from "./errors";

describe("api client", () => {
  it("returns mock response in mock mode", async () => {
    process.env.API_MODE = "mock";
    const client = createApiClient();
    await expect(client.get<{ status: string }>("/health")).resolves.toEqual({ status: "ok" });
  });

  it("normalizes 401 responses", async () => {
    process.env.API_MODE = "mock";
    const onUnauthorized = vi.fn();
    const client = createApiClient({ getAuthHeaders: () => ({}), onUnauthorized });

    await expect(client.get("/unauthorized")).rejects.toMatchObject({ type: "unauthorized", status: 401 });
    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });

  it("normalizes network errors", () => {
    const error = normalizeApiError({ cause: new TypeError("fetch failed") });
    expect(error.type).toBe("network");
  });
});
