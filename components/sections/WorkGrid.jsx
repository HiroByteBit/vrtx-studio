'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function WorkGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    
    const cards = containerRef.current.querySelectorAll('.work-card');
    gsap.fromTo(cards, 
      { y: 80, opacity: 0 },
      { 
        y: 0, opacity: 1, stagger: 0.15, ease: 'power3.out', duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const handleMouseMove = (e, el) => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(el, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1000,
      ease: "power3.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = (el) => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    gsap.to(el, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 0.5
    });
  };

  const featured = projects.slice(0, 4);

  return (
    <section className="py-[clamp(64px,8vw,120px)] px-6 max-w-[1400px] mx-auto border-b border-border">
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" style={{ perspective: '1000px' }}>
        {featured.map((project, i) => {
          return (
            <Link 
              href={`/work/${project.slug}`} 
              key={project.slug} 
              className="work-card block group relative overflow-hidden bg-ink text-cream aspect-square md:aspect-[4/5] p-6 md:p-8 flex flex-col justify-between border border-border" 
              data-cursor-type="link"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                 <Image 
                   src={project.image} 
                   alt={project.title} 
                   fill 
                   className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent mix-blend-multiply" />
              </div>

              {/* Noise filter SVG inline for background texture */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-0">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
                  <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
                </svg>
              </div>

              <div className="flex justify-between items-start z-10 relative" style={{ transform: 'translateZ(30px)' }}>
                <span className="text-white/70 text-[15px]">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.1em]">{project.category}</span>
              </div>
              
              <div className="z-10 relative mt-auto" style={{ transform: 'translateZ(50px)' }}>
                <div className="bg-acid text-ink text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full inline-block mb-4">
                  {project.year}
                </div>
                <div className="flex justify-between items-end">
                  <h3 className="font-display text-4xl md:text-5xl uppercase tracking-[-0.02em] leading-tight max-w-[80%] text-white group-hover:text-acid transition-colors">{project.title}</h3>
                  <span className="text-3xl text-white transform group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-45 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border pt-8 text-center">
        <Link href="/work" className="inline-flex items-center gap-2 font-display text-2xl uppercase hover:text-acid transition-colors" data-cursor-type="link">
          View All Work (12) →
        </Link>
      </div>
    </section>
  );
}