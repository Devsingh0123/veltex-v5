import React, { useRef } from 'react';
import { useContactAnimation } from '../../hooks/useScrollAnimations';

export default function Contact() {
  const sectionRef = useRef(null);

  useContactAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f0e8] text-[#1a1a1a] py-[10rem] px-[6vw] pb-[12rem] overflow-hidden border-t border-black/8"
      id="contact"
      aria-label="Contact Veltex"
    >
      <div className="grid grid-cols-1 gap-16 items-start">
        <div>
          <p className="contact-label font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#666] mb-10">
            (Get in touch)
          </p>

          <h2 className="contact-heading font-serif text-[clamp(2.5rem,4.5vw,6rem)] font-medium leading-[1.05] tracking-[-0.025em] mb-12 text-[#1a1a1a]">
            For project enquiries,
            <br />
            <em className="italic font-normal text-[#d44b1e]">collaborations,</em>
            <br />
            or joining the studio.
          </h2>

          <div className="contact-actions flex items-center gap-4 flex-wrap">
            <a
              href="mailto:iamdevsingh123@gmail.com"
              className="contact-submit-btn inline-flex items-center gap-2 font-sans text-[0.9rem] font-medium text-white bg-[#d44b1e] px-9 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#e85c2a] hover:-translate-y-[2px] tracking-wide outline-none"
              aria-label="Send an enquiry email to Veltex"
              id="contact-enquiry-btn"
            >
              Send an enquiry
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a
              href="https://portfolio-one-theta-4m2dytpi73.vercel.app/"
              className="contact-submit-btn inline-flex items-center gap-2 font-sans text-[0.9rem] font-medium text-white bg-[#1a1a1a] px-9 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#333] hover:-translate-y-[2px] tracking-wide outline-none"
              aria-label="Book a discovery call with Veltex"
              id="contact-call-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
            </a>
          </div>

          {/* Subtle info row */}
          <div className="contact-info-row mt-16 pt-8 border-t border-black/10 flex gap-12 sm:flex-col sm:gap-6">
            {[
              { label: 'Email', value: 'hello@veltex.studio' },
              { label: 'Phone', value: '+91 11 4110 3510' },
              { label: 'Based in', value: '711, Plot A09, ITL Towers, Netaji Subhash Place, Pitampura,Delhi (110034)' },
              { label: 'Open to', value: 'Global Projects' },
            ].map((item) => (
              <div key={item.label} className="contact-info-item">
                <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mb-1.5">
                  {item.label}
                </p>
                <p className="font-sans text-[0.9rem] font-normal text-[#1a1a1a]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

