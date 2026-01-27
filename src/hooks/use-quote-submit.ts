import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget: string;
  projectTitle?: string;
  projectDescription: string;
  timeline?: string;
}

export const useQuoteSubmit = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuote = async (quoteData: QuoteRequest) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Replace with actual Supabase submission
      // const { data, error } = await supabase
      //   .from('quotes')
      //   .insert([{
      //     ...quoteData,
      //     status: 'pending',
      //     created_at: new Date(),
      //   }]);

      // if (error) throw error;

      // For now, just log the data
      console.log('Quote submitted:', quoteData);

      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Success!",
        description: "Your quote request has been submitted. We'll contact you within 24-48 hours.",
      });

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit quote';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitQuote,
    isSubmitting,
    error,
  };
};

export default useQuoteSubmit;
