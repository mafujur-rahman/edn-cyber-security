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

        if (!button) return;

        // MOUSE TRACKING
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
            {/* Rotating Border */}
            <div
                className="absolute inset-0 rounded-md pointer-events-none overflow-hidden"
                style={{
                    padding: '1.5px',
                    borderRadius: '6px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: 2
                }}
            >
                <div
                    ref={borderRotationRef}
                    className="rotating-border"
                    style={{
                        position: 'absolute',
                        inset: '-150%',
                        background: 'conic-gradient(from 0deg, transparent 60%, #00E5E5 75%, #99FF33 90%, transparent 100%)',
                        transformOrigin: 'center',
                        animation: 'rotateBorder 6s linear infinite'
                    }}
                />
            </div>

            {/* Hover Light Effect - Updated to match your exact CSS */}
            <div
                ref={hoverLightRef}
                className="button_hover_light"
                style={{
                    aspectRatio: '1',
                    backgroundColor: 'var(--primary)',
                    opacity: 0,
                    filter: 'blur(1.5rem)',
                    borderRadius: '99rem',
                    width: '90%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    zIndex: 1,
                    background: 'radial-gradient(circle, #00E5E5 0%, #99FF33 100%)' // Gradient colors
                }}
            />

            {/* Button Text */}
            <div className="button-m z-index-1 relative font-medium tracking-wide text-sm z-10 select-none pointer-events-none">
                {children || "Contact us"}
            </div>

            {/* Global styles for animation */}
            <style jsx>{`
                @keyframes rotateBorder {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </a>
    );
});

GradientButton.displayName = 'GradientButton';