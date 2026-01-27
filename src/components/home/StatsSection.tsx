import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Users, Briefcase, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Briefcase,
    value: 150,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successfully delivered',
  },
  {
    icon: Users,
    value: 100,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Trust our expertise',
  },
  {
    icon: Award,
    value: 5,
    suffix: '+',
    label: 'Years Experience',
    description: 'In the industry',
  },
  {
    icon: Globe,
    value: 10,
    suffix: '+',
    label: 'Countries Served',
    description: 'Worldwide reach',
  },
];

export const StatsSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <motion.div
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-card mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-8 h-8 text-primary" />
              </motion.div>
              
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-lg font-subheading font-semibold text-foreground mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
