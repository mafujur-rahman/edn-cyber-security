import React from 'react';

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
        <div className="bg-[#1A1A1A] text-white min-h-screen  selection:bg-cyan-500/30 overflow-hidden relative pb-20 px-6 md:px-10">
            <div className="w-full relative z-10">
                {/* Header Section */}
                <div className="text-center mb-32 md:mb-48 flex flex-col items-center relative">
                    <p className="text-[10px] md:text-[11px] lg:text-[15px] uppercase tracking-[0.4em] text-[#ffffff] mb-4 font-medium text-center w-full z-10">
                        The Problem
                    </p>

                    <h2 className="text-2xl md:text-3xl lg:text-[42px] font-light tracking-widest text-white uppercase text-center max-w-5xl mx-auto relative z-10">
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

export default StandardProtection;