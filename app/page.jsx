import Hero from '@/components/sections/Hero';
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
