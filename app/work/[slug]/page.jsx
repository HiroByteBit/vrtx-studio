import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';

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

      <div className="bg-surface h-[60vh] w-full relative" data-cursor-type="image">
        <Image 
           src={project.image} 
           alt={project.title} 
           fill 
           className="object-cover"
           priority
           sizes="100vw"
        />
      </div>

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
