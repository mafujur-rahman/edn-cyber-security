"use client";
import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Hero = () => {
  const container = useRef(null);
  const fullLogoGroupRef = useRef(null);
  const textImageRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const rotatingBorderRef = useRef(null);
  const animationOverlayRef = useRef(null);
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

      const originalLogoUnit = fullLogoGroupRef.current;
      const textImage = textImageRef.current;
      const navbar = navRef.current;
      const overlay = animationOverlayRef.current;
      
      // Original logo unit - set to final position but hidden initially
      gsap.set(originalLogoUnit, { 
        opacity: 0,
        visibility: 'hidden',
        position: 'fixed',
        left: 0,
        top: '35%',
        yPercent: -50,
        width: '100%',
        zIndex: 80,
      });
      
      gsap.set(textImage, { opacity: 0 });
      gsap.set([navRef.current, contentRef.current], { opacity: 0 });
      
      // Create the animated logo inside overlay
      const animatedLogo = document.createElement('div');
      animatedLogo.className = 'animated-logo-container';
      animatedLogo.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
          <img src="/images/home/logo/logo-1.png" alt="Logo" style="width: auto; height: 70%; object-fit: contain;" />
        </div>
      `;
      animatedLogo.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #1A1A1A;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      overlay.innerHTML = '';
      overlay.appendChild(animatedLogo);
      overlay.style.display = 'block';
      
      const logoImg = animatedLogo.querySelector('img');
      
      // ANIMATION
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide overlay and show original elements
          overlay.style.display = 'none';
          
          // Fade in original logo unit and all content
          gsap.to(originalLogoUnit, { 
            opacity: 1, 
            visibility: 'visible',
            duration: 0.3,
          });
          gsap.to(textImage, { 
            opacity: 1, 
            duration: 0.5,
          });
          gsap.to(navRef.current, { 
            opacity: 1, 
            duration: 0.5,
          });
          gsap.to(contentRef.current, { 
            opacity: 1, 
            duration: 0.5,
          });
          
          // Setup scroll animation
          const navbarHeight = navbar ? navbar.offsetHeight : 100;
          const navbarPaddingLeft = 24;
          const navbarCenter = navbarHeight / 2;
          
          gsap.to(originalLogoUnit, {
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: "40% top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
            top: `${navbarCenter}px`,
            left: `${navbarPaddingLeft}px`,
            width: 'auto',
            yPercent: -50,
            scale: 0.12,
            transformOrigin: "left center",
            ease: "power1.inOut",
          });
          
          ScrollTrigger.refresh();
        }
      });
      
      // 1. Zoom out
      tl.to(logoImg, {
        scale: 0.7,
        duration: 0.8,
        ease: "power2.inOut",
      })
      // 2. Rotate 360
      .to(logoImg, {
        rotation: 360,
        duration: 1.2,
        ease: "power2.inOut",
      })
      // 3. Move to left position
      .to(animatedLogo, {
        width: '80px',
        height: '80px',
        top: '35%',
        left: '24px',
        transform: 'translate(0, -50%)',
        duration: 1,
        ease: "expo.inOut",
      })
      .to(logoImg, {
        scale: 1,
        rotation: 0,
        height: '100%',
        duration: 0.8,
        ease: "expo.inOut",
      }, "-=0.8");
      
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMounted]);

  return (
    <div ref={container} className="min-h-screen w-full bg-[#1A1A1A] overflow-hidden relative">
      
      {/* Animation Overlay */}
      <div ref={animationOverlayRef} className="fixed inset-0 z-[200]" />
      
      {/* ORIGINAL LOGO UNIT - Already in correct position */}
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

        <div ref={textImageRef} className="flex-grow h-full">
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
                <stop offset="0%" stopColor="#00E5E5" />
                <stop offset="100%" stopColor="#99FF33" />
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
        <main className="flex flex-col items-center w-full">
          
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