import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';

const PRIMARY_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
];

const SECONDARY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

// Cool V 3D Animation - Enhanced with better 3D feel
const ThreeDEffect = () => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      // More dynamic and smooth rotation
      meshRef.current.rotation.y = time * 0.1 + Math.sin(time * 0.05) * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.06) * 0.15;
      meshRef.current.rotation.z = Math.cos(time * 0.08) * 0.08;
      // Subtle floating effect
      meshRef.current.position.y = Math.sin(time * 0.3) * 0.1;
    }
  });
  
  return (
    <group ref={meshRef} position={[0, 0, -2]}>
      {/* Enhanced V shape with better 3D materials */}
      <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshPhysicalMaterial 
          color="#ff4200" 
          emissive="#ff4200" 
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
      <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshPhysicalMaterial 
          color="#ff4200" 
          emissive="#ff4200" 
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
      {/* Add center connecting piece for more depth */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshPhysicalMaterial 
          color="#ff6600" 
          emissive="#ff6600" 
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
        />
      </mesh>
    </group>
  );
};

export default function Nav({ navRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuCardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isProjects = location.pathname === '/projects';
  const ctaLabel = isProjects ? 'Contact' : isHome ? 'Contact' : 'Projects';
  const ctaHref = isProjects ? '/contact' : '/projects';

  useEffect(() => {
    if (!isHome && navRef.current) {
      gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
  }, [isHome, navRef]);

  useEffect(() => {
    if (!menuCardRef.current) return;
    let ctx = gsap.context(() => {
      if (menuOpen) {
        const tl = gsap.timeline();
        tl.fromTo(
          menuCardRef.current,
          { opacity: 0, y: 40, scale: 0.95, rotationX: -25, rotationY: 15, transformPerspective: 1000 },
          { opacity: 1, y: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.85, ease: 'elastic.out(1,0.85)' }
        );
        tl.fromTo(
          '.nav-stagger-item',
          { y: 25, opacity: 0, rotationX: -10 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.6'
        );
      } else {
        gsap.to(menuCardRef.current, { opacity: 0, y: 30, scale: 0.96, rotationX: 10, duration: 0.4, ease: 'power3.inOut' });
      }
    }, menuCardRef);
    return () => ctx.revert();
  }, [menuOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuOpen && !e.target.closest('#main-nav-container')) setMenuOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const go = (href) => {
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      {/* 3D Background - Enhanced with visible top-left lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true, powerPreference: 'high-performance' }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[-8, 8, 8]} intensity={4} color="#ff6600" />
          <pointLight position={[-8, -8, 8]} intensity={3} color="#ff4200" />
          <spotLight position={[-5, 5, 5]} intensity={3} angle={0.5} penumbra={1} color="#ffffff" />
          <directionalLight position={[-10, 10, 5]} intensity={2} color="#ff8800" />
          <ThreeDEffect />
        </Canvas>
      </div>

      {/* Navigation Container */}
      <div
        ref={navRef}
        id="main-nav-container"
        className="fixed bottom-6 left-0 right-0 z-[9999] flex flex-col items-center gap-4 px-4 sm:bottom-10"
        style={{
          opacity: isHome ? 0 : 1,
          transform: isHome ? 'translateY(80px)' : 'translateY(0)',
        }}
      >
        {/* Menu Card Overlay - Enhanced 3D Style */}
        {menuOpen && (
          <div
            ref={menuCardRef}
            className="w-full max-w-[500px] bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-[32px] p-4 shadow-[0_20px_80px_rgba(255,255,255,0.15)] flex flex-col gap-3 origin-bottom z-[9998]"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: '0 16px 64px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex flex-col gap-1">
              {PRIMARY_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="nav-stagger-item group flex justify-between items-center py-1 border-b border-white/20 text-left transition-all duration-300 hover:translate-x-3 hover:rotate-y-5 hover:pl-4 last:border-0 outline-none"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="font-sans text-xl font-bold text-black transition-colors group-hover:text-black/90">
                    {link.label}
                  </span>
                  <span className="text-[1.3rem] text-black/80 opacity-0 -translate-x-6 transition-all group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 nav-stagger-item pt-1 border-t border-white/20">
              {SECONDARY_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="font-sans text-[0.75rem] font-semibold text-black/70 tracking-widest uppercase hover:text-black/90 transition-all duration-300 hover:scale-105 outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Nav Row */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 w-full pointer-events-none">
          {/* 3D Logo Button - Enhanced */}
          <button
            onClick={() => {
              setMenuOpen(false);
              // Navigate to home page and scroll to top when V is clicked
              const currentPath = window.location.pathname;
              if (currentPath !== '/') {
                // If not on home page, navigate to home
                window.location.href = '/';
              } else {
                // If already on home page, just scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="pointer-events-auto flex items-center justify-center w-[50px] h-[50px] group outline-none flex-shrink-0"
            style={{ 
              perspective: '1000px'
            }}
            aria-label="Veltex Logo - Go to Home Top"
          >
            <div className="relative flex items-center justify-center w-full h-full bg-white/20 backdrop-blur-md border-t-2 border-r-2 border-l border-b border-white/60 border-t-white border-r-white border-l-white/40 border-b-white/40 rounded-full transition-all duration-500 ease-out shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden"
              style={{
                transform: 'translateZ(0px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(10px) rotateY(180deg) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 60px rgba(255,66,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,66,0,0.9), rgba(255,102,0,0.8))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(0px) rotateY(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              {/* Front face - V logo */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <svg viewBox="0 0 32 32" className="w-[32px] h-auto text-[#1a1a1a] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <path d="M6 8L16 26L26 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              
              {/* Back face - 3D effect */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#ff4200] to-[#ff6600] rounded-full"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="w-[32px] h-[32px] bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-[24px] h-[24px] bg-white/40 rounded-full"></div>
                </div>
              </div>

              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff4200]/30 to-transparent animate-pulse rounded-full"></div>
              </div>
            </div>
          </button>

          {/* Main Navigation Pill - Enhanced 3D Studio X Style */}
          <div
            className="pointer-events-auto flex items-center justify-between bg-white/20 backdrop-blur-md border-t-2 border-r-2 border-l border-b border-white/60 border-t-white border-r-white border-l-white/40 border-b-white/40 rounded-[32px] h-[46px] sm:h-[50px] shadow-[0_20px_80px_rgba(255,255,255,0.15)] px-2 pl-6 sm:pl-8 transition-all duration-500 origin-bottom overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: '0 16px 64px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.boxShadow = '0 20px 80px rgba(255,66,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02) rotateX(0deg)';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.20)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.40)';
              e.currentTarget.style.boxShadow = '0 16px 64px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)';
            }}
          >
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-[10px] h-full outline-none group">
              <div className="flex flex-col gap-[4px] w-[18px]">
                <span className={`block h-[1px] bg-black transition-all duration-400 ease-out ${menuOpen ? 'translate-y-[2.5px] rotate-45 w-[18px]' : 'w-[18px]'}`} />
                <span className={`block h-[1px] bg-black transition-all duration-400 ease-out ${menuOpen ? '-translate-y-[2.5px] -rotate-45 w-[18px]' : 'w-[18px]'}`} />
              </div>
              <span className="text-black text-[14px] font-sans font-medium tracking-[0.01em] pb-[1px] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
            <div className="w-[80px] sm:w-[150px] transition-all duration-300" />
            <button
              onClick={() => go(ctaHref)}
              className="h-[36px] sm:h-[40px] px-[26px] sm:px-[30px] bg-[#ff4200] text-white rounded-full font-sans text-[13.5px] sm:text-[14px] font-semibold tracking-[0.02em] hover:bg-[#ff5a22] transition-all duration-300 hover:scale-105 pb-[1px] shadow-[0_4px_16px_rgba(255,66,0,0.3)]"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                boxShadow: '0 4px 16px rgba(255,66,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(5px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,66,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(0px) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,66,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)';
              }}
            >
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{ctaLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}