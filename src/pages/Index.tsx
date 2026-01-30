import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ClientsSection } from '@/components/home/ClientsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { useSEO } from '@/hooks/use-seo';

const Index = () => {
  useSEO({
    title: 'Home | Connect Sierra Leone - Digital Solutions & IT Services',
    description: 'Connect Sierra Leone is your trusted digital transformation partner. We deliver innovative web development, mobile apps, and IT solutions to help businesses thrive in the digital age.',
    keywords: 'Connect Sierra Leone, digital solutions, web development, mobile apps, IT services, technology company',
    canonical: 'https://connect-sierraleone.com/',
    ogUrl: 'https://connect-sierraleone.com/',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <ClientsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
