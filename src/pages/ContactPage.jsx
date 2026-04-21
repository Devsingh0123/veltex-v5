import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios'; // Axios import kiya

// Backend API URL
const API_URL = 'https://veltex-v5.onrender.com/api/contact';

export default function ContactPage() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

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
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Axios automatically JSON mein convert karta hai aur headers set karta hai
      const response = await axios.post(API_URL, formData);

      // Axios mein status code check karne ki zaroorat nahi hoti (agar error hoga toh ye seedha catch mein jayega)
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', service: '', message: '' });
      }

    } catch (err) {
      // Axios error handling: response.data check karein agar backend ne msg bheja ho
      const errorMsg = err.response?.data?.message || 'Unable to connect to the server. Please check your connection.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.contact-label', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out', delay: 0.1 });
      gsap.from('.contact-page-heading', { y: 80, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.3 });
      gsap.from('.contact-info-item', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.6 });
      gsap.from('.contact-form-container', { y: 60, opacity: 0, scale: 0.98, duration: 0.9, ease: 'power3.out', delay: 0.8 });
      gsap.from('.contact-page-form-group', { y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 1.0 });
      gsap.from('#contact-form-submit', { y: 30, opacity: 0, scale: 0.9, duration: 0.7, ease: 'back.out(1.3)', delay: 1.4 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-16 px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a] sm:pt-20">
      <div className="grid gap-20 items-start max-w-[1400px] mx-auto grid-cols-1 sm:gap-12">
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
              { label: 'Based in', value: '711, Plot A09, ITL Towers, Netaji Subhash Place, Pitampura, Delhi (110034)' },
              { label: 'Open to', value: 'Across India & Global Projects' },
            ].map((item) => (
              <div key={item.label} className="contact-info-item flex flex-col gap-1.5 border-l border-black/5 pl-6 hover:border-[#0066cc] transition-colors">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">{item.label}</span>
                <span className="font-serif text-2xl font-medium tracking-tight text-[#0f172a] sm:text-lg">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          className="contact-form-container flex flex-col gap-6 bg-white p-10 rounded-xl border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] sm:p-0 sm:bg-transparent sm:border-none"
          onSubmit={handleSubmit}
        >
          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-name" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Full Name</label>
            <input
              id="cp-name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent border-none border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors placeholder:text-black/20 text-[#0f172a]"
            />
          </div>

          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-email" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Email</label>
            <input
              id="cp-email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-none border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors placeholder:text-black/20 text-[#0f172a]"
            />
          </div>

          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-service" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Service</label>
            <div className="relative max-w-[280px]">
              <select
                id="cp-service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-transparent border-none border-b border-black/15 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-[#0066cc] transition-colors text-[#0f172a] cursor-pointer appearance-none pr-8 pl-4"
              >
                <option value="">Select a service</option>
                <option>Brand Identity</option>
                <option>Integrated Campaigns</option>
                <option>Digital Experience</option>
                <option>Optimization</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black/30">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="contact-page-form-group flex flex-col gap-2">
            <label htmlFor="cp-message" className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-[#0f172a] font-semibold">Message</label>
            <textarea
              id="cp-message"
              rows={4}
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-transparent border-b border-black/15 py-3 font-sans text-lg focus:outline-none focus:border-[#0066cc] transition-colors placeholder:text-black/20 text-[#0f172a] resize-none"
            />
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-6 py-4 font-sans text-[0.85rem]">
              ✅ Your message has been sent successfully! We will contact you shortly.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-6 py-4 font-sans text-[0.85rem]">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            id="contact-form-submit"
            disabled={loading}
            className="inline-flex items-center gap-3 bg-[#0066cc] text-white py-4 px-10 rounded-full font-sans text-[0.9rem] font-bold tracking-wide hover:bg-[#00aaff] transition-all duration-300 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send enquiry
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
