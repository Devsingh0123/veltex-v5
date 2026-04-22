import React, { useRef } from 'react';
import { useAboutAnimation } from '../../hooks/useScrollAnimations';
import { VBackgroundPattern } from './VShape';
import aboutHomePage from '../../assets/aboutHomePage.jpeg';

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const wordRefs = useRef([]);

  useAboutAnimation({ sectionRef, imageRef, wordRefs });

  const addWordRef = (el) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ffffff] px-[6vw] pt-14 pb-10 text-[#0f172a] "
      id="about"
      aria-label="About Veltex"
    >
      <VBackgroundPattern color="#0f172a" opacity={0.05} className="v-bg-pattern" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <p className="about-label font-sans text-[1rem] font-bold uppercase tracking-[0.3em] text-[#666]">(About us)</p>

        <h2 className="mt-4 w-full font-serif text-[clamp(1.9rem,4.2vw,5.4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-[#0f172a]">
          <span className="inline-block overflow-hidden align-bottom">
            <span ref={addWordRef} className="inline-block">We make bold</span>
          </span>{' '}
          <span className="inline-block overflow-hidden align-bottom">
            <em ref={addWordRef} className="inline-block bg-gradient-to-r from-[#0066cc] to-[#00aaff] bg-clip-text py-1 pr-1 font-normal italic text-transparent">
              ideas
            </em>
          </span>{' '}
          <span className="inline-block overflow-hidden align-bottom">
            <span ref={addWordRef} className="inline-block">work</span>
          </span>{' '}
          <span className="inline-block overflow-hidden align-bottom">
            <span ref={addWordRef} className="inline-block">for</span>
          </span>{' '}
          <span className="inline-block overflow-hidden align-bottom">
            <em
              ref={addWordRef}
              className="inline-block bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] bg-clip-text py-1 font-normal italic text-transparent"
            >
              business.
            </em>
          </span>
        </h2>

        <p className="about-description mt-6 w-full font-sans text-[clamp(1rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#555]">
          Veltex is a full-service <span className="font-semibold text-[#0066cc]">Integrated Marketing Agency</span> that combines
          strategic rigour with fearless creativity because we believe the best marketing does not just look good. It solves real
          problems, shifts real perceptions, and grows real revenue.
        </p>

        {/* Let the text column consume leftover space while the image keeps its natural width. */}
        <div className="mt-16 grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_auto] ">
          <div className="about-content-container flex w-full max-w-none flex-col gap-8">
            <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#0f172a]">
              Strategy first. <span className="font-normal italic text-[#0066cc]">Creativity always.</span>
            </h3>

            <p className="about-copy-p w-full max-w-none font-sans text-[clamp(1rem,1.2vw,1.125rem)] font-light leading-[1.85] text-[#444]">
              We are strategists, creatives, channel specialists, and storytellers united by one belief: marketing only works when
              every part of it works together. At Veltex, we do not separate thinking from making. Strategy lives inside every
              headline, every media plan, every brand activation we build.
            </p>
            <p className="about-copy-p w-full max-w-none font-sans text-[clamp(1rem,1.2vw,1.125rem)] font-light leading-[1.85] text-[#444]">
              We take pride in never settling for the expected. The brief is a starting point, not a ceiling. We push every boundary
              that matters, not for disruption alone, but because bold ideas consistently outperform safe ones in building brands
              that last.
            </p>

            <blockquote className="about-copy-p border-l border-[#0066cc]/20 pl-6 font-serif text-[clamp(1.9rem,3vw,2.8rem)] font-medium leading-[1.16] tracking-[-0.03em] text-[#0f172a]">
              "Bold ideas can both move the world and uplift businesses and we have spent every year proving it."
            </blockquote>
          </div>

          {/* Keep the image on the right at its natural size without cropping it. */}
          <div className="flex items-start justify-center ">
            <div className="about-image-container relative w-fit shrink-0 max-w-full ">
              <img
                ref={imageRef}
                src={aboutHomePage}
                alt="Veltex brand environment"
                loading="lazy"
                className="block h-auto max-h-[500px] w-auto max-w-full object-contain will-change-transform group-hover:scale-115 transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
