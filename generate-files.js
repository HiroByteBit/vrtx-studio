const fs = require('fs');
const path = require('path');

const files = {
  "data/projects.js": `export const projects = [
  {
    slug: 'nova-labs', title: 'Nova Labs Rebrand', category: 'Brand Identity', year: '2025',
    client: 'Nova Labs', deliverables: 'Logo, Type, Motion',
    summary: 'A complete repositioning and visual overhaul for Nova Labs, introducing a kinetic identity system.'
  },
  {
    slug: 'solstice-app', title: 'Solstice App Launch', category: 'Web Design', year: '2025',
    client: 'Solstice Health', deliverables: 'Web, Design System',
    summary: 'A sleek, performance-focused web experience and component library designed to launch Solstice Health’s new patient portal.'
  },
  {
    slug: 'dune-film', title: 'Dune Fashion Film', category: 'Motion & Film', year: '2024',
    client: 'Dune Paris', deliverables: 'Film, Campaign',
    summary: 'An evocative brand film capturing the essence of Dune Paris’s Fall collection, blending live action with surreal 3D environments.'
  },
  {
    slug: 'volt-energy', title: 'Volt Energy Brand', category: 'Campaign', year: '2024',
    client: 'Volt Energy', deliverables: 'Identity, Ads, Web',
    summary: 'High-voltage campaign and visual identity refresh targeting Gen-Z consumers with bold typography and acid-tone aesthetics.'
  },
  {
    slug: 'arc-protocol', title: 'Arc Protocol', category: 'Web Design', year: '2024',
    client: 'Arc Finance', deliverables: 'UI/UX, 3D Assets',
    summary: 'A dark-mode first Web3 platform featuring real-time data visualizations and premium 3D iconography.'
  },
  {
    slug: 'kinto-studio', title: 'Kinto Studio', category: 'Brand Identity', year: '2023',
    client: 'Kinto Architecture', deliverables: 'Brand, Print, Web',
    summary: 'Minimalist, Swiss-inspired identity system for a boutique architectural firm based in Kyoto and Berlin.'
  },
  {
    slug: 'lumina', title: 'Lumina Fest', category: 'Campaign', year: '2023',
    client: 'Lumina Arts', deliverables: 'Motion, Socials, OOH',
    summary: 'A vibrant, typography-led campaign for a digital arts festival, rolled out across city billboards and social channels.'
  },
  {
    slug: 'aether-audio', title: 'Aether Audio', category: 'Web Design', year: '2023',
    client: 'Aether', deliverables: 'E-commerce, 3D WebGL',
    summary: 'Immersive e-commerce experience featuring interactive 3D product models and seamless Lenis smooth scrolling.'
  }
];`,

  "app/globals.css": `@import "tailwindcss";

@theme {
  --color-cream: #f0ede8;
  --color-ink: #0a0a0a;
  --color-acid: #e8ff47;
  --color-muted: rgba(10, 10, 10, 0.35);
  --color-border: rgba(10, 10, 10, 0.08);
  --color-surface: #e8e4de;

  --font-sans: var(--font-inter);
  --font-display: var(--font-syne);
}

@layer base {
  body {
    @apply bg-cream text-ink font-sans;
    cursor: none;
    overflow-x: hidden;
  }
  
  a, button {
    cursor: none;
  }
  
  ::selection {
    @apply bg-acid text-ink;
  }

  /* Apply global border rules */
  .border-b-global {
    border-bottom: 1px solid var(--color-border);
  }
  .border-t-global {
    border-top: 1px solid var(--color-border);
  }
}
`,

  "app/layout.jsx": `import { Inter, Syne } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', weight: ['400', '500', '700'] });
const syne = Syne({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['700', '800'] });

export const metadata = {
  title: 'VRTX Studio',
  description: 'Creative Studio — Est. 2019',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${syne.variable}\`}>
      <body className="bg-cream text-ink antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Nav />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
`,

  "app/page.jsx": `import Hero from '@/components/sections/Hero';
import Marquee from '@/components/ui/Marquee';
import WorkGrid from '@/components/sections/WorkGrid';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WorkGrid />
      <Services />
      <Stats />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
`,

  "app/work/page.jsx": `import Link from 'next/link';
import { projects } from '@/data/projects';
import MagneticButton from '@/components/ui/MagneticButton';

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12">Our Work</h1>
      
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 border-b border-border">
        {['All', 'Brand Identity', 'Web Design', 'Motion & Film', 'Campaign'].map(filter => (
          <button key={filter} className="uppercase text-[10px] font-bold tracking-[0.1em] px-4 py-2 rounded-full border border-border hover:bg-ink hover:text-cream transition-colors whitespace-nowrap">
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => {
          const isDark = i % 2 === 0;
          return (
            <Link href={\`/work/\${project.slug}\`} key={project.slug} className={\`block group relative overflow-hidden \${isDark ? 'bg-ink text-cream' : 'bg-surface text-ink'} aspect-[4/5] p-6 flex flex-col justify-between border border-border\`} data-cursor-type="link">
              <div className="flex justify-between items-start z-10 relative">
                <span className="text-muted text-[15px]">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="text-muted text-[10px] font-bold uppercase tracking-[0.1em]">{project.category}</span>
              </div>
              
              <div className="z-10 relative mt-auto">
                <div className="bg-acid text-ink text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full inline-block mb-4">
                  {project.year}
                </div>
                <div className="flex justify-between items-end">
                  <h3 className="font-display text-4xl uppercase tracking-[-0.02em]">{project.title}</h3>
                  <span className="text-2xl transform group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-300">↗</span>
                </div>
              </div>
              
              {isDark && <div className="absolute inset-0 bg-acid opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
`,

  "app/work/[slug]/page.jsx": `import { projects } from '@/data/projects';
import Link from 'next/link';

export default async function CaseStudy({ params }) {
  const resolvedParams = await params;
  const project = projects.find(p => p.slug === resolvedParams.slug);

  if (!project) return <div className="pt-32 text-center">Project not found</div>;

  return (
    <article className="pt-32 min-h-screen">
      <div className="px-6 max-w-[1400px] mx-auto pb-16 border-b border-border">
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12">
          {project.title}
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[15px]">
          <div>
            <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Client</div>
            <div className="font-medium">{project.client}</div>
          </div>
          <div>
            <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Category</div>
            <div className="font-medium">{project.category}</div>
          </div>
          <div>
            <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Deliverables</div>
            <div className="font-medium">{project.deliverables}</div>
          </div>
          <div>
            <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Year</div>
            <div className="font-medium">{project.year}</div>
          </div>
        </div>
      </div>

      <div className="bg-surface h-[60vh] w-full" data-cursor-type="image"></div>

      <div className="px-6 max-w-[1400px] mx-auto py-24 border-b border-border grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 text-muted text-[10px] font-bold uppercase tracking-[0.1em]">Overview</div>
        <div className="md:col-span-8 text-2xl leading-[1.4]">{project.summary}</div>
      </div>

      <div className="px-6 max-w-[1400px] mx-auto py-24 border-b border-border">
        <h2 className="font-display text-4xl mb-12 uppercase tracking-[-0.02em]">Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discovery', desc: 'Understanding the core problem.' },
            { step: '02', title: 'Concept', desc: 'Iterative creative exploration.' },
            { step: '03', title: 'Refinement', desc: 'Polishing the chosen direction.' },
            { step: '04', title: 'Launch', desc: 'Final delivery and rollout.' }
          ].map(p => (
            <div key={p.step} className="border-t border-border pt-4">
              <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-4">{p.step}</div>
              <div className="font-bold mb-2">{p.title}</div>
              <div className="text-muted text-[15px]">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 max-w-[1400px] mx-auto py-24 border-b border-border">
        <h2 className="font-display text-4xl mb-12 uppercase tracking-[-0.02em]">Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-surface border border-border">
            <div className="font-display text-6xl text-acid mb-2">+340%</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.1em]">Web Traffic</div>
          </div>
          <div className="text-center p-8 bg-surface border border-border">
            <div className="font-display text-6xl text-acid mb-2">2.5x</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.1em]">Conversion Rate</div>
          </div>
          <div className="text-center p-8 bg-surface border border-border">
            <div className="font-display text-6xl text-acid mb-2">Award</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.1em]">Site of the Day</div>
          </div>
        </div>
      </div>

      <div className="py-32 text-center px-6">
        <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-4">Next Project</div>
        <Link href="/work" className="font-display text-[clamp(32px,5vw,64px)] uppercase hover:text-acid transition-colors">
          View All Work →
        </Link>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
`,

  "app/studio/page.jsx": `export default function StudioPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12 border-b border-border pb-12">The Studio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-border pb-24 mb-24">
        <div className="md:col-span-5 text-xl leading-[1.6]">
          <p className="mb-6">VRTX Studio was founded in 2019 with a simple premise: bold ideas deserve flawless execution. We operate at the intersection of design, technology, and culture.</p>
          <p className="text-muted">Our approach is deeply collaborative. We act as an extension of your team, stripping away the bloat of traditional agencies to focus purely on craft and impact.</p>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          {[
            { name: 'Elena Rostova', role: 'Creative Director' },
            { name: 'Marcus Chen', role: 'Technical Director' },
            { name: 'Sarah Jenkins', role: 'Design Lead' },
            { name: 'David Okafor', role: 'Motion Designer' }
          ].map(member => (
            <div key={member.name} className="border border-border p-4 bg-surface aspect-square flex flex-col justify-end">
              <div className="font-bold">{member.name}</div>
              <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em]">{member.role}</div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-display text-4xl uppercase mb-12 tracking-[-0.02em]">Core Values</h2>
      <div className="border-t border-border mb-24">
        {[
          { no: '01', title: 'Radical Candor', desc: 'We speak the truth, even when it is uncomfortable. Great work demands honesty.' },
          { no: '02', title: 'Relentless Craft', desc: 'The details are not the details; they make the design. We obsess over every pixel.' },
          { no: '03', title: 'Strategic Edge', desc: 'Aesthetics without strategy is just decoration. We build with purpose.' },
          { no: '04', title: 'Forward Motion', desc: 'We embrace new technologies and paradigms to keep our clients ahead of the curve.' }
        ].map(val => (
          <div key={val.no} className="border-b border-border py-8 flex flex-col md:flex-row gap-4 md:gap-12 md:items-center">
            <span className="text-muted">{val.no}</span>
            <span className="font-display text-2xl uppercase min-w-[200px]">{val.title}</span>
            <span className="text-muted">{val.desc}</span>
          </div>
        ))}
      </div>

      <h2 className="font-display text-4xl uppercase mb-12 tracking-[-0.02em]">Selected Clients</h2>
      <div className="flex flex-wrap gap-x-12 gap-y-6 text-xl font-medium uppercase text-muted">
        {['Nova Labs', 'Solstice', 'Dune Paris', 'Volt Energy', 'Arc Finance', 'Kinto', 'Lumina Arts', 'Aether'].map(client => (
          <span key={client} className="hover:text-ink transition-colors">{client}</span>
        ))}
      </div>
    </div>
  );
}
`,

  "app/journal/page.jsx": `export default function JournalPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12 border-b border-border pb-12">Journal</h1>
      
      <div className="space-y-0">
        {[
          { date: 'Oct 12, 2025', title: 'The Future of Web Typography', tag: 'Design' },
          { date: 'Sep 28, 2025', title: 'Why Motion is the New Brand Guideline', tag: 'Motion' },
          { date: 'Aug 14, 2025', title: 'Case Study: Repositioning Nova Labs', tag: 'Strategy' },
          { date: 'Jul 02, 2025', title: 'Performance vs Aesthetics in Next.js', tag: 'Engineering' }
        ].map((post, i) => (
          <div key={i} className="border-b border-border py-8 flex flex-col md:flex-row gap-4 justify-between md:items-center group cursor-pointer" data-cursor-type="link">
            <div className="flex gap-8 items-center">
              <span className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] min-w-[100px]">{post.date}</span>
              <span className="font-display text-2xl uppercase group-hover:text-acid transition-colors">{post.title}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="px-3 py-1 border border-border rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-muted">{post.tag}</span>
              <span className="text-xl transform group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,

  "app/contact/page.jsx": `'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState('idle');

  const onSubmit = (data) => {
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12">Let's Talk</h1>
          <p className="text-xl leading-[1.6] mb-12 max-w-md">
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within 24 hours.
          </p>
          
          <div className="space-y-8 text-lg font-medium">
            <div>
              <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Email</div>
              <a href="mailto:hello@vrtx.studio" className="hover:text-acid transition-colors">hello@vrtx.studio</a>
            </div>
            <div>
              <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Studio</div>
              <div>142 Creative Block,<br/>London, UK</div>
            </div>
            <div>
              <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Socials</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-acid transition-colors">Instagram</a>
                <a href="#" className="hover:text-acid transition-colors">Twitter</a>
                <a href="#" className="hover:text-acid transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 md:p-12 border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Name</label>
                <input {...register("name", { required: true })} className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-ink transition-colors" placeholder="John Doe" />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">Required</span>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Company</label>
                <input {...register("company")} className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-ink transition-colors" placeholder="Acme Corp" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Email</label>
              <input type="email" {...register("email", { required: true })} className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-ink transition-colors" placeholder="john@example.com" />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">Required</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Budget Range</label>
              <select {...register("budget")} className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-ink transition-colors appearance-none">
                <option value="10k-25k">$10k - $25k</option>
                <option value="25k-50k">$25k - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k+">$100k+</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Tell us about your project</label>
              <textarea {...register("message", { required: true })} rows={4} className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-ink transition-colors resize-none" placeholder="Goals, timeline, etc..."></textarea>
              {errors.message && <span className="text-red-500 text-xs mt-1 block">Required</span>}
            </div>

            <button type="submit" disabled={status !== 'idle'} className="w-full bg-ink text-cream py-4 uppercase font-bold text-[10px] tracking-[0.1em] hover:bg-acid hover:text-ink transition-colors disabled:opacity-50" data-cursor-type="cta">
              {status === 'idle' ? 'Send Message →' : status === 'sending' ? 'Sending...' : 'Sent ✓'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
`,

  "components/layout/Nav.jsx": `'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={\`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b \${scrolled ? 'bg-cream/80 backdrop-blur-md border-border' : 'bg-transparent border-transparent'}\`}>
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl italic uppercase tracking-tighter" data-cursor-type="link">
            VRTX
          </Link>

          <nav className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-[0.1em]">
            {['Work', 'Studio', 'Journal', 'Contact'].map(item => (
              <Link key={item} href={\`/\${item.toLowerCase()}\`} className="hover:text-acid transition-colors" data-cursor-type="link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton>
              <Link href="/contact" className="px-6 py-3 bg-ink text-cream text-[10px] font-bold uppercase tracking-[0.1em] rounded-full hover:bg-acid hover:text-ink transition-colors" data-cursor-type="link">
                Let's Talk →
              </Link>
            </MagneticButton>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={\`fixed inset-0 bg-ink z-[100] text-cream transition-transform duration-500 \${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}\`}>
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <Link href="/" className="font-display text-2xl italic uppercase tracking-tighter" onClick={() => setMobileMenuOpen(false)}>VRTX</Link>
          <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
        </div>
        <div className="p-6 flex flex-col h-[calc(100vh-80px)] justify-center gap-8">
          {['Work', 'Studio', 'Journal', 'Contact'].map(item => (
            <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-display text-5xl uppercase hover:text-acid transition-colors" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 text-[10px] font-bold uppercase tracking-[0.1em]">
            <a href="#">IG</a>
            <a href="#">X</a>
            <a href="#">IN</a>
          </div>
        </div>
      </div>
    </>
  );
}
`,

  "components/layout/Footer.jsx": `'use client';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border pt-16 pb-8 px-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <Link href="/" className="font-display text-6xl italic uppercase tracking-tighter hover:text-acid transition-colors" data-cursor-type="link">
          VRTX
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-2">
            <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Navigation</div>
            {['Work', 'Studio', 'Journal', 'Contact'].map(item => (
              <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-medium hover:text-acid transition-colors" data-cursor-type="link">
                {item}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Social</div>
            {['Instagram', 'Twitter', 'LinkedIn'].map(item => (
              <a key={item} href="#" className="font-medium hover:text-acid transition-colors" data-cursor-type="link">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-border pt-8 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
        <div>© 2026 VRTX Studio · Privacy</div>
        <div>Crafted in-house</div>
        <button onClick={scrollToTop} className="hover:text-ink transition-colors mt-4 md:mt-0" data-cursor-type="link">
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
`,

  "components/layout/SmoothScroll.jsx": `'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
`,

  "components/ui/CustomCursor.jsx": `'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [state, setState] = useState('default');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion)').matches) return;
    
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xToDot(mouseX);
      yToDot(mouseY);
      xToRing(mouseX);
      yToRing(mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleHover = () => {
       document.querySelectorAll('a, button, [data-cursor-type]').forEach(el => {
          const type = el.dataset.cursorType || 'link';
          el.addEventListener('mouseenter', () => setState(type));
          el.addEventListener('mouseleave', () => setState('default'));
       });
       document.querySelectorAll('img').forEach(el => {
          if(!el.dataset.cursorType) {
            el.addEventListener('mouseenter', () => setState('image'));
            el.addEventListener('mouseleave', () => setState('default'));
          }
       });
    };
    
    handleHover();
    const timeout = setTimeout(handleHover, 500); // re-bind after nav

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timeout);
    };
  }, [pathname]);
  
  useEffect(() => {
     if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion)').matches) return;
     const ring = ringRef.current;
     const text = textRef.current;
     
     if (state === 'default') {
        gsap.to(ring, { width: 40, height: 40, backgroundColor: 'transparent', borderColor: 'var(--color-ink)', duration: 0.3 });
        gsap.to(text, { opacity: 0, duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
     } else if (state === 'link') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'var(--color-ink)', borderColor: 'var(--color-ink)', duration: 0.3 });
        gsap.to(text, { opacity: 1, text: 'VIEW →', color: 'var(--color-cream)', duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
     } else if (state === 'image') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-surface)', duration: 0.3 });
        gsap.to(text, { opacity: 1, text: 'DRAG', color: 'var(--color-ink)', duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
     } else if (state === 'cta') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'var(--color-acid)', borderColor: 'var(--color-acid)', duration: 0.3 });
        gsap.to(text, { opacity: 0, duration: 0.2 });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
     }
  }, [state]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block">
      <div ref={ringRef} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink flex items-center justify-center overflow-hidden" style={{ width: 40, height: 40 }}>
         <span ref={textRef} className="text-[10px] font-bold opacity-0 whitespace-nowrap absolute"></span>
      </div>
      <div ref={dotRef} className="absolute w-2 h-2 bg-ink rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
`,

  "components/ui/MagneticButton.jsx": `'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children }) {
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const element = wrapperRef.current;
    if (!element) return;
    
    const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="inline-block relative">
      {children}
    </div>
  );
}
`,

  "components/ui/Marquee.jsx": `'use client';
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
`,

  "components/ui/SplitText.jsx": `'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplitText({ text, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, ease: 'power4.out', duration: 1 }
    );
  }, []);

  // Split by words then chars to preserve word wrapping slightly better
  const words = text.split(' ');

  return (
    <span ref={containerRef} className={\`inline-block \${className}\`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden relative pb-1">
              <span className="inline-block char relative">
                {char}
              </span>
            </span>
          ))}
          {wordIndex !== words.length - 1 && <span className="inline-block w-[0.25em]">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
`,

  "components/sections/Hero.jsx": `'use client';
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
`,

  "components/sections/WorkGrid.jsx": `'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
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

  const featured = projects.slice(0, 4);

  return (
    <section className="py-[clamp(64px,8vw,120px)] px-6 max-w-[1400px] mx-auto border-b border-border">
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {featured.map((project, i) => {
          const isDark = i % 2 === 0;
          return (
            <Link href={\`/work/\${project.slug}\`} key={project.slug} className={\`work-card block group relative overflow-hidden \${isDark ? 'bg-ink text-cream' : 'bg-surface text-ink'} aspect-square md:aspect-[4/5] p-6 md:p-8 flex flex-col justify-between border border-border transition-transform duration-500 hover:scale-[1.02]\`} data-cursor-type="link">
              {/* Noise filter SVG inline for background texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
                  <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
                </svg>
              </div>

              <div className="flex justify-between items-start z-10 relative">
                <span className="text-muted text-[15px]">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="text-muted text-[10px] font-bold uppercase tracking-[0.1em]">{project.category}</span>
              </div>
              
              <div className="z-10 relative mt-auto">
                <div className="bg-acid text-ink text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full inline-block mb-4">
                  {project.year}
                </div>
                <div className="flex justify-between items-end">
                  <h3 className="font-display text-4xl md:text-5xl uppercase tracking-[-0.02em] leading-tight max-w-[80%]">{project.title}</h3>
                  <span className="text-3xl transform group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-45 transition-transform duration-300">→</span>
                </div>
              </div>
              
              {isDark && <div className="absolute inset-0 bg-acid opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>}
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
`,

  "components/sections/Services.jsx": `'use client';
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
        <span className={\`text-3xl transform transition-transform duration-400 \${isOpen ? 'rotate-45' : 'rotate-0'}\`}>→</span>
      </div>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="px-6 pb-8 md:pl-[120px] max-w-3xl text-xl leading-[1.6] text-muted">
          {service.desc}
        </div>
      </div>
    </div>
  );
}
`,

  "components/sections/Stats.jsx": `'use client';
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
`,

  "components/sections/Process.jsx": `'use client';
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
          <div key={i} className={\`process-step flex flex-col md:flex-row gap-6 md:gap-16 \${i % 2 !== 0 ? 'md:flex-row-reverse text-right' : ''}\`}>
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
`,

  "components/sections/Testimonials.jsx": `export default function Testimonials() {
  const quotes = [
    { text: "VRTX didn't just redesign our site, they completely elevated our brand narrative. Absolute pros.", author: "Jane Smith", company: "Nova Labs", role: "CMO" },
    { text: "Their approach to motion and web GL is unmatched. They brought our products to life.", author: "Mike Johnson", company: "Aether", role: "Founder" },
    { text: "A rare combination of strategic thinking and flawless aesthetic execution.", author: "Sarah Lee", company: "Solstice", role: "Director of Product" },
    { text: "We treat them as an extension of our internal team. The communication is brilliant.", author: "Tom Hardy", company: "Volt Energy", role: "Head of Marketing" }
  ];

  return (
    <section className="py-[clamp(64px,8vw,120px)] border-b border-border bg-surface overflow-hidden">
      <div className="px-6 max-w-[1400px] mx-auto mb-12">
        <h2 className="font-display text-[clamp(32px,5vw,56px)] uppercase tracking-[-0.02em]">Client Words</h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {quotes.map((q, i) => (
          <div key={i} className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[40vw] snap-center shrink-0 border border-border bg-cream p-12 mr-8 flex flex-col justify-between">
            <div>
              <div className="text-acid text-8xl font-display leading-none mb-6">"</div>
              <p className="font-display text-2xl md:text-4xl leading-tight uppercase tracking-[-0.02em] mb-12">{q.text}</p>
            </div>
            <div>
              <div className="font-bold uppercase text-[15px]">{q.author}</div>
              <div className="text-muted text-[10px] font-bold uppercase tracking-[0.1em]">{q.role}, {q.company}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted">Scroll to read more →</div>
      </div>
      <style dangerouslySetInnerHTML={{__html: \`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      \`}} />
    </section>
  );
}
`,

  "components/sections/CTA.jsx": `'use client';
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
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
}
console.log("Files generated successfully!");
