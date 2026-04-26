'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const servicesList = [
  { no: '01', title: 'Brand Identity', desc: 'Logos, type, color, motion guidelines. We build cohesive identity systems that work across all touchpoints.' },
  { no: '02', title: 'Web Experience', desc: 'Design systems, interactions, dev-ready components. High-performance Next.js and WebGL implementations.' },
  { no: '03', title: 'Motion & Film', desc: 'UI animation, brand films, reels. Bringing static concepts to life with kinetic energy.' },
  { no: '04', title: 'Strategy', desc: 'Positioning, naming, messaging frameworks. Creating the foundational logic before applying aesthetics.' }
];

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (i) => setExpanded(expanded === i ? null : i);

  return (
    <section className="py-[clamp(64px,8vw,120px)] max-w-[1400px] mx-auto border-b border-border">
      <div className="px-6 mb-12">
        <h2 className="font-display text-[clamp(32px,5vw,56px)] uppercase tracking-[-0.02em]">Expertise</h2>
      </div>
      <div className="border-t border-border">
        {servicesList.map((svc, i) => (
          <ServiceRow 
            key={i} 
            service={svc} 
            isOpen={expanded === i} 
            onClick={() => toggle(i)} 
          />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({ service, isOpen, onClick }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
       gsap.set(contentRef.current, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 });
       return;
    }
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.out' });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-border group cursor-pointer" onClick={onClick} data-cursor-type="link">
      <div className="px-6 py-8 flex items-center gap-6 md:gap-12 hover:bg-surface/50 transition-colors">
        <span className="text-muted text-[15px]">{service.no}</span>
        <h3 className="font-display text-3xl md:text-5xl uppercase tracking-[-0.02em] flex-1">{service.title}</h3>
        <span className={`text-3xl transform transition-transform duration-400 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>→</span>
      </div>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="px-6 pb-8 md:pl-[120px] max-w-3xl text-xl leading-[1.6] text-muted">
          {service.desc}
        </div>
      </div>
    </div>
  );
}
