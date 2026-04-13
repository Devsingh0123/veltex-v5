import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useWorkAnimation } from '../../hooks/useScrollAnimations';

const PROJECTS = [
  {
    id: 1,
    title: 'Strategy ',
    subtitle: 'IMC Strategy & Planning',
    desc: 'A customised integrated marketing communication plan — audience intelligence, objective mapping, message architecture, channel sequencing — built specifically for your industry, market, and growth stage. This is where every campaign begins.',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Creative ',
    subtitle: 'Campaign Execution',
    desc: 'We develop your brand voice, tone, and creative concept — then pressure-test every asset against your core message before a single piece of content goes live. Consistency is designed in, not added later.',
    thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 1,
    title: 'Integration ',
    subtitle: 'Full-Channel Integration',
    desc: 'Social, search, display, influencer, print, outdoor, broadcast — we don’t pick favourites. We deploy the right channel mix for your audience and sequence it to build cumulative momentum across the entire campaign.',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Campaign ',
    subtitle: 'Creative & Messaging Alignment',
    desc: 'From asset production to media buying to launch coordination — we manage the full execution with synchronised timing and creative across every platform, so the launch lands as one coherent brand moment.',
    thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80',
  },

];

export default function Work() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const [active, setActive] = useState(0);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const labelRef = useRef(null);
  const navigate = useNavigate();

  useWorkAnimation({ sectionRef });

  const addWordRef = (el) => {
    if (el) wordRefs.current.push(el);
  };

  const handleSwitch = (index) => {
    if (index === active) return;

    // Animate out
    const tl = gsap.timeline();
    if (titleRef.current) tl.to(titleRef.current, { y: -30, opacity: 0, duration: 0.3, ease: 'power3.in' });
    if (descRef.current) tl.to(descRef.current, { y: -20, opacity: 0, duration: 0.25, ease: 'power3.in' }, 0);
    if (labelRef.current) tl.to(labelRef.current, { opacity: 0, duration: 0.2 }, 0);

    tl.call(() => {
      setActive(index);
    });

    // Animate in
    tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' });
    tl.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.4');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const proj = PROJECTS[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ffffff] text-[#0f172a] pt-14  "
      id="work"
      aria-label="Selected work"
    ><div className=" px-[6vw]  overflow-hidden">
        <p className="work-label font-sans text-[1rem] font-bold tracking-[0.3em] uppercase text-[#666] py-4 ">(Our Work)</p>

        {/* Large editorial headline - Optimized for Fluid Wrapping */}
        <h2 className="font-serif text-[clamp(2.2rem,5vw,6rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[#0f172a] mt-4">
          <span ref={addWordRef} className="work-headline-word inline-block mr-2">We deliver integrated marketing</span>
          <span ref={addWordRef} className="work-headline-word inline-block mr-2">solutions —</span>
          <em ref={addWordRef} className="work-headline-word italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] inline-block py-1 pr-2 drop-shadow-sm">not isolated services.</em>
        </h2>

        <p className="work-description font-sans text-[clamp(0.95rem,1.2vw,1.125rem)] font-light leading-[1.75] text-[#555] max-w-[800px] mb-16">
          We offer the full spectrum of integrated marketing — not as a menu of standalone services, but as a connected ecosystem designed to make each part more powerful than it would be alone.
        </p>
      </div>

      {/* Project Gallery - Full Width Image with Enhanced Overlay */}
      <div className="work-project-gallery relative w-full h-[80vh] min-h-[600px] max-h-[800px] overflow-hidden rounded-sm shadow-2xl">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            className="work-bg-image w-full h-full object-cover transition-all duration-1000 ease-out hover:scale-110"
            style={{ transform: 'scale(1.05)' }}
            src={proj.bg}
            alt={proj.title}
            loading="eager"
          />
        </div>

        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Content Overlay with Enhanced Styling */}
        <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between px-[8vw] md:px-[10vw] py-6 sm:py-0">
          {/* Left Side - Thumbnails */}
          <div className="flex flex-col gap-8">
            {/* Thumbnail Switcher */}
            <div className="flex  gap-4">
              {PROJECTS.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => handleSwitch(index)}
                  className={`work-thumbnail group relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-500 transform ${index === active
                    ? 'border-white scale-110 shadow-2xl ring-2 ring-white/20'
                    : 'border-white/20 hover:border-white/60 hover:scale-105 hover:shadow-xl'
                    }`}
                  aria-label={`View project: ${project.title}`}
                >
                  <img
                    src={project.thumb}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Active Indicator */}
                  {index === active && (
                    <div className="absolute inset-0 bg-white/20" />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Hint */}
            <div className="hidden md:block">
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/40">
                Click to explore
              </p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="work-project-content max-w-[600px] text-white space-y-4 sm:space-y-8 sm:pt-0 pt-6">
            {/* Project Counter */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-white/30 w-12" />
              <p ref={labelRef} className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-white/60 font-medium">
                What We Do {String(active + 1).padStart(2, '0')} OF {String(PROJECTS.length).padStart(2, '0')}
              </p>
            </div>

            {/* Project Title with Enhanced Typography */}
            <div className="space-y-4">
              <h3 ref={titleRef} className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white">
                {proj.title}
                <br />
                <em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00aaff] to-[#8cc63f] block mt-2">{proj.subtitle}</em>
              </h3>

              {/* Project Description */}
              <p ref={descRef} className="font-sans text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.8] text-white/85 max-w-[500px] font-light">
                {proj.desc}
              </p>
            </div>

            {/* View Project Button with Background Color */}
            <button
              onClick={handleContact}
              className="work-cta-button inline-flex items-center gap-3 font-sans text-[0.85rem] font-medium tracking-wide text-white bg-gradient-to-r from-[#0066cc] to-[#00aaff] border-none px-8 py-3 rounded-full cursor-pointer transition-all duration-300 hover:from-[#00aaff] hover:to-[#8cc63f] hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,170,255,0.3)] hover:shadow-[0_8px_24px_rgba(140,198,63,0.4)]"
            >
              Contact Us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M2 14L14 2M14 2H6M14 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 text-white/20">
          <div className="text-[8rem] font-serif font-light leading-none opacity-30">
            {String(active + 1).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}