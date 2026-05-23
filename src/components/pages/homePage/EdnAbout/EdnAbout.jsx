"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EdnAbout = () => {
  const sectionRefs = useRef([]);
  const topTitleRef = useRef(null);
  const bottomNumberRef = useRef(null);
  
  // Tech section refs
  const techContainerRef = useRef(null);
  const techMaskRef = useRef(null);

  useEffect(() => {
    const sectionsData = [
      { title: "Solution", number: "001", color: "black" },
      { title: "About", number: "002", color: "white" },
      { title: "Technology", number: "003", color: "white" },
    ];

    // Function to update text - ONLY for the active section
    const updateActiveSection = () => {
      let activeIndex = -1;
      
      // Find which section is currently in view
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        // Section is active when its top is above or at 30% and bottom is below 30%
        if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
          activeIndex = i;
          break;
        }
      }
      
      // If no section is found, default to first section
      if (activeIndex === -1 && sectionRefs.current[0]) {
        activeIndex = 0;
      }
      
      const section = sectionsData[activeIndex];
      
      // Update top title with animation
      if (topTitleRef.current && topTitleRef.current.innerHTML !== section.title) {
        gsap.killTweensOf(topTitleRef.current);
        gsap.to(topTitleRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (topTitleRef.current) {
              topTitleRef.current.innerHTML = section.title;
              topTitleRef.current.style.color = section.color;
              gsap.to(topTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          },
        });
      } else if (topTitleRef.current && topTitleRef.current.innerHTML === section.title) {
        // Ensure it's visible
        gsap.set(topTitleRef.current, { opacity: 1, y: 0 });
      }
      
      // Update bottom number with animation
      if (bottomNumberRef.current && bottomNumberRef.current.innerHTML !== section.number) {
        gsap.killTweensOf(bottomNumberRef.current);
        gsap.to(bottomNumberRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (bottomNumberRef.current) {
              bottomNumberRef.current.innerHTML = section.number;
              bottomNumberRef.current.style.color = section.color;
              gsap.to(bottomNumberRef.current, {
                opacity: 0.4,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          },
        });
      } else if (bottomNumberRef.current && bottomNumberRef.current.innerHTML === section.number) {
        // Ensure it's visible with correct opacity
        gsap.set(bottomNumberRef.current, { opacity: 0.4 });
      }
    };

    // Set initial values based on first section
    if (topTitleRef.current) {
      topTitleRef.current.innerHTML = "Solution";
      topTitleRef.current.style.color = "black";
      gsap.set(topTitleRef.current, { opacity: 1, y: 0 });
    }
    if (bottomNumberRef.current) {
      bottomNumberRef.current.innerHTML = "001";
      bottomNumberRef.current.style.color = "black";
      gsap.set(bottomNumberRef.current, { opacity: 0.4 });
    }

    // Create ScrollTrigger that updates on scroll with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll);
    
    // Initial call after a short delay to ensure DOM is ready
    setTimeout(() => {
      updateActiveSection();
      ScrollTrigger.refresh();
    }, 100);

    // Content fade-in animations
    sectionRefs.current.forEach((section, idx) => {
      if (!section) return;
      const content = section.querySelector(".section-content");
      if (content) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(content, {
              opacity: 0,
              y: 50,
              duration: 0.4,
              ease: "power3.in",
            });
          },
        });
        gsap.set(content, { opacity: 0, y: 50 });
      }
    });

    // First section image animation
    const firstImage = sectionRefs.current[0]?.querySelector(".ethical-logo");
    if (firstImage) {
      ScrollTrigger.create({
        trigger: sectionRefs.current[0],
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            firstImage,
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "back.out(0.5)" }
          );
        },
      });
      gsap.set(firstImage, { scale: 0.7, opacity: 0 });
    }

    setTimeout(() => {
      const firstContent = sectionRefs.current[0]?.querySelector(".section-content");
      if (firstContent) {
        gsap.to(firstContent, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
      const firstImageElem = sectionRefs.current[0]?.querySelector(".ethical-logo");
      if (firstImageElem) {
        gsap.to(firstImageElem, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(0.5)",
        });
      }
    }, 100);

    // Modern Tech Section Animations
    if (techContainerRef.current && techMaskRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: techContainerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(techMaskRef.current, {
        webkitClipPath: "circle(150% at 50% 50%)",
        clipPath: "circle(150% at 50% 50%)",
        ease: "none",
      });

      gsap.utils.toArray(".card-wrapper").forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Modern tech cards data
  const modernTechSpecs = [
    { title: "Realistic Threat", sub: "Dynamic Attacks", desc: "Modeling attacks after real-world cybercriminals." },
    { title: "Safe Testing", sub: "Controlled Env", desc: "No disruption. Zero downtime. Full security." },
    { title: "AI Hacking", sub: "03 / Tech", desc: "Proprietary tools emulating black-hat strategies." },
    { title: "Elite Squad", sub: "Ethical Hackers", desc: "10+ hackers thinking like the adversary." },
  ];

  const TechCard = ({ spec, inverted = false }) => (
    <div className={`group relative p-8 md:p-12 border ${inverted ? 'border-black/20' : 'border-white/20'} h-full flex flex-col justify-center text-center transition-all duration-500`}>
      <h3 className={`text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2 ${inverted ? 'text-black' : 'text-white'}`}>
        {spec.title}
      </h3>
      <h4 className={`text-2xl md:text-4xl font-bold uppercase tracking-tight mb-6 ${inverted ? 'text-black' : 'text-white'}`}>
        {spec.sub}
      </h4>
      <p className={`text-sm uppercase tracking-widest ${inverted ? 'text-black/60' : 'text-white/50'}`}>
        {spec.desc}
      </p>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 ${inverted ? 'bg-black' : 'bg-[#99FF33]'}`} />
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 ${inverted ? 'bg-black' : 'bg-[#99FF33]'}`} />
    </div>
  );

  return (
    <div className="bg-[#1A1A1A] text-white">
      {/* Fixed Top Title */}
      <div className="fixed top-30 left-10 z-50">
        <span
          ref={topTitleRef}
          className="text-sm lg:text-[42px] tracking-[0.2em] uppercase"
          style={{ display: "inline-block" }}
        >
          Solution
        </span>
      </div>

      {/* Fixed Bottom Number */}
      <div className="fixed bottom-10 right-10 z-50">
        <span
          ref={bottomNumberRef}
          className="text-4xl lg:text-[80px] tracking-tighter"
          style={{ display: "inline-block", opacity: 0.4 }}
        >
          001
        </span>
      </div>

      {/* Section 1 */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="h-screen flex flex-col items-center justify-center bg-[#D9D9D9] text-black relative overflow-hidden px-6 md:px-10"
      >
        <div className="section-content text-center z-10">
          <div className="ethical-logo">
            <Image
              src="/images/home/solution/logo-text.png"
              alt="ETHICAL DEN"
              width={1300}
              height={250}
              className="w-auto h-auto max-w-full mb-4"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <p
            className="text-[10px] md:text-xs lg:text-[18px] uppercase mt-4 lg:mt-10"
            style={{ color: "black", opacity: 0.7 }}
          >
            The ultimate solution to modern cyber threats
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="min-h-screen relative px-6 md:px-10 py-20 mt-16 border-y border-[#000000] bg-[#1A1A1A] text-white overflow-hidden"
      >
        <div className="section-content">
          <div className="grid grid-cols-1 md:grid-cols-12 mt-20">
            <div className="hidden md:block md:col-span-3"></div>
            <div className="md:col-span-9">
              <p
                className="text-[10px] lg:text-[13px] uppercase mb-8"
                style={{ color: "white", opacity: 0.5 }}
              >
                Features & Technologies
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-[56px] mb-12 leading-[1.1] max-w-4xl tracking-tight"
                style={{ color: "white" }}
              >
                HackFirst team simulates such attacks in controlled environments
                without disrupting your services
              </h2>
              <p
                className="text-[11px] lg:text-[14px] tracking-[0.15em] leading-relaxed uppercase max-w-2xl mb-28"
                style={{ color: "white", opacity: 0.6 }}
              >
                Capitalize leveraging our proprietary AI-powered hacking tools,
                and deploying whole squadrons of over 10 elite ethical hackers
                working in unison — white hats with a black hat mindset.
              </p>
            </div>
          </div>

          <div className="w-full">
            {[
              { id: "S/001", label: "VAPT" },
              { id: "S/002", label: "RED TEAM" },
              { id: "S/003", label: "SECURITY ADVISORY" },
            ].map((item) => (
              <div key={item.id} className="border-t border-white/10 w-full py-6">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="col-span-1 md:col-span-3">
                    <span
                      className="text-[11px] lg:text-[14px] tracking-widest"
                      style={{ color: "white", opacity: 0.4 }}
                    >
                      {item.id}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-9">
                    <div className="inline-block px-6 py-2 border border-[#55F1A0] text-[10px] lg:text-[13px] uppercase text-[#ffffff]">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <div 
        ref={(el) => {
          sectionRefs.current[2] = el;
          techContainerRef.current = el;
        }}
        className="relative h-screen w-full overflow-hidden bg-[#0D0D0D]"
      >
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
            {modernTechSpecs.map((spec, i) => (
              <div key={i} className="card-wrapper h-[300px] md:h-[350px]">
                <TechCard spec={spec} />
              </div>
            ))}
          </div>
        </div>

        <div 
          ref={techMaskRef}
          className="absolute inset-0 bg-[#99FF33] flex items-center justify-center z-20 pointer-events-none"
          style={{ clipPath: "circle(0% at 50% 50%)", WebkitClipPath: "circle(0% at 50% 50%)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl p-6 md:p-20">
            {modernTechSpecs.map((spec, i) => (
              <div key={i} className="h-[300px] md:h-[350px]">
                <TechCard spec={spec} inverted={true} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll to Breach</span>
          <div className="w-12 h-[1px] bg-[#99FF33]" />
        </div>
      </div>
    </div>
  );
};

export default EdnAbout;