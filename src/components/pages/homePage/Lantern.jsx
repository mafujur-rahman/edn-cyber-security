"use client";
import { GradientButton } from '@/components/utils/GradiantButton';
import WordRevealText from '@/components/utils/WordRevealText';
import React, { useState, useRef } from 'react';


export default function LanternSection() {
  const [isLooping, setIsLooping] = useState(false);
  const videoRef = useRef(null);

  const introVideo = "/video/lantern-intro-edn.mp4";
  const loopVideo = "/video/lantern-loop-edn.mp4";

  const handleVideoEnd = () => {
    setIsLooping(true);
  };

  // Split text into parts
  const textBefore = "We have";
  const highlightText = "way more";
  const textAfter = "to offer: monitor your attack surface with Lantern";

  return (
    <section className="relative w-full bg-black pt-12 pb-32 px-6 flex flex-col items-center overflow-hidden">

      <div className="relative z-10 text-center max-w-4xl mb-0">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          {textBefore}{" "}
          <span
            style={{
              textShadow: '0 0 1rem #00E5E5, 0 0 3rem #8FEA3D',
              display: 'inline-block',
            }}
          >
            <WordRevealText
              text={highlightText}
              tag="span"
              className="inline-block"
              staggerAmount={0.040}
              duration={0.35}
              start="top 85%"
              ease="power3.out"
            />
          </span>{" "}
          {textAfter}
        </h2>
        <p className="text-white/60 text-sm md:text-[20px] max-w-3xl mx-auto leading-relaxed ">
          Combine credential deception with external attack surface management for full-spectrum protection.
        </p>
      </div>

      <div className="relative w-full max-w-7xl aspect-video flex flex-col items-center -mt-36 z-0">

        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            key={isLooping ? "loop" : "intro"}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            loop={isLooping}
            className="w-full h-full object-contain relative z-20"
          >
            <source src={isLooping ? loopVideo : introVideo} type="video/mp4" />
          </video>

          <div className="absolute -top-75 inset-0 flex items-center justify-center z-30">
            <GradientButton
              className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer text-white"
              variant="primary"
              onClick={() => console.log('Learn more about lantern')}
            >
              Learn more about lantern
            </GradientButton>
          </div>

          <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#4a080e] blur-[120px] rounded-[100%] opacity-60 z-0" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </section>
  );
}