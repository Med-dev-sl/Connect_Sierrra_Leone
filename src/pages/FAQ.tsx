import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const categories = [
  { name: 'General', count: 5 },
  { name: 'Services', count: 6 },
  { name: 'Pricing', count: 4 },
  { name: 'Technical', count: 5 },
];

const faqs = [
  {
    category: 'General',
    question: 'What services does Connect Sierra Leone offer?',
    answer: 'We offer software development (websites and mobile apps), graphic design, phone unlock services, and computer software solutions. Our comprehensive services are designed to meet all your technology needs.',
  },
  {
    category: 'General',
    question: 'Where is Connect Sierra Leone located?',
    answer: 'We are based in Freetown, Sierra Leone. However, we serve clients both locally and internationally, with projects completed across Africa and beyond.',
  },
  {
    category: 'General',
    question: 'How can I contact your team?',
    answer: 'You can reach us via email at info@connectsl.com, call us at +232 76 000 000, or visit our contact page to fill out a quote request form.',
  },
  {
    category: 'General',
    question: 'Do you work with international clients?',
    answer: 'Yes! We proudly serve clients from over 10 countries. Our team is experienced in remote collaboration and can deliver quality work regardless of location.',
  },
  {
    category: 'General',
    question: 'What makes Connect Sierra Leone different?',
    answer: 'Our commitment to excellence, local expertise combined with international standards, competitive pricing, and our mission to empower communities through technology set us apart.',
  },
  {
    category: 'Services',
    question: 'How long does it take to build a website?',
    answer: 'Project timelines vary based on complexity. A basic website typically takes 2-4 weeks, while more complex projects may take 6-12 weeks. We provide detailed timelines during the consultation phase.',
  },
  {
    category: 'Services',
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes! All our packages include a support period. We also offer extended support and maintenance packages for long-term partnership.',
  },
  {
    category: 'Services',
    question: 'Can you redesign an existing website?',
    answer: 'Absolutely! We specialize in website redesigns and can transform your existing site into a modern, high-performing platform while preserving your content and SEO rankings.',
  },
  {
    category: 'Services',
    question: 'What phones can you unlock?',
    answer: 'We can unlock all major brands including iPhone, Samsung, Huawei, and more. We support all major carriers worldwide with a high success rate.',
  },
  {
    category: 'Services',
    question: 'Do you offer mobile app development?',
    answer: 'Yes! We develop mobile apps for both iOS and Android platforms using modern technologies like Flutter and React Native for cross-platform development.',
  },
  {
    category: 'Services',
    question: 'Can you help with branding and logo design?',
    answer: 'Definitely! Our graphic design team specializes in brand identity creation, including logo design, brand guidelines, and complete visual identity packages.',
  },
  {
    category: 'Pricing',
    question: 'What are your pricing options?',
    answer: 'We offer flexible pricing with packages starting from $499 for basic websites. We also provide custom quotes for larger projects. Visit our pricing page for details.',
  },
  {
    category: 'Pricing',
    question: 'Do you offer payment plans?',
    answer: 'Yes! We offer flexible payment plans including 50% upfront and 50% on completion, or monthly installments for larger projects.',
  },
  {
    category: 'Pricing',
    question: 'Is there a free consultation?',
    answer: 'Yes! We offer free initial consultations to discuss your project requirements and provide a detailed quote with no obligation.',
  },
  {
    category: 'Pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, mobile money (Orange Money, Africell Money), PayPal, and major credit cards for international clients.',
  },
  {
    category: 'Technical',
    question: 'What technologies do you use for web development?',
    answer: 'We use modern technologies including React, Next.js, Node.js, Python, and various databases. We choose the best technology stack based on your project requirements.',
  },
  {
    category: 'Technical',
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely! All our websites are built with a mobile-first approach, ensuring they look and work great on all devices.',
  },
  {
    category: 'Technical',
    question: 'Do you provide hosting services?',
    answer: 'Yes! We offer reliable hosting solutions with 99.9% uptime, SSL certificates, and regular backups included.',
  },
  {
    category: 'Technical',
    question: 'Can you integrate third-party services?',
    answer: 'Yes! We can integrate payment gateways, CRM systems, email marketing tools, analytics, and various other third-party services.',
  },
  {
    category: 'Technical',
    question: 'Do you provide source code access?',
    answer: 'Yes! Upon project completion and full payment, you receive complete ownership and access to all source code.',
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return searchQuery ? matchesSearch : matchesCategory;
  });

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
              FAQ
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Frequently Asked <span className="text-gradient-blue">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Find answers to common questions about our services.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Categories Sidebar */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="glass-card p-4 rounded-xl sticky top-32">
                  <h3 className="font-display font-bold text-foreground mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.name}>
                        <button
                          onClick={() => setActiveCategory(cat.name)}
                          className={`w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-all flex justify-between ${
                            activeCategory === cat.name
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          {cat.name}
                          <span>{cat.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* FAQ List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={searchQuery ? 'lg:col-span-4' : 'lg:col-span-3'}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card rounded-xl px-6 border-none"
                  >
                    <AccordionTrigger className="text-left font-display font-bold text-foreground hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-body pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground font-body">No questions found matching your search.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Still have questions?
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Can't find what you're looking for? Our team is here to help!
              </p>
              <Link to="/contact">
                <Button className="glow-button text-primary-foreground">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
