export const LEARNER_STATUSES = [
  "Law student",
  "Graduate",
  "Junior advocate",
  "Practising advocate",
  "Other",
] as const;

export type LearnerStatus = (typeof LEARNER_STATUSES)[number];

export type EnquiryInput = {
  name: string;
  mobile: string;
  email: string;
  status: string;
  city: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

/** Returns the 10-digit Indian mobile number, or null if the input is not valid. */
export function normalizeIndianMobile(raw: string): string | null {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.startsWith("0091")) digits = digits.slice(4);
  else if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = input.name.trim();
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 100) errors.name = "Name is too long.";

  if (!input.mobile.trim()) errors.mobile = "Please enter your mobile number.";
  else if (!normalizeIndianMobile(input.mobile))
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";

  const email = input.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "Enter a valid email address.";

  if (!(LEARNER_STATUSES as readonly string[]).includes(input.status))
    errors.status = "Please select your current status.";

  if (input.city.trim().length > 80) errors.city = "City name is too long.";

  if (!input.consent) errors.consent = "Please agree to be contacted about this enquiry.";

  return errors;
}
