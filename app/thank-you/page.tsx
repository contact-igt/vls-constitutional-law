"use client";

import { useEffect, useState } from "react";

type Registration = { name: string; email: string; payment_status: "waitlist" | "paid"; razorpay_payment_id: string };

export default function ThankYouPage() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  useEffect(() => {
    try { setRegistration(JSON.parse(sessionStorage.getItem("registration") || "null")); } catch { /* no local summary */ }
  }, []);
  const waitlist = registration?.payment_status === "waitlist";
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16 text-center">
      <section className="w-full border border-line bg-white p-8 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vls">VLS Law Academy</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-ink">{waitlist ? "You’re on the waitlist." : "Payment confirmed."}</h1>
        <p className="mt-5 leading-relaxed text-ink/75">{waitlist ? "We’ll contact you when the next boot camp schedule and registration details are announced." : "Your registration has been received. We’ll share the next steps by email."}</p>
        {registration?.razorpay_payment_id && <p className="mt-5 text-sm text-muted">Transaction ID: {registration.razorpay_payment_id}</p>}
        <a href="/" className="mt-8 inline-flex min-h-12 items-center bg-vls px-6 py-3 font-semibold text-white">Back to home</a>
      </section>
    </main>
  );
}
