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

    // Gradient reveal - slower and smoother
    tl.fromTo(
      circleElement,
      {
        width: "0%",
        height: "0px",
        opacity: 0,
        filter: "blur(12px)",
      },
      {
        width: "100%",
        height: "280px",       // Slightly increased height
        opacity: 1,
        filter: "blur(12px)",  // Reduced blur for sharper look
        duration: 3,           // Longer duration for slower reveal
        ease: "power2.inOut",  // Smooth easing
      },
      0.15                    // Small delay after text starts
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

      {/* Straight Bottom Gradient Container - Matching Ethical Den Brand Identity */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="relative w-full"
          style={{
            width: "0%",
            maxWidth: "1280px",
            height: "0px",
            opacity: 0,
          }}
        >
          {/* Main ambient glow fading upwards while maintaining horizontal logo gradient structure */}
          <div 
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: "280px",
              background: `
                linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000000 100%),
                linear-gradient(to right, rgba(0, 229, 229, 0.25) 0%, rgba(57, 242, 161, 0.2) 50%, rgba(153, 255, 51, 0.25) 100%)
              `,
              backgroundBlendMode: "screen",
              maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
              borderBottom: "none",
            }}
          >
            {/* Sharp accent line at the very bottom with the exact Left-to-Right logo gradient */}
            <div 
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent 0%, #00E5E5 15%, #39F2A1 50%, #99FF33 85%, transparent 100%)",
              }}
            />
          </div>

          {/* Soft centered ambient flow to unify the layout depth */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4"
            style={{
              height: "140px",
              background: "radial-gradient(ellipse at center bottom, rgba(57, 242, 161, 0.15), transparent 75%)",
              filter: "blur(25px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}