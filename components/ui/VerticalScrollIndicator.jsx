'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function VerticalScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height);
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 z-[45] mix-blend-difference hidden lg:flex">
      <div className="h-12 flex items-center justify-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream/50 -rotate-90 whitespace-nowrap">
          Scroll
        </span>
      </div>
      <div className="w-[1px] h-32 bg-cream/20 relative">
        <div 
          className="absolute top-0 left-0 w-full bg-acid transition-all duration-100 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/50">
        {Math.round(progress * 100).toString().padStart(2, '0')}
      </span>
    </div>
  );
}
