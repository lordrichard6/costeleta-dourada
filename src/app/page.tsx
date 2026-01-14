import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BookingWidget from '@/components/BookingWidget';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <MenuSection />
      <BookingWidget />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
