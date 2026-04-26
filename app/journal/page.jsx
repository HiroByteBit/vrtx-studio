export default function JournalPage() {
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
