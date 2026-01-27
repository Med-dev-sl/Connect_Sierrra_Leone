import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QuoteFormProps {
  onSubmitSuccess?: () => void;
  initialService?: string;
  compact?: boolean;
}

export const QuoteForm = ({ 
  onSubmitSuccess, 
  initialService = '',
  compact = false 
}: QuoteFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    message: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Quick Quote Request:', formData);

      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: initialService,
        message: '',
        budget: '',
      });

      onSubmitSuccess?.();
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

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium mb-2">
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={isSubmitting}
              className="bg-background border-border"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-2">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={isSubmitting}
              className="bg-background border-border"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="text-sm font-medium mb-2">
              Phone *
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
            <Label htmlFor="company" className="text-sm font-medium mb-2">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              disabled={isSubmitting}
              className="bg-background border-border"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium mb-2">
            Tell us about your project *
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Briefly describe your project needs..."
            disabled={isSubmitting}
            className="bg-background border-border min-h-[100px]"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Quote
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <Label htmlFor="service" className="text-base font-medium mb-2">
          Service Interest
        </Label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a service</option>
          <option value="software">Software Development</option>
          <option value="design">Graphic Design</option>
          <option value="unlock">Phone Unlock Services</option>
          <option value="computer">Computer Software Solutions</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="text-base font-medium mb-2">
          Project Details *
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project, requirements, and goals..."
          disabled={isSubmitting}
          className="bg-background border-border min-h-[150px]"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
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
    </form>
  );
};

export default QuoteForm;
