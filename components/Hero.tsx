import { hero, photos } from "@/lib/content";
import { btnPrimary, btnSecondary, Container, Eyebrow, Photo } from "./ui";

export function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="rise lg:col-span-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg font-medium text-vls sm:text-xl">{hero.tagline}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#register" className={btnPrimary}>{hero.primaryCta}</a>
            <a href="#syllabus" className={btnSecondary}>{hero.secondaryCta}</a>
          </div>

          <div className="mt-9 max-w-xl space-y-4 text-base leading-relaxed text-ink/80">
            {hero.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-line border-y border-line">
            {hero.highlights.map((h) => (
              <div key={h.label} className="flex flex-col px-3 py-4 first:pl-0 sm:px-5">
                <dt className="order-2 text-xs leading-snug text-muted sm:text-sm">{h.label}</dt>
                <dd className="font-serif text-4xl font-semibold text-ink sm:text-5xl">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise lg:col-span-5" style={{ animationDelay: "80ms" }}>
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 hidden h-full w-full border border-gold lg:block" />
            <Photo
              src={photos.hero.src}
              alt={photos.hero.alt}
              label="VLS classroom photograph"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="relative aspect-[4/3] w-full lg:aspect-[4/5]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
