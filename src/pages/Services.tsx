import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Monitor,
  Check,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'software',
    icon: Code2,
    title: 'Software Development',
    description: 'We build custom web and mobile applications that power your business growth. From simple websites to complex enterprise solutions.',
    features: [
      'Custom Web Applications',
      'Mobile Apps (iOS & Android)',
      'E-commerce Solutions',
      'API Development & Integration',
      'Database Design',
      'Cloud Deployment',
    ],
    technologies: ['React', 'Node.js', 'Python', 'Flutter', 'PostgreSQL', 'AWS'],
    color: '217 91% 60%',
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Graphic Design',
    description: 'Stunning visual designs that capture your brand essence. We create memorable identities that leave lasting impressions.',
    features: [
      'Brand Identity Design',
      'Logo Creation',
      'UI/UX Design',
      'Print Materials',
      'Social Media Graphics',
      'Marketing Collateral',
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Canva', 'Sketch'],
    color: '280 80% 60%',
  },
  {
    id: 'unlock',
    icon: Smartphone,
    title: 'Phone Unlock Services',
    description: 'Professional phone unlocking for all major brands and carriers. Fast, reliable, and guaranteed results.',
    features: [
      'All Major Carriers Supported',
      'iPhone & Android Unlock',
      'IMEI Unlock Services',
      'Network Unlock Codes',
      'Same-Day Service Available',
      'Money-Back Guarantee',
    ],
    technologies: ['Apple', 'Samsung', 'Huawei', 'All Carriers'],
    color: '150 80% 50%',
  },
  {
    id: 'computer',
    icon: Monitor,
    title: 'Computer Software Solutions',
    description: 'Comprehensive software solutions and technical support for all your computing needs.',
    features: [
      'Software Installation & Setup',
      'System Troubleshooting',
      'Data Recovery Services',
      'Hardware Upgrades',
      'Network Configuration',
      'Security Solutions',
    ],
    technologies: ['Windows', 'macOS', 'Linux', 'Office 365'],
    color: '30 90% 55%',
  },
];

const Services = () => {
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
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              What We <span className="text-gradient-blue">Offer</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Comprehensive technology solutions tailored to your needs. 
              From software development to technical support, we've got you covered.
            </p>
          </motion.div>

          {/* Services */}
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <Card3D glowColor={service.color}>
                    <div className="aspect-video flex items-center justify-center">
                      <motion.div
                        className="w-32 h-32 rounded-3xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, hsl(${service.color} / 0.3), hsl(${service.color} / 0.1))` }}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        <service.icon 
                          className="w-16 h-16" 
                          style={{ color: `hsl(${service.color})` }}
                        />
                      </motion.div>
                    </div>
                  </Card3D>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground font-body mb-6">
                    {service.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-body text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-body glass-card text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link to="/quote">
                    <Button className="glow-button text-primary-foreground">
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
