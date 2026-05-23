"use client";
import React from 'react';
import Image from 'next/image';
import WordRevealText from '@/components/utils/WordRevealText';

export default function CustomerLogoSection() {
  // Using the exact URL found in your technical screenshot
  const blurredLogoUrl = "/images/home/blurred-logo.webp";

  return (
    <section className="relative w-full bg-black py-16 flex flex-col items-center overflow-hidden">

      <div className="">
        <WordRevealText
          text="Our customers"
          className="text-white text-xl md:text-2xl lg:text-4xl font-bold tracking-tight"
          tag="h2"
          staggerAmount={0.040}
          duration={0.35}
          start="top 85%"
          ease="power3.out"
        />
      </div>

      {/* Reduced height container - width remains full, height is lower */}
      <div className="relative w-full max-w-7xl h-[180px] md:h-[220px] flex items-center justify-center">
        {/* The div class="blurred_logo" structure from your file */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={blurredLogoUrl}
            alt="Blurred logos"
            fill
            priority
            className="object-contain select-none pointer-events-none"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center gap-6 px-6">

        <WordRevealText
          text="Don't see any logos? That's intentional."
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white"
          tag="h3"
          staggerAmount={0.040}
          duration={0.35}
          start="top 85%"
          ease="power3.out"
        />

        <p className="text-sm md:text-[24px] leading-relaxed text-white/60 font-medium max-w-5xl">
          We’ve chosen to keep our clients anonymous. But to give you a sense of scale,
          the combined annual revenue of organizations protected by MokN exceeds
        </p>

        {/* 4. THE GLOWING DOLLAR AMOUNT - with blurry gradient background behind white text */}
        <div className="relative py-4 flex items-center justify-center">


          {/* White text stays white */}
          <span className="relative z-10 text-5xl md:text-6xl font-black text-white tracking-tighter"
            style={{
              textShadow: '0 0 1rem #00E5E5, 0 0 3rem #8FEA3D',
            }}
          >
            $480 billion.
          </span>
        </div>

        <div className="w-full mt-2">
          <p className="text-sm md:text-[24px] leading-relaxed text-white/60 font-medium">
            We don’t showcase logos. We protect them.
          </p>
        </div>
      </div>
    </section>
  );
}