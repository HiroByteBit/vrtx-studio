'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children }) {
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const element = wrapperRef.current;
    if (!element) return;
    
    const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="inline-block relative">
      {children}
    </div>
  );
}
