import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-subheading text-foreground/80">
              Empowering Communities Through Technology
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">We Build </span>
            <span className="text-gradient-blue">Digital</span>
            <br />
            <span className="text-foreground">Experiences</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-body max-w-3xl mx-auto mb-10"
          >
            Connect Sierra Leone delivers quality software solutions, stunning designs, 
            and expert technical services to transform your ideas into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/contact">
              <Button className="glow-button text-lg px-8 py-6 text-primary-foreground group">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 hover:border-primary/50 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Floating 3D Elements */}
          <div className="relative mt-20">
            {/* Main Visual - 3D Device Mockup Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative perspective-1000"
            >
              <div className="relative mx-auto max-w-4xl">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent blur-3xl -z-10 transform scale-110" />
                
                {/* Main Card */}
                <motion.div 
                  className="glass-card p-8 rounded-3xl overflow-hidden"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4 h-8 rounded-lg bg-muted/50 flex items-center px-4">
                      <span className="text-xs text-muted-foreground font-body">connectsierraleone.com</span>
                    </div>
                  </div>
                  
                  {/* Content Preview */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-accent/10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -left-10 top-1/4 w-20 h-20 glass-card rounded-2xl flex items-center justify-center"
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <span className="text-3xl">💻</span>
                </motion.div>
                
                <motion.div
                  className="absolute -right-10 top-1/3 w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <span className="text-2xl">🎨</span>
                </motion.div>
                
                <motion.div
                  className="absolute left-10 -bottom-5 w-14 h-14 glass-card rounded-2xl flex items-center justify-center"
                  animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                >
                  <span className="text-xl">📱</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
