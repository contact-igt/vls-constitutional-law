"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container, Eyebrow } from "./ui";

const testimonials = [
  { image: "/assets/home/testimonialimg1.jpg", video: "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4" },
  { image: "/assets/home/testimonialimg2.png", video: "https://res.cloudinary.com/dd3olj1ax/video/upload/v1762343697/vls_testimonal4_fmdamk.mp4" },
  { image: "/assets/home/testimonialimg3.png", video: "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4" },
] as const;

export function Testimonials() {
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setVideo(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <section id="testimonials" className="border-b border-line bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>Learner experiences</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Hear from VLS Law Academy learners.</h2>
          <p className="mt-4 leading-relaxed text-ink/75">Watch learners share their experience of studying with VLS Law Academy.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <button key={testimonial.video} type="button" onClick={() => setVideo(testimonial.video)} className="group relative aspect-[4/5] overflow-hidden bg-ink text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-gold">
              <Image src={testimonial.image} alt={`VLS learner video testimonial ${index + 1}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
              <span aria-hidden="true" className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/55" />
              <span className="absolute left-5 top-5 text-sm font-semibold tracking-wide text-white">Student story</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-18 w-18 items-center justify-center rounded-full bg-vls pl-1 text-white shadow-lg transition-transform group-hover:scale-110">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 fill-current"><path d="m8 5 11 7-11 7V5Z" /></svg>
                </span>
              </span>
              <span className="sr-only">Play learner testimonial {index + 1}</span>
            </button>
          ))}
        </div>
      </Container>

      {video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label="Learner testimonial video">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close video" onClick={() => setVideo(null)} />
          <div className="relative z-10 w-full max-w-4xl bg-ink p-2 shadow-2xl">
            <button type="button" onClick={() => setVideo(null)} className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink" aria-label="Close video">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
            <video className="max-h-[80vh] w-full" controls autoPlay>
              <source src={video} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
