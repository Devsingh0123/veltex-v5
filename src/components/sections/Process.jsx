import React, { useRef } from 'react';
import { useProcessAnimation } from '../../hooks/useScrollAnimations';
import { VBackgroundPattern } from './VShape';

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

  useProcessAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ffffff] text-[#0f172a] py-8 px-[6vw]  overflow-hidden py-14"
      id="process"
      aria-label="Our process"
    >
      <VBackgroundPattern color="#0f172a" opacity={0.02} />

      <div className="">
        <p className="process-label font-sans text-[1rem] font-bold tracking-[0.3em] uppercase text-[#666] py-4">(Our Process)</p>
        <h2 className="process-headline font-serif text-[clamp(2.8rem,4.5vw,5rem)] font-medium leading-[1.2] tracking-[-0.025em] max-w-[900px] mt-4">
          One strategy. <span className="italic font-normal text-[#0066cc]">Every</span> channel. <span className="italic font-normal text-[#0066cc]">No exceptions.</span>
        </h2>
        <p className="process-description font-sans text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.75] text-[#555] max-w-[600px] mt-10 font-light">
          Integrated Marketing Communication is how we work — not a service we upsell. From the first brief to the final campaign report, everything we do is built on one unified foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mt-20" role="list">
        {STEPS.map((step, index) => (
          <div
            key={step.num}
            className="process-step group flex flex-col gap-6 pt-10 border-t border-black/10 transition-colors duration-500 hover:border-[#0066cc]/30"
            role="listitem"
            aria-label={`Step ${step.num}: ${step.title}`}
          >
            <div className="process-number font-serif text-[4.5rem] font-bold leading-none text-black/10 tracking-tighter group-hover:text-[#0066cc]/20 transition-colors duration-500" aria-hidden="true">
              {step.num}
            </div>
            <div className="process-step-content flex flex-col gap-4">
              <h3 className="process-step-title font-serif text-[clamp(1.5rem,2.5vw,2.2rem)] font-medium leading-tight text-[#0f172a]">{step.title}</h3>
              <h4 className="process-step-heading font-sans text-sm font-bold tracking-widest uppercase text-[#0066cc] opacity-80">{step.heading}</h4>
              <p className="process-step-desc font-sans text-base leading-relaxed font-light text-[#555]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

