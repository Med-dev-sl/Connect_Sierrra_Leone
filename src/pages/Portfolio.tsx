import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Web Development', 'Mobile Apps', 'Graphic Design', 'E-commerce'];

const projects = [
  {
    id: 1,
    title: 'Freetown Market App',
    category: 'Mobile Apps',
    description: 'A marketplace app connecting local vendors with customers across Sierra Leone.',
    image: null,
    tags: ['React Native', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'SL Tourism Website',
    category: 'Web Development',
    description: 'A comprehensive tourism portal showcasing Sierra Leone\'s attractions.',
    image: null,
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'Bank of Sierra Leone Rebrand',
    category: 'Graphic Design',
    description: 'Complete brand identity redesign for a major financial institution.',
    image: null,
    tags: ['Branding', 'Logo Design', 'Print'],
  },
  {
    id: 4,
    title: 'AgriConnect Platform',
    category: 'E-commerce',
    description: 'An e-commerce platform for agricultural products and supplies.',
    image: null,
    tags: ['Shopify', 'Custom Theme', 'Payment Integration'],
  },
  {
    id: 5,
    title: 'HealthCare SL App',
    category: 'Mobile Apps',
    description: 'Telemedicine app connecting patients with healthcare providers.',
    image: null,
    tags: ['Flutter', 'Firebase', 'Video Call'],
  },
  {
    id: 6,
    title: 'Tech Conference Branding',
    category: 'Graphic Design',
    description: 'Event branding and marketing materials for annual tech summit.',
    image: null,
    tags: ['Event Design', 'Marketing', 'Social Media'],
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Featured <span className="text-gradient-blue">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Explore our portfolio of successful projects that have helped businesses grow.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-body text-sm transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Card3D className="h-full">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">🖼️</span>
                  </div>
                  <span className="text-xs font-subheading text-primary mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-muted/50 rounded text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" /> Live
                    </Button>
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

export default Portfolio;
