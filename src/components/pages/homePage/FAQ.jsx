"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { GradientButton } from "@/components/utils/GradiantButton";

const faqs = [
    {
        question: "Why hasn’t anyone done this before?",
        answer: (
            <>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Because doing it right is hard.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Placing a decoy on the public internet means attackers have all the time in the world to inspect,
                    fingerprint, and compare. If the setup doesn’t feel real, it gets ignored.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    The second challenge is what happens when it doesn’t. Once a Bait is exposed, it faces constant
                    traffic: scans, brute force, background noise. Extracting useful signals from that chaos is just as
                    hard as building a convincing decoy.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    EDN built Baits to solve both problems. Each instance is designed to replicate real services with
                    extreme fidelity, and every alert is filtered and validated to remove false positives. The result
                    is clean, confirmed signals tied to real credential misuse.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                    What sounds simple took years of research and iteration. But once you see it working, it makes
                    perfect sense.
                </p>
            </>
        ),
    },
    {
        question: "How do we know the concept works?",
        answer: (
            <>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                    The foundation behind EDN is built on proven deception infrastructure used by security teams for
                    years.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    The difference is that most systems generate huge amounts of noise and require constant tuning to
                    stay effective.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    EDN focuses specifically on credential misuse. Every signal is tied to attacker interaction with
                    infrastructure that should never be touched by legitimate users.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                    That means fewer false positives, faster validation, and immediate insight into active threats
                    targeting your organization.
                </p>
            </>
        ),
    },
    {
        question: "How do we make sure attackers actually fall for the Baits?",
        answer: (
            <>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Attackers ignore anything that looks artificial.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    That’s why EDN designs every Bait to look and behave like a legitimate production system, complete
                    with realistic infrastructure, certificates, and behavior patterns.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    The goal is not to trick humans. The goal is to create environments attackers naturally trust while
                    conducting reconnaissance or validating stolen credentials.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                    When done correctly, the interaction feels completely ordinary to the attacker, which is exactly
                    what makes the detection valuable.
                </p>
            </>
        ),
    },
    {
        question: "How are Baits different from traditional honeypots?",
        answer: (
            <>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Traditional honeypots are usually isolated traps designed to attract broad attacker activity.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    EDN Baits are purpose-built for credential abuse detection. They are lightweight, targeted, and
                    designed to blend directly into real environments.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Instead of collecting endless noisy traffic, Baits focus on high-confidence interactions tied to
                    unauthorized access attempts.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                    The result is faster signal validation and a much clearer understanding of which credentials are
                    actively being abused.
                </p>
            </>
        ),
    },
    {
        question: "What’s the value if we already monitor the dark web?",
        answer: (
            <>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Dark web monitoring is useful, but it’s often delayed and incomplete.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    By the time credentials appear in marketplaces or leak databases, attackers may have already tested
                    and used them successfully.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    EDN detects misuse at the moment interaction happens against a Bait, giving security teams a live
                    signal instead of historical evidence.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                    That shift from delayed discovery to real-time visibility dramatically reduces response time.
                </p>
            </>
        ),
    },
    {
        question: "We already have MFA. Do we really need this?",
        answer: (
            <>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                    MFA is one of the strongest security layers available today, but it is not perfect.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    Attackers increasingly rely on session hijacking, phishing proxies, social engineering, and token
                    theft to bypass traditional authentication protections.
                </p>

                <p className="mb-6 text-zinc-400 leading-relaxed">
                    EDN provides visibility into those attempts by detecting when stolen credentials or sessions are
                    tested against controlled infrastructure.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                    Instead of replacing MFA, EDN strengthens your overall defense posture by exposing threats earlier
                    in the attack lifecycle.
                </p>
            </>
        ),
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);
    const [heights, setHeights] = useState([]);

    useEffect(() => {
        const updateHeights = () => {
            const measuredHeights = contentRefs.current.map(
                (ref) => ref?.scrollHeight || 0
            );
            setHeights(measuredHeights);
        };

        updateHeights();

        window.addEventListener("resize", updateHeights);

        return () => window.removeEventListener("resize", updateHeights);
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full bg-black py-28 lg:py-32 px-6 overflow-visible"> {/* Changed from overflow-hidden to overflow-visible */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">

                {/* LEFT SIDE - PINNED */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
                    <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05]">
                        Still have questions?
                        <br />
                        <span className="text-white/60">
                            Let’s clear things up.
                        </span>
                    </h2>

                    <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md">
                        Here are answers to the most common questions security teams ask when exploring EDN.
                    </p>

                    <div className="mt-2">
                        <GradientButton
                            className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer text-white transition-transform duration-300 hover:scale-105 active:scale-95"
                            variant="primary"
                        >
                            Contact us
                        </GradientButton>
                    </div>
                </div>

                {/* RIGHT SIDE - FAQ LIST */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`
                                    border border-white/10
                                    bg-black
                                    overflow-hidden
                                    transition-all duration-300
                                    
                                `}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 md:px-7 py-6 flex items-start justify-between gap-5 text-left"
                                >
                                    <span className="text-white text-lg md:text-[20px] font-semibold tracking-tight leading-snug">
                                        {faq.question}
                                    </span>

                                    {/* ICON BOX - rotates 45deg when open */}
                                    <div
                                        className={`
                                            w-12 h-12
                                            shrink-0
                                            flex items-center justify-center
                                            bg-white/5
                                            transition-all duration-500 ease-out
                                            ${isOpen ? "rotate-45" : "rotate-0"}
                                        `}
                                    >
                                        {/* Icon stays straight while container rotates */}
                                        <div className="transition-all duration-500 ease-out">
                                            {isOpen ? (
                                                <X
                                                    className="text-white w-4 h-4"
                                                    strokeWidth={2.5}
                                                />
                                            ) : (
                                                <Plus
                                                    className="text-white w-4 h-4"
                                                    strokeWidth={2.5}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* CONTENT - Height animation */}
                                <div
                                    style={{
                                        height: isOpen
                                            ? `${heights[index]}px`
                                            : "0px",
                                        transition:
                                            "height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        ref={(el) =>
                                            (contentRefs.current[index] = el)
                                        }
                                        className="px-6 md:px-7 pb-7 max-w-4xl"
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}