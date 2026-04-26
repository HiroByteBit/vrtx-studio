'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      
      gsap.to(progressBarRef.current, {
        width: `${scrolled}%`,
        duration: 0.2,
        ease: 'none'
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none bg-border">
      <div 
        ref={progressBarRef}
        className="h-full bg-acid"
        style={{ width: '0%' }}
      />
    </div>
  );
}
