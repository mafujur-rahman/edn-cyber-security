// components/GradientButton.jsx
"use client";
import React, { useRef, useState, forwardRef, useEffect } from 'react';
import { gsap } from 'gsap';

const RotatingLine = ({ rectRef, width, height }) => {
    if (width === 0 || height === 0) return null;

    return (
        <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#09E5E5" />
                    <stop offset="100%" stopColor="#A8FF57" />
                </linearGradient>
            </defs>

            <rect
                ref={rectRef}
                x="2" y="2"
                width={width - 4}
                height={height - 4}
                fill="none"
                stroke="url(#borderGradient)"
                strokeWidth="2.5"
                strokeLinecap="butt"
                filter="url(#glow)"
                style={{ opacity: 1 }}
            />
        </svg>
    );
};

export const GradientButton = forwardRef(({
    children,
    className = "",
    onClick,
    disabled = false,
    type = "button",
    variant = "primary",
    animateBorder = true,
}, externalRef) => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const internalBtnRef = useRef(null);
    const rectRef = useRef(null);
    const animationRef = useRef(null);

    const btnRef = externalRef || internalBtnRef;

    useEffect(() => {
        if (!animateBorder) return;

        const updateDimensions = () => {
            if (btnRef.current) {
                setDimensions({
                    w: btnRef.current.clientWidth,
                    h: btnRef.current.clientHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [animateBorder, btnRef]);

    useEffect(() => {
        if (!animateBorder || dimensions.w === 0 || dimensions.h === 0) return;

        const startAnimation = () => {
            if (!rectRef.current) return;

            if (animationRef.current) {
                animationRef.current.kill();
            }

            const width = dimensions.w - 4;
            const height = dimensions.h - 4;
            const length = 2 * (width + height);
            const dashLength = length * 0.15;
            const gapLength = length * 0.85;

            gsap.set(rectRef.current, {
                strokeDasharray: `${dashLength} ${gapLength}`,
                strokeDashoffset: 0
            });

            animationRef.current = gsap.to(rectRef.current, {
                strokeDashoffset: -length,
                duration: 8,
                repeat: -1,
                ease: "none",
            });
        };

        startAnimation();

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [dimensions, animateBorder]);

    const handleMouseMove = (e) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const gradientStyles = {
        primary: {
            background: isHovered
                ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(9, 229, 229, 0.3), rgba(168, 255, 87, 0.15), black 80%)`
                : 'black',
        },
        secondary: {
            background: isHovered
                ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.2), rgba(168, 255, 87, 0.1), transparent 80%)`
                : 'transparent',
            border: isHovered ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
        }
    };

    return (
        <button
            ref={(el) => {
                btnRef.current = el;
                internalBtnRef.current = el;
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`relative transition-all duration-300 overflow-hidden ${className}`}
            style={gradientStyles[variant]}
        >
            {animateBorder && (
                <RotatingLine rectRef={rectRef} width={dimensions.w} height={dimensions.h} />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
                {children}
            </span>
        </button>
    );
});

GradientButton.displayName = 'GradientButton';