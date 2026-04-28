"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Hero = () => {
  const container = useRef(null);
  const fullLogoGroupRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const rotatingBorderRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Navbar Border Animation
      const path = rotatingBorderRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: `200 ${length - 200}`, strokeDashoffset: 0 });
        gsap.to(path, { strokeDashoffset: -length, duration: 15, repeat: -1, ease: "none" });
      }

      const logoGroup = fullLogoGroupRef.current;
      const navbar = navRef.current;
      
      // Get navbar height for perfect vertical alignment
      const navbarHeight = navbar ? navbar.offsetHeight : 100;
      const navbarPaddingLeft = 24; // px-6 = 24px
      const navbarPaddingTop = 0;
      
      // Calculate vertical center of navbar
      const navbarCenter = navbarPaddingTop + (navbarHeight / 2);
      
      // CRITICAL: Set initial position with NO scroll offset
      // This ensures logo starts at 35% on page load, not scrolled
      gsap.set(logoGroup, {
        position: 'fixed',
        left: 0,
        width: '100%',
        top: '35%',
        yPercent: -50,
        opacity: 1,
        zIndex: 80,
      });

      // Fade in nav and content
      gsap.set([navRef.current, contentRef.current], {
        opacity: 0,
      });
      
      gsap.to([navRef.current, contentRef.current], {
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
      });

      // Scroll Animation: Logo moves FROM 35% TO navbar position
      gsap.to(logoGroup, {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "45% top",
          scrub: 1.8,
          invalidateOnRefresh: true,
          // Prevent initial jump by marking start position
          onUpdate: (self) => {
            // Ensure logo doesn't jump on first scroll tick
            if (self.progress === 0) {
              gsap.set(logoGroup, { clearProps: 'top' });
            }
          }
        },
        // ANIMATE from 35% to navbar position
        top: `${navbarCenter}px`,
        left: `${navbarPaddingLeft}px`,
        width: 'auto',
        yPercent: -50,
        scale: 0.12,
        transformOrigin: "left center",
        ease: "power1.inOut",
      });

      // Force refresh after mount to prevent initial scroll state
      setTimeout(() => {
        ScrollTrigger.refresh();
        // Ensure logo is at 35% on page load, not at scrolled position
        window.scrollTo(0, 0);
      }, 100);

    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMounted]);

  return (
    <div ref={container} className="min-h-screen w-full bg-[#1A1A1A] overflow-hidden relative">
      
      {/* OVERLAY LOGO UNIT - Moves from 35% to navbar on scroll */}
      <div
        ref={fullLogoGroupRef}
        className="fixed z-[80] flex items-center px-6 md:px-10 pointer-events-none w-full h-[100px] md:h-[180px] lg:h-[150px] 2xl:h-[200px]"
        style={{ visibility: isMounted ? 'visible' : 'hidden' }}
      >
        <div className="flex-shrink-0 mr-4 md:mr-8 h-full aspect-square">
          <Image
            src="/images/home/logo/logo-1.png"
            alt="Logo Icon"
            width={500}
            height={500}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <div className="flex-grow h-full">
          <Image
            src="/images/home/hero/banner-text.png"
            alt="ETHICAL DEN"
            width={3000}
            height={500}
            className="w-full h-full object-contain object-left" 
            priority
          />
        </div>
      </div>

      {/* Navbar Container */}
      <nav ref={navRef} className="opacity-0 fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 text-[#f1f1f1] z-[90] h-[100px]">
        <div className="w-[120px] lg:w-[150px] hidden md:block" /> 
        <div className="relative px-8 py-3 bg-[#1A1A1A]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <rect ref={rotatingBorderRef} x="0" y="0" width="100%" height="100%" fill="none" stroke="url(#rotatingGradient)" strokeWidth="1" />
            <defs>
              <linearGradient id="rotatingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#09E5E5" />
                <stop offset="100%" stopColor="#A8FF57" />
              </linearGradient>
            </defs>
          </svg>
          <ul className="flex space-x-12 text-[12px] uppercase tracking-[0.4em] font-light">
            <li>home</li>
            <li>services</li>
            <li>about</li>
            <li>contact</li>
          </ul>
        </div>
        <div className="flex flex-col gap-1.5 cursor-pointer">
          <div className="w-8 h-[1px] bg-white"></div>
          <div className="w-8 h-[1px] bg-white"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div ref={contentRef} className="opacity-0 pt-[20vh]">
        <main ref={heroSectionRef} className="flex flex-col items-center w-full">
          
          {/* VIDEO CONTAINER */}
          <div className="relative w-[65%] h-[50vh] md:h-[70vh] bg-[#111] overflow-hidden ">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/images/home/hero/security-banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          </div>

          {/* Bottom Text Section */}
          <section className="w-full bg-[#1A1A1A] pb-20 pt-10">
            <div className="px-6 md:px-10 w-full">
              <div className="">
                <p className="text-[10px] md:text-[11px] lg:text-[15px] uppercase tracking-[0.4em] text-[#ffffff] mb-2 font-medium">
                  Cyberattack Simulation
                </p>
                <h2 className="text-2xl md:text-[32px] lg:text-[42px] font-normal text-[#f1f1f1] mb-16 tracking-tight leading-tight">
                  Most advanced cyber-attack simulations: <span className="opacity-80">Ethical Den</span>
                </h2>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Hero;