"use client";
import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WordRevealText from '@/components/utils/WordRevealText';


// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "1B+", label: "Processed login attempts." },
  { value: "300+", label: "Compromised credentials unknown from the dark web." },
  { value: "960k+", label: "Users protected." },
];

const GridPoint = () => (
  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] z-30">
    <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
  </div>
);

export default function EdnStatistics() {
  const statsContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const gradientRef = useRef(null);
  const numbersRef = useRef([]);
  const labelsRef = useRef([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!statsContainerRef.current) return;
    const rect = statsContainerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Create a master timeline for scroll-triggered animations
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reset",
        }
      });

      // 1. FADE-IN ANIMATION FOR NUMBERS with scroll trigger
      const numbers = numbersRef.current.filter(el => el);
      if (numbers.length) {
        masterTimeline.fromTo(numbers,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          0.2
        );
      }

      // 2. WORD-BY-WORD REVEAL FOR EACH LABEL with scroll trigger
      labelsRef.current.forEach((labelContainer, idx) => {
        if (!labelContainer) return;
        const words = labelContainer.querySelectorAll('.label-word');
        if (words.length) {
          masterTimeline.fromTo(words,
            { opacity: 0, x: 20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
            },
            0.5 + (idx * 0.1)
          );
        }
      });

      // 3. LEFT-TO-RIGHT GRADIENT ANIMATION after text animations
      if (gradientRef.current) {
        // Set initial state
        gsap.set(gradientRef.current, { 
          x: "-100%",
          opacity: 1
        });
        
        masterTimeline.to(gradientRef.current, {
          x: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(gradientRef.current, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }, 1.0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full my-20 bg-black py-20 overflow-hidden font-sans">
      
      {/* BACKGROUND: Carbon Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-repeat opacity-[0.15]"
          style={{ 
            backgroundImage: `url('/images/home/carbon-bg.webp')`,
            backgroundSize: '500px auto',
            maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
          }}
        />
      </div>

      {/* Main content with max-w-7xl constraint */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP DECORATIVE ROW */}
        <div className="hidden md:flex border-b border-white/10 h-48">
          <div className="w-[35%] border-r border-white/10 relative p-8">
            <div className="absolute right-0 bottom-0"><GridPoint /></div>
          </div>
          <div className="w-[65%] grid grid-cols-3">
            <div className="border-r border-white/10 relative p-8">
               <div className="absolute right-0 bottom-0"><GridPoint /></div>
            </div>
            <div className="border-r border-white/10 relative">
               <div className="absolute right-0 bottom-0"><GridPoint /></div>
            </div>
            <div className="relative">
               <div className="absolute right-0 bottom-0"><GridPoint /></div>
            </div>
          </div>
        </div>

        {/* MIDDLE CONTENT ROW - The Stats */}
        <div className="flex flex-col md:flex-row bg-black/30 border-b border-white/10 min-h-[150px] relative">
          
          {/* Title Box - Using character-by-character reveal component */}
          <div 
            ref={titleContainerRef}
            className="md:w-[35%] py-24 flex items-center bg-transparent border-r border-white/10 relative px-12"
          >
            <WordRevealText 
              text="Why EDN?"
              className="text-5xl font-bold tracking-tight text-white leading-tight relative z-10"
              tag="h2"
              staggerAmount={0.040}
              duration={0.35}
              start="top 85%"
              ease="power3.out"
            />
            <div className="absolute right-0 bottom-0"><GridPoint /></div>
          </div>

          {/* Stats Boxes Container - with smooth light effect following cursor */}
          <div 
            ref={statsContainerRef}
            className="md:w-[65%] grid grid-cols-1 md:grid-cols-3 relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Default black background for stats area */}
            <div className="absolute inset-0 bg-black z-0" />
            
            {/* Container for gradient - positioned to cover only the middle three cards area */}
            <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
              {/* Gradient that animates left to right across the stats cards */}
              <div 
                ref={gradientRef}
                className="absolute inset-y-0 w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(9,229,229,0.25), rgba(168,255,87,0.2), rgba(9,229,229,0.25), transparent)",
                  opacity: 0,
                }}
              />
            </div>
            
            {/* Single smooth blended gradient - no visible center, just a soft glow */}
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
            
            {/* Stats Cards - with consistent alignment */}
            {stats.map((stat, idx) => {
              const numericValue = stat.value.replace('+', '');
              const hasPlus = stat.value.includes('+');
              
              return (
                <div key={idx} className="relative p-12 flex flex-col border-r last:border-r-0 border-white/10 z-20">
                  {/* Number container - fade-in animation (staying here) */}
                  <div className="flex-shrink-0">
                    <div 
                      ref={el => numbersRef.current[idx] = el}
                      className="flex items-baseline opacity-0"
                    >
                      <span className="text-6xl font-black text-white tracking-tighter whitespace-nowrap">
                        {numericValue}
                      </span>
                      {hasPlus && (
                        <span className="text-2xl font-light text-white/30 ml-1">+</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Label container - word reveal animation (staying here) */}
                  <div className="flex-1 mt-4">
                    <div 
                      ref={el => labelsRef.current[idx] = el}
                      className="text-sm leading-relaxed text-zinc-300 font-medium tracking-wide"
                    >
                      {stat.label.split(' ').map((word, wordIdx) => (
                        <span 
                          key={wordIdx} 
                          className="label-word inline-block opacity-0"
                          style={{ marginRight: "0.25em" }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute right-0 bottom-0"><GridPoint /></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM DECORATIVE ROW - with vertical line on the right side of 960k+ */}
        <div className="hidden md:flex h-48 relative">
          {/* Vertical line positioned at 35% (right side of 960k+ area) */}
          <div className="absolute left-[35%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent z-20" />
          
          <div className="w-[35%] border-r border-white/10 relative p-8">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="w-[65%] grid grid-cols-3">
            <div className="border-r border-white/10 relative"></div>
            <div className="border-r border-white/10 relative p-8"></div>
            <div className="relative p-8 flex justify-end items-end">
              <div className="absolute bottom-0 left-0 w-px h-8 bg-white/20" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}