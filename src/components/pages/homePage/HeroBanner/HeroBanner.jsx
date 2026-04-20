"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BottomText from './BottomText';

const Hero = () => {
  const container = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const bannerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const bannerWrapperRef = useRef(null);

  useLayoutEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const logo = logoRef.current;

      // Get actual size
      const rect = logo.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scaleToFill = viewportHeight / rect.height;

      // Initial state
      gsap.set(logo, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        scale: scaleToFill,
      });

      // Set initial banner state (normal size)
      gsap.set(bannerRef.current, {
        scale: 1,
        y: 0,
        x: 0,
        transformOrigin: "left center",
      });

      // LOGO ANIMATION
      tl.to(logo, {
        scale: scaleToFill * 0.85,
        duration: 1,
        ease: "power2.out",
      })
        .to(logo, {
          rotate: 360,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(logo, {
          left: "40px",
          top: "40px",
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.inOut",
        })

        // SHOW CONTENT
        .to([navRef.current, contentRef.current], {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }, "-=0.5");

      // ========== SCROLL TRIGGER: BANNER GETS MUCH SMALLER, MOVES RIGHT & STICKS AT TOP ==========
      // Remove any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Create the scroll animation - starts immediately, faster, much smaller, moves right
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top 10%",
        end: "+=100", // Shorter distance for faster animation
        scrub: 0.8, // Less scrub for more responsive/snappy feel while still smooth
        markers: true,
        animation: gsap.fromTo(bannerRef.current,
          {
            scale: 1,
            y: 0,
            x: 0,
            opacity: 1,
          },
          {
            scale: 0.095, // Extremely small (4.5% of original) - becomes like a small badge/icon
            y: -120, // Move up to navbar level
            x: 50, // Move right as it shrinks
            opacity: 1, // Keep visible, don't fade out
            duration: 0.8,
            ease: "power2.out", // Faster easing for snappier feel
          }
        ),
        onUpdate: (self) => {
          // When scroll is complete (banner is fully shrunk), make it fixed at top like logo and navbar
          if (self.progress === 1) {
            gsap.set(bannerWrapperRef.current, {
              position: 'fixed',
              top: '20px',
              right: '40px', // Position on the right side like navbar elements
              left: 'auto',
              x: 0,
              zIndex: 100,
            });
          } else if (self.progress < 0.99) {
            // Reset positioning when scrolling back up
            gsap.set(bannerWrapperRef.current, {
              position: 'absolute',
              top: 'auto',
              left: '0',
              right: 'auto',
              x: 0,
              zIndex: 10,
            });
          }
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-screen w-full bg-[#1A1A1A] text-white  overflow-hidden flex flex-col relative">

      {/* --- ANIMATING LOGO --- */}
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

      {/* --- NAVBAR - ALWAYS STICKY/FIXED, SAME LINE AS LOGO --- */}
      <nav
        ref={navRef}
        className="opacity-0 fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-6 md:px-10 z-50 w-full"
        style={{ height: '72px' }} // Match logo positioning (top: 40px + logo height approx 32px)
      >
        {/* Empty div to balance navbar spacing, logo is now independent but aligned */}
        <div className="w-[35px] h-[32px]" />

        <div className="border-[1px] border-[#f1f1f1]/40 px-10 py-2 bg-[#1A1A1A]">
          <ul className="flex space-x-12 text-[16px] tracking-[0.25em] font-light text-[#FFFFFF]">
            <li className="cursor-pointer hover:text-gray-300 transition">home</li>
            <li className="cursor-pointer hover:text-gray-300 transition">services</li>
            <li className="cursor-pointer hover:text-gray-300 transition">about</li>
            <li className="cursor-pointer hover:text-gray-300 transition">contact</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-1.5 cursor-pointer">
          <div className="w-8 h-[2px] bg-white"></div>
          <div className="w-8 h-[2px] bg-white"></div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div ref={contentRef} className="opacity-0 flex-grow flex flex-col items-center pt-24">
        <main ref={heroSectionRef} className="relative w-full flex items-start justify-center px-6 md:px-10 pt-16">

          {/* Video */}
          <div className="relative w-[82%] h-[650px] bg-[#181818] rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay loop muted playsInline
            >
              <source src="/images/home/hero/banner.mp4" type="video/mp4" />
            </video>
          </div>

          {/* BANNER OVERLAY - SHRINKS FAST, MOVES RIGHT, STICKS AT TOP */}
          <div
            ref={bannerWrapperRef}
            className="absolute top-24 left-0 w-full px-6 md:px-10 pointer-events-none z-10"
          >
            <div ref={bannerRef}>
              <Image
                src="/images/home/hero/banner-text.png"
                alt="ETHICAL DEN"
                width={1920}
                height={400}
                className="w-full h-auto object-contain select-none"
                priority
              />
            </div>
          </div>

        </main>

        {/* --- BOTTOM CONTENT SECTION --- */}
        <section className="w-full bg-[#1A1A1A] pb-20 pt-10">
          {/* Container aligned with Navbar/Logo padding (px-6 md:px-10) */}
          <div className="px-6 md:px-10 w-full">

            <div className="">
              {/* Subtitle: Smaller, wide tracking */}
              <p className="text-[10px] md:text-[11px] lg:text-[15px] uppercase tracking-[0.4em] text-[#ffffff] mb-2 font-medium">
                Cyberattack Simulation
              </p>

              {/* Heading: Using a slight tracking-tight for that premium look */}
              <h2 className="text-2xl md:text-[32px] lg:text-[42px] font-normal text-[#f1f1f1] mb-16 tracking-tight leading-tight">
                Most advanced cyber-attack simulations: <span className="opacity-80">Ethical Den</span>
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;