import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image1 from "../assets/about/1.avif"
import image2 from "../assets/about/2.avif"
import image3 from "../assets/about/3.avif"
import image5 from "../assets/about/5.avif"

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      gsap.fromTo('.about-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      gsap.utils.toArray('.about-page-line').forEach((line, index) => {
        gsap.fromTo(line,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.4 + (index * 0.15) }
        );
      });

      // Scatter images
      gsap.utils.toArray('.about-page-scatter-img').forEach((img, index) => {
        gsap.fromTo(img,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 85%' }
          }
        );

        // Parallax
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -30 - (index * 10),
          ease: 'none',
        });
      });

      // Sections reveal
      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' }
          }
        );
      });

      // Stats counting animation
      gsap.utils.toArray('.about-stat-number').forEach((stat) => {
        const finalValue = stat.innerText;
        const isPlus = finalValue.includes('+');
        const numValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));

        gsap.fromTo(stat,
          { innerHTML: 0 },
          {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            innerHTML: numValue,
            duration: 1.8,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
              stat.innerText = Math.floor(this.targets()[0].innerHTML) + (isPlus ? '+' : '');
            },
            onComplete: function () {
              stat.innerText = finalValue;
            }
          });
      });

      // Value cards stagger
      gsap.fromTo('.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 75%' }
        }
      );

      // Expertise pills
      gsap.fromTo('.expertise-pill',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, stagger: 0.05, duration: 0.6, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.expertise-container', start: 'top 80%' }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const values = [
    { title: 'Fearless Creativity', desc: 'Ideas that capture attention and stay memorable' },
    { title: 'Strategic Backbone', desc: 'Every decision backed by data and insight' },
    { title: 'True Integration', desc: 'Unified messaging across all platforms' },
    { title: 'Radical Ownership', desc: 'We treat your brand like our own' }
  ];

  const philosophy = [
    'Marketing works best when everything works together',
    'The brief is a starting point, not a limitation',
    'Bold ideas outperform safe, predictable campaigns',
    'Our Commitment to Excellence'
  ];

  const definesUs = [
    'Strategy-first approach with creativity embedded in execution',
    'Seamless Execution - From concept to campaign launch, our end-to-end service ensures flawless implementation across all channels.',
    'Intuitive platform that eliminates the complexity of media buying, putting thousands of options at your fingertips',
    'Craft data-driven strategies aligned with your business objectives.',
    'Transparent Process with Real-time tracking, detailed analytics, and clear communication keep you informed every step of the way.',
    'Focus on real outcomes, not just aesthetics',
    'Integrated thinking across every marketing touchpoint'
  ];

  const expertise = [
    'Brand Strategy', 'Integrated Campaigns', 'Digital & Social Media',
    'Paid Media & Performance Marketing', 'PR & Influencer Marketing',
    'Content & Activations', 'Outdoor, Print & Events'
  ];

  return (
    <div ref={containerRef} className="pt-28 pb-16 px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a] sm:pt-20">
      {/* Hero Section */}
      <div className="max-w-[1200px] mb-12 sm:mb-10">
        <div className="about-label font-sans text-[1rem] tracking-[0.3em] uppercase text-[#0066cc] mb-6 font-bold">(About Us)</div>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,6rem)] font-medium leading-[1.1] tracking-[-0.01em] text-[#0f172a] w-full max-w-none">

          <span className="about-page-line will-change-transform">{" "}<span className="about-page-line  will-change-transform"> <em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] drop-shadow-sm pr-2">Empowering Every Brand to Shine</em></span>
          </span>



        </h1>
        <p className="about-page-line mt-10 font-sans text-[clamp(0.9rem,1.3vw,1.4rem)] font-light leading-relaxed text-[#555] w-full">
          <em className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#0066cc] to-[#0066cc] drop-shadow-sm pr-2">At Veltex</em>
          , we believe that every business, regardless of size or industry, deserves the power to tell their story and reach their audience. <br /> Since 2013, we've been on a mission to democratize advertising in India, making professional media planning and execution accessible <br />  to  all.
        </p>
        <p className="about-page-line mt-6 font-sans text-[clamp(0.9rem,1.3vw,1.4rem)] font-light leading-relaxed text-[#555] w-full">
          With over a decade of expertise and the trust of various brands across the country, Veltex has established itself as a premier advertising agency. From ambitious startups to established enterprises, businesses choose us because we deliver results that matter.
        </p>
      </div>

      {/* Scattered Image Collage */}
      {/* <div className="grid grid-cols-4 gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-12 mb-10 items-start sm:mb-16">
        <img
          src={image1}
          alt="Creative meeting"
          className="about-page-scatter-img col-start-1 row-start-1 w-full rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] object-cover"
        />
        <img
          src={image2}
          alt="Design workspace"
          className="about-page-scatter-img col-start-2 row-start-1 row-span-2 mt-16 w-full rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.12)] object-cover md:mt-0"
        />
        <img
          src={image3}
          alt="Strategy planning"
          className="about-page-scatter-img col-start-3 row-start-1 w-full rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] object-cover md:col-start-1 md:row-start-2"
        />
        <img
          src={image5}
          alt="Marketing analytics"
          className="about-page-scatter-img col-start-4 row-start-1 mt-10 w-full rounded-xl shadow-[0_12px_25px_rgba(0,0,0,0.11)] object-cover md:col-start-2 md:row-start-2 md:mt-0"
        />
      </div> */}

      {/* What Defines Us & Core Philosophy */}
      <div className="grid  gap-20 mb-20 grid-cols-1 sm:gap-12">
        {/* Defines Us */}
        <div className="reveal-section bg-gradient-to-br from-[#f8f9fa] via-[#e6f3ff] to-[#f0f9ff] p-12 rounded-3xl border border-[#0066cc]/10 hover:border-[#0066cc]/30 transition-all duration-500 shadow-[0_8px_32px_rgba(0,102,204,0.08)]">
          <h2 className="font-serif text-4xl mb-8 text-[#0f172a] bg-gradient-to-r from-[#0066cc] to-[#8cc63f] bg-clip-text text-transparent">What Defines Us</h2>
          <ul className="space-y-6">
            {definesUs.map((item, i) => (
              <li key={i} className="flex items-start gap-4 font-sans text-[1.1rem] text-[#334155] font-normal leading-relaxed">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0066cc] to-[#00aaff] mt-2.5 shrink-0 shadow-sm" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Philosophy */}
        <div className="reveal-section bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white p-12 rounded-3xl relative overflow-hidden flex flex-col justify-center shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/30 via-[#00aaff]/20 to-[#8cc63f]/30" />
          <div className="relative z-10">
            <h2 className="font-serif text-4xl mb-8 bg-gradient-to-r from-white to-[#8cc63f] bg-clip-text text-transparent">Our Core Philosophy</h2>
            <ul className="space-y-6">
              {philosophy.map((item, i) => (
                <li key={i} className="flex items-start gap-4 font-sans text-[1.1rem] font-light text-white/95 leading-relaxed">
                  <svg className="w-6 h-6 text-[#8cc63f] mt-1 shrink-0 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Our Values - 4 Column Grid */}
      <div className="reveal-section mb-20">
        <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] mb-12 text-center">
          Our <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f]">Values</em>
        </h2>
        <div className="values-grid grid  gap-6 grid-cols-1 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={i} className="value-card p-8 rounded-2xl bg-white border border-[#eaeaea] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,102,204,0.1)] transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-[2.5rem] font-serif text-[#0066cc]/50 mb-4 group-hover:text-[#8cc63f]/50 transition-colors font-bold">0{i + 1}</div>
              <h3 className="font-sans text-xl font-bold text-[#0f172a] mb-4">{v.title}</h3>
              <p className="font-sans text-[#666] leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="reveal-section border-t border-b border-black/10 py-16">
        <div className="grid  gap-8 grid-cols-2 sm:gap-10 text-center">
          {[
            { num: '12+', label: 'Years of mastery' },
            { num: '340', label: 'Projects delivered' },
            { num: '18', label: 'Markets reached' },
            { num: '60+', label: 'Brand clients' },
          ].map((s) => (
            <div key={s.label} className="about-stat-item">
              <div className="about-stat-number font-serif text-[clamp(3rem,4vw,4rem)] font-bold text-[#0f172a] mb-2 tracking-tighter">{s.num}</div>
              <div className="font-sans text-[1rem] tracking-[0.2em] uppercase text-[#0066cc] font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Expertise */}
      <div className="reveal-section expertise-container py-20 border-t border-b border-[#e6f3ff] bg-gradient-to-br from-white via-[#f8faff] to-[#f0f9ff] text-center">
        <h2 className="font-sans text-[1rem] tracking-[0.3em] uppercase text-[#0066cc] mb-12 font-bold">(Our Expertise)</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-[1000px] mx-auto">
          {expertise.map((skill, i) => (
            <div
              key={i}
              className="expertise-pill px-6 py-3 rounded-full border border-[#e6f3ff] font-medium text-[1rem] font-sans bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] text-white transition-all duration-300 cursor-default shadow-[0_4px_16px_rgba(0,102,204,0.2)] hover:scale-110 hover:shadow-[0_8px_24px_rgba(0,102,204,0.3)] hover:-translate-y-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
