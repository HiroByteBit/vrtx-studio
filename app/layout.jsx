import { Inter, Syne } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import VerticalScrollIndicator from '@/components/ui/VerticalScrollIndicator';
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
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <SmoothScroll>
          <VerticalScrollIndicator />
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
