import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Smartphone, Monitor, Send, Check, AlertCircle } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const services = [
  { id: 'software', icon: Code2, label: 'Software Development', color: 'text-blue-500' },
  { id: 'design', icon: Palette, label: 'Graphic Design', color: 'text-purple-500' },
  { id: 'unlock', icon: Smartphone, label: 'Phone Unlock Services', color: 'text-green-500' },
  { id: 'computer', icon: Monitor, label: 'Computer Software Solutions', color: 'text-orange-500' },
];

const budgetRanges = [
  { id: 'under-500', label: 'Under $500' },
  { id: '500-1000', label: '$500 - $1,000' },
  { id: '1000-5000', label: '$1,000 - $5,000' },
  { id: '5000-10000', label: '$5,000 - $10,000' },
  { id: 'over-10000', label: '$10,000+' },
];

const Quote = () => {
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    projectDescription: '',
    timeline: 'asap',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (selectedServices.length === 0) {
      toast({
        title: "Select Services",
        description: "Please select at least one service.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedBudget) {
      toast({
        title: "Select Budget",
        description: "Please select a budget range.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would normally send data to your backend
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Quote Request:', {
        ...formData,
        services: selectedServices,
        budget: selectedBudget,
      });

      setSubmitSuccess(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your request and send you a personalized quote within 24-48 hours.",
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectTitle: '',
          projectDescription: '',
          timeline: 'asap',
        });
        setSelectedServices([]);
        setSelectedBudget('');
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Request a Quote
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Get a <span className="text-gradient-blue">Custom Quote</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Tell us about your project and we'll provide a detailed quote tailored to your needs.
            </p>
          </motion.div>

          {/* Main Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <Alert className="border-green-500 bg-green-500/10">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">
                      Your quote request has been submitted successfully! Check your email for confirmation.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Personal Information Section */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Your Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-medium mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-medium mb-2">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+232 76 000 000"
                      disabled={isSubmitting}
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-base font-medium mb-2">
                      Company / Organization
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      disabled={isSubmitting}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Services Selection */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Select Services *</h2>
                <p className="text-muted-foreground">Choose one or more services you're interested in:</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <motion.div key={service.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          type="button"
                          onClick={() => toggleService(service.id)}
                          disabled={isSubmitting}
                          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-background hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={`h-6 w-6 mt-1 flex-shrink-0 ${service.color}`} />
                            <span className="font-medium text-foreground">{service.label}</span>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Budget Range *</h2>
                <p className="text-muted-foreground">What's your budget for this project?</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
                  {budgetRanges.map((range) => (
                    <motion.button
                      key={range.id}
                      type="button"
                      onClick={() => setSelectedBudget(range.id)}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        selectedBudget === range.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background hover:border-primary/50 text-foreground'
                      }`}
                    >
                      {range.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Project Details</h2>

                <div>
                  <Label htmlFor="projectTitle" className="text-base font-medium mb-2">
                    Project Title
                  </Label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    placeholder="E.g., E-commerce Website, Mobile App, etc."
                    disabled={isSubmitting}
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="projectDescription" className="text-base font-medium mb-2">
                    Project Description *
                  </Label>
                  <Textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Tell us about your project, requirements, goals, and any specific features you need..."
                    disabled={isSubmitting}
                    className="bg-background border-border min-h-[150px]"
                  />
                </div>

                <div>
                  <Label htmlFor="timeline" className="text-base font-medium mb-2">
                    Project Timeline
                  </Label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="asap">As Soon As Possible</option>
                    <option value="1-week">Within 1 Week</option>
                    <option value="1-month">Within 1 Month</option>
                    <option value="2-months">Within 2 Months</option>
                    <option value="flexible">Flexible Timeline</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-4"
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request Quote
                    </>
                  )}
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-6 text-lg font-semibold"
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      projectTitle: '',
                      projectDescription: '',
                      timeline: 'asap',
                    });
                    setSelectedServices([]);
                    setSelectedBudget('');
                  }}
                >
                  Clear
                </Button>
              </motion.div>

              {/* Info Message */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  We'll review your quote request and send you a detailed quote via email within 24-48 business hours.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quote;
