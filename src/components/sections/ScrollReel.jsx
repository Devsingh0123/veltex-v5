import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * A full-width "reel" strip between sections — shows a large scrolling
 * horizontal text to add visual energy and break up vertical rhythm.
 */
export default function ScrollReel({ text = 'VELTEX', bg = '#f50b0bff', color = '#f50b0bff' }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: '-25%',
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const repeated = Array(200).fill(text).join(' · ');

  return (
    <div
      className="relative z-[2] overflow-hidden py-4"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span
          className="font-serif text-[clamp(1.3rem,2vw,1.75rem)] font-black leading-none opacity-[0.06] select-none tracking-tighter"
          style={{ color: color }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
