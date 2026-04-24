import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

// Backend API URL
const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api/contact'
  : 'https://veltex-v5-production.up.railway.app/api/contact';

const SERVICES = [
  {
    category: "Brand Solutions", items: [
      "Social Media Management", "Original Content and Copywriting", "Graphic Design & Illustrations",
      "Video Editing and Animation", "Film Production & Photography", "Campaign Planning",
      "Veltex Fluence & ORM", "Print, OOH, Mainline Advertising", "New Brand Launch and Rebranding"
    ]
  },
  {
    category: "Media Solutions", items: [
      "Media Planning & Buying", "Performance Marketing", "Programmatic Advertising",
      "Market Research & Insights", "SEO & Organic Growth", "Influencer Media Strategy"
    ]
  },
  {
    category: "Tech Solutions", items: [
      "UI/UX Design & Prototyping", "Web & App Development", "CRM & CMS Implementation",
      "Marketing Automation", "Custom API Integrations", "E-commerce Architectures"
    ]
  },
  {
    category: "Communications Platform (CPaaS)", items: [
      "Transforming Customer Engagement in the Digital Age",
      "WhatsApp Business Messaging (WABA)",
      "Rich Communication Service (RCS)",
      "SMS Solutions",
      "Email – Enterprise Platform",
      "Enterprise Voice Platform"
    ]
  },
  { category: "Other", items: ["Other (General Inquiry)"] }
];

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('cp-', '');
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (val) => {
    setFormData(prev => ({ ...prev, service: val }));
    setIsSelectOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.custom-select-container')) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    try {
      // 1. Save to DB
      const response = await axios.post(API_URL, formData);

      // 2. Send Email via Web3Forms
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: "2385f6db-069f-4113-b9a0-87838fa0bba2",
          subject: `New Project Enquiry: ${formData.name}`,
          from_name: "Veltex Studio",
          replyto: formData.email,
          message: `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service || 'Not specified'}\nMessage: ${formData.message}`
        })
      });

      const web3Result = await web3Response.json();
      if (response.data.success && web3Result.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', service: '', message: '' });
      } else if (!web3Result.success) {
        setError("Email could not be sent: " + web3Result.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Smooth Reveal for Hero Section
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('.contact-label', { opacity: 0, y: 30, duration: 1.2, delay: 0.2 })
        .from('.contact-page-heading', { y: 100, opacity: 0, duration: 1.5 }, '-=1')
        .from('.contact-info-block', { x: -30, opacity: 0, duration: 1, stagger: 0.15 }, '-=1.2')
        .from('.contact-form-container', { scale: 0.95, opacity: 0, duration: 1.4 }, '-=1.2')
        .from('.contact-page-form-group', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=1')
        .from('#contact-form-submit', { y: 20, opacity: 0, scale: 0.9, duration: 0.8 }, '-=0.6');

      // Subtle Background Shape Animation
      gsap.to('.bg-glow', { x: '20%', y: '10%', duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative pt-32 pb-40 px-[5vw] md:px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a] overflow-hidden">

      {/* Dynamic Background Glows */}
      <div className="bg-glow absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#0066cc]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="bg-glow absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#0066cc]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* TOP SECTION: Studio Header */}
        <div className="mb-10 md:mb-15 border-b border-[#0f172a]/5 pb-10">
          <p className="contact-label font-sans text-[0.8rem] sm:text-[0.85rem] tracking-[0.5em] uppercase text-[#0066cc] mb-10 font-bold">
            (Connect with us)
          </p>
          <h1 className="contact-page-heading font-serif text-[clamp(2.5rem,5.5vw,6rem)] font-medium leading-[1.05] tracking-tighter text-[#0f172a] w-full">
            For project enquiries,<em className="italic font-normal text-[#0066cc]"> collaborations, </em>or joining the <em className="italic font-normal text-[#0f172a]">studio.</em>
          </h1>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-14 pt-2">
            <div className="contact-info-block flex flex-col gap-4 group cursor-default">
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#888] font-bold">Direct Line</span>
              <a href="mailto:Hello@veltexs.com" className="font-serif text-[1.9rem] leading-none tracking-tight text-[#0f172a] group-hover:text-[#0066cc] transition-all duration-500 relative inline-block w-fit">
                Hello@veltexs.com
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-[#0066cc] group-hover:w-full transition-all duration-500" />
              </a>
            </div>

            <div className="contact-info-block flex flex-col gap-4 group cursor-default">
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#888] font-bold">Business Call</span>
              <a href="tel:+919485628238" className="font-serif text-[1.9rem] leading-none tracking-tight text-[#0f172a] group-hover:text-[#0066cc] transition-all duration-500 relative inline-block w-fit">
                +91 9485628238
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-[#0066cc] group-hover:w-full transition-all duration-500" />
              </a>
            </div>

            <div className="contact-info-block flex flex-col gap-4 group cursor-default">
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#888] font-bold">Studio Hub</span>
              <p className="font-sans text-[1.05rem] leading-[1.65] text-[#444] max-w-[320px] group-hover:text-[#0f172a] transition-colors duration-500">
                711, Plot A09, ITL Towers, Netaji Subhash Place, Pitampura, Delhi (110034)
              </p>
            </div>

            <div className="contact-info-block flex flex-col gap-4 group cursor-default">
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#888] font-bold">Operating Locally</span>
              <p className="font-sans text-[1.05rem] leading-[1.65] text-[#444] max-w-[300px] group-hover:text-[#0f172a] transition-colors duration-500">
                Across India & Global Creative Projects
              </p>
            </div>
          </div>

          {/* Right: Premium Glass Form */}
          <div className="contact-form-container lg:col-span-8 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/5 to-transparent rounded-[40px] -m-1 blur-sm opacity-50" />
            <form
              className="relative flex flex-col gap-10 w-full bg-white/80 backdrop-blur-xl p-10 sm:p-14 md:p-16 rounded-[40px] border border-[#0f172a]/5 shadow-[0_30px_100px_-20px_rgba(15,23,42,0.05)]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <h2 className="font-serif text-[2.8rem] font-medium text-[#0f172a] leading-none mb-4 tracking-tight">Send a message</h2>
                <p className="font-sans text-[0.9rem] text-[#64748b] max-w-[500px]">Fill out the form below and we will get back to you within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="contact-page-form-group flex flex-col gap-3">
                  <label htmlFor="cp-name" className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-[#0f172a] font-black ml-1">
                    Your Name <span className="text-[#0066cc] opacity-60">*</span>
                  </label>
                  <input
                    id="cp-name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#f8fafc] border border-[#0f172a]/5 rounded-2xl px-6 py-5 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc]/30 focus:ring-[10px] focus:ring-[#0066cc]/5 transition-all duration-500 text-[#0f172a] placeholder:text-slate-300 shadow-inner"
                  />
                </div>

                <div className="contact-page-form-group flex flex-col gap-3">
                  <label htmlFor="cp-email" className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-[#0f172a] font-black ml-1">
                    Email Address <span className="text-[#0066cc] opacity-60">*</span>
                  </label>
                  <input
                    id="cp-email"
                    type="email"
                    placeholder="hello@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#f8fafc] border border-[#0f172a]/5 rounded-2xl px-6 py-5 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc]/30 focus:ring-[10px] focus:ring-[#0066cc]/5 transition-all duration-500 text-[#0f172a] placeholder:text-slate-300 shadow-inner"
                  />
                </div>
              </div>

              {/* CUSTOM PREMIUM SELECT */}
              <div className="contact-page-form-group flex flex-col gap-3 relative z-50 custom-select-container">
                <label className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-[#0f172a] font-black ml-1">
                  What are you looking for? <span className="text-[#0066cc] opacity-60">*</span>
                </label>

                <div
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className={`w-full bg-[#f8fafc] border border-[#0f172a]/5 rounded-2xl px-6 py-5 font-sans text-[1rem] cursor-pointer flex items-center justify-between transition-all duration-500 ${isSelectOpen ? 'ring-[10px] ring-[#0066cc]/5 border-[#0066cc]/30' : 'hover:border-[#0066cc]/20'} shadow-inner`}
                >
                  <span className={formData.service ? 'text-[#0f172a]' : 'text-slate-300 italic'}>
                    {formData.service || "Select a service..."}
                  </span>
                  <motion.div
                    animate={{ rotate: isSelectOpen ? 180 : 0 }}
                    className="text-[#0f172a]/30"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isSelectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-3xl border border-[#0f172a]/10 shadow-[0_30px_80px_rgba(15,23,42,0.18)] overflow-hidden z-[100] max-h-[500px] flex flex-col"
                    >
                      <div
                        data-lenis-prevent
                        className="overflow-y-auto py-6 custom-scrollbar overscroll-contain"
                      >
                        {SERVICES.map((cat, idx) => (
                          <div key={idx} className="mb-4 px-2">
                            <span className="px-5 py-2 block font-sans text-[0.65rem] tracking-[0.2em] font-black uppercase text-[#0066cc] opacity-40">
                              {cat.category}
                            </span>
                            {cat.items.map((item, i) => (
                              <div
                                key={i}
                                onClick={() => handleServiceSelect(item)}
                                className={`px-5 py-3.5 font-sans text-[0.95rem] hover:bg-[#f8fafc] hover:text-[#0066cc] cursor-pointer transition-colors flex items-center justify-between group/opt ${formData.service === item ? 'text-[#0066cc] font-bold' : 'text-[#0f172a]'}`}
                              >
                                {item}
                                {formData.service === item && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="contact-page-form-group flex flex-col gap-3">
                <label htmlFor="cp-message" className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-[#0f172a] font-black ml-1">
                  Project Context <span className="text-[#0066cc] opacity-60">*</span>
                </label>
                <textarea
                  id="cp-message"
                  rows={5}
                  placeholder="Tell us about your brand, goals, and any specific challenges you're facing..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#f8fafc] border border-[#0f172a]/5 rounded-2xl px-6 py-5 font-sans text-[1rem] focus:outline-none focus:border-[#0066cc]/30 focus:ring-[10px] focus:ring-[#0066cc]/5 transition-all duration-500 text-[#0f172a] placeholder:text-slate-300 shadow-inner resize-none"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  id="contact-form-submit"
                  disabled={loading}
                  className="group relative w-full sm:w-fit overflow-hidden bg-[#0f172a] text-white py-5 px-14 rounded-full font-sans text-[1rem] font-black tracking-[0.1em] uppercase transition-all duration-700 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {loading ? "Processing..." : (
                      <>
                        Send Inquiry
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-500 group-hover:translate-x-2 rotate-[315deg]">
                          <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-[#0066cc] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
