'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Process() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const steps = containerRef.current.querySelectorAll('.process-step');
    steps.forEach((step) => {
      gsap.fromTo(step,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 85%' }
        }
      );
    });
  }, []);

  return (
    <section className="py-[clamp(64px,8vw,120px)] px-6 max-w-[1400px] mx-auto border-b border-border">
      <h2 className="font-display text-[clamp(32px,5vw,56px)] uppercase tracking-[-0.02em] mb-16">How we work</h2>
      
      <div ref={containerRef} className="flex flex-col gap-12">
        {[
          { no: '01', title: 'Discover', desc: 'Deep dive into your brand, audience, and operational goals. We listen first.' },
          { no: '02', title: 'Define', desc: 'Strategy, positioning, and a solid creative brief. The blueprint for design.' },
          { no: '03', title: 'Design', desc: 'Iterative concepts, rapid prototyping, and close client collaboration.' },
          { no: '04', title: 'Deliver', desc: 'Handoff, launch support, and measurement of impact. Flawless execution.' }
        ].map((step, i) => (
          <div key={i} className={`process-step flex flex-col md:flex-row gap-6 md:gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse text-right' : ''}`}>
            <div className="text-acid font-display text-6xl md:text-8xl w-32">{step.no}</div>
            <div className="flex-1">
              <h3 className="font-display text-3xl md:text-5xl uppercase mb-4">{step.title}</h3>
              <p className="text-xl text-muted leading-[1.6] max-w-lg inline-block text-left">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
