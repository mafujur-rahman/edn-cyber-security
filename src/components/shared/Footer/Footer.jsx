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

    useEffect(() => {
        const glowElement = glowRef.current;

        // Animation for appearing on scroll down
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1.5,
                markers: false,
                onLeaveBack: () => {
                    // Reset animation when scrolling back up
                    gsap.set(glowElement, {
                        width: "0%",
                        height: "0px",
                        opacity: 0,
                        immediateRender: false
                    });
                }
            }
        });

        tl.fromTo(
            glowElement,
            {
                width: "100%",
                height: "0px",
                opacity: 0,
                filter: "blur(10px)",
            },
            {
                width: "150%",
                height: "160px", 
                opacity: 0.8,
                filter: "blur(12px)",
                duration: 2,
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
            className="relative w-full bg-black pt-24 pb-12 px-6 overflow-hidden"
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

                        {/* Social Icons with #09E5E5 on hover */}
                        <div className="flex items-center gap-7 text-white/80">
                            <a href="#" className="hover:text-[#09E5E5] transition-all duration-300 transform">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="#" className="hover:text-[#09E5E5] transition-all duration-300 transform">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="hover:text-[#09E5E5] transition-all duration-300 transform">
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

            {/* Bottom Glowing Gradient Effect - appears on scroll */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none">
                <div
                    ref={glowRef}
                    className="relative transition-all duration-500"
                    style={{
                        width: "0%",
                        maxWidth: "1280px",
                        height: "0px",
                        background: `radial-gradient(
                            ellipse at bottom,
                            rgba(168, 255, 87, 0.4) 0%,
                            rgba(9, 229, 229, 0.2) 40%,
                            transparent 70%
                        )`,
                        borderRadius: "100% 100% 0 0",
                        opacity: 0,
                        borderBottom: "2px solid rgba(168, 255, 87, 0.3)",
                    }}
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-t from-[rgba(9,229,229,0.2)] to-transparent blur-2xl" />
                </div>
            </div>
        </footer>
    );
}