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
          const scale = 1 + (progress * 0.3);
          const y = progress * 100;
          const rotation = progress * 2;
          
          gsap.set(bg, {
            scale: scale,
            y: y,
            rotation: rotation,
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
 * About section: JAW-DROPPING VERSION - color transition + parallax image + spectacular text reveal + interactive stats
 */
export function useAboutAnimation({ sectionRef, imageRef, wordRefs }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // LEFT SIDE - Image container animation
      const imageContainer = sectionRef.current.querySelector('.about-image-container');
      if (imageContainer) {
        gsap.from(imageContainer, {
          x: -100,
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          duration: 1.2,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // SPECTACULAR text reveal with bounce effects
      if (wordRefs?.current?.length) {
        gsap.from(wordRefs.current, {
          y: '200%',
          opacity: 0,
          rotationX: -45,
          scale: 0.8,
          duration: 1.5,
          stagger: { 
            each: 0.08, 
            from: 'start',
            onComplete: function() {
              // Individual word bounce
              gsap.to(this.targets(), {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
              });
            }
          },
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // JAW-DROPPING stats counter with glow effect
      const stats = sectionRef.current.querySelectorAll('.about-stat-number');
      if (stats.length) {
        stats.forEach((stat, index) => {
          const finalValue = stat.innerText;
          const isPlus = finalValue.includes('+');
          const numValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
          
          // Entrance animation
          gsap.from(stat, {
            y: 80,
            opacity: 0,
            scale: 0.5,
            rotation: 15,
            duration: 1.0,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          });
          
          // Counting animation
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            innerHTML: 0,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: function() {
              const progress = this.progress;
              const currentValue = Math.floor(numValue * progress);
              stat.innerText = currentValue + (isPlus ? '+' : '');
              
              // Glow effect during counting
              const glow = 20 + (progress * 10);
              gsap.set(stat, {
                filter: `drop-shadow(0 0 ${glow}px rgba(212, 75, 30,${0.3 + progress * 0.3})`,
              });
            },
            onComplete: function() {
              stat.innerText = finalValue;
              // Final pulse
              gsap.to(stat, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
              });
            }
          });
        });
      }

      // SPECTACULAR copy paragraphs with stagger
      const paras = sectionRef.current.querySelectorAll('.about-copy-p');
      if (paras.length) {
        gsap.from(paras, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          rotationX: 15,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paras[0],
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // CLEAN IMAGE ANIMATION - Simple and Impressive
      if (imageRef?.current) {
        // Initial state - image is hidden
        gsap.set(imageRef.current, { 
          opacity: 0,
          scale: 0.8,
          y: 30,
        });
        
        // Clean entrance animation
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });
        
        // Subtle parallax effect
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom top',
            scrub: 2,
          },
          y: -40,
          scale: 1.05,
          transformOrigin: 'center center',
        });
      }

      // RIGHT SIDE - Content container animation
      const contentContainer = sectionRef.current.querySelector('.about-content-container');
      if (contentContainer) {
        gsap.from(contentContainer, {
          x: 100,
          opacity: 0,
          scale: 0.9,
          rotation: 5,
          duration: 1.2,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // About label animation
      const aboutLabel = sectionRef.current.querySelector('.about-label');
      if (aboutLabel) {
        gsap.from(aboutLabel, {
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

      // Interactive hover effects for stats
      const statContainers = sectionRef.current.querySelectorAll('.about-stat-container');
      statContainers.forEach((container) => {
        container.addEventListener('mouseenter', () => {
          gsap.to(container, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        
        container.addEventListener('mouseleave', () => {
          gsap.to(container, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.3)',
          });
        });
      });

      // Background pattern animation
      const bgPattern = sectionRef.current.querySelector('.v-bg-pattern');
      if (bgPattern) {
        gsap.to(bgPattern, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
          y: -50,
          rotation: 5,
          scale: 1.2,
          ease: 'none',
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
        gsap.from(workLabel, {
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

      // Headline words animation
      const headlineWords = sectionRef.current.querySelectorAll('.work-headline-word');
      if (headlineWords.length) {
        gsap.from(headlineWords, {
          y: '150%',
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          stagger: 0.08,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Description paragraph animation
      const workDesc = sectionRef.current.querySelector('.work-description');
      if (workDesc) {
        gsap.from(workDesc, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: workDesc,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Main project gallery animation
      const projectGallery = sectionRef.current.querySelector('.work-project-gallery');
      if (projectGallery) {
        gsap.from(projectGallery, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Background image animation - SIMPLE VERSION
      const bgImage = sectionRef.current.querySelector('.work-bg-image');
      if (bgImage) {
        // Simple entrance animation
        gsap.from(bgImage, {
          opacity: 0,
          scale: 1.05,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Thumbnail animations
      const thumbnails = sectionRef.current.querySelectorAll('.work-thumbnail');
      if (thumbnails.length) {
        gsap.from(thumbnails, {
          x: -50,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Content animations (right side)
      const projectContent = sectionRef.current.querySelector('.work-project-content');
      if (projectContent) {
        gsap.from(projectContent, {
          x: 50,
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

      // CTA button animation
      const ctaButton = sectionRef.current.querySelector('.work-cta-button');
      if (ctaButton) {
        gsap.from(ctaButton, {
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: ctaButton,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}

/**
 * Process section: ENHANCED VERSION - same clean animations as other sections
 */
export function useProcessAnimation({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Kill any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      console.log('Process animation initialized');
      
      // Process label animation
      const processLabel = sectionRef.current.querySelector('.process-label');
      console.log('Process label found:', processLabel);
      if (processLabel) {
        gsap.from(processLabel, {
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
            onEnter: () => console.log('Process label entered'),
          },
        });
      }

      // Headline animation
      const headline = sectionRef.current.querySelector('.process-headline');
      console.log('Process headline found:', headline);
      if (headline) {
        gsap.from(headline, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Process headline entered'),
          },
        });
      }

      // Description animation
      const description = sectionRef.current.querySelector('.process-description');
      console.log('Process description found:', description);
      if (description) {
        gsap.from(description, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Process description entered'),
          },
        });
      }

      // Process steps with stagger
      const steps = sectionRef.current.querySelectorAll('.process-step');
      console.log('Process steps found:', steps.length);
      if (steps.length) {
        gsap.from(steps, {
          y: 50,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Process steps entered'),
          },
        });
      }

      // Step numbers with enhanced animation
      const stepNumbers = sectionRef.current.querySelectorAll('.process-number');
      console.log('Process numbers found:', stepNumbers.length);
      if (stepNumbers.length) {
        gsap.from(stepNumbers, {
          y: 40,
          opacity: 0,
          scale: 0.5,
          rotation: 15,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Process numbers entered'),
          },
        });
      }

      // Step titles
      const stepTitles = sectionRef.current.querySelectorAll('.process-step-title');
      console.log('Process titles found:', stepTitles.length);
      if (stepTitles.length) {
        gsap.from(stepTitles, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Process titles entered'),
          },
        });
      }

      // Step descriptions
      const stepDescs = sectionRef.current.querySelectorAll('.process-step-desc');
      console.log('Process descriptions found:', stepDescs.length);
      if (stepDescs.length) {
        gsap.from(stepDescs, {
          y: 25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'bottom 45%',
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Process descriptions entered'),
          },
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [sectionRef]);
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
