import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Aminata Kamara',
    role: 'CEO, Freetown Ventures',
    content: 'Connect Sierra Leone transformed our business with their exceptional website development. Their attention to detail and commitment to quality is unmatched. The team went above and beyond to understand our needs and deliver a solution that exceeded our expectations.',
    rating: 5,
    service: 'Web Development',
  },
  {
    id: 2,
    name: 'Mohamed Conteh',
    role: 'Founder, TechStart SL',
    content: 'The mobile app they built for us exceeded all expectations. The team is professional, responsive, and truly understands the needs of local businesses. They delivered on time and within budget.',
    rating: 5,
    service: 'Mobile App',
  },
  {
    id: 3,
    name: 'Fatmata Sesay',
    role: 'Marketing Director, Global Trade SL',
    content: 'Outstanding graphic design work! They captured our brand identity perfectly. The team went above and beyond to deliver exceptional results. Highly recommend their creative services.',
    rating: 5,
    service: 'Graphic Design',
  },
  {
    id: 4,
    name: 'Ibrahim Bangura',
    role: 'Owner, IB Electronics',
    content: 'Fast and reliable phone unlock services. They unlocked my phone in minutes when other shops said it was impossible. Great customer service and very affordable prices!',
    rating: 5,
    service: 'Phone Unlock',
  },
  {
    id: 5,
    name: 'Mariama Koroma',
    role: 'Operations Manager, SL Logistics',
    content: 'The computer solutions team fixed our network issues quickly and efficiently. Their expertise saved us time and money. Professional service from start to finish.',
    rating: 5,
    service: 'Computer Solutions',
  },
  {
    id: 6,
    name: 'Abdul Rahman',
    role: 'Director, Education First SL',
    content: 'They developed an amazing e-learning platform for our organization. The user interface is intuitive and our students love using it. A fantastic partner for any tech project.',
    rating: 5,
    service: 'Web Development',
  },
];

const Testimonials = () => {
  const [filter, setFilter] = useState('All');
  const services = ['All', 'Web Development', 'Mobile App', 'Graphic Design', 'Phone Unlock', 'Computer Solutions'];

  const filtered = filter === 'All' ? testimonials : testimonials.filter(t => t.service === filter);

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Testimonials
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Client <span className="text-gradient-blue">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              See what our happy clients have to say about our services.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {services.map((service) => (
              <button
                key={service}
                onClick={() => setFilter(service)}
                className={`px-5 py-2 rounded-full font-body text-sm transition-all ${
                  filter === service
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {service}
              </button>
            ))}
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Card3D className="h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-foreground/90 font-body mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-muted-foreground font-body text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-subheading">
                      {testimonial.service}
                    </span>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
