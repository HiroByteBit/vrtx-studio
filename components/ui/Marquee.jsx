'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Marquee() {
  const text = "Brand Identity ✦ Web Experience ✦ Motion Design ✦ Campaign Strategy ✦ Art Direction ✦ UI Design ✦ ";
  const wrapper1 = useRef(null);
  const wrapper2 = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    
    const tween1 = gsap.to(wrapper1.current, {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1
    });

    const tween2 = gsap.to(wrapper2.current, {
      xPercent: 50,
      ease: "none",
      duration: 15,
      repeat: -1
    });

    // Pause on hover is handled via CSS or we can do it via JS
    const wrap = document.querySelector('.marquee-container');
    wrap.addEventListener('mouseenter', () => { tween1.pause(); tween2.pause(); });
    wrap.addEventListener('mouseleave', () => { tween1.play(); tween2.play(); });

    return () => {
      tween1.kill();
      tween2.kill();
    }
  }, []);

  const formatText = (str) => {
    return str.split('✦').map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 && <span className="text-acid mx-4">✦</span>}
      </span>
    ));
  };

  return (
    <div className="marquee-container bg-ink text-cream py-8 overflow-hidden border-y border-border relative flex flex-col gap-4">
      <div className="whitespace-nowrap flex w-fit" ref={wrapper1}>
        <div className="font-display text-4xl uppercase tracking-wider pr-8">{formatText(text)}</div>
        <div className="font-display text-4xl uppercase tracking-wider pr-8">{formatText(text)}</div>
      </div>
      <div className="whitespace-nowrap flex w-fit -translate-x-1/2" ref={wrapper2}>
        <div className="font-display text-4xl uppercase tracking-wider pr-8">{formatText(text)}</div>
        <div className="font-display text-4xl uppercase tracking-wider pr-8">{formatText(text)}</div>
      </div>
    </div>
  );
}
