import { motion } from 'framer-motion';
import { MapPin, Palette, Award, CheckCircle, Droplet, Zap, Truck, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const KakeboWaterClient = () => {
  const services = [
    {
      icon: Palette,
      title: 'Aesthetic Flyer Design',
      description: 'Created stunning, eye-catching promotional materials that showcase Kakebo Water\'s premium quality and unique positioning.',
    },
    {
      icon: Droplet,
      title: 'Brand Development',
      description: 'Developed a cohesive visual identity that reflects the purity and quality of their products.',
    },
    {
      icon: Truck,
      title: 'Marketing Materials',
      description: 'Designed comprehensive marketing collateral to support their distribution and sales efforts.',
    },
    {
      icon: Zap,
      title: 'Visual Excellence',
      description: 'Created professional, high-quality visuals that communicate their commitment to premium water production.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Animated Background Effects */}
        <div className="fixed inset-0 overflow-hidden -z-50">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/10 blur-3xl"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-green-500/15 to-transparent blur-3xl"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-teal-500/10 to-green-500/5 blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, -50, 0] }}
            transition={{ duration: 22, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 pt-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className="inline-block px-4 py-2 mb-6 text-sm font-subheading font-medium text-green-400 bg-green-500/10 rounded-full border border-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Premium Water Production
                </motion.span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6">
                  Kakebo <span className="bg-gradient-to-r from-green-400 via-teal-400 to-green-500 bg-clip-text text-transparent">Water Factory</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8 leading-relaxed">
                  A quality water production facility dedicated to delivering pure, tasteless water. We helped establish their market presence through exceptional design and branding solutions.
                </p>

                {/* Location Badge with 3D effect */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background border border-green-500/20 mb-8 max-w-md hover:border-green-500/40 transition-colors"
                >
                  <MapPin className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-subheading text-muted-foreground">Location</p>
                    <p className="text-foreground font-body">Guinea Based Reservation, Kenema</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Image with 3D effect */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8 }}
                style={{ perspective: '1200px' }}
              >
                <div className="group relative rounded-3xl overflow-hidden glass-card p-1 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <motion.img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvXQjCRQGFPjAUdGYLnwF_TeM_R1Z8Cv4rKw&s"
                    alt="Kakebo Water Factory"
                    className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-green-900/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About the Company */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
                Pure Quality Water
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                Kakebo Water Factory is committed to producing the highest quality water - pure, tasteless, and refreshing. Every drop is crafted with care to meet the highest standards of purity and quality.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  number: '100%',
                  label: 'Pure & Tasteless',
                  icon: Droplet,
                },
                {
                  number: '24/7',
                  label: 'Production Quality',
                  icon: Award,
                },
                {
                  number: '✓',
                  label: 'Regional Leader',
                  icon: CheckCircle,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground font-body">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services We Provided */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
                Design Services Delivered
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto">
                Premium branding and marketing materials to showcase quality excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="glass-card p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <service.icon className="w-12 h-12 text-green-400 mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-green-500/30 transition-colors duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact & Results */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
                  Impact & Results
                </h2>

                <div className="space-y-6">
                  {[
                    'Eye-catching flyer designs that capture attention',
                    'Professional branding materials for distribution centers',
                    'Enhanced visual identity communicating product quality',
                    'Marketing materials supporting regional expansion',
                    'Consistent design language across all promotional content',
                    'Increased brand recognition and market presence',
                  ].map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <p className="text-lg text-muted-foreground font-body">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-card p-8 rounded-2xl border border-green-500/20">
                  <Droplet className="w-16 h-16 text-green-400 mb-6" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    Quality Meets Design
                  </h3>
                  <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                    Kakebo Water Factory produces exceptional quality water, and their marketing materials needed to reflect that excellence. We created designs that communicate purity, quality, and trust, establishing them as a premium water producer in the region.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <p className="text-sm text-muted-foreground font-body">Premium Visual Identity</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <p className="text-sm text-muted-foreground font-body">Effective Marketing Materials</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <p className="text-sm text-muted-foreground font-body">Professional Brand Presence</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass-card p-10 rounded-3xl border border-green-500/20">
                <div className="absolute top-4 right-4 text-6xl opacity-10 text-green-400">
                  "
                </div>
                <p className="text-xl md:text-2xl font-display text-foreground mb-6 leading-relaxed">
                  Connect Sierra Leone created stunning designs that perfectly represent our water quality. Their flyer designs have significantly improved our market visibility.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-foreground font-display font-bold">
                    KW
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">Kakebo Water Team</p>
                    <p className="text-sm text-muted-foreground font-body">Production & Marketing</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Need Creative Design Solutions?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body mb-8">
                Let us help your business stand out with exceptional design and branding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="group">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline">
                    View More Projects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default KakeboWaterClient;
