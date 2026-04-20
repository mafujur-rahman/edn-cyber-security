"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntroSection() {
    const containerRef = useRef(null);
    const gradientRef = useRef(null);
    const introTextRef = useRef(null);
    const revealingTextRef = useRef(null);
    const secondTextRef = useRef(null);

    const [revealedChars, setRevealedChars] = useState(0);
    const fullText = "credentials remain the easiest way in for attackers.";
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

            // 1. Gradient grows from top (only height, not full height)
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

            // 4. First revealing text appears
            mainTl.fromTo(revealingTextRef.current,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.3"
            );

            // 5. Second text fades in after reveal completes
            mainTl.fromTo(secondTextRef.current,
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
                "+=0.5"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-[#1A1A1A]">
            {/* --- Animation Wrapper --- */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">

                {/* Top Gradient - limited height like before */}
                <div
                    ref={gradientRef}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] pointer-events-none origin-top"
                    style={{
                        background: "radial-gradient(50% 50% at 50% 0%, rgba(9, 229, 229, 0.4) 0%, rgba(168, 255, 87, 0.15) 50%, rgba(0, 0, 0, 0) 100%)",
                        transform: "scaleY(0)",
                        opacity: 0
                    }}
                />

                {/* Introduction Text - appears first, then moves up and fades out */}
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
                                <p className="text-2xl md:text-[32px] lg:text-[42px] font-normal text-[#f1f1f1]/50 leading-tight ">
                                    Merely checking the boxes for compliance through <br className="hidden lg:block" />
                                    basic audits and pen-tests leaves your <br className="hidden lg:block" />
                                    infrastructure vulnerable to real-world attacks
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* First Revealing Text - appears character by character */}
                <div
                    ref={revealingTextRef}
                    className="z-10 text-center max-w-5xl absolute opacity-0"
                >
                    <p className="text-2xl md:text-3xl font-normal leading-relaxed">
                        {currentText.split('').map((char, index) => (
                            <span
                                key={index}
                                className="transition-all duration-100"
                                style={{
                                    color: index < revealedChars ? 'white' : '#4a4a4a',
                                    textShadow: index < revealedChars ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
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
    );
}