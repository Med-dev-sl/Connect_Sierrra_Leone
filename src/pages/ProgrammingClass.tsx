import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code, Laptop, BookOpen, GitBranch, FileCode, Package } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/use-seo';

const modules = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, understand how the internet works, client-server architecture, and the role of different technologies in building modern web applications.',
    icon: Laptop,
    topics: ['What is Web Development', 'Client-Server Architecture', 'HTTP/HTTPS Basics', 'Web Browsers & Servers', 'Frontend vs Backend'],
    color: 'from-blue-500 to-cyan-500',
    duration: '3 days',
    lessons: 4,
  },
  {
    id: 2,
    title: 'HTML - Building Blocks of the Web',
    description: 'Master HTML5 and learn how to structure web content semantically. Understand elements, attributes, forms, and best practices for creating accessible and well-formed web pages.',
    icon: Code,
    topics: ['HTML5 Basics', 'Semantic HTML', 'Forms & Inputs', 'SEO & Meta Tags', 'Accessibility (a11y)'],
    color: 'from-orange-500 to-red-500',
    duration: '3 days',
    lessons: 6,
  },
  {
    id: 3,
    title: 'CSS - Styling & Layout',
    description: 'Learn advanced CSS techniques including flexbox, grid, animations, and responsive design. Create beautiful, modern user interfaces that work across all devices.',
    icon: FileCode,
    topics: ['CSS Fundamentals', 'Flexbox & Grid', 'Responsive Design', 'Animations & Transitions', 'CSS Preprocessors (SASS)'],
    color: 'from-purple-500 to-pink-500',
    duration: '4 days',
    lessons: 8,
  },
  {
    id: 4,
    title: 'GIT - Version Control',
    description: 'Master Git and GitHub for professional version control. Learn branching strategies, collaboration workflows, and best practices for managing code in team environments.',
    icon: GitBranch,
    topics: ['Git Basics', 'GitHub & GitLab', 'Branching Strategies', 'Pull Requests & Code Review', 'Collaboration Workflows'],
    color: 'from-red-500 to-pink-500',
    duration: '2 days',
    lessons: 5,
  },
  {
    id: 5,
    title: 'JavaScript - Programming Language',
    description: 'Learn JavaScript from basics to advanced concepts. Master ES6+, async programming, DOM manipulation, and functional programming paradigms.',
    icon: Code,
    topics: ['JavaScript Fundamentals', 'ES6+ Features', 'DOM Manipulation', 'Async Programming', 'Error Handling', 'Best Practices'],
    color: 'from-yellow-500 to-orange-500',
    duration: '1 week',
    lessons: 16,
  },
  {
    id: 6,
    title: 'MERN Stack - Full Stack Development',
    description: 'Complete MERN stack training covering MySQL, Express.js, React, and Node.js. Build full-featured applications from database to user interface.',
    icon: Package,
    topics: ['MySQL & Database Design', 'Node.js & Express Backend', 'React Frontend Development', 'API Integration', 'Authentication & Security', 'Deployment'],
    color: 'from-green-500 to-teal-500',
    duration: '1 week',
    lessons: 16,
  },
  {
    id: 7,
    title: 'GitHub Copilot - Building & Debugging',
    description: 'Master GitHub Copilot AI assistant to accelerate your development. Learn how to leverage AI-powered code suggestions, generate code faster, and debug efficiently using Copilot.',
    icon: Code,
    topics: ['Copilot Setup & Integration', 'Code Generation & Suggestions', 'Pair Programming with AI', 'Debugging with Copilot', 'Best Practices', 'Real-world Workflow Integration'],
    color: 'from-indigo-500 to-purple-500',
    duration: '3 days',
    lessons: 6,
  },
];

const benefits = [
  'Industry-recognized certification',
  'Live coding sessions & pair programming',
  'Real-world project experience',
  'Portfolio-building projects',
  'One-on-one mentoring',
  'Career guidance & job placement support',
];

const ProgrammingClass = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  useSEO({
    title: 'MERN Stack Programming & Development Class (4 Weeks) | Connect Sierra Leone',
    description: 'Learn full-stack web development with our intensive 4-week MERN Stack class. Master HTML, CSS, JavaScript, MySQL, and GitHub Copilot. Build professional web applications and start your career in tech.',
    keywords: 'MERN Stack, web development, programming class, React, Node.js, MySQL, JavaScript, GitHub Copilot, coding bootcamp, Sierra Leone',
    canonical: 'https://connect-sierraleone.com/programming-class',
    ogUrl: 'https://connect-sierraleone.com/programming-class',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />

      <main className="pt-32 pb-20 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-3xl"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Professional Training
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              MERN Stack <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Programming Class (4 Weeks)</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body mb-8">
              Master full-stack web development in just 4 weeks. Learn HTML, CSS, JavaScript, MySQL, Express, React, Node.js, and GitHub Copilot for faster development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                Enroll Now
              </Button>
              <Button size="lg" variant="outline">
                Download Curriculum
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { number: '4', label: 'Weeks of Training' },
              { number: '4+', label: 'Lessons & Projects' },
              { number: '95%', label: 'Student Success Rate' },
              { number: '1-on-1', label: 'Mentorship Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Curriculum Modules */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 text-center">
              Curriculum Modules
            </h2>
            <div className="space-y-4">
              {modules.map((module, index) => {
                const IconComponent = module.icon;
                const isExpanded = expandedModule === module.id;

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                      className="w-full glass-card hover:shadow-lg transition-all duration-300 p-6 rounded-2xl text-left"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-display font-bold text-foreground mb-1">
                            {module.title}
                          </h3>
                          <p className="text-muted-foreground font-body text-sm mb-3">
                            {module.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-foreground/70 font-body">
                            <span>📚 {module.lessons} Lessons</span>
                            <span>⏱️ {module.duration}</span>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-1"
                        >
                          <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.div>
                      </div>

                      {/* Topics */}
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-subheading text-muted-foreground mb-3">Topics Covered:</p>
                          <div className="flex flex-wrap gap-2">
                            {module.topics.map((topic) => (
                              <motion.span
                                key={topic}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`px-3 py-1 rounded-full text-xs font-body bg-gradient-to-r ${module.color} bg-clip-text text-transparent border border-primary/20`}
                              >
                                {topic}
                              </motion.span>
                            ))}
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4"
                          >
                            <Button variant="outline" size="sm">
                              Learn More <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 text-center">
              Why Choose Our Program?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:shadow-lg transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <p className="font-body text-foreground group-hover:text-primary transition-colors">
                      {benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Course Structure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-8 md:p-12 rounded-3xl mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Enrollment', desc: 'Sign up and get instant access to all materials' },
                { step: 2, title: 'Learn', desc: 'Follow structured lessons and video tutorials' },
                { step: 3, title: 'Build', desc: 'Create real-world projects and portfolio pieces' },
                { step: 4, title: 'Succeed', desc: 'Get certified and land your dream job' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="relative text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                  {index < 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hidden md:block absolute top-6 -right-3 text-primary"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-12 rounded-3xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their careers with our MERN Stack training program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammingClass;
