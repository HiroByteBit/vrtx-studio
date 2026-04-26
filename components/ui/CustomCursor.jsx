'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [state, setState] = useState('default');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion)').matches) return;
    
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xToDot(mouseX);
      yToDot(mouseY);
      xToRing(mouseX);
      yToRing(mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleHover = () => {
       document.querySelectorAll('a, button, [data-cursor-type]').forEach(el => {
          const type = el.dataset.cursorType || 'link';
          el.addEventListener('mouseenter', () => setState(type));
          el.addEventListener('mouseleave', () => setState('default'));
       });
       document.querySelectorAll('img').forEach(el => {
          if(!el.dataset.cursorType) {
            el.addEventListener('mouseenter', () => setState('image'));
            el.addEventListener('mouseleave', () => setState('default'));
          }
       });
    };
    
    handleHover();
    const timeout = setTimeout(handleHover, 500); // re-bind after nav

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timeout);
    };
  }, [pathname]);
  
  useEffect(() => {
     if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion)').matches) return;
     const ring = ringRef.current;
     const text = textRef.current;
     
     if (state === 'default') {
        gsap.to(ring, { width: 40, height: 40, backgroundColor: 'transparent', borderColor: 'var(--color-ink)', duration: 0.3 });
        gsap.to(text, { opacity: 0, duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
     } else if (state === 'link') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'var(--color-ink)', borderColor: 'var(--color-ink)', duration: 0.3 });
        gsap.to(text, { opacity: 1, text: 'VIEW →', color: 'var(--color-cream)', duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
     } else if (state === 'image') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-surface)', duration: 0.3 });
        gsap.to(text, { opacity: 1, text: 'DRAG', color: 'var(--color-ink)', duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
     } else if (state === 'cta') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'var(--color-acid)', borderColor: 'var(--color-acid)', duration: 0.3 });
        gsap.to(text, { opacity: 0, duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
     }
  }, [state]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block">
      <div ref={ringRef} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink flex items-center justify-center overflow-hidden" style={{ width: 40, height: 40 }}>
         <span ref={textRef} className="text-[10px] font-bold opacity-0 whitespace-nowrap absolute"></span>
      </div>
      <div ref={dotRef} className="absolute w-2 h-2 bg-ink rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
