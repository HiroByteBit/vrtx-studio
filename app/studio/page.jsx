import Image from 'next/image';

export default function StudioPage() {
  const team = [
    { name: 'Elena Rostova', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop' },
    { name: 'Marcus Chen', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Sarah Jenkins', role: 'Design Lead', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
    { name: 'David Okafor', role: 'Motion Designer', img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase mb-12 border-b border-border pb-12">The Studio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-border pb-24 mb-24">
        <div className="md:col-span-5 text-xl leading-[1.6]">
          <p className="mb-6">VRTX Studio was founded in 2019 with a simple premise: bold ideas deserve flawless execution. We operate at the intersection of design, technology, and culture.</p>
          <p className="text-muted">Our approach is deeply collaborative. We act as an extension of your team, stripping away the bloat of traditional agencies to focus purely on craft and impact.</p>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          {team.map(member => (
            <div key={member.name} className="border border-border bg-surface aspect-square flex flex-col justify-end relative overflow-hidden group">
              <Image 
                 src={member.img} 
                 alt={member.name} 
                 fill 
                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                 sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent mix-blend-multiply opacity-80" />
              <div className="relative z-10 p-4 text-white">
                <div className="font-bold">{member.name}</div>
                <div className="text-white/70 text-[10px] font-bold uppercase tracking-[0.1em]">{member.role}</div>
              </div>
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
