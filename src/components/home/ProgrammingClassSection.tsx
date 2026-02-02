import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Laptop, GitBranch, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const classCurriculum = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    icon: Laptop,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'HTML - Building Blocks',
    icon: Code,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 3,
    title: 'CSS - Styling & Layout',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'GIT - Version Control',
    icon: GitBranch,
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 5,
    title: 'JavaScript - Programming',
    icon: Code,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'MERN Stack - Full Stack',
    icon: Package,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 7,
    title: 'GitHub Copilot - Build & Debug',
    icon: Code,
    color: 'from-indigo-500 to-purple-500',
  },
];

const benefits = [
  'Industry-recognized certification',
  'Real-world project experience',
  'One-on-one mentoring',
  'Career guidance & job support',
];

export const ProgrammingClassSection = () => {
  const [selectedModule, setSelectedModule] = useState(0);

  return (
    <section className="py-20 md:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl"
          animate={{ y: [0, 100, 0], x: [0, -50, 0] }}
          transition={{ duration: 30, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Professional Training
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            MERN Stack <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Programming Class (4 Weeks)</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Master full-stack web development in just 4 weeks. Learn HTML, CSS, JavaScript, MySQL, Express, React, Node.js, and GitHub Copilot for faster development.
          </p>
        </motion.div>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {classCurriculum.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedModule(index)}
                className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  selectedModule === index ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'
                }`}
              >
                <motion.div
                  className={`p-4 rounded-xl bg-gradient-to-br ${module.color} text-white w-fit mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-8 md:p-12 rounded-3xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Benefits */}
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                Why Our Program?
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    </motion.div>
                    <span className="text-foreground font-body">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Highlights */}
            <div className="space-y-4">
              {[
                { number: '4', label: 'Weeks of Training' },
                { number: '94+', label: 'Lessons & Projects' },
                { number: '95%', label: 'Success Rate' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl border border-primary/20"
                >
                  <div className="text-2xl font-display font-bold text-primary">{item.number}</div>
                  <div className="text-sm text-muted-foreground font-body">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start"
          >
            <Link to="/programming-class">
              <Button size="lg" className="glow-button w-full sm:w-auto">
                Explore Full Program <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/quote">
              <Button size="lg" variant="outline">
                Get More Info
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
