import React from 'react';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/veltexs' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/veltexs' },
  { label: 'Twitter', href: 'https://twitter.com/veltexs' },
  { label: 'X', href: 'https://x.com/veltexs' },
  { label: 'Facebook', href: 'https://facebook.com/veltexs' },
];

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 md:right-4 top-1/2 -translate-y-1/2 z-[10000] flex flex-col items-center pointer-events-none pr-3 sm:pr-0">
      <div className="flex flex-col items-center gap-4 relative pointer-events-auto py-12">


        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center outline-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.4em] uppercase text-black/80 transition-all duration-500 group-hover:text-[#0066cc] group-hover:tracking-[0.55em] group-hover:scale-105">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
