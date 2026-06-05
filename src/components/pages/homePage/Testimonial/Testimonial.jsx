"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingTestimonial() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const gradientLightRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const content = textElement.textContent;

    // 1. Split text into individual spans for character-by-character control
    textElement.innerHTML = content
      .split("")
      .map((char) => `<span class="char">${char}</span>`)
      .join("");

    const chars = textElement.querySelectorAll('.char');
    const gradientElement = gradientLightRef.current;

    // 2. GSAP Animation with ScrollTrigger - slower and smoother
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",        // Extended scroll distance for slower reveal
        scrub: 2.5,           // Higher scrub value = smoother, more gradual animation
        pin: true,
        markers: false,
        anticipatePin: 1,     // Smoother pin behavior
      }
    });

    // Text color animation - slower character reveal
    tl.fromTo(
      chars,
      { color: "rgba(255, 255, 255, 0.12)" },
      {
        color: "rgba(255, 255, 255, 1)",
        stagger: 0.08,        // Reduced stagger for smoother flow
        ease: "power1.inOut", // Smoother easing curve
        duration: 2.5,        // Longer duration per character
      },
      0
    );

    // Gradient expand animation - starts with no visible gradient
    tl.fromTo(
      gradientElement,
      {
        opacity: 0,
        filter: "blur(6rem)",
        width: "0%",
        height: "0rem",
        bottom: "-20rem",
      },
      {
        opacity: 1,
        filter: "blur(6rem)",
        width: "80%",
        height: "45rem",
        bottom: "-40rem",
        duration: 3,
        ease: "power2.inOut",
      },
      0.15
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

      {/* Bottom Pinning Gradient Animation - Expands from nothing */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none">
        <div
          ref={gradientLightRef}
          className="quote_light"
          style={{
            opacity: 0,
            filter: "blur(6rem)",
            borderRadius: "50%",
            width: "0%",
            maxWidth: "80rem",
            height: "0rem",
            position: "absolute",
            top: "auto",
            bottom: "-20rem",
            background: "radial-gradient(circle at center, rgba(0, 229, 229, 0.5) 0%, rgba(57, 242, 161, 0.4) 40%, rgba(153, 255, 51, 0.3) 70%, transparent 100%)",
            transform: "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, width, height",
            transition: "none",
          }}
        />
      </div>

      {/* Soft centered ambient flow to unify the layout depth - appears with animation */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 pointer-events-none opacity-0 animate-ambient-glow"
        style={{
          height: "200px",
          background: "radial-gradient(ellipse at center bottom, rgba(57, 242, 161, 0.2), transparent 75%)",
          filter: "blur(25px)",
          zIndex: 5,
        }}
      />
    </section>
  );
}