import { motion } from 'framer-motion';
import { MapPin, Globe, Users, Award, CheckCircle, Zap, BookOpen, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NyapuiSchoolClient = () => {
  const services = [
    {
      icon: Globe,
      title: 'Professional Website Design',
      description: 'Created a modern, responsive website that showcases the school\'s STEM focus and educational excellence.',
    },
    {
      icon: Users,
      title: 'Website Management',
      description: 'Ongoing support and management to keep their digital presence updated and engaging.',
    },
    {
      icon: BookOpen,
      title: 'Content Strategy',
      description: 'Developed compelling content that highlights their unique STEM curriculum and achievements.',
    },
    {
      icon: Zap,
      title: 'Digital Optimization',
      description: 'Optimized their online presence for better performance and user experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Animated Background Effects */}
        <div className="fixed inset-0 overflow-hidden -z-50">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/15 to-transparent blur-3xl"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/5 blur-3xl"
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
                  className="inline-block px-4 py-2 mb-6 text-sm font-subheading font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Educational Excellence
                </motion.span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6">
                  Nyapui <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">Secondary School</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8 leading-relaxed">
                  The first STEM school in Combema Village, Kenema. We transformed their digital presence with professional website design and comprehensive management services.
                </p>

                {/* Location Badge with 3D effect */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background border border-purple-500/20 mb-8 max-w-md hover:border-purple-500/40 transition-colors"
                >
                  <MapPin className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-subheading text-muted-foreground">Location</p>
                    <p className="text-foreground font-body">Combema Village, Kenema</p>
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV1wdiEMQn--KhO_D0CAj-_V5NkQtHzx9Jw&s"
                    alt="Nyapui Secondary School"
                    className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About the School */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
                Pioneering STEM Education
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                Nyapui Secondary School stands as the first STEM-focused school in Combema Village, Kenema, dedicated to nurturing young minds through Science, Technology, Engineering, and Mathematics education.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  number: '1st',
                  label: 'STEM School in Combema',
                  icon: Award,
                },
                {
                  number: '100+',
                  label: 'Students & Growing',
                  icon: Users,
                },
                {
                  number: '∞',
                  label: 'Digital Opportunities',
                  icon: Globe,
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
                  <stat.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
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
                Services Delivered
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto">
                Comprehensive digital solutions to establish their educational excellence online
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
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <service.icon className="w-12 h-12 text-purple-400 mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-500/30 transition-colors duration-500" />
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
                    'Professional, modern website showcasing educational programs',
                    'Enhanced digital visibility in the region',
                    'Improved student and parent engagement through online platform',
                    'Showcase for STEM curriculum and achievements',
                    'Central hub for school announcements and updates',
                    'Digital foundation for future growth',
                  ].map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
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
                <div className="glass-card p-8 rounded-2xl border border-purple-500/20">
                  <Award className="w-16 h-16 text-purple-400 mb-6" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    Educational Leadership
                  </h3>
                  <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                    We positioned Nyapui Secondary School as a digital leader in STEM education. Their website serves as a beacon for students and parents, showcasing the school's commitment to excellence in science and technology education.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <p className="text-sm text-muted-foreground font-body">Professional Web Presence</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <p className="text-sm text-muted-foreground font-body">Ongoing Technical Support</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <p className="text-sm text-muted-foreground font-body">Student & Parent Engagement</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
                Elevate Your Organization
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body mb-8">
                Let's create a powerful digital presence for your institution or business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="group">
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline">
                    View More Work
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

export default NyapuiSchoolClient;
