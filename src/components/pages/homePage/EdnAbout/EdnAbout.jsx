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
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    // Set initial hidden state for title and number
    gsap.set(topTitleRef.current, { opacity: 0, y: -30 });
    gsap.set(bottomNumberRef.current, { opacity: 0 });

    const sections = [
      { title: "Solution", number: "001", color: "black", bgColor: "#D9D9D9" },
      { title: "About", number: "002", color: "white", bgColor: "#1A1A1A" },
      { title: "Technology", number: "003", color: "white", bgColor: "#1A1A1A" },
    ];

    sections.forEach((section, idx) => {
      ScrollTrigger.create({
        trigger: sectionRefs.current[idx],
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          gsap.to(topTitleRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              topTitleRef.current.innerHTML = section.title;
              topTitleRef.current.style.color = section.color;
              gsap.to(topTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        },
        onLeave: () => {
          gsap.to(topTitleRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
          });
        },
        onLeaveBack: () => {
          gsap.to(topTitleRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to(topTitleRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              topTitleRef.current.innerHTML = section.title;
              topTitleRef.current.style.color = section.color;
              gsap.to(topTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        },
      });

      ScrollTrigger.create({
        trigger: sectionRefs.current[idx],
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          gsap.to(bottomNumberRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              bottomNumberRef.current.innerHTML = section.number;
              bottomNumberRef.current.style.color = section.color;
              gsap.to(bottomNumberRef.current, {
                opacity: 0.4,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        },
        onLeave: () => {
          gsap.to(bottomNumberRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
        },
        onLeaveBack: () => {
          gsap.to(bottomNumberRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to(bottomNumberRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              bottomNumberRef.current.innerHTML = section.number;
              bottomNumberRef.current.style.color = section.color;
              gsap.to(bottomNumberRef.current, {
                opacity: 0.4,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        },
      });
    });

    // Content fade-in animations
    sectionRefs.current.forEach((section, idx) => {
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

    // Pinned video animation for Section 3
    if (videoContainerRef.current && sectionRefs.current[2]) {
      // Make video container sticky
      gsap.set(videoContainerRef.current, {
        position: "sticky",
        top: "120px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
      });

      if (videoRef.current) {
        videoRef.current.style.opacity = "0";
        videoRef.current.style.transform = "scale(0.95)";
      }

      ScrollTrigger.create({
        trigger: sectionRefs.current[2],
        start: "top bottom",
        onEnter: () => {
          if (videoRef.current) {
            gsap.to(videoRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                if (videoRef.current) {
                  videoRef.current.play().catch((e) => console.log("Video autoplay prevented:", e));
                }
              },
            });
          }
        },
        onLeave: () => {
          if (videoRef.current) {
            gsap.to(videoRef.current, {
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              },
            });
          }
        },
        onEnterBack: () => {
          if (videoRef.current) {
            gsap.to(videoRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                if (videoRef.current) {
                  videoRef.current.play().catch((e) => console.log("Video autoplay prevented:", e));
                }
              },
            });
          }
        },
        onLeaveBack: () => {
          if (videoRef.current) {
            gsap.to(videoRef.current, {
              opacity: 0,
              scale: 0.95,
              duration: 0.4,
              ease: "power2.in",
              onComplete: () => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              },
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const techSpecs = [
    {
      title: "Realistic Threat Simulations",
      description:
        "Experience attacks modeled after real-world cybercriminals. Testing defenses against tactics from groups like Double Dragon, Fancy Bear, and Lazarus Group.",
    },
    {
      title: "Safe & Controlled Testing",
      description:
        "Conduct simulations without disrupting operations, allowing focus on strengthening systems securely.",
    },
    {
      title: "AI-Powered Hacking Tools",
      description:
        "Utilize advanced AI tools developed by HackFirst to emulate sophisticated cybercriminal strategies, uncovering vulnerabilities others miss.",
    },
    {
      title: "World-Class Ethical Hackers",
      description:
        "Collaborate with a team of over 10 world-class ethical hackers who think like black-hat attackers and use their skills to protect your organization.",
    },
  ];

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
      {/* Section 3 - Technology with pinned video in middle */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="min-h-screen relative px-6 md:px-10 py-20 border-y border-[#000000] bg-[#1A1A1A]"
      >
        <div className="max-w-[1800px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Left Column - Titles */}
            <div className="md:col-span-4 flex flex-col gap-[20vh] py-[10vh]">
              {techSpecs.map((tech, idx) => (
                <div key={idx} className="min-h-[120px] flex items-center">
                  <h3 className="text-xl md:text-2xl lg:text-[42px] tracking-tight text-white leading-tight">
                    {tech.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Middle Column - Pinned Video */}
            <div className="md:col-span-4 h-full relative">
              <div className="sticky top-[5vh] w-full">
                <div className="w-full aspect-square flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain relative z-10"
                    loop
                    muted
                    autoPlay
                    playsInline
                    poster="/images/home/technology/video-poster.jpg"
                  >
                    <source src="/video/video-1.mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Right Column - Descriptions */}
            <div className="md:col-span-4 flex flex-col gap-[20vh] py-[10vh]">
              {techSpecs.map((tech, idx) => (
                <div key={idx} className="min-h-[120px] flex items-center">
                  <p className="text-sm md:text-base lg:text-[24px] leading-relaxed text-white/70 max-w-xl">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EdnAbout;