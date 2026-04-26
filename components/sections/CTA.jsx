'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import SplitText from '@/components/ui/SplitText';

export default function CTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, stagger: 0.02, ease: 'power3.out', duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    );
  }, []);

  return (
    <section className="bg-ink text-cream py-[clamp(100px,15vw,200px)] px-6 text-center" ref={containerRef}>
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-display text-[clamp(40px,6vw,80px)] uppercase tracking-[-0.02em] leading-[1] mb-12">
          <SplitText text="Ready to build something great?" />
        </h2>
        
        <Link href="/contact" className="inline-block font-display text-[clamp(32px,5vw,64px)] text-acid uppercase tracking-[-0.02em] hover:text-white transition-colors mb-8" data-cursor-type="cta">
          Let's start a project →
        </Link>
        
        <div className="mt-12 text-[15px] font-medium text-white/50">
          Or email directly: <a href="mailto:hello@vrtx.studio" className="text-white hover:text-acid transition-colors">hello@vrtx.studio</a>
        </div>
      </div>
    </section>
  );
}
