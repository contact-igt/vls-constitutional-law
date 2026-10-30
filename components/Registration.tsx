import { contact, registration } from "@/lib/content";
import { programConfig, registrationOpen } from "@/lib/program";
import { EnquiryForm } from "./EnquiryForm";
import { Container, Eyebrow } from "./ui";

export function Registration() {
  return (
    <section id="register" className="border-b border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>{registrationOpen ? "Register" : "Waitlist"}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{registration.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{registration.body}</p>
          <p className="mt-8 text-sm text-muted">Prefer to talk?</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3">
            <a href={contact.courseTel} className="inline-block py-2 font-semibold text-vls underline underline-offset-2">{contact.coursePhone}</a>
            <a href={contact.academyTel} className="inline-block py-2 font-semibold text-vls underline underline-offset-2">{contact.academyPhone}</a>
          </p>
        </div>

        <div className="border border-line bg-white p-5 sm:p-8 lg:col-span-7">
          {registrationOpen && (
            <div className="mb-6 grid gap-3 border-b border-line pb-6 text-sm sm:grid-cols-3">
              <p><span className="block text-xs uppercase tracking-[0.12em] text-muted">Date</span><strong>{programConfig.date}</strong></p>
              <p><span className="block text-xs uppercase tracking-[0.12em] text-muted">Time</span><strong>{programConfig.time}</strong></p>
              <p><span className="block text-xs uppercase tracking-[0.12em] text-muted">Fee</span><strong>₹{programConfig.fee}</strong></p>
            </div>
          )}
          <EnquiryForm />
        </div>
      </Container>
    </section>
  );
}
