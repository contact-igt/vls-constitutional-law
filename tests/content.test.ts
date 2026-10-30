import { describe, expect, it } from "vitest";
import * as content from "../lib/content";
import { normalizeIndianMobile, validateEnquiry } from "../lib/validation";

const POSTER_TOPICS = [
  "Writ Petitions & Writ Appeals",
  "Public Interest Litigations (PILs)",
  "Special Leave Petitions (SLPs)",
  "Constitutional Appeals",
  "Original Petitions",
  "Review Petitions",
  "Curative Petitions",
  "Transfer Petitions",
  "Contempt Petitions",
  "Election Petitions",
  "Advisory Reference",
  "Supervisory Petitions",
  "Certificate Petitions",
];

describe("content", () => {
  it("has all 13 poster topics exactly once", () => {
    const names = content.topics.clusters.flatMap((c) => c.items.map((i) => i.name));
    expect(names).toHaveLength(13);
    expect([...names].sort()).toEqual([...POSTER_TOPICS].sort());
  });

  it("has 6 syllabus units and keeps the Madras High Court Writ Rules, 2021 visible", () => {
    expect(content.curriculum.units).toHaveLength(6);
    expect(content.curriculum.units[1].body).toContain("Madras High Court Writ Rules, 2021");
  });

  it("hero highlights match the actual counts", () => {
    const v = Object.fromEntries(content.hero.highlights.map((h) => [h.label, h.value]));
    expect(v["Key topics"]).toBe("13");
    expect(v["Syllabus units"]).toBe("6");
  });

  it("contains no unapproved course details", () => {
    const text = JSON.stringify(content);
    expect(text).not.toMatch(/September|Sivakumar|limited seats|early bird|discount/i);
    expect(text).not.toMatch(/courtroom-ready|court-ready/i);
  });

  it("gives every photo slot descriptive alt text", () => {
    for (const p of Object.values(content.photos)) expect(p.alt.length).toBeGreaterThan(20);
  });
});

describe("validation", () => {
  it("normalizes Indian mobiles", () => {
    expect(normalizeIndianMobile("98765 43210")).toBe("9876543210");
    expect(normalizeIndianMobile("+91 98765-43210")).toBe("9876543210");
    expect(normalizeIndianMobile("09876543210")).toBe("9876543210");
    expect(normalizeIndianMobile("5876543210")).toBeNull();
    expect(normalizeIndianMobile("98765")).toBeNull();
    expect(normalizeIndianMobile("abcdefghij")).toBeNull();
  });

  const ok = { name: "Asha K", mobile: "9876543210", email: "a@b.in", consent: true };
  it("accepts a valid enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("rejects missing consent and bad email", () => {
    const e = validateEnquiry({ ...ok, consent: false, email: "nope" });
    expect(Object.keys(e).sort()).toEqual(["consent", "email"]);
  });
  it("rejects empty required fields", () => {
    const e = validateEnquiry({ name: "", mobile: "", email: "", consent: false });
    expect(Object.keys(e).sort()).toEqual(["consent", "email", "mobile", "name"]);
  });
});
