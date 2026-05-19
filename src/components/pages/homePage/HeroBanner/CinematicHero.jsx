// components/CinematicHero.jsx
"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { GradientButton } from '@/components/utils/GradiantButton';

const CinematicHero = () => {
  const loopVideoRef = useRef(null);
  const topBarRef = useRef(null);
  const contentRef = useRef(null);
  const contactBtnRef = useRef(null);
  const discoverBtnRef = useRef(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* Loop Video */}
      {/* <video 
        ref={loopVideoRef} 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/banner-loop.mp4" type="video/mp4" />
      </video> */}

      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {/* Header */}
        <header ref={topBarRef} className="w-full max-w-7xl px-8 py-10 flex items-center justify-between">
          <div className="flex-shrink-0">
            <Image
              src="/images/home/logo/footer-logo.png"
              alt="MokN Logo"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <nav className="hidden md:flex border border-white/5 px-10 py-3 rounded-md bg-black/40 backdrop-blur-md">
            <ul className="flex space-x-12 text-[11px] font-bold tracking-[0.25em] uppercase text-gray-300">
              <li className="cursor-pointer hover:text-white transition-colors">Baits</li>
              <li className="cursor-pointer hover:text-white transition-colors">Lantern</li>
              <li className="cursor-pointer hover:text-white transition-colors">About us</li>
            </ul>
          </nav>

          <GradientButton
            ref={contactBtnRef}
            className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer"
            variant="primary"
            onClick={() => console.log('Contact clicked')}
          >
            Contact us
          </GradientButton>
        </header>

        {/* Hero Content */}
        <div ref={contentRef} className="flex-1 w-full max-w-7xl px-8 flex flex-col items-center justify-end pb-32">
          <h1 className="text-[40px] md:text-6xl font-bold text-center leading-[1.1] mb-10 tracking-tight">
            The smartest way <span className="relative text-white inline-block">
              to end credential threats.
              <span
                className="absolute inset-0 -z-10 blur-[25px] rounded-full opacity-45"
                style={{
                  background: 'linear-gradient(90deg, #09E5E5, #A8FF57)',
                  filter: 'blur(30px)'
                }}
              />
            </span>
          </h1>

          <GradientButton
            ref={discoverBtnRef}
            className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer"
            variant="primary"
            onClick={() => console.log('Discover clicked')}
          >
            Discover our solution
          </GradientButton>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95 pointer-events-none" />
    </div>
  );
};

export default CinematicHero;