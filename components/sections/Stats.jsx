'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Stats() {
  const sectionRef = useRef(null);
  const numsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    
    numsRef.current.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      gsap.fromTo(el, 
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-border w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {[
          { label: 'Projects', val: '120', suffix: '+' },
          { label: 'Client Retention', val: '94', suffix: '%' },
          { label: 'Years in Business', val: '6', suffix: '' }
        ].map((stat, i) => (
          <div key={i} className="py-16 px-6 text-center">
            <div className="font-display text-[clamp(48px,8vw,80px)] text-ink mb-2">
              <span ref={el => numsRef.current[i] = el} data-target={stat.val}>{stat.val}</span>
              <span className="text-acid">{stat.suffix}</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
