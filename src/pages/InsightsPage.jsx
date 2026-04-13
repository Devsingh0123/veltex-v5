import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DIFFERENCES = [
  {
    num: "01",
    title: "Strategy-Led Approach",
    desc: "We don't just deliver services or tick boxes. We diagnose real business problems and architect strategies designed specifically for scalable growth.",
    icon: "🎯"
  },
  {
    num: "02",
    title: "Performance-Driven Creativity",
    desc: "Aesthetics matter, but ROI rules. We deliver bold, jaw-dropping ideas that don’t just capture attention—they actively convert audiences into customers.",
    icon: "⚡"
  },
  {
    num: "03",
    title: "One Unified Team",
    desc: "No silos, no disjointed agency handoffs, no disconnects. Our strategists, creatives, and performance marketers operate seamlessly as one synchronized unit.",
    icon: "🤝"
  },
  {
    num: "04",
    title: "Outcome-Focused",
    desc: "We don't hide behind vanity metrics. Our success is measured exclusively by the tangible business impact and revenue growth we drive for your brand.",
    icon: "📈"
  }
];

export default function InsightsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo('.why-hero-element',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, stagger: 0.15, ease: 'expo.out', delay: 0.1 }
      );

      // Value Cards Animations
      gsap.utils.toArray('.why-value-card').forEach((card) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });

      // Massive CTA Reveal
      gsap.fromTo('.why-cta-block',
        { scale: 0.9, opacity: 0, y: 100 },
        {
          scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power4.out',
          scrollTrigger: { trigger: '.why-cta-container', start: 'top 75%' }
        }
      );

      gsap.fromTo('.why-cta-element',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: '.why-cta-container', start: 'top 70%' }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0b162c] min-h-screen font-sans text-white selection:bg-[#00aaff] selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 px-[6vw] sm:pt-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0066cc] opacity-20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <p className="why-hero-element font-sans text-[1rem] tracking-[0.3em] uppercase text-[#00aaff] mb-8 font-bold">(Why Veltex)</p>
          <h1 className="why-hero-element font-serif text-[clamp(3.5rem,7vw,8rem)] leading-[0.9] font-medium tracking-tighter mb-8 text-white">
            We don’t claim to be the best. <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f]">We prove it.</span>
          </h1>
          <p className="why-hero-element font-sans text-xl font-light text-white/50 max-w-[600px] leading-relaxed border-l-2 border-[#8cc63f] pl-6">
            We prove it through how we work, the strategies we design, and the tangible growth we deliver.
          </p>
        </div>
      </section>

      {/* 2. WHAT MAKES US DIFFERENT */}
      <section className="py-20 px-[6vw] bg-white text-[#0f172a] rounded-t-[4rem] sm:rounded-t-[2rem]">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16 sm:mb-10">
            <h2 className="why-hero-element font-serif text-[clamp(2.5rem,5vw,5rem)] leading-tight tracking-tighter">
              What Makes Us <em className="italic text-[#0066cc]">Different.</em>
            </h2>
          </div>

          {/* 2x2 Grid for Value Props */}
          <div className="grid gap-12 grid-cols-1">
            {DIFFERENCES.map((item, i) => (
              <div
                key={i}
                className="why-value-card group relative p-8 rounded-[2rem] border border-black/5 bg-[#f8f9fa] hover:bg-white hover:shadow-2xl hover:border-[#00aaff]/30 transition-all duration-700 overflow-hidden"
              >
                {/* Decorative Hover Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00aaff] to-[#8cc63f] opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-700 pointer-events-none" />

                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="font-serif text-5xl font-bold text-black/10 group-hover:text-[#00aaff] transition-colors duration-500">{item.num}</div>
                  <div className="text-3xl opacity-50 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-serif text-3xl font-medium mb-6 text-[#0f172a]">{item.title}</h3>
                  <p className="font-sans text-lg text-[#555] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FINAL CTA */}
      <section className="why-cta-container py-40 px-[6vw] bg-[#0f172a] relative overflow-hidden">
        {/* Complex energetic background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00aaff] via-[#0b162c] to-[#0b162c]" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="why-cta-block bg-gradient-to-b from-[#0066cc] to-[#0b162c] border border-white/10 p-10 rounded-[3rem] shadow-2xl backdrop-blur-md">

            <h2 className="why-cta-element font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[1] font-medium tracking-tighter text-white mb-10">
              Let’s Build Something <br />
              <em className="italic text-[#8cc63f]">That Lasts.</em>
            </h2>

            <p className="why-cta-element font-sans text-xl sm:text-lg text-white/70 font-light max-w-[700px] mx-auto leading-relaxed mb-16">
              Your brand deserves more than scattered marketing efforts. Let’s create a powerful, integrated strategy that drives real, measurable growth.
            </p>

            <div className="why-cta-element flex flex-col items-center gap-8">
              <button className="bg-[#8cc63f] hover:bg-white hover:text-[#0f172a] text-[#0f172a] font-sans font-bold text-lg px-12 py-5 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(140,198,63,0.4)]">
                <a href="https://wa.me/+919485628238"> Start the conversation today</a>
              </button>

              <a href="https://www.veltexs.com" target="_blank" rel="noreferrer" className="font-sans text-sm tracking-widest text-[#00aaff] hover:text-white transition-colors uppercase font-bold">
                🌐 www.veltexs.com
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
