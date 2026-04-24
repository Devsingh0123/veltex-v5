import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Enhanced parallax effect for hero background - JAW-DROPPING VERSION
 */
export function useHeroParallax(bgRef) {
  useEffect(() => {
    if (!bgRef?.current) return;

    const bg = bgRef.current;

    // Enhanced parallax with rotation and scale
    gsap.to(bg, {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          const y = progress * 100;

          gsap.set(bg, {
            y: y,
            transformOrigin: 'center center',
          });
        }
      }
    });

  }, []);
}

/**
 * Spectacular scroll-triggered animations for sections
 */
export function useScrollReveal(elementRef, options = {}) {
  const {
    direction = 'up',
    distance = 80,
    duration = 1.0,
    stagger = 0.1,
    scale = 0.9,
    rotation = 0
  } = options;

  useEffect(() => {
    if (!elementRef?.current) return;

    const element = elementRef.current;
    const children = element.children.length > 0 ? element.children : [element];

    gsap.from(children, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      [direction === 'up' ? 'y' : direction === 'down' ? 'y' : 'x']: direction === 'up' || direction === 'down' ? (direction === 'up' ? distance : -distance) : (direction === 'left' ? distance : -distance),
      scale: scale,
      rotation: rotation,
      duration: duration,
      stagger: stagger,
      ease: 'power3.out',
    });

  }, [elementRef, direction, distance, duration, stagger, scale, rotation]);
}

/**
 * Magnetic cursor effect for interactive elements
 */
export function useMagneticEffect(elementRef) {
  useEffect(() => {
    if (!elementRef?.current) return;

    const element = elementRef.current;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.15,
        y: y * 0.15,
        rotation: x * 0.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };

  }, [elementRef]);
}

/**
 * Floating animation for elements
 */
