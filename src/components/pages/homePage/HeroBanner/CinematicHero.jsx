"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const CinematicHero = () => {
  const containerRef = useRef(null);
  const introVideoRef = useRef(null);
  const loopVideoRef = useRef(null);
  const topBarRef = useRef(null);
  const navbarRef = useRef(null);
  const contentRef = useRef(null);
  const rotatingBorderRef = useRef(null);

  useEffect(() => {
    const introVideo = introVideoRef.current;
    const loopVideo = loopVideoRef.current;

    // Hide loop video initially
    if (loopVideo) {
      loopVideo.style.display = 'none';
    }

    // When intro video ends, switch to loop video
    const handleIntroEnd = () => {
      if (introVideo && loopVideo) {
        introVideo.style.display = 'none';
        loopVideo.style.display = 'block';
        loopVideo.play();
      }
    };

    introVideo.addEventListener('ended', handleIntroEnd);

    // Navbar Border Animation
    const path = rotatingBorderRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: `200 ${length - 200}`, strokeDashoffset: 0 });
      gsap.to(path, { strokeDashoffset: -length, duration: 15, repeat: -1, ease: "none" });
    }

    // GSAP Timeline for animations - delayed appearance
    const tl = gsap.timeline();

    // Initial State: Hide Top Bar (logo, navbar, menu) and Bottom Content
    gsap.set([topBarRef.current, contentRef.current], { 
      opacity: 0, 
      y: 30 
    });

    // Animate top bar and content with longer delay
    tl.to(topBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 4.5 // Increased delay for later appearance
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8"); // Slight overlap but still appears after navbar

    // Cleanup
    return () => {
      introVideo.removeEventListener('ended', handleIntroEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Intro Video - Plays once */}
      <video
        ref={introVideoRef}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/intro.mp4" type="video/mp4" />
      </video>

      {/* Loop Video - Plays after intro ends */}
      <video
        ref={loopVideoRef}
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/banner-loop.mp4" type="video/mp4" />
      </video>

      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Top Bar Container - Logo, Centered Navbar, Menu Icon */}
      <div 
        ref={topBarRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pt-6 md:pt-8"
      >
        {/* Logo - Left side, matching navbar height and style */}
        <div className="absolute left-6 md:left-10">
          <div className="relative w-[60px] md:w-[80px] lg:w-[200px]  p-2 rounded">
            <Image
              src="/images/home/logo/footer-logo.png"
              alt="Website Logo"
              width={700}
              height={700}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Centered Navbar */}
        <nav 
          ref={navbarRef}
          className="relative px-8 py-3 bg-[#1A1A1A]"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <rect 
              ref={rotatingBorderRef} 
              x="0" 
              y="0" 
              width="100%" 
              height="100%" 
              fill="none" 
              stroke="url(#rotatingGradient)" 
              strokeWidth="1" 
            />
            <defs>
              <linearGradient id="rotatingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#09E5E5" />
                <stop offset="100%" stopColor="#A8FF57" />
              </linearGradient>
            </defs>
          </svg>
          <ul className="flex space-x-12 text-[12px] uppercase tracking-[0.4em] font-light">
            <li className="cursor-pointer hover:text-gray-300 transition-colors">home</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors">services</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors">about</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors">contact</li>
          </ul>
        </nav>

        {/* Menu Icon - Right side, matching navbar */}
        <div className="absolute right-6 md:right-10">
          <div className="flex flex-col gap-1.5 cursor-pointer  p-3 rounded">
            <div className="w-8 h-[1px] bg-white"></div>
            <div className="w-8 h-[1px] bg-white"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Text only) - Removed button */}
      <div 
        ref={contentRef}
        className="absolute bottom-12 left-0 w-full z-50"
      >
        <div className="px-6 md:px-10 w-full">
          <div className="text-center">
            <p className="text-[10px] md:text-[11px] lg:text-[15px] uppercase tracking-[0.4em] text-[#ffffff] mb-2 font-medium">
              Cyberattack Simulation
            </p>
            <h2 className="text-2xl md:text-[32px] lg:text-[42px] font-normal text-[#f1f1f1] tracking-tight leading-tight">
              Most advanced cyber-attack simulations: <span className="opacity-80">Ethical Den</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicHero;