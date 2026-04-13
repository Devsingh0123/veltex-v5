import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Master hero entrance animation - CLEAN VERSION
 * Handles: V SVG draw -> text stagger reveal -> nav fade-in
 */
export function useHeroAnimation({ overlayRef, logoRef, titleCharsRef, eyebrowRef, subRef, navRef, scrollRef }) {
  useEffect(() => {
    // Check if overlay is hidden, if so, don't run animation
    if (overlayRef?.current?.style?.display === 'none') {
      return;
    }

    if (!overlayRef?.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Creative Intro Sequence - Fast Halo Flash
      tl.to('#intro-halo', {
        opacity: 1,
        scale: 2.5,
        duration: 1.5,
        ease: 'power4.out'
      });

      // 2. Logo Entrance - Snappier elastic reveal
      if (logoRef?.current) {
        tl.fromTo(logoRef.current,
          { scale: 0, rotation: -720, opacity: 0, filter: 'blur(30px) brightness(1.5)', skewX: 5 },
          {
            scale: 1,
            rotation: 360,
            opacity: 1,
            filter: 'blur(0px) brightness(1)',
            skewX: 0,
            duration: 1.8,  // Increased duration for multiple rotations to look smooth
            ease: 'expo.out'
          },
          '0.1'
        );

        // Very brief float to avoid "dead" air without sticking too long
        tl.to(logoRef.current, {
          y: -8,
          duration: 0.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1
        }, '-=0.4');
      }

      // 3. Ultra-Smooth Transition - Reveal Hero Faster
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          scale: 1.05,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
            }
          },
        },
        '-=0.6' // Faster overlap
      );

      // 4. Eyebrow
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
  }, [overlayRef, logoRef, titleCharsRef, eyebrowRef, subRef, navRef, scrollRef]);
}
