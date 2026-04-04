import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero parallax: background image moves slower than scroll
 */
export function useHeroParallax(bgRef) {
  useEffect(() => {
    if (!bgRef?.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current.closest('.hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [bgRef]);
}

/**
 * About section: color transition + parallax image + text reveal
 */
export function useAboutAnimation({ sectionRef, imageRef, wordRefs }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    const ctx = gsap.context(() => {
      // Parallax on image
      if (imageRef?.current) {
        gsap.to(imageRef.current, {
          y: '-15%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Text reveal
      if (wordRefs?.current?.length) {
        gsap.from(wordRefs.current, {
          y: '100%',
          opacity: 0,
          duration: 1.2,
          stagger: { each: 0.04, from: 'start' },
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      // Stats counter reveal
      const stats = sectionRef.current.querySelectorAll('.about__stat-num');
      if (stats.length) {
        gsap.from(stats, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stats[0],
            start: 'top 85%',
          },
        });
      }

      // Copy paragraphs
      const paras = sectionRef.current.querySelectorAll('.about__copy p');
      if (paras.length) {
        gsap.from(paras, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paras[0],
            start: 'top 85%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, imageRef, wordRefs]);
}

/**
 * Work section: entrance animation
 */
export function useWorkAnimation({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    const ctx = gsap.context(() => {
      const label  = sectionRef.current.querySelector('.work__label');
      const title  = sectionRef.current.querySelector('.work__title');
      const desc   = sectionRef.current.querySelector('.work__desc');
      const cta    = sectionRef.current.querySelector('.work__cta');
      const thumbs = sectionRef.current.querySelectorAll('.work__thumb');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      if (thumbs.length) {
        tl.from(thumbs, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
      if (label) tl.from(label, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4');
      if (title) tl.from(title, { y: 50, opacity: 0, duration: 0.8, ease: 'power4.out' }, '-=0.4');
      if (desc)  tl.from(desc,  { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
      if (cta)   tl.from(cta,   { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}

/**
 * Process section: step-by-step reveal on scroll
 */
export function useProcessAnimation({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      const headline = sectionRef.current.querySelector('.process__headline');
      if (headline) {
        gsap.from(headline, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
          },
        });
      }

      // Each step animated in
      const steps = sectionRef.current.querySelectorAll('.process__step');
      steps.forEach((step) => {
        gsap.to(step, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 82%',
          },
        });

        // Big dim number count up effect
        const num = step.querySelector('.process__num');
        if (num) {
          gsap.from(num, {
            opacity: 0,
            scale: 0.6,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: step,
              start: 'top 82%',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}

/**
 * Contact section: stagger heading + CTA reveal
 */
export function useContactAnimation({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelector('.contact__heading');
      const actions = sectionRef.current.querySelector('.contact__actions');
      const image   = sectionRef.current.querySelector('.contact__image-wrap');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      if (image)   tl.from(image,   { x: -50, opacity: 0, duration: 1, ease: 'power3.out' });
      if (heading) tl.from(heading, { y: 60, opacity: 0, duration: 1.1, ease: 'power4.out' }, '-=0.7');
      if (actions) tl.from(actions, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}

/**
 * V-shaped clip-path divider animation
 */
export function useVDividerAnimation(ref) {
  useEffect(() => {
    if (!ref?.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scaleX: 0,
        transformOrigin: 'center',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
        },
      });
    });

    return () => ctx.revert();
  }, [ref]);
}
