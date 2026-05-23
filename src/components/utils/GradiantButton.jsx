// components/GradientButton.jsx
"use client";
import React, { useRef, forwardRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const GradientButton = forwardRef(({
    children,
    className = "",
    onClick,
    href = "/contact",
}, externalRef) => {
    const internalBtnRef = useRef(null);
    const hoverLightRef = useRef(null);
    const borderRotationRef = useRef(null);

    const btnRef = externalRef || internalBtnRef;

    useEffect(() => {
        const button = btnRef.current;
        const hoverLight = hoverLightRef.current;
        const borderRotation = borderRotationRef.current;

        if (!button) return;

        // 1. INFINITE BORDER ROTATION
        const rotateTween = gsap.to(borderRotation, {
            rotation: 360,
            duration: 4, // Speed control (lower = faster)
            repeat: -1,
            ease: "none"
        });

        // 2. MOUSE TRACKING (Webflow button-hover_light effect)
        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(hoverLight, {
                x: x,
                y: y,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to(hoverLight, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(hoverLight, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            rotateTween.kill();
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [btnRef]);

    return (
        <a
            href={href}
            ref={btnRef}
            onClick={onClick}
            className={`button-cta w-inline-block relative inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-[#000000] text-white no-underline overflow-hidden group ${className}`}
            style={{ isolation: 'isolate' }}
        >
            {/* THE MASK CONTAINER (Configured with rounded-md / 6px geometry) */}
            <div
                className="absolute inset-0 rounded-md pointer-events-none overflow-hidden"
                style={{
                    padding: '1.5px', // Exact thickness of the border line
                    borderRadius: '6px', // Matches Tailwind's rounded-md
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: 2
                }}
            >
                {/* THE ROTATING GRADIENT - Updated colors */}
                <div
                    ref={borderRotationRef}
                    className="absolute inset-[-150%] origin-center"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 60%, #00E5E5 75%, #99FF33 90%, transparent 100%)',
                    }}
                />
            </div>

            {/* THE HOVER LIGHT OVERLAY - Updated to match gradient colors */}
            <div
                ref={hoverLightRef}
                className="button-hover_light absolute top-0 left-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full opacity-0 mix-blend-screen transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 229, 229, 0.15) 0%, rgba(153, 255, 51, 0.1) 50%, transparent 75%)',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    zIndex: 1
                }}
            />

            {/* BUTTON TEXT */}
            <div className="button-m z-index-1 relative font-medium tracking-wide text-sm z-10 select-none pointer-events-none">
                {children || "Contact us"}
            </div>
        </a>
    );
});

GradientButton.displayName = 'GradientButton';