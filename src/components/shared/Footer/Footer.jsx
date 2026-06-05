"use client";

import React, { useEffect, useRef } from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef(null);
    const glowRef = useRef(null);
    const ambientGlowRef = useRef(null);

    useEffect(() => {
        const glowElement = glowRef.current;
        const ambientElement = ambientGlowRef.current;

        // Set initial hidden state - completely invisible with no color showing
        gsap.set(glowElement, {
            width: "0%",
            height: "0rem",
            opacity: 0,
            scale: 0,
        });

        gsap.set(ambientElement, {
            opacity: 0,
            scale: 0,
        });

        // Animation for expanding gradient as you scroll within the footer
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 60%",           // Starts when footer enters viewport
                end: "bottom bottom",        // Completes when footer bottom hits viewport bottom
                scrub: 2.5,                  // Smooth, slow scrub
                markers: false,
                invalidateOnRefresh: true,
            }
        });

        // Animate main gradient - extra large height
        tl.fromTo(glowElement,
            {
                width: "0%",
                height: "0rem",
                opacity: 0,
                scale: 0,
            },
            {
                width: "80%",
                height: "60rem",
                opacity: 1,
                scale: 1,
                ease: "power2.out",
            },
            0
        );

        // Animate ambient glow together with main gradient
        tl.fromTo(ambientElement,
            {
                opacity: 0,
                scale: 0,
            },
            {
                opacity: 1,
                scale: 1,
                ease: "power2.out",
            },
            0
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-black pt-24 pb-12 px-6 overflow-visible"
        >
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand & Socials Section - Left side */}
                    <div className="md:col-span-6 flex flex-col gap-10">
                        {/* Logo Image */}
                        <div className="flex items-center">
                            <img
                                src="/images/home/logo/footer-logo.png"
                                alt="MokN Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </div>

                        {/* Social Icons matching the exact logo Cyan on hover */}
                        <div className="flex items-center gap-7 text-white/80">
                            <a href="#" className="hover:text-[#00E5E5] transition-all duration-300 transform">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="#" className="hover:text-[#00E5E5] transition-all duration-300 transform">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="hover:text-[#00E5E5] transition-all duration-300 transform">
                                <FaFacebookF size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links: Offers & Company - Right side */}
                    <div className="md:col-span-6 flex flex-col md:flex-row justify-end gap-12 md:gap-16 lg:gap-28">
                        {/* Offers */}
                        <div className="flex flex-col gap-6 text-left">
                            <h4 className="text-[10px] md:text-[24px] font-bold text-white">
                                Offers
                            </h4>
                            <ul className="flex flex-col gap-4 text-[20px] font-bold text-white/80">
                                <li><a href="#" className="hover:text-white transition-colors">Baits</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Lantern</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-6 text-left">
                            <h4 className="text-[10px] md:text-[24px] font-bold text-white">
                                Company
                            </h4>
                            <ul className="flex flex-col gap-4 text-[20px] font-bold text-white/80">
                                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] md:text-[20px] font-bold text-white tracking-tight">
                        © {currentYear} EDN Cyber Security. All rights reserved.
                    </p>
                    <a href="#" className="text-[11px] md:text-[20px] font-bold text-white hover:text-white transition-colors tracking-tight">
                        Terms of service
                    </a>
                </div>
            </div>

            {/* Bottom Glowing Gradient Effect - Extra large height */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none overflow-hidden">
                <div
                    ref={glowRef}
                    className="quote_light"
                    style={{
                        opacity: 0,
                        width: "0%",
                        height: "0rem",
                        scale: 0,
                        maxWidth: "80rem",
                        position: "absolute",
                        bottom: "-30rem",
                        background: "radial-gradient(circle at center, rgba(0, 229, 229, 0.5) 0%, rgba(57, 242, 161, 0.4) 40%, rgba(153, 255, 51, 0.3) 70%, transparent 100%)",
                        filter: "blur(6rem)",
                        borderRadius: "50%",
                        transformOrigin: "center center",
                        transition: "none",
                    }}
                />
            </div>

            {/* Soft centered ambient flow - Matching larger height */}
            <div 
                ref={ambientGlowRef}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 pointer-events-none"
                style={{
                    opacity: 0,
                    scale: 0,
                    height: "280px",
                    background: "radial-gradient(ellipse at center bottom, rgba(57, 242, 161, 0.2), transparent 75%)",
                    filter: "blur(25px)",
                    zIndex: 5,
                    transformOrigin: "center bottom",
                    transition: "none",
                }}
            />
        </footer>
    );
}