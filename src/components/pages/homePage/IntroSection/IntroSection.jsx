"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const StandardProtection = () => {
    const items = [
        {
            id: "001",
            title: "COMPLIANCE ≠ SECURITY",
            desc: "Completing a standard audit does not translate into concrete security.",
            sideLabel: "COMPLIANCE ≠ SECURITY"
        },
        {
            id: "002",
            title: "LIMITED PEN TESTS",
            desc: "Most tests only check for obvious vulnerabilities and do not simulate real attacks.",
            sideLabel: "LIMITED PENTESTS"
        },
        {
            id: "003",
            title: "FUTURE-PROOFING YOUR DEFENSES",
            desc: "Advanced security protocols designed to evolve with emerging threats.",
            sideLabel: "FUTURE-PROOFING"
        },
    ];

    const circleRef = useRef(null);
    const lineRef = useRef(null);
    const verticalLineContainerRef = useRef(null);
    const headerRef = useRef(null);
    const ctaRef = useRef(null);
    const contentContainerRef = useRef(null);
    const exactGradientBloomRef = useRef(null);

    const cardRefs = useRef([]);
    const cardTopBorderRefs = useRef([]);
    const cardBottomBorderRefs = useRef([]);
    const cardSpotlightRefs = useRef([]);
    const cardContentRefs = useRef([]);

    useEffect(() => {
        // Small delay to ensure DOM is ready and component is visible
        const timer = setTimeout(() => {
            if (!circleRef.current || !lineRef.current || !headerRef.current || !ctaRef.current) {
                console.warn("Required refs not available");
                return;
            }

            const circle = circleRef.current;
            const line = lineRef.current;
            const verticalLineContainer = verticalLineContainerRef.current;
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
                    height: rect.height,
                    width: rect.width,
                    left: rect.left,
                    topBorderRef: cardTopBorderRefs.current[idx],
                    bottomBorderRef: cardBottomBorderRefs.current[idx],
                    spotlightRef: cardSpotlightRefs.current[idx],
                    contentRef: cardContentRefs.current[idx],
                    index: idx
                };
            });

            cardPositions.sort((a, b) => a.topY - b.topY);

            // Set initial state
            gsap.set(circle, { y: 0, autoAlpha: 1, scale: 0.6, force3D: true });

            // Initialize all elements
            cardTopBorderRefs.current.forEach(border => {
                if (border) gsap.set(border, { opacity: 0, width: '0%' });
            });
            cardBottomBorderRefs.current.forEach(border => {
                if (border) gsap.set(border, { opacity: 0, width: '0%' });
            });
            cardSpotlightRefs.current.forEach(spotlight => {
                if (spotlight) gsap.set(spotlight, { opacity: 0, scale: 0 });
            });

            // Track active states
            let activeTopCardIndex = -1;
            let activeBottomCardIndex = -1;
            let activeSpotlightCardIndex = -1;

            // Create the main scroll animation
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: circle,
                    start: "top center",
                    end: () => `+=${maxTravelDistance}`,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const currentY = progress * maxTravelDistance;
                        const circleTopY = currentY;
                        const circleBottomY = currentY + circleHeight;
                        const circleCenterY = currentY + (circleHeight / 2);

                        let touchedTopCardIndex = -1;
                        let touchedBottomCardIndex = -1;
                        let touchedSpotlightCardIndex = -1;
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
                                touchedSpotlightCardIndex = card.index;
                                targetCard = card;
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

                        // Handle spotlight effect
                        if (touchedSpotlightCardIndex !== -1 && targetCard && targetCard.spotlightRef) {
                            if (activeSpotlightCardIndex !== touchedSpotlightCardIndex) {
                                if (activeSpotlightCardIndex !== -1 && cardSpotlightRefs.current[activeSpotlightCardIndex]) {
                                    gsap.to(cardSpotlightRefs.current[activeSpotlightCardIndex], {
                                        opacity: 0,
                                        duration: 0.3,
                                        ease: "power2.in",
                                        overwrite: true
                                    });
                                }
                                activeSpotlightCardIndex = touchedSpotlightCardIndex;
                                if (cardSpotlightRefs.current[activeSpotlightCardIndex]) {
                                    gsap.set(cardSpotlightRefs.current[activeSpotlightCardIndex], { 
                                        opacity: 0,
                                        scale: 0
                                    });
                                }
                            }

                            if (cardSpotlightRefs.current[activeSpotlightCardIndex]) {
                                const spotlight = cardSpotlightRefs.current[activeSpotlightCardIndex];
                                const cardElement = targetCard.element;
                                const cardRect = cardElement.getBoundingClientRect();
                                const circleRect = circle.getBoundingClientRect();
                                
                                // Get the exact circle position relative to the card
                                const circleX = circleRect.left + circleRect.width / 2;
                                const circleY = circleRect.top + circleRect.height / 2;
                                
                                // Calculate relative position within the card
                                const relativeX = (circleX - cardRect.left) / cardRect.width;
                                const relativeY = (circleY - cardRect.top) / cardRect.height;
                                
                                // Only show spotlight if circle is within card bounds
                                if (relativeX >= 0 && relativeX <= 1 && relativeY >= 0 && relativeY <= 1) {
                                    // Spotlight size
                                    const spotlightSize = Math.min(cardRect.width * 0.8, 250);
                                    const spotlightLeft = (relativeX * cardRect.width) - (spotlightSize / 2);
                                    const spotlightTop = (relativeY * cardRect.height) - (spotlightSize / 2);
                                    
                                    spotlight.style.position = 'absolute';
                                    spotlight.style.left = `${spotlightLeft}px`;
                                    spotlight.style.top = `${spotlightTop}px`;
                                    spotlight.style.width = `${spotlightSize}px`;
                                    spotlight.style.height = `${spotlightSize}px`;
                                    spotlight.style.borderRadius = '50%';
                                    
                                    const intensity = 0.7;
                                    
                                    gsap.to(spotlight, {
                                        opacity: intensity,
                                        scale: 1,
                                        duration: 0.05,
                                        overwrite: true
                                    });
                                }
                            }
                        } else if (touchedSpotlightCardIndex === -1 && activeSpotlightCardIndex !== -1) {
                            if (activeSpotlightCardIndex !== -1 && cardSpotlightRefs.current[activeSpotlightCardIndex]) {
                                gsap.to(cardSpotlightRefs.current[activeSpotlightCardIndex], {
                                    opacity: 0,
                                    scale: 0,
                                    duration: 0.4,
                                    ease: "power2.out",
                                    overwrite: true
                                });
                            }
                            activeSpotlightCardIndex = -1;
                        }
                    }
                }
            });

            mainTl.fromTo(circle,
                { y: 0 },
                { y: maxTravelDistance, scale: 1.2, ease: "none" }
            );

            // ScrollTrigger for gradient bloom fade in (only for CTA)
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

            // Refresh ScrollTrigger to ensure all triggers are properly calculated
            ScrollTrigger.refresh();

            return () => {
                mainTl.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className=" text-white overflow-hidden relative py-20 px-6 md:px-10">
            <div ref={contentContainerRef} className="w-full relative z-10">
                {/* Header Section */}
                <div ref={headerRef} className="text-center mb-32 md:mb-48 flex flex-col items-center relative">
                    <p className="text-[10px] md:text-[15px] uppercase tracking-[0.4em] mb-4 font-medium z-10">The Problem</p>

                    <h2 className="text-2xl md:text-[42px] font-light tracking-widest uppercase relative z-10">
                        <div className="absolute inset-0 -z-10 m-auto w-[90%] h-[60%] blur-[40px] md:blur-[60px] opacity-40"
                            style={{ background: 'linear-gradient(90deg, #09E5E5, #A8FF57)' }} />
                        HOW DO STANDARD PROTECTION<br className="hidden md:block" /> METHODS FALL SHORT?

                        {/* Vertical line container - always visible but cards have higher z-index */}
                        <div ref={verticalLineContainerRef} className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                            style={{ top: 'calc(100% + 20px)', zIndex: 5 }}>
                            <div ref={lineRef} style={{ width: '2px', background: 'linear-gradient(180deg, #09E5E5, #A8FF57, #09E5E5)', height: 'calc(100vh + 600px)', borderRadius: '2px', position: 'relative' }}>
                                <div ref={circleRef} className="absolute" style={{ top: '-16px', left: '50%', transform: 'translateX(-50%)', willChange: 'transform', zIndex: 25 }}>
                                    <div className="rounded-full absolute" style={{ width: '60px', height: '60px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(135deg, #09E5E5, #A8FF57)', filter: 'blur(16px)', opacity: 0.8, zIndex: 1 }} />
                                    <div className="rounded-full relative" style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #09E5E5, #A8FF57)', filter: 'blur(4px)', boxShadow: '0 0 30px rgba(9,229,229,0.6)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 3 }} />
                                </div>
                            </div>
                        </div>
                    </h2>
                </div>

                {/* Content Rows - these will cover the line with higher z-index */}
                <div className="space-y-16 md:space-y-24 mb-24 relative z-10">
                    {items.map((item, idx) => (
                        <div key={item.id} className="relative w-full flex flex-col md:grid md:grid-cols-[150px_1fr_150px] items-center gap-10 md:gap-4">
                            <div className="text-[10px] md:text-[15px] text-white opacity-60">{item.id}</div>

                            <div className="relative w-full flex justify-center">
                                <div className="relative w-full max-w-4xl">
                                    {/* Card Content - Higher z-index to cover the line */}
                                    <div
                                        ref={el => {
                                            cardRefs.current[idx] = el;
                                            cardContentRefs.current[idx] = el;
                                        }}
                                        className="w-full border-[1px] border-white/10 py-16 md:py-28 text-center relative overflow-hidden"
                                        style={{
                                            backgroundColor: '#1A1A1A',
                                            position: 'relative',
                                            zIndex: 20
                                        }}
                                    >
                                        {/* Spotlight Effect */}
                                        <div
                                            ref={el => cardSpotlightRefs.current[idx] = el}
                                            className="absolute pointer-events-none z-20"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(9,229,229,0.7) 0%, rgba(9,229,229,0.3) 30%, rgba(168,255,87,0.15) 60%, transparent 80%)',
                                                filter: 'blur(20px)',
                                                opacity: 0,
                                                transform: 'scale(0)',
                                                willChange: 'left, top, opacity',
                                                mixBlendMode: 'screen'
                                            }}
                                        />
                                        
                                        {/* Top border glow */}
                                        <div
                                            ref={el => cardTopBorderRefs.current[idx] = el}
                                            className="absolute -top-[2px] left-0 h-[3px] pointer-events-none z-30"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, #09E5E5, #A8FF57, #09E5E5, transparent)',
                                                filter: 'blur(4px)',
                                                opacity: 0,
                                                width: '0%'
                                            }}
                                        />

                                        {/* Bottom border glow */}
                                        <div
                                            ref={el => cardBottomBorderRefs.current[idx] = el}
                                            className="absolute -bottom-[2px] left-0 h-[3px] pointer-events-none z-30"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, #09E5E5, #A8FF57, #09E5E5, transparent)',
                                                filter: 'blur(4px)',
                                                opacity: 0,
                                                width: '0%'
                                            }}
                                        />

                                        <h3 className="text-lg md:text-xl tracking-[0.2em] font-medium mb-5 uppercase relative z-30">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm md:text-[18px] text-white/80 max-w-lg mx-auto font-light leading-relaxed relative z-30">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-[9px] md:text-[15px] uppercase tracking-[0.2em] font-medium opacity-60 text-right">
                                {item.sideLabel}
                            </div>
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

