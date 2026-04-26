'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        duration: 0.8,
        ease: 'power4.inOut'
      });
      gsap.fromTo(menuLinksRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.4, ease: 'power4.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power4.inOut'
      });
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Studio', href: '/studio' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <div ref={progressRef} className="fixed top-0 left-0 w-full h-[2px] bg-acid z-[100] origin-left scale-x-0" />
      
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-4 bg-cream/90 backdrop-blur-xl border-b border-border' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2" data-cursor-type="link">
            <span className="font-display text-3xl italic font-black uppercase tracking-tighter transition-transform duration-500 group-hover:skew-x-12">
              VRTX
            </span>
          </Link>

          {/* New Horizontal Navigation Layout */}
          <nav className="hidden md:flex items-center gap-16">
            <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.25em]">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="relative group py-2"
                  data-cursor-type="link"
                >
                  <span className="block transition-all duration-300 group-hover:text-acid">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-acid transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-border mx-2" />

            <div className="flex items-center gap-6">
               <div className="flex gap-4 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
                  <a href="#" className="hover:text-acid transition-colors">IG</a>
                  <a href="#" className="hover:text-acid transition-colors">TW</a>
                  <a href="#" className="hover:text-acid transition-colors">LI</a>
               </div>
               
               <MagneticButton>
                 <Link 
                   href="/contact" 
                   className="px-6 py-2.5 bg-ink text-cream text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-acid hover:text-ink transition-all duration-500"
                   data-cursor-type="cta"
                 >
                   Talk ↗
                 </Link>
               </MagneticButton>
            </div>
          </nav>

          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 group" 
            onClick={() => setMobileMenuOpen(true)}
            data-cursor-type="link"
          >
            <div className="w-6 h-[2.5px] bg-ink group-hover:bg-acid transition-colors" />
            <div className="w-6 h-[2.5px] bg-ink group-hover:bg-acid transition-colors" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-ink z-[100] -translate-y-full flex flex-col"
      >
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <Link href="/" className="font-display text-3xl italic font-black text-cream uppercase tracking-tighter" onClick={() => setMobileMenuOpen(false)}>
            VRTX
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-cream hover:bg-white hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 gap-6">
          <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Navigation</div>
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href} 
              ref={el => menuLinksRef.current[i] = el}
              className="font-display text-6xl sm:text-8xl uppercase text-cream hover:text-acid transition-colors leading-[0.9]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="p-8 border-t border-white/5 flex justify-between items-end text-cream">
          <div className="flex gap-12">
            <div>
              <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Social</div>
              <div className="flex gap-6 font-medium">
                <a href="#" className="hover:text-acid transition-colors">Instagram</a>
                <a href="#" className="hover:text-acid transition-colors">Twitter</a>
                <a href="#" className="hover:text-acid transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Based in</div>
            <div className="font-medium">London, UK</div>
          </div>
        </div>
      </div>
    </>
  );
}
