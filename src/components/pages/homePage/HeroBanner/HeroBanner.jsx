"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Hero = () => {
  const container = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const bannerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const rotatingBorderRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animated rotating gradient border for navbar
      const path = rotatingBorderRef.current;
      if (path) {
        // Get the total length of the path
        const length = path.getTotalLength();
        
        // Fixed dash length (e.g., 80px) - this will stay constant
        const dashLength = 80;
        
        // Set up dasharray with a fixed visible dash length
        // The visible line will always be the same width (dashLength)
        gsap.set(path, {
          strokeDasharray: `${dashLength} ${length - dashLength}`,
          strokeDashoffset: 0,
        });

        // Create smooth continuous rotation animation
        // The line travels clockwise around the border maintaining constant width
        gsap.to(path, {
          strokeDashoffset: -length,
          duration: 6,
          repeat: -1,
          ease: "none",
        });

        // Add a subtle pulse to the gradient opacity for extra cinematic feel
        gsap.to(path, {
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const tl = gsap.timeline();
      const logo = logoRef.current;

      const rect = logo.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scaleToFill = viewportHeight / rect.height;
      const targetTop = 40;
      const targetLeft = 40;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Hide banner initially
      gsap.set(bannerRef.current, {
        opacity: 0,
        scale: 1,
        y: 0,
        x: 0,
      });

      gsap.set(logo, {
        position: 'fixed',
        left: centerX,
        top: centerY,
        x: -17.5,
        y: -16,
        scale: scaleToFill,
        transformOrigin: "center center",
      });

      tl.to(logo, {
        scale: scaleToFill * 0.8,
        duration: 1,
        ease: "power2.inOut",
      })
        .to(logo, {
          rotate: 360,
          duration: 1.8,
          ease: "power1.inOut",
        })
        .to(logo, {
          scale: scaleToFill * 0.65,
          duration: 0.8,
          ease: "sine.inOut",
        })
        .to(logo, {
          left: targetLeft + 17.5,
          top: targetTop + 16,
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          onUpdate: function () {
            gsap.set(logo, {
              x: -17.5,
              y: -16,
            });
          },
        })
        .to([navRef.current, contentRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }, "-=0.5")
        // Show banner after logo animation completes
        .to(bannerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");

      // Banner animation - stays fixed the whole time
      ScrollTrigger.getAll().forEach(st => st.kill());

      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top 10%",
        end: "+=100",
        scrub: 0.8,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 - (progress * 0.905); // 1 to 0.095
          const y = -240 * progress; // Move up as it scales
          const x = 90 * progress; // Move right as it scales

          gsap.set(bannerRef.current, {
            scale: scale,
            y: y,
            x: x,
            opacity: 1,
          });
        },
        onComplete: () => {
          gsap.set(bannerRef.current, {
            position: 'fixed',
            top: '20px',
            right: '40px',
            left: 'auto',
            scale: 0.095,
            y: -120,
            x: 50,
            opacity: 1,
            zIndex: 100,
          });
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-screen w-full bg-[#1A1A1A] text-white overflow-hidden flex flex-col relative">

      <div
        ref={logoRef}
        className="fixed z-[60]"
        style={{
          width: '35px',
          height: '32px',
          transformOrigin: 'center center',
        }}
      >
        <Image
          src="/images/home/logo/logo-1.png"
          alt="Logo"
          height={1500}
          width={1500}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      <nav
        ref={navRef}
        className="opacity-0 fixed top-5 left-0 right-0 flex items-center justify-between px-6 py-6 md:px-10 z-50 w-full"
        style={{ height: '72px' }}
      >
        <div style={{ width: '35px', height: '32px' }} />

        {/* Navigation Container with Base Border + Rotating Gradient Line */}
        <div className="relative px-10 py-3.5 bg-[#1A1A1A] ">
          {/* Base static border - #f1f1f1 with 40% opacity */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <rect
              x="2"
              y="2"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              fill="none"
              stroke="#f1f1f1"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Rotating gradient line on top */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="rotatingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#09E5E5" stopOpacity="1" />
                <stop offset="40%" stopColor="#A8FF57" stopOpacity="1" />
                <stop offset="60%" stopColor="#09E5E5" stopOpacity="1" />
                <stop offset="100%" stopColor="#A8FF57" stopOpacity="1" />
              </linearGradient>
              {/* Glow/blur layer */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Thick rotating gradient line with blur effect */}
            <rect
              ref={rotatingBorderRef}
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke="url(#rotatingGradient)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              style={{ filter: 'url(#glow)' }}
            />
          </svg>

          <ul className="flex space-x-16 text-[14px] lg:text-[16px] font-light text-[#FFFFFF] relative z-10">
            <li className="cursor-pointer hover:text-[#09E5E5] transition-colors duration-300">home</li>
            <li className="cursor-pointer hover:text-[#09E5E5] transition-colors duration-300">services</li>
            <li className="cursor-pointer hover:text-[#09E5E5] transition-colors duration-300">about</li>
            <li className="cursor-pointer hover:text-[#09E5E5] transition-colors duration-300">contact</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-1.5 cursor-pointer group">
          <div className="w-8 h-[1px] bg-white group-hover:bg-[#09E5E5] transition-colors duration-300"></div>
          <div className="w-8 h-[1px] bg-white group-hover:bg-[#A8FF57] transition-colors duration-300"></div>
        </div>
      </nav>

      <div ref={contentRef} className="opacity-0 flex-grow flex flex-col items-center pt-24">
        <main ref={heroSectionRef} className="relative w-full flex items-start justify-center px-6 md:px-10 pt-16">

          <div className="relative w-[82%] h-[650px] bg-[#181818] rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay loop muted playsInline
            >
              <source src="/images/home/hero/security-banner.mp4" type="video/mp4" />
            </video>
          </div>

        </main>

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
      </div>

      {/* Banner image - appears after logo animation, positioned lower, moves up during scroll */}
      <div
        ref={bannerRef}
        className="fixed top-48 left-0 w-full px-6 md:px-10 pointer-events-none z-10"
        style={{ transformOrigin: 'left center', opacity: 0 }}
      >
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
  );
};

export default Hero;