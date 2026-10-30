import { audience, environment, photos, whyVls } from "@/lib/content";
import { Container, Eyebrow, Photo } from "./ui";

export function Audience() {
  return (
    <section id="audience" className="border-b border-line bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Eyebrow>Audience</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">{audience.heading}</h2>
        <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {audience.items.map((a) => (
            <li key={a.title} className="border-b border-line py-6 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <h3 className="font-serif text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{a.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function WhyVls() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="flex flex-col lg:col-span-6">
          <Eyebrow>Why VLS Law Academy</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{whyVls.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{whyVls.intro}</p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {whyVls.points.map((p) => (
              <div key={p.title} className="py-5">
                <dt className="font-semibold">{p.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/75">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <h3 className="font-serif text-2xl font-semibold">{environment.heading}</h3>
          <p className="mt-3 leading-relaxed text-ink/75">{environment.body}</p>
          <div className="mt-6 grid min-h-72 flex-1 grid-cols-2 gap-4">
            <Photo
              src={photos.learners.src}
              alt={photos.learners.alt}
              label="VLS learners in session"
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="h-full"
            />
            <Photo
              src={photos.academy.src}
              alt={photos.academy.alt}
              label="VLS academy interior"
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
