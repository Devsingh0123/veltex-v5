import React, { useRef, useEffect } from 'react';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { useHeroParallax } from '../../hooks/useScrollAnimations';
import { useHeroOverlap } from '../../hooks/useHeroOverlap';

export default function Hero({ navRef }) {
  const overlayRef = useRef(null);
  const vPathRef = useRef(null);
  const vTextRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const charsRef = useRef([]);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const overlayBgRef = useRef(null);

  // Ensure overlay is visible on mount
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.display = 'flex';
      overlayRef.current.style.opacity = '1';
    }
    // Hide text initially - multiple approaches
    if (vTextRef.current) {
      vTextRef.current.style.opacity = '0';
      vTextRef.current.setAttribute('opacity', '0');
      vTextRef.current.style.visibility = 'hidden';
    }
  }, []);

  // Split title into chars
  useEffect(() => {
    if (!titleRef.current) return;
    const el = titleRef.current;
    const lines = [
      { text: 'Unmatched Reach', italic: false },
      { text: 'Infinite', italic: true },
      { text: 'Possibilities.', italic: false },
    ];
    el.innerHTML = '';
    lines.forEach((line) => {
      const lineWrap = document.createElement('div');
      lineWrap.className = 'overflow-hidden block';
      const lineInner = document.createElement(line.italic ? 'em' : 'span');
      lineInner.textContent = line.text;
      lineInner.className = `inline-block will-change-transform ${line.italic ? 'italic font-normal' : ''}`;
      lineWrap.appendChild(lineInner);
      el.appendChild(lineWrap);
      charsRef.current.push(lineInner);
    });
  }, []);

  // V path length setup
  useEffect(() => {
    if (vPathRef.current) {
      const len = vPathRef.current.getTotalLength();
      vPathRef.current.style.strokeDasharray = len;
      vPathRef.current.style.strokeDashoffset = len;
    }
  }, []);

  // Hero entrance animation
  useHeroAnimation({
    overlayRef,
    vPathRef,
    vTextRef,
    titleCharsRef: charsRef,
    eyebrowRef,
    subRef,
    navRef,
    scrollRef,
  });

  // Parallax on bg
  useHeroParallax(bgRef);

  // Overlap effect on scroll
  useHeroOverlap({ heroRef, contentRef, overlayBgRef, bgRef, scrollRef });

  return (
    <>
      {/* V Intro Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        id="v-intro-overlay"
        style={{ display: 'none' }}
      >
        <svg className="w-[min(65vw,300px)]" viewBox="0 0 280 220" fill="none">
          <path
            ref={vPathRef}
            d="M 14 11 L 140 209 L 266 11"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            ref={vTextRef}
            x="140"
            y="180"
            textAnchor="middle"
            fill="white"
            fontFamily="'Playfair Display', serif"
            fontSize="11"
            letterSpacing="8"
            fontWeight="400"
            dy="-20"
            style={{ opacity: 0 }}
          >
            VELTEX
          </text>
        </svg>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center z-[5]" id="hero">
        {/* Background image with parallax */}
        <div
          ref={bgRef}
          className="hero-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center origin-center will-change-transform"
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div ref={overlayBgRef} className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/55 via-[#0a0a0a]/25 to-[#0a0a0a]/72 z-[1]" aria-hidden="true" />

        {/* Content */}
        <div ref={contentRef} className="relative z-[2] text-center px-8 max-w-[1100px]">
          <p
            ref={eyebrowRef}
            className="font-sans text-[0.75rem] font-medium tracking-[0.25em] uppercase text-white/60 mb-8 opacity-0"
            aria-label="Veltex — Digital Design Studio"
          >
            Veltex &nbsp;—&nbsp; Empowering Every Brand to Shine
          </p>

          <h1
            ref={titleRef}
            className="font-serif text-[clamp(3.5rem,8vw,9rem)] font-medium text-white leading-[0.95] tracking-tighter"
            aria-label="Unmatched Reach, Infinite Possibilities"
          />

          <p
            ref={subRef}
            className="font-sans text-[clamp(1rem,1.5vw,1.25rem)] font-light text-white/75 mt-10 tracking-wide leading-[1.6] max-w-[550px] mx-auto opacity-0"
          >
            We create strategies that can make a difference
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 opacity-0"
          aria-hidden="true"
        >
          <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent to-white/60 animate-[scrollLine_2s_ease_infinite]" />
          <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-white/45">Scroll</span>
        </div>
      </section>
    </>
  );
}