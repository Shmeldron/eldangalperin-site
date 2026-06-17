import { describe, expect, it } from "vitest";
import { checkLeadRateLimit } from "./limits";

describe("checkLeadRateLimit (in-memory)", () => {
  it("allows up to the default cap (3/min) then blocks", async () => {
    const ip = "test-ip-A";
    expect(await checkLeadRateLimit(ip)).toBe(true); // 1
    expect(await checkLeadRateLimit(ip)).toBe(true); // 2
    expect(await checkLeadRateLimit(ip)).toBe(true); // 3
    expect(await checkLeadRateLimit(ip)).toBe(false); // 4 — over cap
  });

  it("tracks ips independently", async () => {
    expect(await checkLeadRateLimit("test-ip-B")).toBe(true);
  });
});
