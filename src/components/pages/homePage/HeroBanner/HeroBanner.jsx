"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const Hero = () => {
  const container = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const logoTargetRef = useRef(null);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    const logo = logoRef.current;

    // Get actual size
    const rect = logo.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate scale so logo fills height
    const scaleToFill = viewportHeight / rect.height;

    // Start HUGE (fills full height)
    gsap.set(logo, {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      scale: scaleToFill,
    });

    // Slight zoom out (so full logo becomes visible nicely)
    tl.to(logo, {
      scale: scaleToFill * 0.85,
      duration: 1,
      ease: "power2.out",
    })

    // Rotate
    .to(logo, {
      rotate: 360,
      duration: 1.5,
      ease: "power2.inOut",
    })

    // Move to navbar position
    .to(logo, {
      left: "40px",
      top: "40px",
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      duration: 1.2,
      ease: "expo.inOut",
    })

    // Show content
    .to([navRef.current, contentRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    }, "-=0.5");

  }, container);

  return () => ctx.revert();
}, []);

  return (
    <div ref={container} className="h-screen w-full bg-[#1A1A1A] text-white font-sans overflow-hidden flex flex-col relative">
      
      {/* --- ANIMATING LOGO --- */}
      {/* This sits on top of everything during the animation */}
      <div 
        ref={logoRef} 
        className="fixed z-[60] w-[35px] h-[32px]"
      >
        <Image 
          src="/images/home/logo/logo.png" 
          alt="Logo" 
          height={1500}
          width={1500}
          className="object-contain"
        />
      </div>

      {/* --- NAVBAR --- */}
      <nav 
        ref={navRef} 
        className="opacity-0 flex items-center justify-between px-6 py-6 md:px-10 z-20 w-full"
      >
        {/* Placeholder div to keep the space for the logo */}
        <div className="w-[35px] h-[32px]" />

        <div className="border-[1px] border-[#f1f1f1]/40 px-10 py-2">
          <ul className="flex space-x-12 text-[16px] tracking-[0.25em] font-light text-[#FFFFFF]">
            <li className="hover:text-white cursor-pointer transition-colors">home</li>
            <li className="hover:text-white cursor-pointer transition-colors">services</li>
            <li className="hover:text-white cursor-pointer transition-colors">about</li>
            <li className="hover:text-white cursor-pointer transition-colors">contact</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-1.5 cursor-pointer">
          <div className="w-8 h-[2px] bg-white"></div>
          <div className="w-8 h-[2px] bg-white"></div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div ref={contentRef} className="opacity-0 flex-grow flex flex-col items-center">
        <main className="relative w-full flex items-start justify-center px-6 md:px-10 pt-16">
          {/* Video Container */}
          <div className="relative w-[82%] h-[650px] bg-[#181818] rounded-lg overflow-hidden">
            <video 
              className="w-full h-full object-cover" 
              autoPlay loop muted playsInline
            >
              <source src="/images/home/hero/banner.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Banner Text Overlay - Same width as navbar (full width with same padding) */}
          <div className="absolute top-24 left-0 w-full px-6 md:px-10 pointer-events-none z-10">
            <Image 
              src="/images/home/hero/banner-text.png" 
              alt="ETHICAL DEN" 
              width={1920}
              height={400}
              className="w-full h-auto object-contain select-none"
              priority
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;