import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHeroOverlap({ heroRef, contentRef, overlayBgRef, bgRef, scrollRef }) {
  useEffect(() => {
    if (!heroRef?.current) return;

    const hero = heroRef.current;
    
    // Debug: Log the hero element
    console.log('Hero element:', hero);
    console.log('Content ref:', contentRef?.current);
    console.log('Overlay ref:', overlayBgRef?.current);
    console.log('Bg ref:', bgRef?.current);
    console.log('Scroll ref:', scrollRef?.current);
    
    // Create the scroll overlap effect similar to Studio X
    // Since hero is fixed, we use the body as trigger
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        console.log('Scroll progress:', progress);
        
        // Scale and fade content based on scroll progress
        if (contentRef?.current) {
          gsap.set(contentRef.current, {
            scale: 1 - (progress * 0.4),
            opacity: 1 - (progress * 1.5),
            y: progress * 150,
          });
        }

        // Darken overlay as content scrolls over
        if (overlayBgRef?.current) {
          gsap.set(overlayBgRef.current, {
            opacity: 0.72 + (progress * 0.28),
          });
        }

        // Subtle background parallax
        if (bgRef?.current) {
          gsap.set(bgRef.current, {
            y: progress * 40,
            scale: 1 + (progress * 0.1),
          });
        }

        // Hide scroll indicator quickly
        if (scrollRef?.current) {
          gsap.set(scrollRef.current, {
            opacity: 1 - (progress * 3),
          });
        }
      },
      onEnter: () => {
        console.log('Hero overlap effect activated');
      },
      onLeave: () => {
        console.log('Hero overlap effect completed');
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [heroRef, contentRef, overlayBgRef, bgRef, scrollRef]);
}
