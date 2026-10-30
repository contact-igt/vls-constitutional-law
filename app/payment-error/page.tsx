"use client";

import Link from "next/link";

export default function PaymentErrorPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16 text-center">
      <section className="w-full border border-line bg-white p-8 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vls">VLS Law Academy</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-ink">We need to confirm your payment.</h1>
        <p className="mt-5 leading-relaxed text-ink/75">Your payment could not be recorded. Please contact VLS Law Academy before trying again.</p>
        <Link href="/#register" className="mt-8 inline-flex min-h-12 items-center bg-vls px-6 py-3 font-semibold text-white">Back to registration</Link>
      </section>
    </main>
  );
}
