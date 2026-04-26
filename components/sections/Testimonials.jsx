export default function Testimonials() {
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
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}
