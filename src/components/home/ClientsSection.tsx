import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const clients = [
  {
    id: 1,
    name: 'Nyapui Radio',
    role: 'Community Voice Platform',
    description: 'Voice-sharing platform dedicated to voicing people\'s opinions and bridging social gaps. We help them create aesthetic flyer designs, maintain their PCs, fix social media issues, and built a responsive mobile app.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUCCBjmUP0tzbVIwqwaMQfOLAAvrwpxV_a4Q&s',
    location: '4 Amie Jay Drive, Reservation Road, Kenema',
    slug: 'nyapui-radio',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Nyapui Secondary School',
    role: 'First STEM School',
    description: 'The first STEM-focused secondary school in Combema Village, Kenema. We provided website design and comprehensive management services to establish their strong digital presence.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV1wdiEMQn--KhO_D0CAj-_V5NkQtHzx9Jw&s',
    location: 'Combema Village, Kenema',
    slug: 'nyapui-school',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: 'Kakebo Water Factory',
    role: 'Premium Water Production',
    description: 'Quality water production facility dedicated to providing pure, tasteless water. We created aesthetic flyer designs to showcase their exceptional products and services.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvXQjCRQGFPjAUdGYLnwF_TeM_R1Z8Cv4rKw&s',
    location: 'Guinea Based Reservation, Kenema',
    slug: 'kakebo-water',
    color: 'from-green-500 to-teal-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const ClientsSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
          animate={{ 
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-3xl"
          animate={{ 
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-subheading font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Our Clients
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            Clients We've Worked With
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body">
            Discover the amazing projects and organizations we've partnered with to create impactful digital solutions.
          </p>
        </motion.div>

        {/* Clients Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full rounded-3xl overflow-hidden glass-card hover:shadow-2xl transition-all duration-500 p-6 flex flex-col">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Image Container with 3D Effect */}
                <div className="relative mb-6 overflow-hidden rounded-2xl h-48 group-hover:shadow-xl transition-all duration-500">
                  <motion.img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                    {client.name}
                  </h3>
                  <p className={`text-sm font-subheading mb-4 bg-gradient-to-r ${client.color} bg-clip-text text-transparent`}>
                    {client.role}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground font-body text-sm mb-4 flex-1 leading-relaxed">
                    {client.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-background/50 border border-primary/10">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground font-body">
                      {client.location}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/client/${client.slug}`}>
                    <Button className="w-full group/btn">
                      View Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Shadow Effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground font-body mb-4">
            Want to see more of our work or start your next project?
          </p>
          <Link to="/portfolio">
            <Button variant="outline" className="group">
              Explore Full Portfolio
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
