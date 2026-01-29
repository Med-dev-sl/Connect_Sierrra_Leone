import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Clock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Input } from '@/components/ui/input';

const categories = ['All', 'Technology', 'Business', 'Science', 'Health'];

// Default fallback posts in case API fails
const defaultPosts = [
  {
    id: 1,
    title: 'The Future of Mobile App Development in Africa',
    excerpt: 'Exploring the trends and opportunities shaping mobile app development across the African continent.',
    category: 'Technology',
    author: 'Ibrahim Kamara',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: '10 Essential Tips for Building a Successful Website',
    excerpt: 'Learn the key strategies for creating a website that converts visitors into customers.',
    category: 'Business',
    author: 'Mariama Sesay',
    date: 'Jan 10, 2024',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'The Rise of AI in Technology',
    excerpt: 'How artificial intelligence is transforming industries and creating new opportunities.',
    category: 'Technology',
    author: 'Abdul Conteh',
    date: 'Jan 5, 2024',
    readTime: '10 min read',
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(defaultPosts);
  const [loading, setLoading] = useState(true);

  // Fetch tech news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Using NewsAPI free tier - fetches technology and business news
        // Alternative: You can replace this with your own news API endpoint
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&language=en&pageSize=12&apiKey=demo'
        );
        
        if (response.ok) {
          const data = await response.json();
          
          // Transform API response to match our post structure
          const fetchedPosts = data.articles.map((article, index) => ({
            id: index + 1,
            title: article.title,
            excerpt: article.description || article.content || 'Read more about this article.',
            category: article.source.name.includes('Tech') ? 'Technology' : 'Business',
            author: article.author || article.source.name,
            date: new Date(article.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            readTime: `${Math.ceil((article.content?.length || 500) / 200)} min read`,
            featured: index === 0,
            url: article.url,
            image: article.urlToImage,
          }));
          
          setPosts(fetchedPosts.length > 0 ? fetchedPosts : defaultPosts);
        } else {
          // If API fails, use default posts
          setPosts(defaultPosts);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Use default posts if fetch fails
        setPosts(defaultPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex items-center justify-center py-12"
              >
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground font-body">Loading latest tech news...</p>
                </div>
              </motion.div>
            ) : (activeCategory === 'All' && !searchQuery ? regularPosts : filtered).length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-muted-foreground font-body text-lg">No articles found matching your search.</p>
              </motion.div>
            ) : (
              (activeCategory === 'All' && !searchQuery ? regularPosts : filtered).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card3D className="h-full">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">📝</span>
                      )}
                    </div>
                    <span className="text-xs font-subheading text-primary mb-2 block">{post.category}</span>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="line-clamp-1">{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    {post.url && (
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-primary font-subheading font-medium group">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </Card3D>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
