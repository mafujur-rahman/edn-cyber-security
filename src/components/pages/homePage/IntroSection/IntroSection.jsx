"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GradientButton } from "@/components/utils/GradiantButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProtectionShowcase = () => {
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  const topTextRef = useRef(null);
  const svgContainerRef = useRef(null);
  const ballRef = useRef(null);
  const glowBallRef = useRef(null);

  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  const cardRef4 = useRef(null);

  const pathData = "M75.9813 0V429.095C77.5097 446.599 79.7002 471.868 93.3704 507.113C169.604 703.656 173.69 780.674 75.9813 1030.73C-26.6131 1293.29 -21.3403 1360.8 75.9813 1595.85C170.818 1824.91 172.668 1940.93 86.2012 2162.98C78.9349 2188.8 72.8987 2220.99 75.9813 2250";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = activeLineRef.current;
      if (!path) return;
      const pathLength = path.getTotalLength();
      const ball = ballRef.current;
      const glowBall = glowBallRef.current;

      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      gsap.set([ball, glowBall], { opacity: 0 });

      const container = containerRef.current;
      const svgElement = svgContainerRef.current;
      
      const getCardRects = () => {
        const containerRect = container.getBoundingClientRect();
        const svgRect = svgElement.getBoundingClientRect();
        
        return {
          containerRect,
          svgRect,
          cards: [
            { ref: cardRef1, element: cardRef1.current, name: 'card1' },
            { ref: cardRef2, element: cardRef2.current, name: 'card2' },
            { ref: cardRef3, element: cardRef3.current, name: 'card3' },
            { ref: cardRef4, element: cardRef4.current, name: 'card4' }
          ].filter(c => c.element).map(c => ({
            ...c,
            rect: c.element.getBoundingClientRect()
          }))
        };
      };

      let metrics = getCardRects();

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",         
          end: "bottom top",        
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            metrics = getCardRects();
          },
          onUpdate: (self) => {
            if (!metrics) return;

            const progress = self.progress;
            let currentX = 75.9813;
            let currentY = 0;

            if (progress > 0 && progress <= 1) {
              const length = pathLength * (progress >= 1 ? 0.999 : progress);
              const point = path.getPointAtLength(length);
              currentX = point.x;
              currentY = point.y;

              gsap.set([ball, glowBall], {
                attr: { cx: currentX, cy: currentY },
                opacity: 1
              });
            }

            const svgWidth = svgElement.offsetWidth || 150;
            const svgHeight = svgElement.offsetHeight || 2251;
            
            // Get ball's actual position on screen
            const ballScreenX = metrics.svgRect.left + (svgWidth / 2) - 75 + (currentX * (svgWidth / 151));
            const ballScreenY = metrics.svgRect.top + (currentY * (svgHeight / 2251));

            // Check each card - does the ball intersect it?
            metrics.cards.forEach((card) => {
              const cardRect = card.rect;
              
              // Simple intersection check - ball enters card area
              const isInsideCard = (
                ballScreenX >= cardRect.left - 20 &&
                ballScreenX <= cardRect.right + 20 &&
                ballScreenY >= cardRect.top - 20 &&
                ballScreenY <= cardRect.bottom + 20
              );
              
              if (isInsideCard) {
                // Calculate distance from ball to card center for intensity
                const cardCenterX = (cardRect.left + cardRect.right) / 2;
                const cardCenterY = (cardRect.top + cardRect.bottom) / 2;
                const distanceToCenter = Math.sqrt(
                  Math.pow(ballScreenX - cardCenterX, 2) + 
                  Math.pow(ballScreenY - cardCenterY, 2)
                );
                const maxDistance = 200;
                const intensity = Math.max(0, 1 - (distanceToCenter / maxDistance));
                
                // Add glowing class to card
                card.element.classList.add('card-glowing');
                card.element.style.setProperty('--glow-intensity', intensity);
              } else {
                // Remove glow when ball leaves
                card.element.classList.remove('card-glowing');
              }
            });
          }
        }
      });

      gsap.fromTo(topTextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

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
    <div ref={containerRef} className="text-white relative py-0 overflow-x-clip bg-black">
      <style jsx global>{`
        .image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Card background glow effect - appears when SVG ball enters the card */
        .card-glowing {
          position: relative;
          transition: box-shadow 0.2s ease;
          box-shadow: 0 0 calc(40px * var(--glow-intensity, 0)) 
                      rgba(0, 229, 229, 0.6),
                      0 0 calc(80px * var(--glow-intensity, 0)) 
                      rgba(57, 242, 161, 0.4),
                      0 0 calc(120px * var(--glow-intensity, 0)) 
                      rgba(153, 255, 51, 0.2);
        }
        
        /* Inner glow effect on the card background */
        .card-glowing::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center,
            rgba(0, 229, 229, 0.15) 0%,
            rgba(57, 242, 161, 0.1) 30%,
            transparent 70%
          );
          opacity: calc(var(--glow-intensity, 0) * 0.8);
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.15s ease;
        }
        
        /* Keep content above the glow */
        .card-glowing > * {
          position: relative;
          z-index: 2;
        }
      `}</style>

      <div className="relative z-30 pt-20 text-center">
        <div className="relative inline-block">
          <p
            ref={topTextRef}
            className="text-lg md:text-2xl lg:text-6xl font-bold leading-[1.1] tracking-wide text-white opacity-0"
            style={{
              textShadow: '0 0 .5rem #111, 0 0 .5rem #00E5E5, 0 0 3rem #00E5E5, 0 0 6rem #99FF33',
            }}
          >
            It&apos;s time for a new approach.
          </p>
        </div>
      </div>

      {/* SVG RUNWAY WITH THE BALL */}
      <div ref={svgContainerRef} className="absolute inset-0 flex justify-center pointer-events-none overflow-visible -mt-[480px] z-0">
        <div className="relative h-full w-[150px] max-w-[150px] shrink-0">
          <svg
            viewBox="0 0 151 2251"
            className="w-full h-full"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="2251" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00E5E5" />
                <stop offset="35%" stopColor="#39F2A1" />
                <stop offset="70%" stopColor="#00E5E5" />
                <stop offset="100%" stopColor="#99FF33" />
              </linearGradient>
              
              <radialGradient id="ballGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#39F2A1" />
                <stop offset="100%" stopColor="#00E5E5" />
              </radialGradient>
              
              <radialGradient id="ballGlowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00E5E5" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#39F2A1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#99FF33" stopOpacity="0" />
              </radialGradient>
              
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d={pathData} stroke="#222" strokeWidth="1.5" fill="none" />

            <path
              ref={activeLineRef}
              d={pathData}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              style={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
            />

            <circle
              ref={glowBallRef}
              cx="75.9813"
              cy="0"
              r="40"
              fill="url(#ballGlowGradient)"
              style={{ opacity: 0 }}
            />

            {/* THIS IS THE SVG CIRCLE BALL - it creates the glow on cards */}
            <circle
              ref={ballRef}
              cx="75.9813"
              cy="0"
              r="8"
              fill="url(#ballGradient)"
              style={{ opacity: 0 }}
            />
          </svg>
        </div>
      </div>

      {/* CARDS - they glow when the SVG ball enters them */}
      <div className="max-w-7xl mx-auto relative z-20 overflow-visible">

        {/* SECTION 1 */}
        <div className="relative min-h-[850px] h-auto md:h-[850px]">
          <div className="reveal-card absolute left-[2%] sm:left-[5%] top-[650px] z-30 w-auto max-w-[90vw] sm:max-w-none">
            <ImageCard 
              src="/images/home/card-1.webp" 
              alt="Credential leak visualization"
              rotation="-rotate-[12deg]"
              width="w-[90vw] sm:w-[440px]"
              height="h-auto sm:h-40 min-h-[160px]"
            />
          </div>

          <div className="reveal-card absolute left-[5%] sm:left-[48%] top-[510px] w-[90vw] sm:w-full max-w-[60vw] sm:max-w-xl z-30">
            <GlassCard
              cardRef={cardRef1}
              title="Phishing as a defense"
              desc="MoK.N Baits are defensive phishing pages that lure attackers into revealing compromised credentials before they're used."
            />
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="relative min-h-[900px] h-auto md:h-[900px]">
          <div className="reveal-card absolute left-[5%] sm:right-[48%] sm:left-auto top-[300px] w-[90vw] sm:w-full max-w-[60vw] sm:max-w-xl z-30">
            <GlassCard
              cardRef={cardRef2}
              side="left"
              title="Only valid credentials"
              desc="Millions of credentials may be tested. Our Baits filter the noise and alert only when valid ones are used against your systems."
            />
          </div>

          <div className="reveal-card absolute left-[5%] sm:right-[8%] sm:left-auto top-[380px] w-[90vw] sm:w-auto z-30">
            <ImageCard 
              src="/images/home/c2.webp"
              alt="Valid credential alert visualization"
              rotation="-rotate-[3deg]"
              width="w-[90vw] sm:w-[420px]"
              height="h-auto sm:h-52 min-h-[200px]"
            />
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="relative min-h-[850px] h-auto md:h-[850px]">
          <div className="reveal-card absolute left-[2%] sm:left-[5%] top-[0px] z-30 w-auto max-w-[90vw] sm:max-w-none">
            <ImageCard 
              src="/images/home/c3.webp"
              alt="Attack overview chart visualization"
              rotation="rotate-0"
              width="w-[90vw] sm:w-[450px]"
              height="h-auto sm:h-64 min-h-[280px]"
            />
          </div>

          <div className="reveal-card absolute left-[5%] sm:left-[48%] -top-[80px] top-[-60px] w-[90vw] sm:w-full max-w-[60vw] sm:max-w-xl z-30">
            <GlassCard
              cardRef={cardRef3}
              title="Tailored Threat intelligence"
              desc="Monitor real attacker activity targeting your environment. No generic feeds, only insights tied to your users, systems, and domains."
            />
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="reveal-card flex justify-center pb-16 sm:pb-40 px-4 sm:px-6 -mt-[300px] sm:-mt-[400px] relative z-30">
          <div 
            ref={cardRef4}
            className="w-full max-w-6xl bg-zinc-950/80 border border-white/10 p-6 sm:p-12 md:p-24 text-center relative shadow-2xl backdrop-blur-md rounded-sm"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay rounded-sm" />
            <div className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45" />
            <div className="absolute -top-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45" />
            <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45" />
            <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-3 sm:h-3 bg-white rotate-45" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-white leading-tight">
                3 minutes to implement <br className="hidden sm:block" />
                your First Baits.
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                No setup friction. No integration delays.<br className="hidden sm:block" />
                Go from zero to live detection in minutes, with a seamless onboarding experience.
              </p>
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
    </div>
  );
};

