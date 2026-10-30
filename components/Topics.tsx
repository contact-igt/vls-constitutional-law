import { topics } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

const [writs, appeals, special] = topics.clusters;

export function Topics() {
  return (
    <section id="topics" className="border-b border-line bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Eyebrow>13 key topics</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {topics.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">{topics.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* A: Writs & original remedies — red rule, open list */}
          <div className="border-t-4 border-vls pt-5 lg:col-span-5">
            <h3 className="font-serif text-2xl font-semibold">{writs.title}</h3>
            <ul className="mt-5 divide-y divide-line">
              {writs.items.map((t) => (
                <li key={t.name} className="py-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* B: Appeals & corrective remedies — charcoal panel */}
          <div className="on-dark bg-ink p-6 text-ivory sm:p-8 lg:col-span-7">
            <h3 className="font-serif text-2xl font-semibold text-gold">{appeals.title}</h3>
            <ul className="mt-5 divide-y divide-ivory/15">
              {appeals.items.map((t) => (
                <li key={t.name} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm leading-relaxed text-ivory/70">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* C: Special proceedings — gold rule, four-up row */}
          <div className="border-t-4 border-gold pt-5 lg:col-span-12">
            <h3 className="font-serif text-2xl font-semibold">{special.title}</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
              {special.items.map((t) => (
                <li key={t.name} className="border-t border-line py-4 lg:border-l lg:border-t-0 lg:py-0 lg:pl-5 first:lg:border-l-0 first:lg:pl-0">
                  <p className="font-semibold">{t.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
