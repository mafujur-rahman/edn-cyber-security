import React from 'react';

const Cta = () => {
  return (
    <section className="relative flex min-h-[70vh] border-y border-[#000000] mt-16 w-full flex-col items-center justify-center bg-[#1A1A1A] px-6 py-20 text-center  ">
      <div className="">
        {/* Top Subheadline */}
        <p className="mb-6 text-[10px] lg:text-[15px] font-medium uppercase tracking-[0.3em] text-[#ffffff] sm:text-xs">
          Ethical Den is a proud member of the Fearsoff Alliance
        </p>

        {/* Main Headline */}
        <h1 className="mb-8 text-4xl lg:text-[42px] font-light leading-tight tracking-tight sm:text-5xl md:text-6xl text-[#f1f1f1]">
          Is your organization truly ready <br className="hidden md:block" />
          for a Ethical Den level assault?
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10  text-[10px] lg:text-[24px] font-medium uppercase underline-offset-4 leading-relaxed tracking-[0.15em] text-[#ffffff] sm:text-xs">
          With HackFirst™ Cyberattack simulations, you're not just checking the box 
          <br className="hidden md:block" /> 
          on security — you're forged in fire
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <button className="group relative text-[#f1f1f1] border border-[#f1f1f1]/30 px-10 py-3 text-xs lg:text-[18px]  tracking-[0.2em]  ">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;