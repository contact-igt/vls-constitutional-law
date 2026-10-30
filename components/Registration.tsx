import { contact, registration } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";
import { Container, Eyebrow } from "./ui";

export function Registration() {
  return (
    <section id="register" className="border-b border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>Enquire</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{registration.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{registration.body}</p>
          <p className="mt-8 text-sm text-muted">Prefer to talk?</p>
          <p className="mt-1">
            <a href={contact.courseTel} className="font-semibold text-vls underline underline-offset-2">{contact.coursePhone}</a>
            {" · "}
            <a href={contact.academyTel} className="font-semibold text-vls underline underline-offset-2">{contact.academyPhone}</a>
          </p>
        </div>

        <div className="border border-line bg-white p-5 sm:p-8 lg:col-span-7">
          <EnquiryForm />
        </div>
      </Container>
    </section>
  );
}
