"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GradientButton } from '@/components/utils/GradiantButton';

export default function DeepDive() {
  return (
    <section className="relative w-full bg-black py-32 px-6 flex flex-col items-center overflow-hidden">

      {/* 1. TOP IMAGE: The Suspended Lantern Asset */}
      <div className="relative w-full max-w-[400px] flex flex-col items-center">
        {/* The Asset - Replace with your actual .png or .webp */}
        <div className="relative aspect-square w-64 md:w-80">
          <img
            src="/images/home/logo/3d-transparent.png"
            alt="Lantern Device"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          />
        </div>
      </div>

      {/* 2. TEXT CONTENT: Glowing Typography */}
      <div className="relative z-10 text-center max-w-4xl space-y-8 -mt-35">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Looking to go deeper?
          </h2>
          
          {/* The "Glow" line matching your exact gradient */}
          <div className="relative inline-block isolate">
            {/* This layer acts as the gradient shadow. 
              By matching the exact text, font sizing, and applying a blur filter, 
              it creates a glowing silhouette using your specific gradient colors.
            */}
            <span 
              className="absolute inset-0 text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#09E5E5] to-[#A8FF57] bg-clip-text text-transparent blur-md select-none opacity-70 transform translate-y-[2px]"
              aria-hidden="true"
            >
              Let’s light up the depths.
            </span>

            {/* Core White Text Layer with a subtle white text-shadow for crispness */}
            <h2 className="relative text-4xl md:text-6xl font-bold tracking-tight text-white z-10 [text-shadow:0_0_8px_rgba(255,255,255,0.3)]">
              Let’s light up the depths.
            </h2>
          </div>
        </div>

        <p className="text-white/80 text-sm md:text-[18px] max-w-2xl mx-auto leading-relaxed font-medium">
          Book a demo and discover what attackers could find if they scanned your
          perimeter right now and how Lantern helps you detect and fix exposures
          before they become entry points.
        </p>
      </div>

      {/* 3. ACTION BUTTONS: Dual Button Layout */}
      <div className="relative z-10 mt-16 flex flex-col sm:flex-row items-center gap-4">
        {/* Secondary Action */}
        <button className="px-10 py-3 bg-black border border-white/10 rounded-sm text-[11px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/5 transition-all">
          Contact us
        </button>

        {/* Primary Action */}
        <GradientButton
          className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer text-white"
          variant="primary"
          onClick={() => console.log('Book a demo clicked')}
        >
          Book a demo
        </GradientButton>
      </div>
    </section>
  );
}