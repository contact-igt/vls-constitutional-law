import { takeaways } from "@/lib/content";
import { Container, Eyebrow, Photo } from "./ui";

export function Takeaways() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>What you will take away</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {takeaways.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">{takeaways.support}</p>

          {/* Classroom photograph */}
          <div className="mt-8">
            <Photo
              src="/assets/vls/classroom/students-notes.jpg"
              alt="VLS bootcamp participants taking notes during a constitutional law session"
              className="aspect-[16/9] w-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
              label="VLS Constitutional Law Bootcamp — participants taking notes"
            />
          </div>
        </div>

        <ul className="space-y-5 lg:col-span-7">
          {takeaways.items.map((t) => (
            <li key={t} className="flex gap-4 border-b border-line pb-5 last:border-b-0">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-vls" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m4 10.5 4 4 8-9" strokeLinecap="square" />
              </svg>
              <span className="text-lg leading-snug">{t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
