import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/use-seo';

const plans = [
  {
    name: 'Starter',
    price: 'SLe 5000',
    period: 'starting at',
    description: 'Perfect for small businesses and startups.',
    features: [
      '5-page responsive website',
      'Basic SEO optimization',
      'Contact form integration',
      'Mobile-friendly design',
      '1 month support',
      'Basic analytics setup',
    ],
    popular: false,
    color: '217 91% 60%',
  },
  {
    name: 'Professional',
    price: 'SLe 15,000',
    period: 'starting at',
    description: 'Ideal for growing businesses with more needs.',
    features: [
      'Up to 15 pages',
      'Advanced SEO package',
      'Custom animations',
      'E-commerce ready (up to 50 products)',
      'CMS integration',
      '3 months support',
      'Social media integration',
      'Performance optimization',
    ],
    popular: true,
    color: '280 80% 60%',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'Full-scale solutions for large organizations.',
    features: [
      'Unlimited pages',
      'Custom web/mobile application',
      'API development & integration',
      'Advanced security features',
      'Dedicated project manager',
      '12 months priority support',
      'Training & documentation',
      'SLA guarantee',
    ],
    popular: false,
    color: '150 80% 50%',
  },
];

const Pricing = () => {
  useSEO({
    title: 'Pricing | Affordable Web Development & IT Services',
    description: 'Transparent, flexible pricing for web development, mobile apps, and IT services. Choose from Starter, Professional, or Enterprise plans tailored to your business needs.',
    keywords: 'pricing, web development costs, software development pricing, affordable IT services',
    canonical: 'https://connect-sierraleone.com/pricing',
    ogUrl: 'https://connect-sierraleone.com/pricing',
    type: 'website',
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
              Pricing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Transparent <span className="text-gradient-blue">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Choose a plan that fits your needs. All plans include our quality guarantee.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-subheading rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`h-full glass-card p-8 rounded-2xl ${plan.popular ? 'border-primary/50' : ''}`}>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground font-body text-sm ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-body text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="block">
                    <Button 
                      className={`w-full ${plan.popular ? 'glow-button text-primary-foreground' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Quote CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Need a custom solution?
            </h2>
            <p className="text-muted-foreground font-body mb-6">
              Contact us for a personalized quote tailored to your specific requirements.
            </p>
            <Link to="/contact">
              <Button className="glow-button text-primary-foreground">
                Request Custom Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
