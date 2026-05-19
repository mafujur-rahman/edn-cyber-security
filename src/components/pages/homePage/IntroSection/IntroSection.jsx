"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GradientButton } from "@/components/utils/GradiantButton";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProtectionShowcase = () => {
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  const topTextRef = useRef(null);
  const svgContainerRef = useRef(null);

  // Path data reflecting the curves seen in the screenshots
  const pathData = "M75.9813 0V429.095C77.5097 446.599 79.7002 471.868 93.3704 507.113C169.604 703.656 173.69 780.674 75.9813 1030.73C-26.6131 1293.29 -21.3403 1360.8 75.9813 1595.85C170.818 1824.91 172.668 1940.93 86.2012 2162.98C78.9349 2188.8 72.8987 2220.99 75.9813 2250";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = activeLineRef.current;
      const pathLength = path.getTotalLength();

      // Set initial state - line not drawn yet
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      // Animate line drawing from top to bottom as scroll progresses
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate top text fade in
      gsap.fromTo(topTextRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Card reveal animations
      gsap.utils.toArray('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="text-white relative py-0 overflow-x-clip">

      <div className="relative z-30 pt-20 text-center">
        <div className="relative inline-block">
          <span
            className="absolute inset-0 -z-10 blur-[25px] rounded-full opacity-45"
            style={{
              background: 'linear-gradient(90deg, #09E5E5, #A8FF57)',
              filter: 'blur(30px)'
            }}
          />
          <p
            ref={topTextRef}
            className="text-lg md:text-2xl lg:text-6xl font-bold leading-[1.1] tracking-wide text-white opacity-0"
          >
            It's time for a new approach.
          </p>
        </div>
      </div>

      {/* THE SPINE - Centered horizontally with responsive containment */}
      <div ref={svgContainerRef} className="absolute inset-0 flex justify-center pointer-events-none overflow-visible -mt-[480px]">
        <div className="relative h-full w-[150px] max-w-[150px] shrink-0">
          <svg
            viewBox="0 0 151 2251"
            className="w-full h-full"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="75.9813" y1="0" x2="75.9813" y2="2250" gradientUnits="userSpaceOnUse">
                <stop stopColor="#09E5E5" />
                <stop offset="0.5" stopColor="#A8FF57" />
                <stop offset="1" stopColor="#09E5E5" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background gray path - always visible as base */}
            <path d={pathData} stroke="#2a2a2a" strokeWidth="2" fill="none" />

            {/* Active gradient path that gets revealed during scroll */}
            <path
              ref={activeLineRef}
              d={pathData}
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>

      {/* CARDS LAYER - Responsive container with no overflow */}
      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">

        {/* SECTION 1: Curve 1 */}
        <div className="relative min-h-[850px] h-auto md:h-[850px] mb-8 md:mb-0">
          {/* Credential Card (Left) */}
          <div className="reveal-card absolute left-[2%] sm:left-[5%] top-[650px] z-20 w-auto max-w-[90vw] sm:max-w-none">
            <VisualCard rotation="-rotate-[12deg]" width="w-[90vw] sm:w-[440px]" height="h-auto sm:h-40 min-h-[160px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-0">
                <div className="w-14 h-14 rounded-full bg-zinc-800/50 flex items-center justify-center border border-white/5 shrink-0">
                  <svg className="w-7 h-7 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xl sm:text-2xl font-medium tracking-tight break-all">user@company.com</div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(9,229,229,0.5)] shrink-0" style={{ background: 'linear-gradient(135deg, #09E5E5, #A8FF57)' }}>
                      <span className="text-[10px] text-black">🔒</span>
                    </div>
                    <span className="text-zinc-500 font-mono text-sm sm:text-base break-all">Xmo8Lp4x#jk_1</span>
                  </div>
                </div>
                <div className="opacity-20 text-[9px] font-black tracking-[0.4em] uppercase hidden sm:block writing-mode-vertical ml-2">
                  Leaked Credential
                </div>
              </div>
            </VisualCard>
          </div>

          {/* Content Card (Right) */}
          <div className="reveal-card absolute left-[5%] sm:left-[48%] top-[510px] w-[90vw] sm:w-full max-w-[60vw] sm:max-w-xl">
            <GlassCard
              title="Phishing as a defense"
              desc="MoK.N Baits are defensive phishing pages that lure attackers into revealing compromised credentials before they're used."
            />
          </div>
        </div>

        {/* SECTION 2: Curve 2 */}
        <div className="relative min-h-[900px] h-auto md:h-[900px] mb-8 md:mb-0">
          {/* Content Card (Left) */}
          <div className="reveal-card absolute left-[5%] sm:right-[48%] sm:left-auto top-[300px] w-[90vw] sm:w-full max-w-[60vw] sm:max-w-xl z-10">
            <GlassCard
              side="left"
              title="Only valid credentials"
              desc="Millions of credentials may be tested. Our Baits filter the noise and alert only when valid ones are used against your systems."
            />
          </div>

          {/* Visual Card Stack (Right) */}
          <div className="reveal-card absolute left-[5%] sm:right-[8%] sm:left-auto top-[380px] w-[90vw] sm:w-auto">
            <div className="relative group">
              <div className="hidden sm:block absolute top-[-40px] -left-8 w-[400px] h-48 bg-zinc-900/20 border border-white/5 -rotate-[8deg] blur-[1px] opacity-40" />
              <div className="hidden sm:block absolute top-[-20px] -left-4 w-[400px] h-48 bg-zinc-900/40 border border-white/5 -rotate-[5deg] opacity-60" />

              <VisualCard rotation="-rotate-[3deg]" width="w-[90vw] sm:w-[420px]" height="h-auto sm:h-52 min-h-[200px]">
                <div className="flex flex-col h-full justify-between py-4 sm:py-2 px-4 sm:px-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(9,229,229,0.4)] shrink-0" style={{ background: 'linear-gradient(135deg, #09E5E5, #A8FF57)' }}>
                      <span className="text-black text-xs">⚠️</span>
                    </div>
                    <div>
                      <div className="text-[#09E5E5] text-lg sm:text-xl font-bold tracking-tight">Valid Password</div>
                      <div className="text-zinc-500 text-xs mt-0.5">Verified credential compromise</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-6 sm:mt-8 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-zinc-400 font-mono text-xs">Joe_b***</span>
                      <span className="bg-[#09E5E5]/10 text-[#09E5E5] text-[8px] px-2 py-0.5 rounded border border-[#09E5E5]/20 uppercase font-black">
                        Critical Alert
                      </span>
                    </div>
                    <div className="text-zinc-600 text-[10px] font-medium">July 28th</div>
                  </div>
                </div>
              </VisualCard>
            </div>
          </div>
        </div>

        {/* SECTION 3: Curve 3 */}
        <div className="relative min-h-[850px] h-auto md:h-[850px] mb-8 md:mb-0">
          {/* Attack Overview Chart (Left) */}
          <div className="reveal-card absolute left-[2%] sm:left-[5%] top-[0px] z-20 w-auto max-w-[90vw] sm:max-w-none">
            <VisualCard rotation="rotate-0" width="w-[90vw] sm:w-[450px]" height="h-auto sm:h-64 min-h-[280px]">
              <div className="relative h-full p-4 sm:p-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                  <div>
                    <h4 className="text-white text-lg sm:text-xl font-semibold">Attack Overview</h4>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Threat Actor <span className="text-[#09E5E5]">APT28</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-500">5900 total attempts in 2 hours</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-4">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="#333" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="100" />
                      <circle cx="50" cy="50" r="40" stroke="url(#pieGradient)" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="200" />
                      <defs>
                        <linearGradient id="pieGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor="#09E5E5" />
                          <stop offset="1" stopColor="#A8FF57" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-950 rounded-full shadow-inner" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 w-full sm:w-auto">
                    <LegendItem color="bg-zinc-800" label="Leaked Password" />
                    <LegendItem color="bg-white" label="Invalid User" />
                    <LegendItem color="bg-gradient-to-r from-[#09E5E5] to-[#A8FF57]" label="Valid credentials" />
                  </div>
                </div>
              </div>
            </VisualCard>
          </div>

          {/* Content Card (Right) */}
          <div className="reveal-card absolute left-[5%] sm:left-[48%] -top-[80px] sm:-top-[80px] top-[-60px] w-[90vw] sm:w-full max-w-[60vw] sm:max-w-xl">
            <GlassCard
              title="Tailored Threat intelligence"
              desc="Monitor real attacker activity targeting your environment. No generic feeds, only insights tied to your users, systems, and domains."
            />
          </div>
        </div>

        {/* SECTION 4: Final Curve / Bottom */}
        <div className="reveal-card flex justify-center pb-16 sm:pb-40 px-4 sm:px-6 -mt-[300px] sm:-mt-[400px] relative z-20">
          <div className="w-full max-w-6xl bg-zinc-950 border border-white/10 p-6 sm:p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 blur-[120px] -z-10" />
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45 " />
            <div className="absolute -top-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45 " />
            <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45 " />
            <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45 " />

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-white leading-tight">
              3 minutes to implement <br className="hidden sm:block" />
              your First Baits.
            </h2>

            <p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              No setup friction. No integration delays.<br className="hidden sm:block" />
              Go from zero to live detection in minutes, with a seamless onboarding experience.
            </p>

            {/* Primary Action */}
            <GradientButton
              className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer text-white"
              variant="primary"
              onClick={() => console.log('Learn more about baits clicked')}
            >
              Learn more about baits
            </GradientButton>
          </div>
        </div>

      </div>
    </div>
  );
};

