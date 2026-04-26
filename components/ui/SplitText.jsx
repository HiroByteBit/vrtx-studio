'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplitText({ text, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, ease: 'power4.out', duration: 1 }
    );
  }, []);

  // Split by words then chars to preserve word wrapping slightly better
  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden relative pb-1">
              <span className="inline-block char relative">
                {char}
              </span>
            </span>
          ))}
          {wordIndex !== words.length - 1 && <span className="inline-block w-[0.25em]">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
