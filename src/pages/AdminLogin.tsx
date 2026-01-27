import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual authentication with Supabase
      // For demo purposes, accept any credentials
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful login
      localStorage.setItem('adminToken', 'demo-token-' + Date.now());

      toast({
        title: 'Welcome!',
        description: 'You have been logged in successfully.',
      });

      navigate('/admin');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@connectsl.com',
      password: 'demo123',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="text-3xl font-display font-bold text-primary-foreground">CS</span>
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
          </motion.div>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Access your dashboard to manage quotes and settings</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@connectsl.com"
                disabled={isLoading}
                className="bg-background border-border text-base"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-base font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="bg-background border-border text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 rounded border border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" disabled={isLoading} className="w-full text-base font-semibold gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Demo Button */}
          <div className="mt-6 pt-6 border-t border-border">
            <button
              onClick={handleDemoLogin}
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors text-sm"
            >
              Use Demo Credentials
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Demo Access:</strong> Use any email/password combination to test the dashboard. In production, integrate with Supabase Auth.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Need help? Contact support at{' '}
            <a href="mailto:support@connectsl.com" className="text-primary hover:text-primary/80 transition-colors">
              support@connectsl.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
