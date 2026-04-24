import React, { useRef } from 'react';
import { useAboutAnimation } from '../../hooks/useScrollAnimations';
import { VBackgroundPattern } from './VShape';
import aboutHomePage from "../../assets/aboutHomePage.jpeg"

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const wordRefs = useRef([]);

  useAboutAnimation({ sectionRef, imageRef, wordRefs });

  // Register word refs
  const addWordRef = (el) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ffffff] text-[#0f172a]  px-[6vw] pt-14 overflow-hidden"
      id="about"
      aria-label="About Veltex"
    >
      {/* Subtle V bg */}
      <VBackgroundPattern color="#0f172a" opacity={0.05} className="v-bg-pattern" />

      <p className="about-label font-sans text-[1rem] font-bold tracking-[0.3em] uppercase text-[#666] ">(About us)</p>

      {/* Large editorial headline */}
      <h2 className="font-serif text-[clamp(2.5rem,5vw,6rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[#0f172a] max-w-[80vw] mt-4">
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block">We make bold</span>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <em ref={addWordRef} className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#00aaff] inline-block py-1 pr-1 drop-shadow-sm">ideas</em>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block">work</span>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block"> for </span>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <em ref={addWordRef} className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] inline-block py-1 drop-shadow-sm">business.</em>
        </span>
      </h2>

      {/* Subheading paragraph */}
      <p className="about-description font-sans text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.75] text-[#555] mt-6 mb-10 font-light">
        Veltex is a full-service <span className="font-semibold text-[#0066cc]">Integrated Marketing Agency</span> that combines strategic rigour with fearless creativity because we believe the best marketing doesn't just look good. It solves real problems, shifts real perceptions, and grows real revenue.
      </p>

      {/* Float-based layout: image floats right, all content flows left & wraps below */}
      <div className="relative">
        {/* Right Col: Image with parallax */}
        <div className="about-image-column order-1 flex items-center justify-center md:float-right md:ml-12 mb-10 md:mb-4">
          <div className="about-image-container relative w-full max-w-[500px]">
            <img
              ref={imageRef}
              src={aboutHomePage}
              alt="Veltex brand asset"
              loading="lazy"
              className="w-full h-auto max-h-[600px] block"
            />
          </div>
        </div>

        {/* Copy — flows on left side */}
        <div className="about-content-container flex flex-col gap-7 pt-0 md:pt-8">
          <h3 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.025em] text-[#0f172a] w-full">
            Strategy first. <span className="italic font-normal text-[#0066cc]">Creativity always.</span>
          </h3>

          <p className="about-copy-p font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#444]">
            We are strategists, creatives, channel specialists, and storytellers — united by one belief: that marketing only works when every part of it works together. At Veltex, we don't separate thinking from making. Strategy lives inside every headline, every media plan, every brand activation we build.
          </p>
          <p className="about-copy-p font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#444]">
            We take great pride in never settling for the expected. The brief is a starting point, not a ceiling. We push every imaginable boundary — not for the sake of disruption, but because bold ideas consistently outperform safe ones in building brands that last.
          </p>
        </div>

        {/* Quote Section — flows on left, wraps below image when content exceeds */}
        <div className="mt-12">
          <blockquote className="about-copy-p font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.025em] text-[#0f172a] mb-8">
            "Bold ideas can both move the world and uplift businesses - and we've spent every year proving it."
          </blockquote>

        </div>
        {/* <p className="about-copy-p font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#555] ">

          We work across industries and campaign scales - from challenger brands building their voice to established companies reclaiming their relevance. Our integrated model means you get a single agency that thinks in systems, not silos.
        </p> */}
      </div>

      {/* Full-width bottom border line */}
      <div className="mt-8" aria-hidden="true" />
    </section>
  );
}