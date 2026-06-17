import { describe, expect, it } from "vitest";
import { validateLead, MAX_NOTE_CHARS } from "./leads";

describe("validateLead", () => {
  it("accepts a valid email and trims the note", () => {
    const r = validateLead({ email: "  jane@acme.io ", note: "  AI feature  " });
    expect(r).toEqual({ ok: true, email: "jane@acme.io", note: "AI feature" });
  });

  it("accepts a valid email with no note", () => {
    const r = validateLead({ email: "jane@acme.io" });
    expect(r.ok && r.note).toBe("");
  });

  it("rejects a missing or non-string email", () => {
    expect(validateLead({}).ok).toBe(false);
    expect(validateLead({ email: 42 }).ok).toBe(false);
  });

  it("rejects a malformed email", () => {
    expect(validateLead({ email: "not-an-email" }).ok).toBe(false);
    expect(validateLead({ email: "a@b" }).ok).toBe(false);
  });

  it("rejects a non-object payload", () => {
    expect(validateLead(null).ok).toBe(false);
    expect(validateLead("nope").ok).toBe(false);
  });

  it("clamps an over-long note", () => {
    const r = validateLead({ email: "jane@acme.io", note: "x".repeat(MAX_NOTE_CHARS + 50) });
    expect(r.ok && r.note.length).toBe(MAX_NOTE_CHARS);
  });
});
