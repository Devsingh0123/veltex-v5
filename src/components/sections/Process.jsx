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
  {
    num: "06",
    title: "SCALE",
    heading: "Growth & amplification",
    desc: "We take validated winning formulas and scale them across new markets and segments to multiply your brand's impact.",
  }
];

export default function Process() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useProcessAnimation({ sectionRef, imageRef });

  const leftSteps = STEPS.slice(0, 3);
  const rightSteps = STEPS.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ffffff] px-[4vw] py-8 sm:px-[5vw] sm:py-10 md:px-[6vw] md:py-12 lg:px-[6vw] lg:py-14 text-[#0f172a] "
      id="process"
      aria-label="Our process"
    >
      <VBackgroundPattern color="#0f172a" opacity={0.02} />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <p className="process-label py-2 sm:py-4 font-sans text-[0.9rem] sm:text-[1rem] font-bold uppercase tracking-[0.3em] text-[#666] text-center sm:text-left">(Our Process)</p>
        <h2 className="process-headline mt-2 sm:mt-4 w-full font-serif text-[clamp(1.8rem,4.7vw,5.1rem)] font-medium leading-[1.08] tracking-[-0.03em] text-center sm:text-left">
          One strategy. <span className="font-normal italic text-[#0066cc]">Every</span> channel. <span className="font-normal italic text-[#0066cc]">No exceptions.</span>
        </h2>
        <p className="process-description mt-4 sm:mt-8 w-full font-sans text-[clamp(0.9rem,1.2vw,1.125rem)] font-light leading-[1.8] text-[#555] text-center sm:text-left max-w-none sm:max-w-[90%] lg:max-w-none">
          Integrated Marketing Communication is how we work, not a service we upsell. From the first brief to the final campaign
          report, everything we do is built on one unified foundation.
        </p>

        {/* Desktop: 3 Columns (Left Steps, Image, Right Steps). Mobile/Tablet: Stacked */}
        <div className="mt-12 sm:mt-16 lg:mt-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">

            {/* Left Steps Column */}
            <div className="process-steps-column flex-1 w-full lg:w-auto">
              <div className="flex flex-col gap-4 sm:gap-5 h-full justify-between">
                {leftSteps.map((step) => (
                  <StepCard key={step.num} step={step} />
                ))}
              </div>
            </div>

            {/* Center Image Section with Fresh Animation */}
            <div className="process-visual-wrap flex items-center justify-center flex-shrink-0 w-full lg:w-[400px] order-first lg:order-none mb-8 lg:mb-0">
              <div className="process-image-shell relative w-full max-w-[320px] md:max-w-[400px] overflow-hidden rounded-[24px] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                {/* Clean hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10" />

                <img
                  ref={imageRef}
                  src={processHomePage}
                  alt="Veltex process visual"
                  loading="eager"
                  className="process-image block h-auto w-full object-cover rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  style={{
                    animation: 'gentleFloat 2s ease-in-out infinite'
                  }}
                />

                {/* CSS definition for float */}
                <style>{`
                  @keyframes gentleFloat {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0px); }
                  }
                `}</style>
              </div>
            </div>

            {/* Right Steps Column */}
            <div className="process-steps-column flex-1 w-full lg:w-auto">
              <div className="flex flex-col gap-4 sm:gap-5 h-full justify-between">
                {rightSteps.map((step) => (
                  <StepCard key={step.num} step={step} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }) {
  return (
    <div
      className="process-step group relative flex h-full flex-col justify-center overflow-hidden rounded-[16px] sm:rounded-[20px] border border-black/10 bg-white p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#0066cc]/30 hover:shadow-[0_15px_40px_rgba(0,102,204,0.08)]"
      role="listitem"
      aria-label={`Step ${step.num}: ${step.title}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0066cc]/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-center gap-4 mb-3">
        <div className="process-number font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.06em] text-black/10 transition-colors duration-500 group-hover:text-[#0066cc]/25" aria-hidden="true">
          {step.num}
        </div>
        <h3 className="process-step-title font-serif text-[clamp(1.1rem,1.3vw,1.4rem)] font-semibold leading-[1.08] text-[#0b1220]">{step.title}</h3>
      </div>
      <div className="process-step-content flex flex-col gap-2">
        <h4 className="process-step-heading font-sans text-[0.7rem] md:text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#0057b8]">{step.heading}</h4>
        <p className="process-step-desc font-sans text-[0.85rem] sm:text-[0.95rem] leading-[1.68] font-normal text-[#1f2937]">{step.desc}</p>
      </div>
    </div>
  );
}

