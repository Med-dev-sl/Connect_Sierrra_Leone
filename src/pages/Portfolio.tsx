import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Web Development', 'Mobile Apps'];

const projects = [
  // Web Development
  {
    id: 1,
    title: 'Nyapui Secondary School Website',
    category: 'Web Development',
    description: 'An informative website about Nyapui Secondary School - the first STEM school in Combema Village, Kenema. Showcases educational programs, faculty, and student achievements.',
    liveLink: 'https://nyapuischool.com',
    tags: ['HTML', 'CSS', 'PHP', 'JavaScript', 'MySQL'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Magbity Agency Limited',
    category: 'Web Development',
    description: 'A licensed FIFA football agency platform for player transfers and consultancy services. Professional platform for managing athlete careers and transfers across Africa.',
    liveLink: 'https://magbityagencyltd.com',
    tags: ['React', 'Django', 'SQLite'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Termo Physics - AI Learning Platform',
    category: 'Web Development',
    description: 'An innovative AI platform that helps pupils, students, teachers and lecturers learn physics concepts and terms. Features an AI agent specifically trained to handle physics queries and explain complex concepts.',
    liveLink: 'https://termophysics.com',
    tags: ['React', 'TypeScript', 'Gemini AI', 'Supabase'],
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'UniAI-Playground',
    category: 'Web Development',
    description: 'An AI platform where students have personal AI tutors for their courses of study. Customized learning experience specific to each course. Coming soon.',
    liveLink: 'https://uni-ai-playground.vercel.app',
    tags: ['React', 'TypeScript', 'Supabase', 'Gemini AI Agents'],
    color: 'from-indigo-500 to-blue-500',
    comingSoon: true,
  },
  // Mobile Apps
  {
    id: 5,
    title: 'Wiyone CAB',
    category: 'Mobile Apps',
    description: 'A ride booking platform that allows users to book rides within Kenema and enables riders to accept rides. Reduces unnecessary rides and waiting times for passengers while increasing efficiency.',
    liveLink: '#',
    tags: ['React Native', 'Firebase', 'GPS'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'Nyapui Radio Mobile',
    category: 'Mobile Apps',
    description: 'A mobile application that allows users to watch Nyapui Radio live programs, news and more on a centralized platform. Stay connected with community voice initiatives.',
    liveLink: '#',
    tags: ['React', 'Firebase', 'Streaming'],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 7,
    title: 'Ticketa - Bus Ticket Booking',
    category: 'Mobile Apps',
    description: 'A platform that enables users to buy bus tickets online in Sierra Leone. Simple, secure and convenient bus ticket booking system. Coming soon.',
    liveLink: '#',
    tags: ['React', 'TypeScript', 'Supabase'],
    color: 'from-orange-500 to-yellow-500',
    comingSoon: true,
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
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Explore our portfolio of successful projects that have transformed businesses and communities.
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
                className="group"
              >
                <div className="relative h-full rounded-3xl overflow-hidden glass-card hover:shadow-2xl transition-all duration-500 p-6 flex flex-col">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Image/Icon Area */}
                  <div className={`relative aspect-video bg-gradient-to-br ${project.color} rounded-2xl mb-4 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-all duration-500`}>
                    <motion.div
                      className="text-5xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      📱
                    </motion.div>
                    {project.comingSoon && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-display font-bold text-sm">Coming Soon</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col relative z-10">
                    <span className={`text-xs font-subheading bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-2 block`}>
                      {project.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm mb-4 flex-1 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-muted/50 rounded-full text-muted-foreground font-body hover:bg-muted transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {!project.comingSoon ? (
                        <>
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full group/btn">
                              <ExternalLink className="w-4 h-4 mr-1 group-hover/btn:translate-x-1 transition-transform" /> Live
                            </Button>
                          </a>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Border Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none`} />
                </div>

                {/* Shadow Effect */}
                <motion.div
                  className={`absolute -inset-2 bg-gradient-to-br ${project.color} rounded-3xl -z-10 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  whileHover={{ scale: 1.05 }}
                />
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
