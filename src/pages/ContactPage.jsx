import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Contact label entrance
      gsap.from('.contact-label', {
        opacity: 0, y: -20, duration: 0.6,
        ease: 'power2.out', delay: 0.1,
      });
      
      // Enhanced heading entrance
      gsap.from('.contact-page-heading', {
        y: 80, opacity: 0, duration: 1.0,
        ease: 'power3.out', delay: 0.3,
      });
      
      // Contact info items with stagger
      gsap.from('.contact-info-item', {
        y: 40, opacity: 0, duration: 0.7,
        stagger: 0.12, ease: 'power2.out', delay: 0.6,
      });
      
      // Form container entrance
      gsap.from('.contact-form-container', {
        y: 60, opacity: 0, scale: 0.98,
        duration: 0.9,
        ease: 'power3.out', delay: 0.8,
      });
      
      // Form groups with stagger
      gsap.from('.contact-page-form-group', {
        y: 30, opacity: 0, duration: 0.6,
        stagger: 0.08, ease: 'power2.out', delay: 1.0,
      });
      
      // Submit button entrance
      gsap.from('#contact-form-submit', {
        y: 30, opacity: 0, scale: 0.9,
        duration: 0.7,
        ease: 'back.out(1.3)', delay: 1.4,
      });
      
      // Scroll-triggered animations for form elements
      gsap.utils.toArray('.contact-page-form-group').forEach((group, index) => {
        gsap.to(group, {
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.8,
          },
          y: -5,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      });
      
      // Contact info scroll animation
      gsap.utils.toArray('.contact-info-item').forEach((item) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
            scrub: 1,
          },
          x: 10,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      });
      
      // Form input focus animations
      gsap.utils.toArray('.contact-page-form-group input, .contact-page-form-group textarea, .contact-page-form-group select').forEach((input) => {
        // Focus in animation
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
        
        // Focus out animation
        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
      });
      
      // Submit button hover animation
      const submitBtn = document.getElementById('contact-form-submit');
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          gsap.to(submitBtn, {
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(212, 75, 30, 0.3)',
            duration: 0.3,
            ease: 'power3.out',
          });
        });
        
        submitBtn.addEventListener('mouseleave', () => {
          gsap.to(submitBtn, {
            scale: 1,
            boxShadow: '0 0px 0px rgba(212, 75, 30, 0)',
            duration: 0.3,
            ease: 'power3.out',
          });
        });
        
        // Click animation
        submitBtn.addEventListener('click', () => {
          gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.in',
            onComplete: () => {
              gsap.to(submitBtn, {
                scale: 1,
                duration: 0.2,
                ease: 'elastic.out(1, 0.5)',
              });
            }
          });
        });
      }
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-44 pb-32 px-[6vw] bg-[#f5f0e8] min-h-screen text-[#1a1a1a] sm:pt-32">
      <div className="grid grid-cols-[1fr_1.2fr] gap-24 items-start max-w-[1400px] mx-auto sm:grid-cols-1 sm:gap-16">
        {/* Left col */}
        <div className="contact-page-left">
          <p className="contact-label font-sans text-[0.70rem] tracking-[0.3em] uppercase text-[#666] mb-10">(Get in touch)</p>
          <h1 className="contact-page-heading font-serif text-[clamp(2.5rem,5.5vw,7.5rem)] font-medium leading-[1.05] tracking-tighter text-[#1a1a1a] mb-16 sm:mb-10">
            For project enquiries,
            <br /><em className="italic font-normal text-[#d44b1e]">collaborations,</em>
            <br />or joining the studio.
          </h1>
          <div className="flex flex-col gap-10 mt-12 sm:mt-8">
            {[
              { label: 'Email',    value: 'hello@veltex.studio' },
              { label: 'Based in', value: 'Singapore & Hong Kong' },
              { label: 'Open to',  value: 'Global Projects' },
            ].map((item) => (
              <div key={item.label} className="contact-info-item flex flex-col gap-1.5">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">{item.label}</span>
                <span className="font-serif text-2xl font-medium tracking-tight text-[#1a1a1a] sm:text-xl">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right col — form */}
        <form className="contact-form-container flex flex-col gap-8 bg-white/40 p-12 rounded-sm border border-black/5 sm:p-0 sm:bg-transparent sm:border-none" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-page-form-group flex flex-col gap-2.5">
            <label htmlFor="cp-name" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#1a1a1a] font-semibold">Full Name</label>
            <input id="cp-name" type="text" placeholder="Your name" autoComplete="name" className="bg-transparent border-none border-b border-black/15 py-4 font-sans text-lg focus:outline-none focus:border-[#d44b1e] transition-colors placeholder:text-black/20 text-[#1a1a1a]" />
          </div>
          <div className="contact-page-form-group flex flex-col gap-2.5">
            <label htmlFor="cp-email" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#1a1a1a] font-semibold">Email Address</label>
            <input id="cp-email" type="email" placeholder="you@company.com" autoComplete="email" className="bg-transparent border-none border-b border-black/15 py-4 font-sans text-lg focus:outline-none focus:border-[#d44b1e] transition-colors placeholder:text-black/20 text-[#1a1a1a]" />
          </div>
          <div className="contact-page-form-group flex flex-col gap-2.5">
            <label htmlFor="cp-company" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#1a1a1a] font-semibold">Company</label>
            <input id="cp-company" type="text" placeholder="Your company" className="bg-transparent border-none border-b border-black/15 py-4 font-sans text-lg focus:outline-none focus:border-[#d44b1e] transition-colors placeholder:text-black/20 text-[#1a1a1a]" />
          </div>
          <div className="contact-page-form-group flex flex-col gap-2.5">
            <label htmlFor="cp-type" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#1a1a1a] font-semibold">Project Type</label>
            <select id="cp-type" className="bg-transparent border-none border-b border-black/15 py-4 font-sans text-lg focus:outline-none focus:border-[#d44b1e] transition-colors text-[#1a1a1a] cursor-pointer appearance-none">
              <option value="">Select a service</option>
              <option>Brand Identity</option>
              <option>Digital Experience</option>
              <option>Spatial & Environmental</option>
              <option>Motion & Campaign</option>
              <option>Creative Direction</option>
            </select>
          </div>
          <div className="contact-page-form-group flex flex-col gap-2.5">
            <label htmlFor="cp-message" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#1a1a1a] font-semibold">Message</label>
            <textarea id="cp-message" rows={5} placeholder="Tell us about your project..." className="bg-transparent  border-b border-black/15 py-4 font-sans text-lg focus:outline-none focus:border-[#d44b1e] transition-colors placeholder:text-black/20 text-[#1a1a1a] resize-none" />
          </div>
          <button 
            type="submit" 
            className="inline-flex items-center gap-3 bg-[#d44b1e] text-white border-none py-4 px-10 rounded-full font-sans text-[0.9rem] font-bold tracking-wide cursor-pointer self-start hover:bg-[#e85c2a] transition-all duration-300 hover:-translate-y-1 outline-none " 
            id="contact-form-submit"
            style={{
              display: 'inline-flex',
              opacity: 1,
              visibility: 'visible'
            }}
          >
            Send enquiry
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

