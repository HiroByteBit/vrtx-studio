'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { projects } from '@/data/projects';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Brand Identity', 'Web Design', 'Motion & Film', 'Campaign'];
  const gridRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  // Handle smooth grid transitions
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.grid-item');
    if (!cards) return;

    // Fade out everything first or animate positions?
    // Let's do a quick stagger reveal for the new set
    gsap.fromTo(cards, 
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
    );
  }, [activeFilter]);

  const handleMouseMove = (e, el) => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(el, {
      rotationY: x * 8,
      rotationX: -y * 8,
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

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12">Our Work</h1>
      
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 border-b border-border hide-scrollbar">
        {filters.map(filter => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            className={`uppercase text-[10px] font-bold tracking-[0.1em] px-6 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
              activeFilter === filter 
                ? 'bg-ink text-cream border-ink' 
                : 'border-border hover:bg-ink hover:text-cream'
            }`}
            data-cursor-type="link"
          >
            {filter}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, i) => (
          <div 
            key={`${activeFilter}-${project.slug}`}
            className="grid-item"
          >
            <Link 
              href={`/work/${project.slug}`} 
              className="block group relative overflow-hidden bg-ink text-cream aspect-[4/5] p-6 flex flex-col justify-between border border-border" 
              data-cursor-type="link"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 z-0">
                 <Image 
                   src={project.image} 
                   alt={project.title} 
                   fill 
                   className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent mix-blend-multiply" />
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
                  <h3 className="font-display text-4xl uppercase tracking-[-0.02em] leading-none text-white group-hover:text-acid transition-colors">{project.title}</h3>
                  <span className="text-2xl text-white transform group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-45 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
