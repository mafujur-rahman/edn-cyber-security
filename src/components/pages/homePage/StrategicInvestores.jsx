"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!logosContainerRef.current) return;
    const rect = logosContainerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative overflow-hidden bg-black py-48 md:py-64 my-20">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-20">
          <h2 className="text-center text-3xl md:text-[52px] font-medium tracking-tight text-white z-20">
            Backed by strategic investors
          </h2>
        </div>

        {/* 5-Column Grid Layout */}
        <div className="relative w-full">
          
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
                  className={`relative flex-1 flex items-center justify-center py-10 md:py-0 px-6 z-20 ${
                    idx < investors.length - 1 ? "border-r border-white/[0.08]" : ""
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