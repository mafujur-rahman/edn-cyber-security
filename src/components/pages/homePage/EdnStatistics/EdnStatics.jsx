"use client";
import React, { useRef, useState } from 'react';

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

  return (
    <section className="relative w-full my-20 bg-black py-20 overflow-hidden font-sans">
      
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
          
          {/* Title Box - bg image visible here */}
          <div className="md:w-[35%] py-24 flex items-center bg-transparent border-r border-white/10 relative px-12">
            <h2 className="text-5xl font-bold tracking-tight text-white leading-tight relative z-10">
              Why <span className="text-white/80">EDN?</span>
            </h2>
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
            
            {/* Stats Cards */}
            {stats.map((stat, idx) => (
              <div key={idx} className="relative p-12 flex flex-col justify-center border-r last:border-r-0 border-white/10 z-20">
                <div className="mb-3 flex items-baseline">
                  <span className="text-6xl font-black text-white tracking-tighter">
                    {stat.value.replace('+', '')}
                  </span>
                  <span className="text-2xl font-light text-white/30 ml-1">+</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300 font-medium tracking-wide">
                  {stat.label}
                </p>
                <div className="absolute right-0 bottom-0"><GridPoint /></div>
              </div>
            ))}
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