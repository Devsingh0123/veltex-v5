import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  {
    num: "01",
    title: "DISCOVER",
    heading: "Audience & market intelligence",
    desc: "We map your audience's journey, motivations, and media habits — not to confirm assumptions, but to challenge them.",
  },
  {
    num: "02",
    title: "DEFINE",
    heading: "Objectives & message hierarchy",
    desc: "We set clear, measurable objectives and build the message architecture your campaign will live and die by.",
  },
  {
    num: "03",
    title: "DESIGN",
    heading: "Creative & channel strategy",
    desc: "Channel mix, creative concept, and sequencing — engineered to build momentum, not scatter attention.",
  },
  {
    num: "04",
    title: "DEPLOY",
    heading: "Synchronised execution",
    desc: "Assets, timing, and messaging go live in sync — across every relevant platform, without contradiction.",
  },
  {
    num: "05",
    title: "OPTIMISE",
    heading: "Performance & iteration",
    desc: "We track cross-channel results against shared goals and continuously refine spend, creative, and messaging.",
  },
];

export default function ProcessPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      gsap.fromTo('.process-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      gsap.utils.toArray('.process-page-line').forEach((line, index) => {
        gsap.fromTo(line,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 + (index * 0.15) }
        );
      });

      // Timeline line drawing
      gsap.fromTo('.process-progress-line',
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-timeline-container',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      );

      // Steps stagger animation
      gsap.utils.toArray('.process-page-step').forEach((step, index) => {

        // Dot activation
        const dot = step.querySelector('.process-dot');
        const glow = step.querySelector('.process-glow');
        if (dot) {
          gsap.to(dot, {
            backgroundColor: '#00aaff',
            scale: 1.5,
            scrollTrigger: {
              trigger: step,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          });
          gsap.to(glow, {
            opacity: 1,
            scale: 2,
            scrollTrigger: {
              trigger: step,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          });
        }

        // Content slide in
        const content = step.querySelector('.step-content-box');
        gsap.fromTo(content,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
            }
          }
        );

        // Huge background number floating
        const bgNum = step.querySelector('.bg-number');
        gsap.fromTo(bgNum,
          { y: -30, opacity: 0 },
          {
            y: 0, opacity: 0.05, duration: 1.5, ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 80%' }
          }
        );

        // Optional subtle parallax on bgNum
        gsap.to(bgNum, {
          y: 50,
          scrollTrigger: {
            trigger: step,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-28 pb-20 px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a] sm:pt-20">
      {/* Hero Section */}
      <div className="max-w-[1200px] mb-16 sm:mb-12 pl-8 md:pl-0">
        <p className="process-label font-sans text-[1rem] tracking-[0.3em] uppercase text-[#0066cc] mb-6 font-bold">(Our Methodology)</p>
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,6rem)] font-medium leading-[1.05] tracking-tighter text-[#0f172a] w-full">
         
            <span className="process-page-line will-change-transform">One strategy{" "}</span>
          
      
            <span className="process-page-line  will-change-transform">
              <em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] pr-2">Every channel{" "}</em>
            </span>
        
            <span className="process-page-line  will-change-transform">
              <em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00aaff] to-[#8cc63f] pr-2">No exceptions.</em>
            </span>
    
        </h1>
        <p className="process-page-line mt-6 font-sans text-[clamp(1.1rem,1.4vw,1.3rem)] font-light leading-[1.7] text-[#555] w-full">
          Integrated Marketing Communication is how we work — not a service we upsell. From the first brief to the final campaign report, everything we do is built on one unified foundation.
        </p>
      </div>

      {/* Interactive Timeline Process */}
      <div className="process-timeline-container relative max-w-[1000px] mx-auto mt-20 pt-10">
        {/* Background Track Line */}
        <div className="absolute left-[39px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-[#f0f0f0]" />

        {/* Animated Gradient Line filled by scroll */}
        <div className="process-progress-line absolute left-[39px] sm:left-[19px] top-0 w-[2px] bg-gradient-to-b from-[#0066cc] via-[#00aaff] to-[#8cc63f] z-10 origin-top rounded-full" />

        <div className="flex flex-col gap-10 sm:gap-24 relative z-20">
          {STEPS.map((step, index) => (
            <div key={step.num} className="process-page-step relative flex items-start gap-2 sm:gap-8">

              {/* Timeline Dot */}
              <div className="relative mt-8 sm:mt-6 shrink-0 flex items-center justify-center w-[80px] sm:w-[40px]">
                <div className="process-glow absolute w-8 h-8 rounded-full bg-[#00aaff]/30 opacity-0 blur-md transition-opacity duration-300" />
                <div className="process-dot w-3 h-3 rounded-full bg-[#ccc] z-10 transition-colors duration-300" />
              </div>

              {/* Step Content */}
              <div className="step-content-box relative flex-1 pt-4 bg-white/50 backdrop-blur-sm rounded-3xl p-2 sm:p-6 border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,102,204,0.08)] hover:border-[#00aaff]/20 transition-all duration-500 group overflow-hidden">

                {/* Floating Huge Number */}
                <div className="bg-number absolute -right-4 -top-8 font-serif text-[12rem] sm:text-[8rem] font-bold leading-none text-[#0066cc] opacity-5 pointer-events-none select-none tracking-tighter">
                  {step.num}
                </div>

                <div className="relative z-10">
                  <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-2 text-[#0f172a] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#0f172a] group-hover:to-[#0066cc] transition-colors duration-500">
                    {step.title}
                  </h2>
                  <h3 className="font-sans text-[clamp(1.1rem,1.4vw,1.3rem)] font-medium leading-relaxed mb-6 text-[#00aaff]">
                    {step.heading}
                  </h3>
                  <p className="font-sans text-[clamp(1rem,1.1vw,1.1rem)] leading-[1.8] text-[#555] max-w-[550px] font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
