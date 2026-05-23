"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GradientButton } from '@/components/utils/GradiantButton';
import gsap from 'gsap';

const slides = [
  {
    id: 1,
    videoSrc: "/video/sequence-1.mp4",
    text: "Phishing, info-stealers, social engineering... One way or another, some credentials will always leak."
  },
  {
    id: 2,
    videoSrc: "/video/sequence-2.mp4",
    text: "Once in possession, attackers map the target's internet-exposed assets and quickly test the stolen credentials across them."
  },
  {
    id: 3,
    videoSrc: "/video/sequence-3.mp4",
    text: "MokN deploys defensive phishing pages with valid certs, ultra realistic behavior, and domains crafted to blend into the attack surface."
  },
  {
    id: 4,
    videoSrc: "/video/sequence-4.mp4",
    text: "When attackers try to use stolen credentials on the Bait, they're met with a \"login failed\" response."
  },
  {
    id: 5,
    videoSrc: "/video/sequence-5.mp4",
    text: "Behind the scenes, MokN agents check the credentials in real time, and valid ones instantly trigger a critical alert."
  },
  {
    id: 6,
    videoSrc: "/video/sequence-6.mp4",
    text: "The password is reset within minutes, stopping the attack early and providing immediate, actionable intelligence on the attackers."
  }
];

export default function PresentationSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef(null);
  const textContainerRef = useRef(null);
  const currentTextRef = useRef(null);
  const nextTextRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Video wait:", e));
    }
  }, [currentSlide]);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, []);

  const updateTextContent = (newText) => {
    if (currentTextRef.current) {
      currentTextRef.current.textContent = newText;
    }
  };

  const animateNext = () => {
    if (currentSlide >= slides.length - 1 || isAnimating) return;
    
    setIsAnimating(true);
    
    const nextText = slides[currentSlide + 1].text;
    
    if (nextTextRef.current) {
      nextTextRef.current.textContent = nextText;
    }
    
    const tl = gsap.timeline({
      onComplete: () => {
        updateTextContent(nextText);
        
        gsap.set(currentTextRef.current, { 
          opacity: 1,
          y: 0,
          clearProps: "transform"
        });
        
        gsap.set(nextTextRef.current, { 
          opacity: 0,
          y: 0
        });
        
        setCurrentSlide(prev => prev + 1);
        setIsAnimating(false);
      }
    });
    
    tl.to(currentTextRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0);
    
    tl.fromTo(nextTextRef.current, 
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0
    );
  };

  const animatePrev = () => {
    if (currentSlide <= 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    const prevText = slides[currentSlide - 1].text;
    
    if (nextTextRef.current) {
      nextTextRef.current.textContent = prevText;
    }
    
    const tl = gsap.timeline({
      onComplete: () => {
        updateTextContent(prevText);
        
        gsap.set(currentTextRef.current, { 
          opacity: 1,
          y: 0,
          clearProps: "transform"
        });
        
        gsap.set(nextTextRef.current, { 
          opacity: 0,
          y: 0
        });
        
        setCurrentSlide(prev => prev - 1);
        setIsAnimating(false);
      }
    });
    
    tl.to(currentTextRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0);
    
    tl.fromTo(nextTextRef.current, 
      {
        y: -40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0
    );
  };

  return (
    <section className="relative my-20 min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-y-auto">
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16 flex flex-col items-center justify-center">
        
        {/* Video Container with Black Overlay - Full width within max-w-6xl */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Black overlay around video */}
          <div className="absolute inset-0  rounded-2xl z-[1] pointer-events-none"></div>
          
          <div className="w-full aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              key={`video-${slides[currentSlide].id}`}
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              muted
              playsInline
              autoPlay
            >
              <source src={slides[currentSlide].videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative h-32 mt-12 w-full max-w-5xl flex items-center justify-center overflow-hidden">
          <div ref={textContainerRef} className="relative w-full h-full flex items-center justify-center">
            {/* Current Text */}
            <div 
              ref={currentTextRef}
              className="absolute w-full text-xl md:text-2xl lg:text-4xl font-light leading-relaxed tracking-tight text-gray-200 text-center"
              style={{ willChange: 'transform, opacity' }}
            >
              {slides[currentSlide].text}
            </div>
            
            {/* Next/Prev Text */}
            <div 
              ref={nextTextRef}
              className="absolute w-full text-xl md:text-2xl lg:text-4xl font-light leading-relaxed tracking-tight text-gray-200 text-center"
              style={{ 
                opacity: 0,
                willChange: 'transform, opacity'
              }}
            />
          </div>
        </div>

        {/* Button and Controls */}
        <div className="w-full max-w-6xl mx-auto mt-12 flex items-center justify-between">
          
          <div className="flex gap-2.5 items-center">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`rounded-full transition-all duration-500 ${
                  i === currentSlide ? 'w-1.5 h-1.5 bg-white' : 'w-1 h-1 bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 flex justify-center">
            <GradientButton
              variant="primary"
              className="px-8 py-3 text-sm md:text-lg font-bold tracking-tight cursor-pointer"
              onClick={() => console.log('Book a demo clicked')}
            >
              Book a demo session
            </GradientButton>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={animatePrev}
              disabled={currentSlide === 0 || isAnimating}
              className={`relative p-2 rounded-sm transition-all duration-300 ${
                currentSlide === 0 || isAnimating
                  ? 'text-zinc-800 cursor-not-allowed opacity-50' 
                  : 'text-zinc-500 hover:text-white cursor-pointer'
              }`}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== 0 && !isAnimating) {
                  e.currentTarget.style.background = 'radial-gradient(circle at center, rgba(9, 229, 229, 0.25), rgba(168, 255, 87, 0.15), transparent 80%)';
                  e.currentTarget.style.border = '1px solid rgba(9, 229, 229, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSlide !== 0 && !isAnimating) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = 'none';
                }
              }}
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            <button 
              onClick={animateNext}
              disabled={currentSlide === slides.length - 1 || isAnimating}
              className={`relative p-2 rounded-sm transition-all duration-300 ${
                currentSlide === slides.length - 1 || isAnimating
                  ? 'text-zinc-800 cursor-not-allowed opacity-50' 
                  : 'text-zinc-500 hover:text-white cursor-pointer'
              }`}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== slides.length - 1 && !isAnimating) {
                  e.currentTarget.style.background = 'radial-gradient(circle at center, rgba(9, 229, 229, 0.25), rgba(168, 255, 87, 0.15), transparent 80%)';
                  e.currentTarget.style.border = '1px solid rgba(9, 229, 229, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSlide !== slides.length - 1 && !isAnimating) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = 'none';
                }
              }}
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}