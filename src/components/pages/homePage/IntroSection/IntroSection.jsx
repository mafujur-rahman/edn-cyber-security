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

    return (
        <div className="bg-[#1A1A1A] text-white min-h-screen font-sans selection:bg-cyan-500/30 overflow-hidden relative py-20 px-6 md:px-10">
            <div className="w-full relative z-10">
                {/* Header Section */}
                <div className="text-center mb-32 md:mb-48 flex flex-col items-center relative">
                    <p className="text-[10px] md:text-[11px] lg:text-[15px] uppercase tracking-[0.4em] text-[#ffffff] mb-4 font-medium text-center w-full z-10">
                        The Problem
                    </p>

                    <h2 className="text-2xl md:text-3xl lg:text-[42px] font-light tracking-widest text-white uppercase text-center max-w-3xl mx-auto relative z-10">
                        {/* The Glow "Strip" behind the text */}
                        <div
                            className="absolute inset-0 -z-10 m-auto w-[90%] h-[60%] blur-[40px] md:blur-[60px] opacity-40"
                            style={{
                                background: 'linear-gradient(90deg, #09E5E5, #12E6DC, #2BEAC5, #55F1A0, #8EFA6D, #A8FF57)'
                            }}
                        />

                        HOW DO STANDARD PROTECTION<br className="hidden md:block" /> METHODS FALL SHORT?

                        {/* Single Vertical Line - height now extends to bottom of CTA card */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1.5px] bg-gradient-to-b from-[#09E5E5] via-[#A8FF57] to-[#09E5E5]"
                            style={{ 
                                height: 'calc(100vh + 600px)',
                                bottom: 'auto'
                            }}
                        />
                    </h2>
                </div>

                {/* Content Rows */}
                <div className="space-y-16 md:space-y-24 mb-24 relative">
                    {items.map((item) => (
                        <div key={item.id} className="relative w-full flex flex-col md:grid md:grid-cols-[150px_1fr_150px] lg:grid-cols-[200px_1fr_250px] items-center gap-10 md:gap-4">
                            {/* Left Side: Number */}
                            <div className="flex justify-start md:justify-start w-full md:w-auto">
                                <div className="text-[10px] md:text-[15px] text-[#ffffff]">
                                    {item.id}
                                </div>
                            </div>

                            {/* Middle: The Card */}
                            <div className="relative w-full flex justify-center">
                                {/* The Card - higher z-index to appear above the vertical line */}
                                <div className="w-full max-w-4xl border-[1px] border-[#f1f1f1]/40 py-16 px-8 md:px-16 lg:py-28 text-center relative z-20 bg-[#1A1A1A]">
                                    <h3 className="text-lg md:text-xl tracking-[0.2em] font-medium mb-5 text-[#f1f1f1] uppercase">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-[18px] text-[#ffffff] max-w-lg mx-auto font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Text Label */}
                            <div className="flex justify-start md:justify-end w-full md:w-auto">
                                <span className="text-[9px] md:text-[10px] lg:text-[15px] text-[#ffffff] uppercase tracking-[0.2em] text-left md:text-right font-medium">
                                    {item.sideLabel}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Card Area */}
                <div className="w-full h-screen z-20 relative" id="cta-container">
                    {/* The Main Card Container */}
                    <div className="relative w-full border border-[#f1f1f1]/60 bg-[#1A1A1A] py-72 overflow-hidden">

                        {/* Corner Diamonds */}
                        <div className="absolute -top-[5px] -left-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />
                        <div className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />
                        <div className="absolute -bottom-[5px] -left-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />
                        <div className="absolute -bottom-[5px] -right-[5px] w-[10px] h-[10px] bg-[#f1f1f1] rotate-45" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h3 className="text-3xl md:text-[42px] font-light mb-6 text-[#f1f1f1] tracking-tight max-w-2xl leading-tight">
                                3 minutes to implement your <br className="hidden md:block" /> first baits
                            </h3>

                            <p className="text-sm md:text-base lg:text-[18px] text-[#ffffff] mb-10 max-w-2xl leading-relaxed">
                                No setup friction. No integration delays. <br />
                                Go from zero to live detection in minutes, with a seamless onboarding experience
                            </p>

                            <button className="px-10 py-3 border border-[#f1f1f1]/60 lg:text-[18px] text-[#f1f1f1] text-sm">
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

            // 1. Gradient grows from top
            mainTl.fromTo(gradientRef.current,
                {
                    scaleY: 0,
                    opacity: 0,
                    y: -50
                },
                {
                    scaleY: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
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
                    ease: "power2.out"
                },
                "-=0.3"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <main ref={containerRef} className="bg-[#1A1A1A]">
                {/* --- Animation Wrapper --- */}
                <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">

                    {/* Top Gradient */}
                    <div
                        ref={gradientRef}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] pointer-events-none origin-top"
                        style={{
                            background: "radial-gradient(50% 50% at 50% 0%, rgba(9, 229, 229, 0.4) 0%, rgba(168, 255, 87, 0.15) 50%, rgba(0, 0, 0, 0) 100%)",
                            transform: "scaleY(0)",
                            opacity: 0
                        }}
                    />

                    {/* Introduction Text */}
                    <div
                        ref={introTextRef}
                        className="z-10 w-full px-6 md:px-10"
                        style={{ opacity: 0 }}
                    >
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col md:flex-row w-full ">
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

                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 0.3;
                        }
                        50% {
                            opacity: 1;
                        }
                    }
                    .animate-pulse {
                        animation: pulse 1s ease-in-out infinite;
                    }
                `}</style>
            </main>

            {/* Standard Protection Section - full width preserved */}
            <div ref={standardProtectionRef} className="opacity-0 w-full relative" style={{ top: '-70vh' }}>
                <StandardProtection />
            </div>
        </>
    );
}