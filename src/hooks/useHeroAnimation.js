import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Master hero entrance animation - CLEAN VERSION
 * Handles: V SVG draw -> text stagger reveal -> nav fade-in
 */
export function useHeroAnimation({ overlayRef, vPathRef, vTextRef, titleCharsRef, eyebrowRef, subRef, navRef, scrollRef }) {
  useEffect(() => {
    // Check if overlay is hidden, if so, don't run animation
    if (overlayRef?.current?.style?.display === 'none') {
      return;
    }

    if (!overlayRef?.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // 1. Draw the V stroke - CLEAN VERSION
      if (vPathRef?.current) {
        gsap.set(vPathRef.current, {
          strokeDasharray: vPathRef.current.getTotalLength?.() || 400,
          strokeDashoffset: vPathRef.current.getTotalLength?.() || 400,
        });

        tl.to(vPathRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power3.inOut',
        })
        .to(vTextRef?.current, {
          opacity: 0.5,
          visibility: 'visible',
          duration: 0.8,
          ease: 'power2.out',
        }, '-=1.5');
      }

      // 2. Fade out overlay - NO COLOR FLASH
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
            }
          },
        },
        '-=0.5'
      );

      // 3. Eyebrow
      if (eyebrowRef?.current) {
        tl.fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.2'
        );
      }

      // 4. Title chars stagger
      if (titleCharsRef?.current?.length) {
        tl.from(
          titleCharsRef.current,
          {
            y: '110%',
            opacity: 0,
            duration: 1,
            stagger: { each: 0.025, from: 'start' },
            ease: 'power4.out',
          },
          '-=0.4'
        );
      }

      // 5. Subtitle
      if (subRef?.current) {
        tl.fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // 6. Nav pill
      if (navRef?.current) {
        tl.fromTo(
          navRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );
      }

      // 7. Scroll indicator
      if (scrollRef?.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }
    });

    return () => ctx.revert();
  }, [overlayRef, vPathRef, vTextRef, titleCharsRef, eyebrowRef, subRef, navRef, scrollRef]);
}
