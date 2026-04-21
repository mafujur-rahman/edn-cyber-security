"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StandardProtection = () => {
    const items = [
        { id: "001", title: "COMPLIANCE ≠ SECURITY", desc: "Completing a standard audit does not translate into concrete security.", sideLabel: "COMPLIANCE ≠ SECURITY" },
        { id: "002", title: "LIMITED PEN TESTS", desc: "Most tests only check for obvious vulnerabilities and do not simulate real attacks.", sideLabel: "LIMITED PENTESTS" },
        { id: "003", title: "FUTURE-PROOFING YOUR DEFENSES", desc: "Advanced security protocols designed to evolve with emerging threats.", sideLabel: "FUTURE-PROOFING" },
    ];

    const circleRef = useRef(null);
    const lineRef = useRef(null);
    const headerRef = useRef(null);
    const ctaRef = useRef(null);
    const verticalLineContainerRef = useRef(null);
    const contentContainerRef = useRef(null);
    const exactGradientBloomRef = useRef(null);
    
    // Refs for each card and its elements
    const cardRefs = useRef([]);
    const cardTopBorderRefs = useRef([]);
    const cardBottomBorderRefs = useRef([]);
    const cardBgGlowRefs = useRef([]);
    const cardContentRefs = useRef([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!circleRef.current || !lineRef.current || !headerRef.current || !ctaRef.current) return;

            const circle = circleRef.current;
            const line = lineRef.current;
            const lineHeight = line.offsetHeight;
            const circleHeight = circle.offsetHeight;
            const maxTravelDistance = lineHeight - circleHeight - 10;

            // Get all card positions
            const cards = cardRefs.current.filter(card => card !== null);
            const cardPositions = cards.map((card, idx) => {
                const rect = card.getBoundingClientRect();
                const containerRect = contentContainerRef.current?.getBoundingClientRect();
                const headerRect = headerRef.current?.getBoundingClientRect();
                
                let relativeTop = rect.top - (containerRect?.top || 0);
                let relativeBottom = rect.bottom - (containerRect?.top || 0);
                if (headerRect) {
                    relativeTop = rect.top - headerRect.bottom - 20;
                    relativeBottom = rect.bottom - headerRect.bottom - 20;
                }
                
                return {
                    element: card,
                    topY: relativeTop,
                    bottomY: relativeBottom,
                    topBorderRef: cardTopBorderRefs.current[idx],
                    bottomBorderRef: cardBottomBorderRefs.current[idx],
                    bgGlowRef: cardBgGlowRefs.current[idx],
                    contentRef: cardContentRefs.current[idx],
                    index: idx
                };
            });

            cardPositions.sort((a, b) => a.topY - b.topY);

            // Set initial state
            gsap.set(circle, { y: 0, autoAlpha: 0, scale: 0.6, force3D: true });
            
            // Initialize all elements
            cardTopBorderRefs.current.forEach(border => {
                if (border) gsap.set(border, { opacity: 0, width: '0%' });
            });
            cardBottomBorderRefs.current.forEach(border => {
                if (border) gsap.set(border, { opacity: 0, width: '0%' });
            });
            cardBgGlowRefs.current.forEach(glow => {
                if (glow) gsap.set(glow, { opacity: 0, scale: 0.8 });
            });

            // Track active states
            let activeTopCardIndex = -1;
            let activeBottomCardIndex = -1;
            let activeBgCardIndex = -1;
            let currentGlowIntensity = 0;

            // Create the main scroll animation
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: circle,
                    start: "top center",
                    end: () => `+=${maxTravelDistance}`,
                    scrub: 1,
                    onEnter: () => gsap.to(circle, { autoAlpha: 1, scale: 1, duration: 0.5 }),
                    onLeaveBack: () => gsap.to(circle, { autoAlpha: 0, scale: 0.6, duration: 0.3 }),
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const currentY = progress * maxTravelDistance;
                        const circleTopY = currentY;
                        const circleBottomY = currentY + circleHeight;
                        const circleCenterY = currentY + (circleHeight / 2);
                        
                        let touchedTopCardIndex = -1;
                        let touchedBottomCardIndex = -1;
                        let touchedBgCardIndex = -1;
                        let circlePositionInCard = 0;
                        let targetCard = null;
                        
                        for (let i = 0; i < cardPositions.length; i++) {
                            const card = cardPositions[i];
                            
                            const distanceToTop = Math.abs(circleTopY - card.topY);
                            const isTouchingTop = distanceToTop < 30;
                            
                            const distanceToBottom = Math.abs(circleBottomY - card.bottomY);
                            const isTouchingBottom = distanceToBottom < 30;
                            
                            const isInsideCard = circleCenterY >= card.topY && circleCenterY <= card.bottomY;
                            
                            if (isTouchingTop) touchedTopCardIndex = card.index;
                            if (isTouchingBottom) touchedBottomCardIndex = card.index;
                            if (isInsideCard) {
                                touchedBgCardIndex = card.index;
                                targetCard = card;
                                // Calculate circle position percentage within the card (0 to 1)
                                circlePositionInCard = (circleCenterY - card.topY) / (card.bottomY - card.topY);
                            }
                        }
                        
                        // Handle top border
                        if (touchedTopCardIndex !== -1 && touchedTopCardIndex !== activeTopCardIndex) {
                            if (activeTopCardIndex !== -1 && cardTopBorderRefs.current[activeTopCardIndex]) {
                                gsap.to(cardTopBorderRefs.current[activeTopCardIndex], {
                                    opacity: 0, width: '0%', duration: 0.25, ease: "power2.in", overwrite: true
                                });
                            }
                            activeTopCardIndex = touchedTopCardIndex;
                            if (cardTopBorderRefs.current[activeTopCardIndex]) {
                                gsap.killTweensOf(cardTopBorderRefs.current[activeTopCardIndex]);
                                gsap.set(cardTopBorderRefs.current[activeTopCardIndex], { width: '0%', opacity: 0 });
                                gsap.to(cardTopBorderRefs.current[activeTopCardIndex], {
                                    opacity: 1, width: '100%', duration: 0.3, ease: "power2.out", overwrite: true
                                });
                            }
                        } else if (touchedTopCardIndex === -1 && activeTopCardIndex !== -1) {
                            if (activeTopCardIndex !== -1 && cardTopBorderRefs.current[activeTopCardIndex]) {
                                gsap.to(cardTopBorderRefs.current[activeTopCardIndex], {
                                    opacity: 0, width: '0%', duration: 0.25, ease: "power2.in", overwrite: true
                                });
                            }
                            activeTopCardIndex = -1;
                        }
                        
                        // Handle bottom border
                        if (touchedBottomCardIndex !== -1 && touchedBottomCardIndex !== activeBottomCardIndex) {
                            if (activeBottomCardIndex !== -1 && cardBottomBorderRefs.current[activeBottomCardIndex]) {
                                gsap.to(cardBottomBorderRefs.current[activeBottomCardIndex], {
                                    opacity: 0, width: '0%', duration: 0.25, ease: "power2.in", overwrite: true
                                });
                            }
                            activeBottomCardIndex = touchedBottomCardIndex;
                            if (cardBottomBorderRefs.current[activeBottomCardIndex]) {
                                gsap.killTweensOf(cardBottomBorderRefs.current[activeBottomCardIndex]);
                                gsap.set(cardBottomBorderRefs.current[activeBottomCardIndex], { width: '0%', opacity: 0 });
                                gsap.to(cardBottomBorderRefs.current[activeBottomCardIndex], {
                                    opacity: 1, width: '100%', duration: 0.3, ease: "power2.out", overwrite: true
                                });
                            }
                        } else if (touchedBottomCardIndex === -1 && activeBottomCardIndex !== -1) {
                            if (activeBottomCardIndex !== -1 && cardBottomBorderRefs.current[activeBottomCardIndex]) {
                                gsap.to(cardBottomBorderRefs.current[activeBottomCardIndex], {
                                    opacity: 0, width: '0%', duration: 0.25, ease: "power2.in", overwrite: true
                                });
                            }
                            activeBottomCardIndex = -1;
                        }
                        
                        // Handle cinematic background glow - follows the circle position within the card
                        if (touchedBgCardIndex !== -1 && targetCard) {
                            if (activeBgCardIndex !== touchedBgCardIndex) {
                                // New card - reset previous and setup new
                                if (activeBgCardIndex !== -1 && cardBgGlowRefs.current[activeBgCardIndex]) {
                                    gsap.to(cardBgGlowRefs.current[activeBgCardIndex], {
                                        opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true
                                    });
                                }
                                activeBgCardIndex = touchedBgCardIndex;
                                if (cardBgGlowRefs.current[activeBgCardIndex]) {
                                    gsap.killTweensOf(cardBgGlowRefs.current[activeBgCardIndex]);
                                    gsap.set(cardBgGlowRefs.current[activeBgCardIndex], { opacity: 0, scale: 0.8 });
                                    gsap.to(cardBgGlowRefs.current[activeBgCardIndex], {
                                        opacity: 0.7, scale: 1, duration: 0.4, ease: "power2.out", overwrite: true
                                    });
                                }
                            }
                            
                            // Update the glow position to follow the circle
                            if (cardBgGlowRefs.current[activeBgCardIndex] && targetCard.contentRef) {
                                const cardElement = targetCard.element;
                                const cardRect = cardElement.getBoundingClientRect();
                                const containerRect = contentContainerRef.current?.getBoundingClientRect();
                                const circleRect = circle.getBoundingClientRect();
                                
                                // Calculate relative position of circle within the card
                                const relativeY = ((circleRect.top + circleRect.height/2) - cardRect.top) / cardRect.height;
                                const clampedY = Math.max(0, Math.min(1, relativeY));
                                
                                // Position the glow at the circle's location
                                const glowElement = cardBgGlowRefs.current[activeBgCardIndex];
                                const glowHeight = cardRect.height * 0.4; // Glow covers 40% of card height
                                const glowTop = (clampedY * cardRect.height) - (glowHeight / 2);
                                
                                glowElement.style.top = `${glowTop}px`;
                                glowElement.style.height = `${glowHeight}px`;
                                
                                // Dynamic intensity based on how centered the circle is
                                const intensity = 0.5 + (1 - Math.abs(clampedY - 0.5) * 2) * 0.4;
                                gsap.to(glowElement, {
                                    opacity: Math.min(0.85, intensity),
                                    duration: 0.05,
                                    overwrite: true
                                });
                                
                                currentGlowIntensity = intensity;
                            }
                        } else if (touchedBgCardIndex === -1 && activeBgCardIndex !== -1) {
                            // Circle left the card - fade out glow
                            if (activeBgCardIndex !== -1 && cardBgGlowRefs.current[activeBgCardIndex]) {
                                gsap.to(cardBgGlowRefs.current[activeBgCardIndex], {
                                    opacity: 0,
                                    duration: 0.5,
                                    ease: "power2.out",
                                    overwrite: true
                                });
                            }
                            activeBgCardIndex = -1;
                            currentGlowIntensity = 0;
                        }
                    }
                }
            });

            mainTl.fromTo(circle,
                { y: 0 },
                { y: maxTravelDistance, scale: 1.2, ease: "none" }
            );

            // ScrollTrigger for vertical line fade out
            gsap.to(verticalLineContainerRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                }
            });

            // ScrollTrigger for gradient bloom fade in
            gsap.fromTo(exactGradientBloomRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 60%",
                        end: "top 20%",
                        scrub: true,
                    }
                }
            );

            return () => {
                mainTl.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-[#1A1A1A] text-white min-h-screen selection:bg-cyan-500/30 overflow-hidden relative pb-20 px-6 md:px-10">
            <div ref={contentContainerRef} className="w-full relative z-10">
                {/* Header Section */}
                <div ref={headerRef} className="text-center mb-32 md:mb-48 flex flex-col items-center relative">
                    <p className="text-[10px] md:text-[15px] uppercase tracking-[0.4em] mb-4 font-medium z-10">The Problem</p>

                    <h2 className="text-2xl md:text-[42px] font-light tracking-widest uppercase relative z-10">
                        <div className="absolute inset-0 -z-10 m-auto w-[90%] h-[60%] blur-[40px] md:blur-[60px] opacity-40"
                            style={{ background: 'linear-gradient(90deg, #09E5E5, #A8FF57)' }} />
                        HOW DO STANDARD PROTECTION<br className="hidden md:block" /> METHODS FALL SHORT?

                        <div ref={verticalLineContainerRef} className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                            style={{ top: 'calc(100% + 20px)', zIndex: 15, transition: 'opacity 0.3s' }}>
                            <div ref={lineRef} style={{ width: '2px', background: 'linear-gradient(180deg, #09E5E5, #A8FF57, #09E5E5)', height: 'calc(100vh + 600px)', borderRadius: '2px', position: 'relative' }}>
                                <div ref={circleRef} className="absolute" style={{ top: '-16px', left: '50%', transform: 'translateX(-50%)', willChange: 'transform, opacity', zIndex: 25 }}>
                                    <div className="rounded-full absolute" style={{ width: '60px', height: '60px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(135deg, #09E5E5, #A8FF57)', filter: 'blur(16px)', opacity: 0.8, zIndex: 1 }} />
                                    <div className="rounded-full relative" style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #09E5E5, #A8FF57)', filter: 'blur(4px)', boxShadow: '0 0 30px rgba(9,229,229,0.6)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 3 }} />
                                </div>
                            </div>
                        </div>
                    </h2>
                </div>

                {/* Content Rows */}
                <div className="space-y-16 md:space-y-24 mb-24 relative">
                    {items.map((item, idx) => (
                        <div key={item.id} className="relative w-full flex flex-col md:grid md:grid-cols-[150px_1fr_150px] items-center gap-10 md:gap-4">
                            <div className="text-[10px] md:text-[15px] text-white opacity-60">{item.id}</div>
                            <div className="relative w-full flex justify-center">
                                <div className="relative w-full max-w-4xl">
                                    
                                    {/* Cinematic Background Glow - follows the circle position */}
                                    <div 
                                        ref={el => cardBgGlowRefs.current[idx] = el}
                                        className="absolute pointer-events-none z-0 transition-all duration-100 ease-out"
                                        style={{
                                            left: '0',
                                            width: '100%',
                                            background: 'radial-gradient(ellipse at center, rgba(9,229,229,0.6) 0%, rgba(168,255,87,0.4) 40%, transparent 70%)',
                                            filter: 'blur(20px)',
                                            opacity: 0,
                                            borderRadius: '50%',
                                            transform: 'scale(1)',
                                        }}
                                    />
                                    
                                    {/* Additional glow layer for stronger effect */}
                                    <div 
                                        className="absolute pointer-events-none z-0 opacity-0"
                                        style={{
                                            left: '10%',
                                            width: '80%',
                                            background: 'radial-gradient(ellipse at center, rgba(9,229,229,0.4) 0%, rgba(168,255,87,0.2) 50%, transparent 80%)',
                                            filter: 'blur(30px)',
                                            transition: 'opacity 0.2s ease-out',
                                        }}
                                    />
                                    
                                    {/* Top border glow */}
                                    <div 
                                        ref={el => cardTopBorderRefs.current[idx] = el}
                                        className="absolute -top-[3px] left-0 h-[4px] pointer-events-none z-10"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, #09E5E5, #A8FF57, #09E5E5, transparent)',
                                            filter: 'blur(6px)',
                                            opacity: 0,
                                            width: '0%'
                                        }}
                                    />
                                    <div 
                                        className="absolute -top-[6px] left-[10%] w-[80%] h-[8px] pointer-events-none z-10"
                                        style={{
                                            background: 'radial-gradient(ellipse, rgba(9,229,229,0.8) 0%, rgba(168,255,87,0.6) 50%, transparent 80%)',
                                            filter: 'blur(8px)',
                                            opacity: 0,
                                        }}
                                    />
                                    
                                    {/* Bottom border glow */}
                                    <div 
                                        ref={el => cardBottomBorderRefs.current[idx] = el}
                                        className="absolute -bottom-[3px] left-0 h-[4px] pointer-events-none z-10"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, #09E5E5, #A8FF57, #09E5E5, transparent)',
                                            filter: 'blur(6px)',
                                            opacity: 0,
                                            width: '0%'
                                        }}
                                    />
                                    <div 
                                        className="absolute -bottom-[6px] left-[10%] w-[80%] h-[8px] pointer-events-none z-10"
                                        style={{
                                            background: 'radial-gradient(ellipse, rgba(9,229,229,0.8) 0%, rgba(168,255,87,0.6) 50%, transparent 80%)',
                                            filter: 'blur(8px)',
                                            opacity: 0,
                                        }}
                                    />
                                    
                                    {/* Card Content */}
                                    <div 
                                        ref={el => {
                                            cardRefs.current[idx] = el;
                                            cardContentRefs.current[idx] = el;
                                        }}
                                        className="w-full border-[1px] border-[#f1f1f1]/30 py-16 md:py-28 text-center relative z-20 bg-[#1A1A1A] overflow-hidden"
                                    >
                                        <h3 className="text-lg md:text-xl tracking-[0.2em] font-medium mb-5 uppercase relative z-10">{item.title}</h3>
                                        <p className="text-sm md:text-[18px] text-white max-w-lg mx-auto font-light leading-relaxed relative z-10">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[9px] md:text-[15px] uppercase tracking-[0.2em] font-medium opacity-60 text-right">{item.sideLabel}</div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Card Area */}
                <div ref={ctaRef} className="w-full z-20 relative" id="cta-container">
                    <div className="relative w-full border border-[#f1f1f1]/50 bg-[#1A1A1A] overflow-hidden">
                        
                        {/* Top border glow - always visible on CTA */}
                        <div className="absolute -top-[3px] left-0 w-full h-[4px] pointer-events-none z-10"
                            style={{
                                background: 'linear-gradient(90deg, transparent, #09E5E5, #A8FF57, #09E5E5, transparent)',
                                filter: 'blur(6px)',
                                opacity: 1,
                            }}
                        />
                        <div className="absolute -top-[6px] left-[10%] w-[80%] h-[8px] pointer-events-none z-10"
                            style={{
                                background: 'radial-gradient(ellipse, rgba(9,229,229,0.8) 0%, rgba(168,255,87,0.6) 50%, transparent 80%)',
                                filter: 'blur(8px)',
                                opacity: 0.8,
                            }}
                        />

                        {/* Gradient Bloom */}
                        <div ref={exactGradientBloomRef} className="absolute top-0 left-0 w-full h-[400px] pointer-events-none z-10"
                            style={{ opacity: 0, transformOrigin: 'top center' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] blur-[60px]"
                                style={{ background: 'radial-gradient(ellipse at top, rgba(9, 229, 229, 0.7) 0%, rgba(9, 229, 229, 0.1) 60%, transparent 100%)' }} />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] blur-[80px]"
                                style={{ background: 'radial-gradient(ellipse at top, rgba(168, 255, 87, 0.6) 0%, rgba(168, 255, 87, 0.1) 60%, transparent 100%)' }} />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[150px] blur-[30px]"
                                style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(9, 229, 229, 0.1) 40%, transparent 100%)' }} />
                        </div>

                        {/* Corner Diamonds */}
                        <div className="absolute -top-[5px] -left-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />
                        <div className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />
                        <div className="absolute -bottom-[5px] -left-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />
                        <div className="absolute -bottom-[5px] -right-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />

                        {/* Content */}
                        <div className="relative z-20 flex flex-col items-center text-center py-72">
                            <h3 className="text-3xl md:text-[42px] font-light mb-6 tracking-tight max-w-2xl leading-tight">
                                3 minutes to implement your <br /> first baits
                            </h3>
                            <p className="text-sm md:text-[18px] text-white opacity-90 mb-10 max-w-2xl leading-relaxed">
                                No setup friction. No integration delays. <br />
                                Go from zero to live detection in minutes, with a seamless onboarding experience
                            </p>
                            <button className="px-10 py-3 border border-[#f1f1f1]/60 lg:text-[18px] hover:bg-white/10 transition duration-300 uppercase text-xs tracking-widest opacity-90">
                                Learn more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandardProtection;