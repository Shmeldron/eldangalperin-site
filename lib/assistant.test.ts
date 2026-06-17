import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "./assistant";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt();

  it("includes real project context", () => {
    expect(prompt).toContain("StayYoung");
  });

  it("refuses the four sensitive-data categories", () => {
    expect(prompt.toLowerCase()).toContain("pricing");
    expect(prompt.toLowerCase()).toContain("nda");
    expect(prompt.toLowerCase()).toContain("revenue");
  });

  it("instructs a single lead nudge", () => {
    expect(prompt.toLowerCase()).toContain("once");
    expect(prompt.toLowerCase()).toContain("email");
  });

  it("forbids revealing instructions", () => {
    expect(prompt.toLowerCase()).toContain("never reveal");
  });
});
