import VeltexLogo from '../../assets/VeltexLogo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="relative w-full py-24 px-[6vw] flex flex-col gap-6 font-sans font-semibold text-[0.75rem] uppercase tracking-[0.3em] z-[30] footer pb-32 sm:pb-40 text-black border-t border-black/5"
      style={{
        backdropFilter: 'blur(1.5px)',
        WebkitBackdropFilter: 'blur(1.5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
      }}
      role="contentinfo"
    >
      <div className="mb-4 opacity-100 block">
        <img
          src={VeltexLogo}
          alt="Veltex logo"
          className="h-10 w-auto object-contain sm:h-10"
        />
      </div>
      <div className="flex flex-col gap-4">
        {/* <span>Singapore&nbsp;·&nbsp;Hong Kong&nbsp;·&nbsp;Global</span> */}
        <span>At Veltex, we believe that every business, regardless of size or industry, deserves the power to tell their story and reach their audience.

          Since 2013, making professional media planning and execution accessible to all.</span>

        <div className="">
         Use of this site is subject to our <Link to="/terms-and-conditions" className="underline text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#8cc63f] font-extrabold text-[0.65rem] hover:opacity-80 transition-opacity duration-300">Terms & Conditions</Link> and <Link to="/privacy-policy" className="underline text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#8cc63f] font-extrabold text-[0.65rem] hover:opacity-80 transition-opacity duration-300">Privacy Policy</Link>.
        </div>
        <div className="">
          &copy; {new Date().getFullYear()} Veltex. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
