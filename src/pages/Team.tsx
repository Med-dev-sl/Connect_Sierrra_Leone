import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';

const team = [
  {
    name: 'Ibrahim Kamara',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 10+ years in tech industry.',
    skills: ['Leadership', 'Strategy', 'Business Development'],
  },
  {
    name: 'Mariama Sesay',
    role: 'Lead Developer',
    bio: 'Full-stack developer passionate about clean code.',
    skills: ['React', 'Node.js', 'Python'],
  },
  {
    name: 'Abdul Conteh',
    role: 'Creative Director',
    bio: 'Award-winning designer with an eye for detail.',
    skills: ['UI/UX', 'Branding', 'Motion Graphics'],
  },
  {
    name: 'Fatmata Bangura',
    role: 'Project Manager',
    bio: 'Ensuring projects are delivered on time, every time.',
    skills: ['Agile', 'Scrum', 'Communication'],
  },
  {
    name: 'Mohamed Turay',
    role: 'Mobile Developer',
    bio: 'Crafting seamless mobile experiences.',
    skills: ['Flutter', 'React Native', 'Swift'],
  },
  {
    name: 'Aminata Koroma',
    role: 'Marketing Lead',
    bio: 'Building brands that resonate with audiences.',
    skills: ['Digital Marketing', 'Content', 'SEO'],
  },
];

const Team = () => {
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
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Meet the <span className="text-gradient-blue">Experts</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              A talented team of professionals dedicated to your success.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card3D className="text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-3xl font-display font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-subheading text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground font-body text-sm mb-4">{member.bio}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 text-xs bg-muted/50 rounded text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    <a href="#" className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
