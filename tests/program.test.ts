import { describe, expect, it } from "vitest";
import { isRegistrationOpen } from "../lib/program";

const config = { name: "Test", pageName: "test", date: "", time: "", fee: 1, sessionStatus: "announced" as const, classStartAt: null };

describe("registration window", () => {
  it("opens only for announced programmes with a valid future deadline", () => {
    expect(isRegistrationOpen({ ...config, registrationEndsAt: "2099-01-01T00:00:00+05:30" })).toBe(true);
    expect(isRegistrationOpen({ ...config, registrationEndsAt: "2000-01-01T00:00:00+05:30" })).toBe(false);
    expect(isRegistrationOpen({ ...config, registrationEndsAt: "not-a-date" })).toBe(false);
    expect(isRegistrationOpen({ ...config, sessionStatus: "unannounced", registrationEndsAt: "2099-01-01T00:00:00+05:30" })).toBe(false);
  });
});
