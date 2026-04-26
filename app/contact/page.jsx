'use client';
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
