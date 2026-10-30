import { problem } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

export function Problem() {
  return (
    <section className="border-b border-line bg-white text-ink">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>The gap</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem]">
            {problem.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">{problem.intro}</p>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-line border-y border-line">
            {problem.questions.map((q) => (
              <li key={q} className="py-5 font-serif text-xl leading-snug sm:text-2xl">
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-7 leading-relaxed text-ink/75">{problem.outro}</p>
          <p className="mt-6 border-l-2 border-vls pl-4 font-serif text-lg italic text-vls sm:text-xl">
            {problem.closing}
          </p>
        </div>
      </Container>
    </section>
  );
}
