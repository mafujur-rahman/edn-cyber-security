"use client";
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { GradientButton } from '@/components/utils/GradiantButton';

export default function CallToAction() {
  return (
    <section className="relative w-full bg-black mt-40 px-6 overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto min-h-[160px] flex items-center justify-center p-1 rounded-sm border border-white/5 bg-[#080808]">
        
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none"
             style={{ 
               backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`, 
               backgroundSize: '8px 8px' 
             }} />
        
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#09E5E5] via-[#A8FF57] via-30% to-black to-60% opacity-40" />

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-white opacity-80">
              You need more?
            </span>
            <h2 className="text-xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              Talk to a security expert from our team.
            </h2>
          </div>

          <div className="flex justify-end">
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