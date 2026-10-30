import { hero } from "@/lib/content";
import { programConfig, registrationCta, registrationOpen } from "@/lib/program";
import { EnquiryForm } from "./EnquiryForm";
import { CountUpNumber } from "./CountUpNumber";
import { btnPrimary, btnSecondary, Container, Eyebrow } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink py-12 text-white sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="rise lg:col-span-6">
          <Eyebrow light>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]">
            Constitutional Law <span className="italic text-gold">&amp; Practice</span> Boot Camp
          </h1>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-gold sm:text-base">
            Constitutional remedies <span aria-hidden="true">·</span> Writ proceedings <span aria-hidden="true">·</span> Court practice
          </p>
          <p className="mt-4 font-serif text-2xl italic text-white sm:text-3xl">{hero.tagline}</p>

          {registrationOpen && (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-3">
              <HeroFact label="Class date" value={programConfig.date || "To be announced"} />
              <HeroFact label="Class time" value={programConfig.time || "To be announced"} />
              <HeroFact label="Registration fee" value={`₹${programConfig.fee}`} />
            </dl>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#hero-register" className={`${btnPrimary} w-full sm:w-auto`}>{registrationCta}</a>
            <a href="#syllabus" className={`${btnSecondary} w-full border-white/40 text-white hover:border-white hover:!bg-white hover:!text-ink sm:w-auto`}>{hero.secondaryCta}</a>
          </div>

          <div className="mt-9 max-w-2xl space-y-4 leading-relaxed text-white/75">
            {hero.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

        </div>

        <div id="hero-register" className="rise relative bg-white p-5 text-ink shadow-2xl sm:p-8 lg:col-span-6" style={{ animationDelay: "100ms" }}>
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vls to-gold" />
          <Eyebrow>{registrationOpen ? "Reserve your seat" : "Waitlist"}</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold">{registrationOpen ? "Register for the boot camp" : "Join the waitlist"}</h2>
          <div className="mt-6"><EnquiryForm /></div>
        </div>

        <dl className="grid grid-cols-3 divide-x divide-white/15 border-y border-white/15 lg:col-span-12">
          {hero.highlights.map((highlight) => (
            <div key={highlight.label} className="flex flex-col px-3 py-4 first:pl-0 sm:px-5">
              <dt className="order-2 text-xs leading-snug text-white/65 sm:text-sm">{highlight.label}</dt>
              <dd className="font-serif text-4xl font-semibold text-gold sm:text-5xl"><CountUpNumber value={highlight.value} /></dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs uppercase tracking-[0.12em] text-white/55">{label}</dt><dd className="mt-1 text-base font-semibold text-white">{value}</dd></div>;
}
