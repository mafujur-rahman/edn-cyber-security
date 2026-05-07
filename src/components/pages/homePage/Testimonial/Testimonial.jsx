"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingTestimonial() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const content = textElement.textContent;

    // 1. Split text into individual spans for character-by-character control
    textElement.innerHTML = content
      .split("")
      .map((char) => `<span class="char">${char}</span>`)
      .join("");

    const chars = textElement.querySelectorAll('.char');
    const circleElement = circleRef.current;

    // 2. GSAP Animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1.5,
        pin: true,
        markers: false,
      }
    });

    // Text color animation
    tl.fromTo(
      chars,
      { color: "rgba(255, 255, 255, 0.15)" },
      {
        color: "rgba(255, 255, 255, 1)",
        stagger: 0.1,
        ease: "none",
      },
      0
    );

    // Inside your GSAP timeline - INCREASED HEIGHT HERE
    tl.fromTo(
      circleElement,
      {
        width: "0%",
        height: "0px",
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        width: "100%",
        height: "250px",    // Increased from 100px to 250px for bigger gradient
        opacity: 1,
        filter: "blur(15px)",
        duration: 2,
        ease: "power2.out",
      },
      0.2
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="max-w-4xl w-full mx-auto relative z-10">
        <h2
          ref={textRef}
          className="text-2xl md:text-4xl font-medium leading-[1.4] tracking-tight text-white mb-10 select-none text-center"
        >
          “We knew attackers were targeting us, but never had direct proof. Within days of deploying MokN, we intercepted credentials that had just been stolen, before any public exposure. These insights now help us reinforce our detection strategy and communicate risk clearly to the board.”
        </h2>

        <div className="flex flex-col items-center">
          <p className="text-[16px] tracking-[0.2em] font-bold text-white">
            - CISO at a multi-billion-dollar company
          </p>
        </div>
      </div>
      {/* Gradient Container */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="relative"
          style={{
            width: "0%",
            maxWidth: "1280px", // max-w-7xl
            height: "0px",
            /* Radial gradient creates the hot center that fades to the sides and top */
            background: `radial-gradient(
        ellipse at bottom, 
        rgba(168, 255, 87, 0.4) 0%, 
        rgba(9, 229, 229, 0.2) 40%, 
        transparent 70%
      )`,
            /* Perfect Arch: 100% horizontal radius makes it a flat, wide curve */
            borderRadius: "100% 100% 0 0",
            opacity: 0,
            /* This inner border adds the 'sharp' lit edge at the very bottom */
            borderBottom: "2px solid rgba(168, 255, 87, 0.3)",
          }}
        >
          {/* Secondary glow for intensity center-bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-t from-[rgba(9,229,229,0.2)] to-transparent blur-2xl" />
        </div>
      </div>
    </section>
  );
}