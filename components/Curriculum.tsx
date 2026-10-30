import { curriculum } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

export function Curriculum() {
  return (
    <section id="syllabus" className="border-b border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Eyebrow>Syllabus</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              {curriculum.heading}
            </h2>
          </div>
        </div>

        <ol className="divide-y divide-line border-y border-line lg:col-span-8">
          {curriculum.units.map((u) => (
            <li key={u.n} className="grid gap-3 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
              <span className="font-serif text-3xl font-semibold text-vls sm:text-4xl" aria-hidden="true">
                {u.n}
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                  <span className="sr-only">Unit {Number(u.n)}: </span>
                  {u.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/75">{u.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
