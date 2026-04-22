import React, { useRef } from 'react';
import { useProcessAnimation } from '../../hooks/useScrollAnimations';
import { VBackgroundPattern } from './VShape';
import processHomePage from '../../assets/processHomePage.jpeg';

const STEPS = [
  {
    num: "01",
    title: "DISCOVER",
    heading: "Audience & market intelligence",
    desc: "We map your audience's journey, motivations, and media habits — not to confirm assumptions, but to challenge them.",
  },
  {
    num: "02",
    title: "DEFINE",
    heading: "Objectives & message hierarchy",
    desc: "We set clear, measurable objectives and build the message architecture your campaign will live and die by.",
  },
  {
    num: "03",
    title: "DESIGN",
    heading: "Creative & channel strategy",
    desc: "Channel mix, creative concept, and sequencing — engineered to build momentum, not scatter attention.",
  },
  {
    num: "04",
    title: "DEPLOY",
    heading: "Synchronised execution",
    desc: "Assets, timing, and messaging go live in sync — across every relevant platform, without contradiction.",
  },
  {
    num: "05",
    title: "OPTIMISE",
    heading: "Performance & iteration",
    desc: "We track cross-channel results against shared goals and continuously refine spend, creative, and messaging.",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useProcessAnimation({ sectionRef, imageRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ffffff] px-[6vw] py-14 text-[#0f172a] "
      id="process"
      aria-label="Our process"
    >
      <VBackgroundPattern color="#0f172a" opacity={0.02} />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <p className="process-label py-4 font-sans text-[1rem] font-bold uppercase tracking-[0.3em] text-[#666]">(Our Process)</p>
        <h2 className="process-headline mt-4 w-full font-serif text-[clamp(2.3rem,4.7vw,5.1rem)] font-medium leading-[1.08] tracking-[-0.03em]">
          One strategy. <span className="font-normal italic text-[#0066cc]">Every</span> channel. <span className="font-normal italic text-[#0066cc]">No exceptions.</span>
        </h2>
        <p className="process-description mt-8 w-full font-sans text-[clamp(1rem,1.2vw,1.125rem)] font-light leading-[1.8] text-[#555]">
          Integrated Marketing Communication is how we work, not a service we upsell. From the first brief to the final campaign
          report, everything we do is built on one unified foundation.
        </p>

        {/* Left takes remaining width, right visual stays fixed and premium. */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
          <div className="process-steps-column grid grid-cols-1 gap-5 md:grid-cols-2" role="list">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="process-step group relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] border border-black/10 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0066cc]/30 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                role="listitem"
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0066cc]/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="process-number font-serif text-[clamp(2.1rem,3.5vw,3.2rem)] font-bold leading-none tracking-[-0.06em] text-black/10 transition-colors duration-500 group-hover:text-[#0066cc]/25" aria-hidden="true">
                  {step.num}
                </div>
                <div className="process-step-content flex max-w-none flex-1 flex-col gap-3 pt-3">
                  <h3 className="process-step-title font-serif text-[clamp(1.15rem,1.4vw,1.6rem)] font-semibold leading-[1.08] text-[#0b1220]">{step.title}</h3>
                  <h4 className="process-step-heading font-sans text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#0057b8]">{step.heading}</h4>
                  <p className="process-step-desc font-sans text-[0.95rem] leading-[1.68] font-normal text-[#1f2937]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right panel uses a fixed portrait presentation and clear motion target. */}
          <div className="process-visual-wrap flex items-start justify-end xl:sticky xl:top-24">
            <div className="process-image-shell relative w-full max-w-[360px]">
             
              <img
                ref={imageRef}
                src={processHomePage}
                alt="Veltex process visual"
                loading="lazy"
                className="process-image block h-auto w-full rounded-[20px] will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

