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
  const gradientLightRef = useRef(null);
  const numbersRef = useRef([]);
  const labelsRef = useRef([]);
  const hoverLightRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!statsContainerRef.current) return;
    const rect = statsContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    // Animate the hover light with GSAP for smooth following
    if (hoverLightRef.current) {
      gsap.to(hoverLightRef.current, {
        x: x,
        y: y,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hoverLightRef.current) {
      gsap.to(hoverLightRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (hoverLightRef.current) {
      gsap.to(hoverLightRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
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

      // 3. LEFT-TO-RIGHT GRADIENT ANIMATION with blur
      if (gradientRef.current) {
        // Set initial state - off screen left
        gsap.set(gradientRef.current, { 
          x: "-150%",
          opacity: 0,
          willChange: "transform"
        });
        
        masterTimeline.to(gradientRef.current, {
          x: "150%",
          duration: 1.5,
          ease: "power2.inOut",
          opacity: 1,
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
          
          {/* Title Box */}
          <div 
            ref={titleContainerRef}
            className="md:w-[35%] py-16 flex items-center bg-transparent border-r border-white/10 relative px-12"
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

          {/* Stats Boxes Container */}
          <div 
            ref={statsContainerRef}
            className="md:w-[65%] grid grid-cols-1 md:grid-cols-3 relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ overflow: 'hidden' }}
          >
            {/* Default black background for stats area */}
            <div className="absolute inset-0 bg-black z-0" />
            
            {/* Left-to-Right Gradient Light */}
            <div
              ref={gradientRef}
              className="highlight_grid_light pointer-events-none absolute top-0 left-0 z-[5]"
              style={{
                aspectRatio: '1',
                backgroundColor: 'var(--primary)',
                filter: 'blur(8rem)',
                borderRadius: '99rem',
                width: '30%',
                height: 'auto',
                opacity: 0,
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                background: 'radial-gradient(circle, #00E5E5 0%, #99FF33 100%)',
              }}
            />
            
            {/* Hover Light Effect - follows cursor */}
            <div
              ref={hoverLightRef}
              className="highlight_grid_light-2 pointer-events-none absolute top-0 left-0 z-10"
              style={{
                aspectRatio: '1',
                backgroundColor: 'var(--primary)',
                filter: 'blur(8rem)',
                borderRadius: '99rem',
                width: '30%',
                height: 'auto',
                position: 'absolute',
                left: '0%',
                right: 'auto',
                opacity: 0,
                transform: 'translate(-50%, -50%)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                background: 'radial-gradient(circle, #00E5E5 0%, #99FF33 100%)',
              }}
            />
            
            {/* Stats Cards */}
            {stats.map((stat, idx) => {
              const numericValue = stat.value.replace('+', '');
              
              return (
                <div key={idx} className="relative p-12 flex flex-col border-r last:border-r-0 border-white/10 z-20">
                  {/* Number container */}
                  <div className="flex-shrink-0">
                    <div 
                      ref={el => numbersRef.current[idx] = el}
                      className="flex items-baseline opacity-0"
                    >
                      <span className="text-5xl font-black text-white tracking-tighter whitespace-nowrap">
                        {numericValue}+
                      </span>
                    </div>
                  </div>
                  
                  {/* Label container */}
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

        {/* BOTTOM DECORATIVE ROW */}
        <div className="hidden md:flex h-48 relative">
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