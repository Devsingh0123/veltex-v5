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

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-16 px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a] sm:pt-20">
      <div className="grid gap-20 items-start max-w-[1400px] mx-auto grid-cols-1 sm:gap-12">
        {/* Left col */}
        <div className="contact-page-left">
          <p className="contact-label font-sans text-[1rem] tracking-[0.3em] uppercase text-[#666] mb-6 font-bold">(Get in touch)</p>
          <h1 className="contact-page-heading font-serif text-[clamp(2.5rem,5.5vw,7.5rem)] font-medium leading-[1.05] tracking-tighter text-[#0f172a] mb-10 sm:mb-8">
            For project enquiries,
            <br /><em className="italic font-normal text-[#0066cc]">collaborations,</em>
            <br />or joining the studio.
          </h1>
          <div className="flex flex-col gap-6 mt-8 sm:mt-6">
            {[
              { label: 'Email', value: 'Hello@veltexs.com' },
              { label: 'Phone', value: '+91 9485628238' },
              { label: 'Based in', value: '711, Plot A09, ITL Towers, Netaji Subhash Place, Pitampura,Delhi (110034)' },
              { label: 'Open to', value: 'Global Projects' },
            ].map((item) => (
              <div key={item.label} className="contact-info-item flex flex-col gap-1.5 border-l border-black/5 pl-6 hover:border-[#0066cc] transition-colors">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">{item.label}</span>
                <span className="font-serif text-2xl font-medium tracking-tight text-[#0f172a] sm:text-lg">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right col — form */}
        <form className="contact-form-container flex flex-col gap-6 bg-white p-10 rounded-xl border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] sm:p-0 sm:bg-transparent sm:border-none" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-name" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Full Name</label>
            <input id="cp-name" type="text" placeholder="Your name" className="bg-transparent border-none border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors placeholder:text-black/20 text-[#0f172a]" />
          </div>
          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-email" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Email</label>
            <input id="cp-email" type="email" placeholder="you@company.com" className="bg-transparent border-none border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors placeholder:text-black/20 text-[#0f172a]" />
          </div>
          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-type" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Service</label>
            <select id="cp-type" className="bg-transparent border-none border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors text-[#0f172a] cursor-pointer appearance-none">
              <option value="">Select a service</option>
              <option>Brand Identity</option>
              <option>Integrated Campaigns</option>
              <option>Digital Experience</option>
              <option>Optimization</option>
            </select>
          </div>
          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-message" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Message</label>
            <textarea id="cp-message" rows={4} placeholder="Tell us about your project..." className="bg-transparent border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors placeholder:text-black/20 text-[#0f172a] resize-none" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-3 bg-[#0066cc] text-white py-4 px-10 rounded-full font-sans text-[0.9rem] font-bold tracking-wide hover:bg-[#00aaff] transition-all duration-300 hover:-translate-y-1"
            id="contact-form-submit"
          >
            Send enquiry
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
