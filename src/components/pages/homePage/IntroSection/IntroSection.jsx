"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProtectionShowcase = () => {
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  const ballRef = useRef(null);

  // Exact Path Data from your SVG screenshot
  const pathData = "M75.4781 0V429.095C76.9962 446.599 79.172 471.868 92.7505 507.113C168.473 703.656 172.531 780.674 75.4781 1030.73C-26.4278 1290 8.4118 2188.8 72.4161 2220.99 75.4781 2250";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the line drawing based on scroll
      gsap.fromTo(activeLineRef.current, 
        { strokeDasharray: 3000, strokeDashoffset: 3000 },
        { 
          strokeDashoffset: 0, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          }
        }
      );

      // 2. Animate the ball to follow the path (custom progress sync)
      const ST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        onUpdate: (self) => {
          // Manual sync of ball to path if motionPath is acting up with scale
          if (ballRef.current) {
            const path = activeLineRef.current;
            const length = path.getTotalLength();
            const point = path.getPointAtLength(self.progress * length);
            gsap.set(ballRef.current, { x: point.x, y: point.y });
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white relative py-20 overflow-hidden font-sans">
      
      {/* THE SPINE CONTAINER: Restricted width (150px) to match SVG viewBox */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="relative h-full w-[150px]">
          <svg 
            viewBox="0 0 150 2251" 
            className="w-full h-full" 
            fill="none" 
            preserveAspectRatio="xMidYMin meet"
          >
            <path d={pathData} stroke="#111" strokeWidth="2" />
            <path
              ref={activeLineRef}
              d={pathData}
              stroke="#ff0040"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_12px_#ff0040]"
            />
            {/* The Glowing Ball */}
            <g ref={ballRef}>
              <circle r="40" fill="radial-gradient(circle, #ff004033 0%, transparent 70%)" className="fill-rose-600/20 blur-2xl" />
              <circle r="5" fill="#fff" />
              <circle r="12" fill="none" stroke="#ff0040" strokeWidth="1" className="opacity-50" />
            </g>
          </svg>
        </div>
      </div>

      {/* CARDS: Positioned relative to the 150px spine */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION 1: PHISHING */}
        <div className="relative h-[600px] flex items-center">
            {/* Tilted Credential Card - Left of Line */}
            <div className="absolute left-[10%] top-[400px]">
                <div className="w-80 h-40 bg-[#080808] border border-white/10 p-6 transform -rotate-12 -skew-x-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group">
                    <CornerPips />
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 rounded-full bg-white/10" />
                        <div className="h-1.5 w-24 bg-white/5 rounded" />
                    </div>
                    <div className="mt-16 text-[9px] font-mono tracking-[0.2em] text-rose-500 uppercase">Leaked Credential</div>
                </div>
            </div>
            {/* Text - Right of Line */}
            <div className="absolute left-[55%] top-[450px] w-full max-w-sm">
                <GlassCard title="Phishing as a defense" desc="MokN Baits are defensive phishing pages that lure attackers into revealing compromised credentials before they're used." />
            </div>
        </div>

        {/* SECTION 2: VALID CREDENTIALS */}
        <div className="relative h-[700px] flex items-center">
             {/* Text - Left of Line */}
             <div className="absolute right-[55%] top-[250px] w-full max-w-sm text-right">
                <GlassCard align="right" title="Only valid credentials" desc="Millions of credentials may be tested. Our Baits filter the noise and alert only when valid ones are used against your systems." />
            </div>
            {/* Valid Password Card - Right of Line */}
            <div className="absolute right-[10%] top-[280px]">
                <div className="w-80 h-44 bg-[#0a0a0a] border border-rose-500/20 p-8 shadow-[0_0_40px_rgba(255,0,64,0.1)] relative">
                    <CornerPips />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_#ff0040]" />
                        <span className="text-[11px] font-black uppercase text-rose-500 tracking-widest">Valid Password</span>
                    </div>
                    <div className="space-y-3">
                        <div className="h-1.5 w-full bg-white/5" />
                        <div className="h-1.5 w-2/3 bg-white/5" />
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 3: THREAT INTEL */}
        <div className="relative h-[600px]">
            <div className="absolute left-[55%] top-[200px] w-full max-w-sm">
                <GlassCard title="Tailored Threat intelligence" desc="Monitor real attacker activity targeting your environment. No generic feeds, only insights tied to your users, systems, and domains." />
            </div>
            <div className="absolute left-[15%] top-[150px] w-72 h-52 bg-[#080808] border border-white/5 p-6 flex flex-col justify-between">
                <div className="text-[10px] uppercase text-gray-500 font-bold">Attack Overview</div>
                <div className="w-24 h-24 border-8 border-white/5 border-t-rose-600 rounded-full mx-auto" />
                <div className="text-center text-[9px] font-mono text-rose-500 tracking-widest">THREAT_IDENTIFIED</div>
            </div>
        </div>

        {/* FOOTER */}
        <div className="mt-40 mb-20 flex justify-center">
            <div className="w-full max-w-3xl bg-[#050505] border border-white/10 p-20 text-center relative group">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:15px_15px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-rose-600/20 blur-[120px]" />
                <CornerDots />
                <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none">3 minutes to implement <br /> <span className="text-rose-500">your First Baits.</span></h2>
                <p className="text-gray-500 mb-10 text-xs italic">No setup friction. No integration delays.</p>
                <button className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-rose-500 hover:text-white transition-all">
                    Learn more about Baits
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLED SUB-COMPONENTS ---

const GlassCard = ({ title, desc, align = "left" }) => (
  <div className="relative">
    <div className={`flex items-center gap-3 mb-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
        <div className="w-5 h-5 border border-rose-500 flex items-center justify-center rotate-45 flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-rose-500 shadow-[0_0_5px_#ff0040]" />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-tighter leading-none">{title}</h3>
    </div>
    <p className="text-gray-500 text-[13px] leading-relaxed font-light">{desc}</p>
  </div>
);

const CornerPips = () => (
    <>
        <div className="absolute top-3 left-3 w-1 h-1 bg-white/20" />
        <div className="absolute top-3 right-3 w-1 h-1 bg-white/20" />
    </>
);

const CornerDots = () => (
    <>
        <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white shadow-[0_0_5px_white]" />
        <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white shadow-[0_0_5px_white]" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white shadow-[0_0_5px_white]" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white shadow-[0_0_5px_white]" />
    </>
);

export default ProtectionShowcase;