export function useFloatingAnimation(elementRef, amplitude = 10, frequency = 2) {
  useEffect(() => {
    if (!elementRef?.current) return;

    const element = elementRef.current;

    gsap.to(element, {
      y: `+=${amplitude}`,
      duration: frequency,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

  }, [elementRef, amplitude, frequency]);
}

/**
 * Particle explosion effect
 */
export function useParticleExplosion(containerRef, particleCount = 20) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const container = containerRef.current;

    const createParticles = () => {
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `;

        container.appendChild(particle);
        particles.push(particle);

        // Animate each particle
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 100 + Math.random() * 100;
        const duration = 1 + Math.random() * 1;

        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: duration,
          ease: 'power2.out',
          onComplete: () => {
            particle.remove();
          }
        });
      }
    };

    // Trigger particle explosion
    const timer = setTimeout(createParticles, 2000);

    return () => {
      clearTimeout(timer);
      // Clean up any remaining particles
      const particles = container.querySelectorAll('.particle');
      particles.forEach(p => p.remove());
    };

  }, [containerRef, particleCount]);
}

/**
 * About section: clean editorial reveal with subtle parallax
 */
export function useAboutAnimation({ sectionRef, imageRef, wordRefs }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = section.querySelector('.about-label');
      const description = section.querySelector('.about-description');
      const content = section.querySelector('.about-content-container');
      const copy = section.querySelectorAll('.about-copy-p');
      const imageContainer = section.querySelector('.about-image-container');
      const bgPattern = section.querySelector('.v-bg-pattern');

      const introTl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      if (label) introTl.from(label, { y: 24, opacity: 0 }, 0);
      if (wordRefs?.current?.length) {
        introTl.from(
          wordRefs.current,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -18,
            stagger: 0.08,
            duration: 1.05,
          },
          0.08
        );
      }
      if (description) introTl.from(description, { y: 32, opacity: 0 }, 0.22);

      if (content) {
        gsap.from(content, {
          x: -36,
          opacity: 0,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (copy.length) {
        gsap.from(copy, {
          y: 36,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: copy[0],
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (imageContainer) {
        gsap.from(imageContainer, {
          x: 80,
          opacity: 0,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (imageRef?.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 0, rotate: 0.001 },
          {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );
      }

      if (bgPattern) {
        gsap.to(bgPattern, {
          y: -70,
          rotation: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, imageRef, wordRefs]);
}

/**
 * Work section: ENHANCED VERSION - same clean animations as About section
 */
export function useWorkAnimation({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Work label animation
      const workLabel = sectionRef.current.querySelector('.work-label');
      if (workLabel) {
        gsap.fromTo(workLabel,
          { y: -30, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Headline words animation
      const headlineWords = sectionRef.current.querySelectorAll('.work-headline-word');
      if (headlineWords.length) {
        gsap.fromTo(headlineWords,
          { y: '150%', opacity: 0, scale: 0.8 },
          {
            y: '0%',
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Description paragraph animation
      const workDesc = sectionRef.current.querySelector('.work-description');
      if (workDesc) {
        gsap.fromTo(workDesc,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: workDesc,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Main project gallery animation
      const projectGallery = sectionRef.current.querySelector('.work-project-gallery');
      if (projectGallery) {
        gsap.fromTo(projectGallery,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Background image animation - SIMPLE VERSION
      const bgImage = sectionRef.current.querySelector('.work-bg-image');
      if (bgImage) {
        gsap.fromTo(bgImage,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Thumbnail animations
      const thumbnails = sectionRef.current.querySelectorAll('.work-thumbnail');
      if (thumbnails.length) {
        gsap.fromTo(thumbnails,
          { x: -50, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 35%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content animations (right side)
      const projectContent = sectionRef.current.querySelector('.work-project-content');
      if (projectContent) {
        gsap.fromTo(projectContent,
          { x: 50, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 35%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // CTA button animation
      const ctaButton = sectionRef.current.querySelector('.work-cta-button');
      if (ctaButton) {
        gsap.fromTo(ctaButton,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: ctaButton,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}

/**
 * Process section: editorial stagger with sticky visual motion
 */
export function useProcessAnimation({ sectionRef, imageRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = section.querySelector('.process-label');
      const headline = section.querySelector('.process-headline');
      const description = section.querySelector('.process-description');
      const steps = section.querySelectorAll('.process-step');
      const numbers = section.querySelectorAll('.process-number');
      const headings = section.querySelectorAll('.process-step-heading');
      const titles = section.querySelectorAll('.process-step-title');
      const descs = section.querySelectorAll('.process-step-desc');
      const visualWrap = section.querySelector('.process-visual-wrap');
      const imageShell = section.querySelector('.process-image-shell');
      const stepsColumn = section.querySelector('.process-steps-column');

      const introTl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.95,
        },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      if (label) introTl.from(label, { y: 24, opacity: 0 }, 0);
      if (headline) introTl.from(headline, { y: 44, opacity: 0 }, 0.08);
      if (description) introTl.from(description, { y: 28, opacity: 0 }, 0.18);

      if (stepsColumn) {
        gsap.from(stepsColumn, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsColumn,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (steps.length) {
        gsap.from(steps, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(steps, { clearProps: 'transform,opacity' });
          },
          scrollTrigger: {
            trigger: steps[0],
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (numbers.length) {
        gsap.from(numbers, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (titles.length) {
        gsap.from(titles, {
          y: 18,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(titles, { clearProps: 'transform,opacity' });
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (headings.length || descs.length) {
        const contentEls = [...headings, ...descs];
        gsap.from(contentEls, {
          y: 16,
          opacity: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(contentEls, { clearProps: 'transform,opacity' });
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (visualWrap) {
        gsap.from(visualWrap, {
          opacity: 0,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visualWrap,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (imageShell) {
        const imageReveal = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
          scrollTrigger: {
            trigger: imageShell,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        });

        imageReveal
          .from(imageShell, {
            opacity: 0,
            duration: 1.15,
          })
          .from(
            imageShell,
            {
              clipPath: 'inset(8% 10% 12% 10% round 32px)',
              duration: 1.1,
            },
            0
          );
      }

      if (imageRef?.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 0, rotate: -1.5, scale: 1.02 },
          {
            y: -34,
            rotate: 1.5,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, imageRef]);
}

/**
 * Contact section: ENHANCED VERSION - same clean animations as other sections
 */
export function useContactAnimation({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Contact label animation
      const contactLabel = sectionRef.current.querySelector('.contact-label');
      if (contactLabel) {
        gsap.from(contactLabel, {
          y: -30,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Contact heading animation
      const heading = sectionRef.current.querySelector('.contact-heading');
      if (heading) {
        gsap.from(heading, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Contact info items with stagger
      const contactItems = sectionRef.current.querySelectorAll('.contact-info-item');
      if (contactItems.length) {
        gsap.from(contactItems, {
          y: 40,
          opacity: 0,
          scale: 0.8,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Contact form container
      const formContainer = sectionRef.current.querySelector('.contact-form-container');
      if (formContainer) {
        gsap.from(formContainer, {
          y: 50,
          opacity: 0,
          scale: 0.9,
          duration: 1.0,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Form groups with stagger
      const formGroups = sectionRef.current.querySelectorAll('.contact-form-group');
      if (formGroups.length) {
        gsap.from(formGroups, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Submit button
      const submitBtn = sectionRef.current.querySelector('.contact-submit-btn');
      if (submitBtn) {
        gsap.from(submitBtn, {
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: submitBtn,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Contact image if exists
      const contactImage = sectionRef.current.querySelector('.contact-image');
      if (contactImage) {
        gsap.from(contactImage, {
          x: -50,
          opacity: 0,
          scale: 0.8,
          duration: 1.0,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
        });
      }

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
