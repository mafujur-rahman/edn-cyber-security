"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WordRevealText = ({ 
  text, 
  className = "", 
  tag: Tag = "h2",
  staggerAmount = 0.03,
  delay = 0,
  duration = 0.3,
  start = "top 85%",
  once = true,
  ease = "back.out(0.7)"
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const characters = textRef.current.querySelectorAll('.char');
    
    const tl = gsap.fromTo(characters,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: duration,
        stagger: staggerAmount,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: textRef.current,
          start: start,
          toggleActions: once ? "play none none none" : "play none none reset",
        }
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text, staggerAmount, delay, duration, start, once, ease]);

  // Split text into individual characters, preserving spaces
  const renderCharacters = () => {
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        chars.push(<span key={i} className="char" style={{ display: "inline-block", width: "0.25em" }}>&nbsp;</span>);
      } else {
        chars.push(
          <span key={i} className="char inline-block" style={{ opacity: 0 }}>
            {char}
          </span>
        );
      }
    }
    return chars;
  };

  return React.createElement(
    Tag,
    { ref: textRef, className },
    renderCharacters()
  );
};

export default WordRevealText;