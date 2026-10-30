import { programConfig } from "./content";
export { programConfig };

export type ProgramConfig = {
  name: string; pageName: string; sessionStatus: "announced" | "unannounced";
  registrationEndsAt: string | null; classStartAt: string | null; date: string | null; time: string | null; fee: number | null;
};

export function isRegistrationOpen(config: ProgramConfig = programConfig): boolean {
  if (config.sessionStatus !== "announced") return false;
  const deadline = config.registrationEndsAt || config.classStartAt;
  if (!deadline) return false;
  const date = new Date(deadline);
  return !Number.isNaN(date.getTime()) && Date.now() < date.getTime();
}

export const registrationOpen = isRegistrationOpen();
export const registrationCta = registrationOpen ? "Register / Reserve Your Seat" : "Join Waitlist";
