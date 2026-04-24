import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

// Backend API URL
const API_URL = 'https://veltex-v5-production.up.railway.app/api/contact';

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('cp-', '');
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // SUBMIT HANDLER USING AXIOS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    try {
      const response = await axios.post(API_URL, formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', service: '', message: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect to the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.contact-label', { opacity: 0, y: -20, duration: 1, ease: 'power3.out', delay: 0.1 });
      gsap.from('.contact-page-heading', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.from('.contact-info-block', { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power2.out', delay: 0.4 });
      gsap.from('.contact-form-container', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.from('.contact-page-form-group', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 });
      gsap.from('#contact-form-submit', { y: 20, opacity: 0, scale: 0.95, duration: 0.6, ease: 'back.out(1.5)', delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-32 px-[5vw] md:px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a]">
      <div className="max-w-[1400px] mx-auto">

        {/* TOP SECTION: Full Width Heading */}
        <div className="mb-10 md:mb-10 border-b border-[#0f172a]/10 pb-16">
          <p className="contact-label font-sans text-[0.8rem] sm:text-[0.9rem] tracking-[0.4em] uppercase text-[#666] mb-8 font-semibold">
            (Get in touch)
          </p>
          <h1 className="contact-page-heading font-serif text-[clamp(3rem,7vw,9rem)] font-medium leading-[0.95] tracking-tighter text-[#0f172a] w-full">
            For project enquiries, <em className="italic font-normal text-[#0066cc]">collaborations, </em>or joining the studio.
          </h1>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left: Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-12 pt-4">
            <div className="contact-info-block flex flex-col gap-3 group">
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#888] font-semibold">Email Us</span>
              <a href="mailto:Hello@veltexs.com" className="font-serif text-[1.8rem] leading-none tracking-tight text-[#0f172a] hover:text-[#0066cc] transition-colors duration-300">
                Hello@veltexs.com
              </a>
            </div>

            <div className="contact-info-block flex flex-col gap-3 group">
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#888] font-semibold">Call Us</span>
              <a href="tel:+919485628238" className="font-serif text-[1.8rem] leading-none tracking-tight text-[#0f172a] hover:text-[#0066cc] transition-colors duration-300">
                +91 9485628238
              </a>
            </div>

            <div className="contact-info-block flex flex-col gap-3 group">
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#888] font-semibold">Visit Us</span>
              <p className="font-sans text-[1rem] leading-[1.6] text-[#444] max-w-[300px]">
                711, Plot A09, ITL Towers, Netaji Subhash Place, Pitampura, Delhi (110034)
              </p>
            </div>

            <div className="contact-info-block flex flex-col gap-3 group">
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#888] font-semibold">Open To</span>
              <p className="font-sans text-[1rem] leading-[1.6] text-[#444] max-w-[300px]">
                Across India & Global Projects
              </p>
            </div>
          </div>

          {/* Right: Beautiful Clear Form */}
          <form
            className="contact-form-container lg:col-span-8 flex flex-col gap-8 w-full bg-[#f8fafc] p-8 sm:p-12 md:p-14 rounded-[32px] border border-[#0f172a]/5 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <h2 className="font-serif text-[2.5rem] font-medium text-[#0f172a] leading-none mb-3">Send a message</h2>
              <p className="font-sans text-[1rem] text-[#666]">Fill out the form below and we will get back to you within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="contact-page-form-group flex flex-col gap-2">
                <label htmlFor="cp-name" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#0f172a] font-bold ml-1">
                  Full Name <span className="text-[#0066cc]">*</span>
                </label>
                <input
                  id="cp-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-black/10 rounded-2xl px-5 py-4 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 transition-all text-[#0f172a] placeholder:text-black/30 shadow-sm"
                />
              </div>

              <div className="contact-page-form-group flex flex-col gap-2">
                <label htmlFor="cp-email" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#0f172a] font-bold ml-1">
                  Email Address <span className="text-[#0066cc]">*</span>
                </label>
                <input
                  id="cp-email"
                  type="email"
                  placeholder="you@veltex.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-black/10 rounded-2xl px-5 py-4 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 transition-all text-[#0f172a] placeholder:text-black/30 shadow-sm"
                />
              </div>
            </div>

            <div className="contact-page-form-group flex flex-col gap-2">
              <label htmlFor="cp-service" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#0f172a] font-bold ml-1">
                Service Required <span className="text-[#0066cc]">*</span>
              </label>
              <div className="relative w-full">
                <select
                  id="cp-service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white border border-black/10 rounded-2xl px-5 py-4 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 transition-all shadow-sm appearance-none cursor-pointer pr-12 ${formData.service === '' ? 'text-black/30' : 'text-[#0f172a]'}`}
                >
                  <option value="" disabled className="text-black/30">Select an option...</option>
                  <option value="Brand Identity" className="text-[#0f172a]">Brand Identity</option>
                  <option value="Integrated Campaigns" className="text-[#0f172a]">Integrated Campaigns</option>
                  <option value="Digital Experience" className="text-[#0f172a]">Digital Experience</option>
                  <option value="Optimization" className="text-[#0f172a]">Optimization</option>
                  <option value="Other" className="text-[#0f172a]">Other</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="contact-page-form-group flex flex-col gap-2">
              <label htmlFor="cp-message" className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-[#0f172a] font-bold ml-1">
                Project Details <span className="text-[#0066cc]">*</span>
              </label>
              <textarea
                id="cp-message"
                rows={4}
                placeholder="Tell us about your goals, timeline, and budget..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white border border-black/10 rounded-2xl px-5 py-4 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/10 transition-all text-[#0f172a] placeholder:text-black/30 shadow-sm resize-none"
              />
            </div>

            {success && (
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] rounded-2xl p-5 font-sans text-[0.95rem] flex items-center gap-4 shadow-sm transition-all">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-green-800">Success!</h4>
                  <p>Your message has been sent. We'll be in touch shortly.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] rounded-2xl p-5 font-sans text-[0.95rem] flex items-center gap-4 shadow-sm transition-all">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-red-800">Error</h4>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="mt-4">
              <button
                type="submit"
                id="contact-form-submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-3 bg-[#0f172a] text-white py-4 px-10 rounded-full font-sans text-[0.95rem] font-bold tracking-[0.05em] uppercase hover:bg-[#0066cc] hover:shadow-[0_10px_30px_rgba(0,102,204,0.2)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 rotate-[315deg]">
                      <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
