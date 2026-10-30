"use client";

import { useRef, useState } from "react";
import { contact, registration, whatsappLink } from "@/lib/content";
import {
  LEARNER_STATUSES,
  normalizeIndianMobile,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/validation";
import { btnPrimary, btnSecondary, WhatsAppIcon } from "./ui";

const empty: EnquiryInput = { name: "", mobile: "", email: "", status: "", city: "", consent: false };
const ORDER: (keyof EnquiryInput)[] = ["name", "mobile", "email", "status", "city", "consent"];

const field =
  "mt-1.5 block min-h-12 w-full border border-ink/25 bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink/40 focus:border-vls aria-[invalid=true]:border-vls";

type Result = { kind: "idle" } | { kind: "handoff" };

/**
 * M1 behaviour: validates, then hands the enquiry to WhatsApp. No lead endpoint is
 * configured yet (docs/APPROVALS.md), so the form never claims the enquiry was saved.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const found = validateEnquiry(values);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    const lines = [
      "Hello VLS Law Academy, please send me details about the Constitutional Law & Practice Boot Camp.",
      `Name: ${values.name.trim()}`,
      `Mobile: ${normalizeIndianMobile(values.mobile)}`,
      `Email: ${values.email.trim()}`,
      `Status: ${values.status}`,
      values.city.trim() ? `City: ${values.city.trim()}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setResult({ kind: "handoff" });
    setSubmitting(false);
  };

  const err = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm font-medium text-vls">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof EnquiryInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Boot camp enquiry form">
      {errorCount > 0 && (
        <p role="alert" className="border-l-4 border-vls bg-vls/5 px-4 py-3 text-sm font-medium text-vls">
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and try again.
        </p>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-semibold">
          Full name <span className="text-vls" aria-hidden="true">*</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required value={values.name}
          onChange={(e) => set("name", e.target.value)} className={field} {...a11y("name")} />
        {err("name")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mobile" className="text-sm font-semibold">
            Mobile number <span className="text-vls" aria-hidden="true">*</span>
          </label>
          <input id="mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" required
            placeholder="98765 43210" value={values.mobile}
            onChange={(e) => set("mobile", e.target.value)} className={field} {...a11y("mobile")} />
          {err("mobile")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email <span className="text-vls" aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required
            value={values.email} onChange={(e) => set("email", e.target.value)} className={field} {...a11y("email")} />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="text-sm font-semibold">
            Current status <span className="text-vls" aria-hidden="true">*</span>
          </label>
          <select id="status" name="status" required value={values.status}
            onChange={(e) => set("status", e.target.value)} className={field} {...a11y("status")}>
            <option value="">Select one</option>
            {LEARNER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {err("status")}
        </div>
        <div>
          <label htmlFor="city" className="text-sm font-semibold">
            City <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="city" name="city" type="text" autoComplete="address-level2" value={values.city}
            onChange={(e) => set("city", e.target.value)} className={field} {...a11y("city")} />
          {err("city")}
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id="consent" name="consent" type="checkbox" checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-[#ae1015]" {...a11y("consent")} />
          <label htmlFor="consent" className="text-sm leading-relaxed text-ink/85">
            I agree to be contacted by VLS Law Academy about this enquiry, as described in the{" "}
            <a href={contact.privacy} target="_blank" rel="noopener noreferrer" className="font-semibold text-vls underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </label>
        </div>
        {err("consent")}
      </div>

      <button type="submit" disabled={submitting} className={`${btnPrimary} w-full disabled:opacity-60 sm:w-auto`}>
        {submitting ? "Please wait…" : registration.primaryCta}
      </button>

      <p className="text-sm text-muted">{registration.note}</p>

      <div role="status" aria-live="polite">
        {result.kind === "handoff" && (
          <p className="border-l-4 border-gold bg-gold/10 px-4 py-3 text-sm text-ink">
            We opened WhatsApp with your details. <strong>Your enquiry reaches us only once you send that
            message.</strong> If WhatsApp did not open, use the button below or call {contact.coursePhone}.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row">
        <a
          href={whatsappLink("Hello VLS Law Academy, I would like details about the Constitutional Law & Practice Boot Camp.")}
          target="_blank"
          rel="noopener noreferrer"
          className={btnSecondary}
        >
          <WhatsAppIcon /> {registration.secondaryCta}
        </a>
        <a href={contact.courseTel} className={btnSecondary}>
          Call {contact.coursePhone}
        </a>
      </div>
    </form>
  );
}
