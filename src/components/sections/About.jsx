import React, { useRef } from 'react';
import { useAboutAnimation } from '../../hooks/useScrollAnimations';
import { VBackgroundPattern } from './VShape';

export default function About() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const wordRefs   = useRef([]);

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
      className="relative bg-[#f5f0e8] text-[#1a1a1a] py-[10rem] px-[6vw] pb-[12rem] overflow-hidden"
      id="about"
      aria-label="About Veltex"
    >
      {/* Subtle V bg */}
      <VBackgroundPattern color="#1a1a1a" opacity={0.025} className="v-bg-pattern" />

      <p className="about-label font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-[#666] mb-20">(About us)</p>

      {/* Large editorial headline */}
      <h2 className="font-serif text-[clamp(2.5rem,5vw,6rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[#1a1a1a] max-w-[80vw] mb-24">
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block">We build</span>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <em ref={addWordRef} className="italic font-normal text-[#d44b1e] inline-block">environments</em>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block">where experience</span>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block">and performance are</span>
        </span>{' '}
        <span className="inline-block overflow-hidden align-bottom">
          <em ref={addWordRef} className="italic font-normal text-[#d44b1e] inline-block">inseparable.</em>
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Image with parallax */}
        <div className="about-image-container overflow-hidden rounded-sm aspect-[3/4] relative">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&auto=format&fit=crop&q=80"
            alt="Premium architectural interior by Veltex"
            loading="lazy"
            className="w-full h-[115%] object-cover origin-center will-change-transform opacity-0"
          />
        </div>

        {/* Copy + stats */}
        <div className="about-content-container flex flex-col gap-7 pt-8">
          <p className="about-copy-p font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#444]">
            We design environments where experience and performance are inseparable.
            Every decision is shaped by how a space will be used, perceived, and
            ultimately how it performs commercially.
          </p>
          <p className="about-copy-p font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#444]">
            Our work spans digital platforms, brand identities, and immersive 
            installations across the Asia-Pacific region. In each case, we operate 
            as a senior-led extension of our clients' teams — aligning brand strategy, 
            creative vision, and delivery realities from the outset.
          </p>
          <p className="about-copy-p font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#444]">
            We are deliberately agnostic in style. There is no Veltex look to impose. 
            Instead, we develop innovative solutions that respond precisely to the brief, 
            the business model, and the market context.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-black/15 sm:grid-cols-3 sm:gap-12 sm:pt-12">
            <div className="about-stat-container flex flex-col">
              <div className="about-stat-number font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-[#1a1a1a] leading-none">12+</div>
              <div className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mt-2 sm:text-[0.75rem]">Years of mastery</div>
            </div>
            <div className="about-stat-container flex flex-col">
              <div className="about-stat-number font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-[#1a1a1a] leading-none">340</div>
              <div className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mt-2 sm:text-[0.75rem]">Projects delivered</div>
            </div>
            <div className="about-stat-container flex flex-col col-span-2 sm:col-span-1">
              <div className="about-stat-number font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-[#1a1a1a] leading-none">18</div>
              <div className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mt-2 sm:text-[0.75rem]">Markets reached</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