const GlassCard = ({ title, desc, side = "left" }) => (
  <div className={`relative group p-6 sm:p-8 md:p-10 bg-zinc-950 border border-white/5 backdrop-blur-md rounded-sm min-h-[300px] sm:min-h-[400px] flex flex-col justify-center ${side === 'right' ? 'text-right items-end' : 'text-left items-start'}`}>

    <div className={`absolute top-1/4 ${side === 'right' ? 'right-4 sm:right-10' : 'left-4 sm:left-10'} w-24 h-24 sm:w-32 sm:h-32  blur-[60px] -z-10`} />

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-zinc-950 border border-white/10 rounded-xl flex items-center justify-center shadow-2xl shrink-0">
        <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-4xl font-semibold tracking-tight text-white text-left">{title}</h3>
    </div>

    <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-light text-left">
      {desc}
    </p>
  </div>
);

const VisualCard = ({ children, rotation = "", width = "w-96", height = "h-40" }) => (
  <div className={`${width} ${height} bg-zinc-950 border border-white/10 relative shadow-2xl ${rotation} flex flex-col justify-center px-4 sm:px-8`}>
    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_white]" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 sm:w-3 sm:h-3 ${color} rounded-sm shrink-0`} />
    <span className="text-[8px] sm:text-[10px] text-zinc-400 font-medium whitespace-nowrap">{label}</span>
  </div>
);

