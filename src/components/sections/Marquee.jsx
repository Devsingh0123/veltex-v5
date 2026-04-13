import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ITEMS = [
  "Brand Strategy",
  "Integrated Campaigns",
  "Digital & Social",
  "Paid Media",
  "Content Marketing",
  "PR & Earned Media",
  "Outdoor & Print",
  "Influencer",
  "Events & Activations",
  "Performance Marketing",
];

export default function Marquee({ speed = 150 }) {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="relative z-[2] flex overflow-hidden select-none bg-white"
      aria-hidden="true"
    >
      <div
        ref={marqueeRef}
        className="flex shrink-0 items-center w-max will-change-transform"
      >
        {doubledItems(ITEMS).map((item, i) => (
          <div key={i} className="flex items-center shrink-0 space-x-7 px-3">
            {/* Exact Screenshot Replica Style */}
            <span
              className="font-extrabold text-[clamp(1rem,1.5vw,1.3rem)] font-mono uppercase whitespace-nowrap"
              style={{
                WebkitTextStroke: '0.8px #484646fa',
                color: 'transparent',
                letterSpacing: '0.05em',
                opacity: 0.7
              }}
            >
              {item}
            </span>

            {/* Creative Logo Separator */}
            <div className="relative overflow-hidden">
              <img
                src="/vLogo.png"
                alt="Veltex Logo"
                className="w-7 h-7 object-cover animate-logoPulse"
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes logoPulse {
          0% { transform: scale(0.6); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.6); opacity: 0.7; }
        }
        .animate-logoPulse {
          animation: logoPulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Helper to ensure enough items for seamless loop
function doubledItems(arr) {
  return [...arr, ...arr, ...arr, ...arr, ...arr, ...arr];
}
