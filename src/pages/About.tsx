import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const values = [
  { icon: Target, title: 'Excellence', description: 'We strive for the highest quality in everything we do.' },
  { icon: Heart, title: 'Integrity', description: 'Honest and transparent relationships with all stakeholders.' },
  { icon: Users, title: 'Community', description: 'Empowering local communities through technology.' },
  { icon: Globe, title: 'Innovation', description: 'Constantly pushing boundaries to deliver cutting-edge solutions.' },
];

const milestones = [
  { year: '2023', title: 'Company Founded', description: 'Started with a vision to transform Sierra Leone\'s tech landscape.' },
  { year: '2024', title: 'First Major Client', description: 'Delivered our first enterprise-level project.' },
  { year: '2024', title: 'Team Expansion', description: 'Grew to a team of 10 talented professionals.' },
  { year: '2025', title: 'International Reach', description: 'Started serving clients across Africa and beyond.' },
  { year: '2025/2026', title: '15+  Projects', description: 'Milestone of 100 successful project deliveries.' },
  { year: '2024', title: 'Award Recognition', description: 'Recognized as a best in Team in a Tech Hackathon.' },
];

const About = () => {
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Our <span className="text-gradient-blue">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Empowering communities through technology since 2019.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card3D>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground font-body text-lg">
                  To empower businesses and communities in Sierra Leone and beyond with innovative, 
                  affordable, and accessible technology solutions that drive growth and transformation.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card3D>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground font-body text-lg">
                  To be the leading technology partner in West Africa, known for excellence, 
                  innovation, and our commitment to empowering communities through digital transformation.
                </p>
              </Card3D>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card3D className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground font-body text-sm">{value.description}</p>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
              Our Journey
            </h2>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <div className="glass-card p-4 rounded-xl ml-8 md:ml-0">
                      <span className="text-primary font-display font-bold">{milestone.year}</span>
                      <h3 className="text-lg font-display font-bold text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground font-body text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
