import React, { useRef } from 'react';
import { useProcessAnimation } from '../../hooks/useScrollAnimations';
import { VBackgroundPattern } from './VShape';

const STEPS = [
  {
    num: "01",
    title: "Discover & Define",
    desc: "We begin by immersing ourselves in your world understanding your audience, your competition, and the opportunity ahead. Every assumption is challenged until we find the true brief beneath the brief.",
  },
  {
    num: "02",
    title: "Strategy & Vision",
    desc: "With clarity comes direction. We establish the strategic foundations that will guide every creative decision from positioning and narrative to the visual language that sets you apart.",
  },
  {
    num: "03",
    title: "Design & Motion",
    desc: "Here, ideas take form. We craft environments, interfaces, and identities that don't just look exceptional they move, engage, and perform. Every detail is deliberate.",
  },
  {
    num: "04",
    title: "Build & Refine",
    desc: "Precision execution across every touchpoint. We build at the intersection of craft and technology, iterating until the experience is seamless and the quality is undeniable.",
  },
  {
    num: "05",
    title: "Launch & Evolve",
    desc: "A launch is a beginning, not an end. We stay involved measuring, learning, and evolving your experience so it continues to outperform as markets shift.",
  },
];

export default function Process() {
  const sectionRef = useRef(null);

  useProcessAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f0e8] text-[#1a1a1a] py-36 px-[6vw] pb-28 overflow-hidden"
      id="process"
      aria-label="Our process"
    >
      <VBackgroundPattern color="#1a1a1a" opacity={0.02} />

      <div className="">
        <p className="process-label font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-[#666] mb-20">(Our Process)</p>
        <h2 className="process-headline font-serif text-[clamp(2.8rem,4.5vw,5rem)] font-medium leading-[1.2] tracking-[-0.025em] max-w-[900px]">
          How we turn ambition into
          <br />
          <em className="italic font-normal text-[#d44b1e]">lasting impact.</em>
        </h2>
        <p className="process-description font-sans text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.75] text-[#555] max-w-[600px] mt-10 font-light">
          Our approach is rooted in collaboration and craftsmanship. We work closely with our clients to understand their unique challenges and opportunities, then apply our expertise to create solutions that not only meet their needs but exceed their expectations. Every project is an opportunity to push boundaries and deliver exceptional results.
        </p>
      </div>

      <div className="flex flex-col gap-0" role="list">
        {STEPS.map((step, index) => (
          <div
            key={step.num}
            className="process-step grid grid-cols-[80px_1fr] gap-12 items-start py-16 border-t border-black/12 sm:grid-cols-1 sm:gap-6 last:border-b last:border-black/12"
            role="listitem"
            aria-label={`Step ${step.num}: ${step.title}`}
          >
            <div className="process-number font-serif text-[4.5rem] font-bold leading-none text-black/12 tracking-tighter" aria-hidden="true">{step.num}</div>
            <div className="process-step-content">
              <h3 className="process-step-title font-serif text-[clamp(1.5rem,2.5vw,2.5rem)] font-medium leading-tight mb-4 text-[#1a1a1a]">{step.title}</h3>
              <p className="process-step-desc font-sans text-base leading-[1.75] font-light text-[#555] max-w-[600px]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

