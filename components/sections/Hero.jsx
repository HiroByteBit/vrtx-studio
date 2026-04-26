'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '@/components/ui/SplitText';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const descRef = useRef(null);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
       gsap.set(descRef.current, { opacity: 1 });
       return;
    }
    gsap.fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-end pb-[clamp(64px,8vw,120px)] pt-32 px-6 max-w-[1400px] mx-auto w-full border-b border-border">
      <div className="mb-4 block text-muted text-[10px] font-bold uppercase tracking-[0.1em]">
        Creative Studio — Est. 2019
      </div>
      <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase m-0 flex flex-col items-start gap-2 mb-12">
        <SplitText text="We build" />
        <SplitText text="brands that" />
        <span className="bg-acid text-ink px-6 py-2 rounded-full inline-block flex-shrink-0 align-middle">
          <SplitText text="matter." />
        </span>
      </h1>

      <div ref={descRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full mt-auto opacity-0 border-t border-border pt-8">
        <p className="text-[15px] leading-[1.7] text-muted max-w-sm">
          We are VRTX Studio. A boutique creative agency specializing in brand identity, web experiences, and motion design.
        </p>
        <div className="flex md:justify-end">
          <MagneticButton>
            <Link href="/work" className="inline-flex items-center gap-4 font-bold uppercase text-[10px] tracking-[0.1em] border border-border px-8 py-4 rounded-full hover:bg-ink hover:text-cream transition-colors group" data-cursor-type="link">
              View our Work <span className="text-lg leading-none transform group-hover:rotate-45 transition-transform duration-300">↗</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
      
      <div className="absolute bottom-12 right-6 flex flex-col items-center gap-2 text-muted animate-bounce">
         <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Scroll</span>
         <ArrowDown size={16} />
      </div>
    </section>
  );
}
