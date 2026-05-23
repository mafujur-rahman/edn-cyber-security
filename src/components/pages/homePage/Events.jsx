"use client";
import WordRevealText from '@/components/utils/WordRevealText';
import React, { useEffect, useRef } from 'react';


export default function EventsSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
            // Stop observing once it plays once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Play when 50% of the section is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

        {/* LEFT SIDE: Digital Globe Video */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[900px] aspect-square">
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              className="w-full h-full "
            >
              <source src="/video/Map-transcode.mp4" type="video/mp4" />
              {/* Fallback image if video fails */}
            </video>
          </div>
        </div>

        {/* RIGHT SIDE: Text Content */}
        <div className="flex flex-col gap-6 max-w-xl">
          <WordRevealText
            text="Let’s meet at our next event"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
            tag="h2"
            staggerAmount={0.040}
            duration={0.35}
            start="top 85%"
            ease="power3.out"
          />

          <p className="text-sm md:text-[24px] leading-relaxed text-white/40 font-medium">
            Meeting Mokn at the upcoming event promises to be a memorable
            experience. Get ready to exchange ideas and discover new
            perspectives. Don’t miss this opportunity to connect with us!
          </p>

          <div className="mt-4 space-y-6">
            <h4 className="text-sm md:text-[24px]  font-bold text-white/40">
              Our next events:
            </h4>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm md:text-lg font-bold text-white">
                  BSides South Florida - Fort Lauderdale, USA / May 08, 2026
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm md:text-lg font-bold text-white">
                  BSides Nashville - Nashville, USA / May 15, 2026
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}