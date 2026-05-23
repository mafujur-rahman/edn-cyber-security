"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WordRevealText from "@/components/utils/WordRevealText";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const investors = [
  {
    name: "MOONFIRE",
    logo: "/images/home/client/logo-1.png",
    width: 160,
    height: 35,
  },
  {
    name: "OVNI CAPITAL",
    logo: "/images/home/client/logo-2.png",
    width: 120,
    height: 50,
  },
  {
    name: "KIMA VENTURES",
    logo: "/images/home/client/logo-3.png",
    width: 110,
    height: 45,
  },
];

const GridDot = ({ className = "", style = {} }) => (
  <div
    className={`absolute w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,1)] z-30 ${className}`}
    style={{ transform: "translate(-50%, -50%)", ...style }}
  />
);

export default function StrategicInvestors() {
  const logosContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const gradientRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationTriggeredRef = useRef(false);

  const handleMouseMove = (e) => {
    if (!logosContainerRef.current) return;
    const rect = logosContainerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Function to trigger the animation
  const triggerAnimation = () => {
    if (animationTriggeredRef.current || !gradientRef.current) {
      console.log("Animation already triggered or gradient ref missing");
      return;
    }

    console.log("Triggering gradient animation");
    animationTriggeredRef.current = true;

    // Kill any existing animations on this element
    gsap.killTweensOf(gradientRef.current);

    // Set initial position
    gsap.set(gradientRef.current, {
      x: "-100%",
      opacity: 1,
    });

    // Animate
    gsap.to(gradientRef.current, {
      x: "100%",
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        if (gradientRef.current) {
          gsap.to(gradientRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });
  };

  useEffect(() => {
    // Reset animation trigger when component mounts
    animationTriggeredRef.current = false;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!cardsContainerRef.current) {
        console.log("Cards container ref not found");
        return;
      }

      console.log("Setting up ScrollTrigger for Strategic Investors");

      // Create ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top 80%",
        onEnter: () => {
          console.log("ScrollTrigger onEnter fired");
          triggerAnimation();
        },
        onEnterBack: () => {
          console.log("ScrollTrigger onEnterBack fired - ignoring");
          // Do nothing - only trigger once when scrolling down
        },
        toggleActions: "play none none none",
      });

      // Force ScrollTrigger to refresh and check current position
      ScrollTrigger.refresh();

      // Manually check if already in view
      const checkImmediate = () => {
        if (!cardsContainerRef.current) return;
        const rect = cardsContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInView = rect.top < windowHeight * 0.8 && rect.bottom > 0;
        console.log("Manual check - is in view:", isInView, "rect.top:", rect.top, "trigger point:", windowHeight * 0.8);

        if (isInView && !animationTriggeredRef.current) {
          console.log("Already in view, triggering immediately");
          triggerAnimation();
        }
      };

      // Run immediate check
      checkImmediate();

      // Also check after a short delay
      const delayTimer = setTimeout(checkImmediate, 500);

      // Check on load
      window.addEventListener('load', checkImmediate);

      // Cleanup
      return () => {
        clearTimeout(timer);
        clearTimeout(delayTimer);
        window.removeEventListener('load', checkImmediate);
        if (st) st.kill();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-48 md:py-64 my-20">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading with Word Reveal Animation */}
        <div className="mb-20">
          <WordRevealText
            text="Backed by strategic investors"
            className="text-center text-3xl md:text-[52px] font-medium tracking-tight text-white z-20"
            tag="h2"
            staggerAmount={0.040}
            duration={0.35}
            start="top 85%"
            ease="power3.out"
          />
        </div>

        {/* 5-Column Grid Layout */}
        <div ref={cardsContainerRef} className="relative w-full">
          {/* Internal Vertical Lines at 20%, 40%, 60%, 80% */}
          {[20, 40, 60, 80].map((leftPos) => (
            <div
              key={leftPos}
              className="absolute -top-64 -bottom-64 w-px bg-white/[0.08] z-20"
              style={{ left: `${leftPos}%` }}
            />
          ))}

          {/* Horizontal Lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.08] z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08] z-20" />

          {/* Intersection Dots at internal crossing points only */}
          {[20, 40, 60, 80].map((leftPos) => (
            <React.Fragment key={`dots-${leftPos}`}>
              <GridDot className="top-0" style={{ left: `${leftPos}%` }} />
              <GridDot className="bottom-0" style={{ left: `${leftPos}%` }} />
            </React.Fragment>
          ))}

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 md:h-32">
            {/* 1st Column: Empty Box */}
            <div className="hidden md:block relative" />

            {/* 2nd, 3rd, 4th Columns: Logos - treated as ONE combined area */}
            <div
              ref={logosContainerRef}
              className="relative md:col-span-3 flex"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Default black background for the entire 3-column area */}
              <div className="absolute inset-0 bg-black z-0" />

              {/* Container for left-to-right gradient animation */}
              <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
                <div
                  ref={gradientRef}
                  className="absolute inset-y-0 w-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(9,229,229,0.25), rgba(168,255,87,0.2), rgba(9,229,229,0.25), transparent)",
                  }}
                />
              </div>

              {/* Single smooth blended gradient - follows cursor across all 3 columns */}
              <div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: isHovering ? 1 : 0,
                  background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, 
                    rgba(9,229,229,0.12) 0%, 
                    rgba(9,229,229,0.06) 25%,
                    rgba(168,255,87,0.04) 50%,
                    transparent 80%
                  )`,
                }}
              />

              {/* The three logo boxes with border-right on all except last */}
              {investors.map((investor, idx) => (
                <div
                  key={idx}
                  className={`relative flex-1 flex items-center justify-center py-10 md:py-0 px-6 z-20 ${idx < investors.length - 1 ? "border-r border-white/[0.08]" : ""
                    }`}
                >
                  <Image
                    src={investor.logo}
                    alt={investor.name}
                    width={investor.width}
                    height={investor.height}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              ))}
            </div>

            {/* 5th Column: Empty Box */}
            <div className="hidden md:block relative" />
          </div>
        </div>
      </div>
    </section>
  );
}