const ImageCard = ({ src, alt, rotation = "", width = "w-96", height = "h-40" }) => (
  <div className={`${width} ${height} relative ${rotation} overflow-hidden image-card rounded-sm bg-black/50`}>
    <img src={src} alt={alt} className="w-full h-full object-cover opacity-90" />
  </div>
);

const GlassCard = ({ cardRef, title, desc, side = "left" }) => (
  <div 
    ref={cardRef}
    className={`relative p-6 sm:p-8 md:p-10 bg-zinc-950 border border-white/10 backdrop-blur-xl rounded-sm min-h-[280px] sm:min-h-[320px] flex flex-col justify-center ${side === 'right' ? 'text-right items-end' : 'text-left items-start'} shadow-xl w-full h-full overflow-hidden z-30`}
  >
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6 relative z-10">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center shadow-2xl shrink-0">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">{title}</h3>
    </div>

    <p className="text-zinc-400 text-sm sm:text-base md:text-md leading-relaxed max-w-xl font-normal relative z-10">
      {desc}
    </p>
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
          <div
            ref={gradientRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none origin-top"
            style={{ transform: "scaleY(0)", opacity: 0 }}
          >
            <div className="relative w-full">
              <div
                className="w-full"
                style={{
                  height: "240px",
                  background: `
                    linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%),
                    linear-gradient(to right, rgba(0, 229, 229, 0.2) 0%, rgba(57, 242, 161, 0.15) 50%, rgba(153, 255, 51, 0.2) 100%)
                  `,
                  backgroundBlendMode: "screen",
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                }}
              />
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
    </div>
  );
}