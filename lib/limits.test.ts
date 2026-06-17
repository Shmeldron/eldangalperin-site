import { describe, expect, it } from "vitest";
import { checkDailyRateLimit, checkLeadRateLimit } from "./limits";

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

describe("checkDailyRateLimit (in-memory)", () => {
  it("allows up to the default daily cap (30) then blocks", async () => {
    const ip = "test-ip-day";
    for (let i = 0; i < 30; i++) {
      expect(await checkDailyRateLimit(ip)).toBe(true);
    }
    expect(await checkDailyRateLimit(ip)).toBe(false); // 31st — over daily cap
  });
});
