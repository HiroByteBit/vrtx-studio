'use client';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'Instagram', href: '#' },
    { name: 'Twitter / X', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Dribbble', href: '#' },
    { name: 'Awwwards', href: '#' }
  ];

  return (
    <footer className="bg-ink text-cream py-24 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Large Logo Header */}
        <div className="mb-24 relative">
          <h2 className="font-display text-[clamp(64px,20vw,320px)] italic font-black uppercase tracking-tighter leading-[0.75] opacity-10 select-none">
            VRTX
          </h2>
          <div className="absolute inset-0 flex flex-col justify-center items-start lg:items-end">
             <div className="max-w-md lg:text-right">
                <p className="text-xl md:text-2xl text-white font-display uppercase tracking-tight mb-8 leading-tight">
                  Ready to amplify your brand presence?
                </p>
                <MagneticButton>
                  <Link href="/contact" className="inline-flex items-center gap-4 bg-acid text-ink px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors duration-500">
                    Start a project ↗
                  </Link>
                </MagneticButton>
             </div>
          </div>
        </div>

        {/* Links Grid - Aesthetic Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-white/10 pt-16 mb-24">
          <div className="space-y-8">
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em]">Navigation</div>
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {['Work', 'Studio', 'Journal', 'Contact'].map(item => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="text-lg font-medium hover:text-acid transition-all duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-acid transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em]">Connect</div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {socials.map(social => (
                <a key={social.name} href={social.href} className="text-lg font-medium hover:text-acid transition-all duration-300 relative group">
                  {social.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-acid transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em]">Studio</div>
            <address className="not-italic text-lg text-white/50 leading-relaxed font-medium">
              142 Creative Block,<br/>
              Hackney, London, E8 3NS
            </address>
          </div>

          <div className="flex flex-col justify-end items-start lg:items-end">
             <button onClick={scrollToTop} className="group relative w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-acid transition-colors duration-500" data-cursor-type="link">
                <span className="text-2xl group-hover:-translate-y-1 transition-transform duration-500">↑</span>
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" className="opacity-10" />
                </svg>
             </button>
          </div>
        </div>

        {/* Final Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <div className="flex items-center gap-8">
            <span>© 2026 VRTX Studio</span>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-acid rounded-full" />
              <span className="text-white/40">Status: All Systems Active</span>
            </div>
          </div>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
