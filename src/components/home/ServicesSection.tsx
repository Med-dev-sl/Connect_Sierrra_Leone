import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Monitor,
  ArrowRight
} from 'lucide-react';
import { Card3D } from '@/components/Card3D';

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom websites and mobile apps built with cutting-edge technology to power your business growth.',
    features: ['Web Applications', 'Mobile Apps', 'E-commerce', 'APIs'],
    color: '217 91% 60%',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Stunning visual designs that capture your brand essence and leave lasting impressions.',
    features: ['Brand Identity', 'UI/UX Design', 'Print Materials', 'Social Media'],
    color: '280 80% 60%',
  },
  {
    icon: Smartphone,
    title: 'Phone Unlock',
    description: 'Professional phone unlocking services for all major brands and carriers worldwide.',
    features: ['All Carriers', 'Fast Service', 'Guaranteed', 'All Brands'],
    color: '150 80% 50%',
  },
  {
    icon: Monitor,
    title: 'Computer Solutions',
    description: 'Comprehensive software solutions and technical support for all your computing needs.',
    features: ['Software Setup', 'Troubleshooting', 'Data Recovery', 'Upgrades'],
    color: '30 90% 55%',
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-deep-blue/50 to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body">
            From concept to completion, we deliver end-to-end solutions that 
            drive innovation and empower communities.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card3D className="h-full" glowColor={service.color}>
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `linear-gradient(135deg, hsl(${service.color} / 0.2), hsl(${service.color} / 0.1))` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon 
                      className="w-8 h-8" 
                      style={{ color: `hsl(${service.color})` }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-sm font-body bg-muted/50 text-muted-foreground rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <Link
                    to="/services"
                    className="inline-flex items-center text-primary font-subheading font-medium group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <button className="glow-button text-primary-foreground">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
