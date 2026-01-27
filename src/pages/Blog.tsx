import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Input } from '@/components/ui/input';

const categories = ['All', 'Tech Tips', 'Industry News', 'Tutorials', 'Case Studies'];

const posts = [
  {
    id: 1,
    title: 'The Future of Mobile App Development in Africa',
    excerpt: 'Exploring the trends and opportunities shaping mobile app development across the African continent.',
    category: 'Industry News',
    author: 'Ibrahim Kamara',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: '10 Essential Tips for Building a Successful E-commerce Website',
    excerpt: 'Learn the key strategies for creating an online store that converts visitors into customers.',
    category: 'Tutorials',
    author: 'Mariama Sesay',
    date: 'Jan 10, 2024',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'How We Built a Telemedicine App for Sierra Leone',
    excerpt: 'A behind-the-scenes look at developing HealthCare SL and the challenges we overcame.',
    category: 'Case Studies',
    author: 'Abdul Conteh',
    date: 'Jan 5, 2024',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Why Your Business Needs a Mobile-First Website',
    excerpt: 'Understanding the importance of mobile optimization in today\'s digital landscape.',
    category: 'Tech Tips',
    author: 'Fatmata Bangura',
    date: 'Dec 28, 2023',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Securing Your Business: Cybersecurity Best Practices',
    excerpt: 'Essential security measures every business should implement to protect their digital assets.',
    category: 'Tech Tips',
    author: 'Mohamed Turay',
    date: 'Dec 20, 2023',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'The Rise of Fintech in West Africa',
    excerpt: 'How financial technology is transforming banking and payments across the region.',
    category: 'Industry News',
    author: 'Aminata Koroma',
    date: 'Dec 15, 2023',
    readTime: '7 min read',
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = filtered.filter(p => !p.featured);

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
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Latest <span className="text-gradient-blue">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Stay updated with the latest trends, tips, and news from the tech world.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
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
          </div>

          {/* Featured Post */}
          {featuredPost && activeCategory === 'All' && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <Card3D>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center">
                    <span className="text-6xl">📰</span>
                  </div>
                  <div>
                    <span className="text-xs font-subheading text-primary mb-2 block">{featuredPost.category}</span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground font-body mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {featuredPost.readTime}
                      </span>
                    </div>
                    <Link to={`/blog/${featuredPost.id}`} className="inline-flex items-center text-primary font-subheading font-medium group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'All' && !searchQuery ? regularPosts : filtered).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Card3D className="h-full">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <span className="text-xs font-subheading text-primary mb-2 block">{post.category}</span>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{post.title}</h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
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

export default Blog;