export default function IntroSection() {
  const containerRef = useRef(null);
  const gradientRef = useRef(null);
  const introTextRef = useRef(null);
  const protectionShowcaseRef = useRef(null);

  const [revealedChars, setRevealedChars] = useState(0);
  const fullText = "Merely checking the boxes for compliance through basic audits and pen-tests leaves your infrastructure vulnerable to real-world attacks";
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.4 && self.progress < 0.7) {
              const revealProgress = (self.progress - 0.4) / 0.3;
              const charsToShow = Math.floor(revealProgress * fullText.length);
              if (charsToShow !== revealedChars && charsToShow <= fullText.length) {
                setRevealedChars(charsToShow);
                setCurrentText(fullText.slice(0, charsToShow));
              }
            } else if (self.progress >= 0.7 && revealedChars < fullText.length) {
              setRevealedChars(fullText.length);
              setCurrentText(fullText);
            }
          }
        }
      });

      mainTl.fromTo(gradientRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        0
      );

      mainTl.fromTo(introTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "+=0.2"
      );

      mainTl.to(introTextRef.current,
        { y: -80, opacity: 0, duration: 0.8, ease: "power2.in" },
        "+=1.2"
      );

      mainTl.fromTo(protectionShowcaseRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          onComplete: () => {
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 200);
          }
        },
        "-=0.3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    handleRefresh();
    window.addEventListener('resize', handleRefresh);

    return () => {
      window.removeEventListener('resize', handleRefresh);
    };
  }, []);

  return (
    <div className="bg-black">
      <main ref={containerRef} className="min-h-screen">
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6">
          {/* Updated Gradient - Lower height, no top border, only bottom sharp line */}
          <div
            ref={gradientRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none origin-top"
            style={{ transform: "scaleY(0)", opacity: 0 }}
          >
            <div className="relative w-full">
              {/* Main gradient - much lower height */}
              <div
                className="w-full"
                style={{
                  height: "240px",
                  background: `linear-gradient(
                    to bottom,
                    rgba(168, 255, 87, 0.3) 0%,
                    rgba(168, 255, 87, 0.15) 20%,
                    rgba(9, 229, 229, 0.08) 40%,
                    transparent 100%
                  )`,
                }}
              >

              </div>
            </div>
          </div>

          <div
            ref={introTextRef}
            className="z-10 w-full px-6 md:px-10"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center">
              <div className="w-full md:max-w-7xl mx-auto text-center">
                <h2 className="text-2xl md:text-[32px] lg:text-5xl text-white leading-[1.1] font-bold tracking-tight mb-2">
                  After decades of evolving security practices, one thing hasn&apos;t changed: credentials remain the easiest way in for attackers.
                </h2>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div ref={protectionShowcaseRef} className="w-full relative -mt-[70vh]">
        <ProtectionShowcase />
      </div>

      <div className="h-0"></div>
    </div>
  );
}