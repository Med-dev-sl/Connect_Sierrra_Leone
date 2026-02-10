import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import StudentRegistration from '@/components/StudentRegistration';
import { useLocation } from 'react-router-dom';
import { useSEO } from '@/hooks/use-seo';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const ApplyPage = () => {
  const query = useQuery();
  const program = query.get('program') || undefined;

  useSEO({
    title: 'Apply — Programming Class | Connect Sierra Leone',
    description: 'Apply for our programming classes. Complete the application to enroll.',
    canonical: 'https://connect-sierraleone.com/apply',
    ogUrl: 'https://connect-sierraleone.com/apply',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-display font-bold">Application</h1>
            <p className="text-muted-foreground mt-2">Fill out the form below to apply for your chosen program.</p>
          </motion.div>

          <StudentRegistration initialProgram={program} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplyPage;
