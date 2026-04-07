import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Work from '../components/sections/Work';
import Process from '../components/sections/Process';
import Contact from '../components/sections/Contact';
import Marquee from '../components/sections/Marquee';
import ScrollReel from '../components/sections/ScrollReel';
import { VDivider } from '../components/sections/VShape';

export default function HomePage({ navRef }) {
  useEffect(() => {    
    const sections = [
      { id: '#hero',    bg: '#0a0a0a' },
      { id: '#about',   bg: '#f5f0e8' },
      { id: '#work',    bg: '#0a0a0a' },
      { id: '#process', bg: '#f5f0e8' },
      { id: '#contact', bg: '#f5f0e8' },
    ];

    const triggers = sections.map(({ id, bg }) => {
      return ScrollTrigger.create({
        trigger: id,
        start: 'top 55%', 
        end: 'bottom 55%',
        onEnter:     () => gsap.to('body', { backgroundColor: bg, duration: 0.9, ease: 'power2.out', overwrite: 'auto' }),
        onEnterBack: () => gsap.to('body', { backgroundColor: bg, duration: 0.9, ease: 'power2.out', overwrite: 'auto' }),
      });
    });

    return () => {
      triggers.forEach(t => t?.kill());
    };
  }, []);

  return (
    <>
      <Hero navRef={navRef} />
      <PageWrapper bg="#0a0a0a" className="relative z-[20] pt-[100vh]">
        <Marquee speed={35} invert={true} />
        <VDivider fromColor="#0a0a0a" toColor="#f5f0e8" />
        <About />
        <Work />
        <ScrollReel text="VELTEX" bg="#0a0a0a" color="#fff" />
        <Process />
        <Marquee speed={45} invert={false} />
        <Contact />
      </PageWrapper>
    </>
  );
}
