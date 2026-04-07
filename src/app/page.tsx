import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import AboutTeaser from '@/components/AboutTeaser';
import MenuPreview from '@/components/MenuPreview';
import WineCTA from '@/components/WineCTA';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingCTA from '@/components/BookingCTA';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <AboutTeaser />
        <MenuPreview />
        <WineCTA />
        <TestimonialsSection />
        <BookingCTA />
        <Footer />
        <CookieConsent />
      </main>
    </>
  );
}