export default function IntroSection() {
    const containerRef = useRef(null);
    const gradientRef = useRef(null);
    const introTextRef = useRef(null);
    const standardProtectionRef = useRef(null);

    const [revealedChars, setRevealedChars] = useState(0);
    const fullText = "Merely checking the boxes for compliance through basic audits and pen-tests leaves your infrastructure vulnerable to real-world attacks";
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Timeline for the entire sequence
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=800",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Handle text reveal based on scroll progress
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

            // 1. Circular gradient grows from top with curved bottom
            mainTl.fromTo(gradientRef.current,
                {
                    scaleY: 0,
                    opacity: 0,
                },
                {
                    scaleY: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                },
                0
            );

            // 2. Introduction text fades in
            mainTl.fromTo(introTextRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                },
                "+=0.2"
            );

            // 3. Introduction text moves up and fades out
            mainTl.to(introTextRef.current,
                {
                    y: -80,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.in"
                },
                "+=1.2"
            );

            // 4. Standard Protection section appears
            mainTl.fromTo(standardProtectionRef.current,
                {
                    opacity: 0,
                    y: 100
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
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
        <div className="bg-[#1A1A1A]">
            <main ref={containerRef} className="min-h-screen">
                <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6">

                    {/* Circular Gradient - Grows from top with curved bottom */}
                    <div
                        ref={gradientRef}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none origin-top"
                        style={{
                            transform: "scaleY(0)",
                            opacity: 0
                        }}
                    >
                        {/* Main circular gradient - no blur */}
                        <div 
                            className="w-full pt-[100%] relative"
                            style={{
                                background: "radial-gradient(ellipse 50% 50% at 50% 0%, #09E5E5 0%, #A8FF57 45%, transparent 70%)",
                            }}
                        >
                            
                        </div>
                    </div>

                    {/* Introduction Text */}
                    <div
                        ref={introTextRef}
                        className="z-10 w-full px-6 md:px-10"
                        style={{ opacity: 0 }}
                    >
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col md:flex-row w-full">
                                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                                    <span className="text-[10px] md:text-[11px] lg:text-[15px] text-[#ffffff] uppercase tracking-[0.4em] font-medium">
                                        Introduction
                                    </span>
                                </div>

                                <div className="w-full md:w-3/4">
                                    <h2 className="text-2xl md:text-[32px] lg:text-[42px] text-[#f1f1f1] leading-tight font-medium mb-2">
                                        To defend against modern threats, organizations <br className="hidden lg:block" />
                                        must <span className="text-white">move beyond standard security checks.</span>
                                    </h2>
                                    <p className="text-2xl md:text-[32px] lg:text-[42px] font-normal leading-tight">
                                        {fullText.split('').map((char, index) => (
                                            <span
                                                key={index}
                                                className="transition-all duration-100"
                                                style={{
                                                    color: index < revealedChars ? 'white' : '#9ca3af',
                                                }}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                        {revealedChars < fullText.length && (
                                            <span className="inline-block w-0.5 h-8 bg-white/60 ml-1 animate-pulse"></span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </main>

            <div ref={standardProtectionRef} className="w-full relative -mt-[70vh]">
                <StandardProtection />
            </div>

            <div className="h-0"></div>
        </div>
    );
}