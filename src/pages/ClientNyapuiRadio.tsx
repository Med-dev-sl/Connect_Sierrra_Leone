import { motion } from 'framer-motion';
import { MapPin, Smartphone, Palette, Users, Radio, CheckCircle, Award, Zap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const NyapuiRadioClient = () => {
  const services = [
    {
      title: 'Aesthetic Flyer Design',
      description: 'Created visually stunning and engaging flyer designs to promote their community platform and reach wider audiences.',
      icon: Palette,
      delay: 0.1,
    },
    {
      title: 'PC Maintenance & Support',
      description: 'Provided technical support and maintenance services to keep their systems running smoothly and efficiently.',
      icon: Zap,
      delay: 0.2,
    },
    {
      title: 'Social Media Management',
      description: 'Fixed and optimized their social media presence to enhance community engagement and digital visibility.',
      icon: Users,
      delay: 0.3,
    },
    {
      title: 'Mobile App Development',
      description: 'Built a responsive, user-friendly mobile application to give their community platform accessibility on-the-go.',
      icon: Smartphone,
      delay: 0.4,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Animated Background Effects */}
        <div className="fixed inset-0 overflow-hidden -z-50">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-3xl"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-500/15 to-transparent blur-3xl"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-3xl"
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
                  className="inline-block px-4 py-2 mb-6 text-sm font-subheading font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Community Platform
                </motion.span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6">
                  Nyapui <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Radio</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8 leading-relaxed">
                  A community-driven platform dedicated to voicing people's opinions and bridging social gaps. We transformed their vision into reality with comprehensive digital solutions.
                </p>

                {/* Location Badge with 3D effect */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background border border-blue-500/20 mb-8 max-w-md"
                >
                  <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-subheading text-muted-foreground">Location</p>
                    <p className="text-foreground font-body">4 Amie Jay Drive, Reservation Road, Kenema</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8 }}
                className="perspective"
              >
                <div className="relative rounded-3xl overflow-hidden glass-card p-1 shadow-2xl">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUCCBjmUP0tzbVIwqwaMQfOLAAvrwpxV_a4Q&s"
                    alt="Nyapui Radio"
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/40 to-transparent" />
                </div>
              </motion.div>
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
                Comprehensive digital solutions tailored to their community platform needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Palette,
                  title: 'Aesthetic Flyer Designs',
                  description: 'Eye-catching promotional materials that capture the essence of the community platform and drive engagement.',
                },
                {
                  icon: Users,
                  title: 'PC Maintenance & Support',
                  description: 'Ongoing technical support to maintain their systems, ensuring reliable platform operation.',
                },
                {
                  icon: Radio,
                  title: 'Social Media Management',
                  description: 'Strategic fixes and improvements to their social media presence for better community reach.',
                },
                {
                  icon: Smartphone,
                  title: 'Responsive Mobile App',
                  description: 'A fully responsive mobile application allowing users to voice opinions and engage seamlessly.',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="glass-card p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-500" />
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/30 transition-colors duration-500" />
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
              {/* Stats */}
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
                    'Fully responsive mobile app deployed across iOS and Android',
                    'Enhanced social media presence with professional designs',
                    'Improved platform stability through ongoing PC support',
                    'Increased community engagement through user-friendly interface',
                    'Professional branding materials for marketing campaigns',
                  ].map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <p className="text-lg text-muted-foreground font-body">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quote Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="glass-card p-10 rounded-3xl border border-blue-500/20 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl opacity-10 text-blue-400">
                    "
                  </div>
                  <p className="text-xl md:text-2xl font-display text-foreground mb-6 leading-relaxed">
                    Connect Sierra Leone provided exceptional technical expertise. Their team understood our mission to bridge social gaps and created solutions that truly empower our community.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-foreground font-display font-bold">
                      NR
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground">Nyapui Radio Team</p>
                      <p className="text-sm text-muted-foreground font-body">Community Platform Directors</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NyapuiRadioClient;
