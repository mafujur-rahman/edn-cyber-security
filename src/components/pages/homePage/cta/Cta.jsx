// app/components/CallToAction.jsx
"use client";
import React, { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { GradientButton } from '@/components/utils/GradiantButton';
import WordRevealText from '@/components/utils/WordRevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CallToAction() {
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);
  const buttonRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Left-to-right gradient reveal animation (play once)
    if (gradientRef.current && !hasAnimated.current) {
      gsap.set(gradientRef.current, {
        scaleX: 0,
        transformOrigin: "0% 50%"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        onEnter: () => {
          if (!hasAnimated.current) {
            gsap.to(gradientRef.current, {
              scaleX: 1,
              duration: 1.5,
              ease: "power3.inOut",
              onComplete: () => {
                hasAnimated.current = true;
              }
            });
          }
        },
        once: true // This ensures the animation only triggers once
      });
    }

    // Button reveal animation (play once)
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        x: 30
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        onEnter: () => {
          gsap.to(buttonRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        once: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black mt-40 px-6 overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto min-h-[160px] flex items-center justify-center p-1 rounded-sm border border-white/5 bg-[#080808]">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none"
             style={{ 
               backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`, 
               backgroundSize: '8px 8px' 
             }} />
        
        {/* Left-to-right reveal gradient */}
        <div 
          ref={gradientRef}
          className="absolute inset-0 z-0 opacity-25 pointer-events-none" 
          style={{
            background: `linear-gradient(90deg, #00E5E5 0%, #39F2A1 50%, #99FF33 100%)`,
            maskImage: 'radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage: 'radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)'
          }}
        />

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 gap-12 text-center md:text-left my-6">
          
          <div className="flex flex-col gap-1">
            <WordRevealText
              text="You need more?"
              className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-white opacity-80"
              tag="span"
              staggerAmount={0.1}
              duration={0.3}
              start="top 85%"
              ease="back.out(0.7)"
            />
            
            <WordRevealText
              text="Talk to a security expert from our team."
              className="text-xl md:text-3xl font-bold tracking-tight text-white leading-tight"
              tag="h2"
              staggerAmount={0.04}
              duration={0.35}
              start="top 85%"
              ease="power3.out"
            />
          </div>

          <div ref={buttonRef} className="flex justify-end">
            <GradientButton
              className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer text-white"
              variant="primary"
              onClick={() => console.log('Schedule demo clicked')}
            >
              Schedule your demo
              <ChevronRight className="w-4 h-4 ml-3 group-hover:scale-110 transition-all duration-300" strokeWidth={3}/>
            </GradientButton>
          </div>

        </div>
      </div>
    </section>
  );
}