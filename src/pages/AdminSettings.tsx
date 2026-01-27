import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'Connect Sierra Leone',
    email: 'admin@connectsl.com',
    phone: '+232 76 000 000',
    address: 'Freetown, Sierra Leone',
    businessHours: 'Mon-Fri, 9am-6pm',
    aboutText: 'We provide comprehensive technology solutions...',
    quoteResponseTime: '24-48 hours',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Settings</h2>
          <p className="text-muted-foreground">Manage your business information and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Business Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Business Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName" className="text-base font-medium mb-2">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-medium mb-2">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-base font-medium mb-2">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="businessHours" className="text-base font-medium mb-2">
                  Business Hours
                </Label>
                <Input
                  id="businessHours"
                  name="businessHours"
                  value={settings.businessHours}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="quoteResponseTime" className="text-base font-medium mb-2">
                  Quote Response Time
                </Label>
                <Input
                  id="quoteResponseTime"
                  name="quoteResponseTime"
                  value={settings.quoteResponseTime}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="aboutText" className="text-base font-medium mb-2">
                About Your Business
              </Label>
              <Textarea
                id="aboutText"
                name="aboutText"
                value={settings.aboutText}
                onChange={handleChange}
                className="bg-background border-border min-h-[120px]"
              />
            </div>
          </motion.div>

          {/* Email Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Email Settings</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm text-blue-700">
                  Email notifications are currently disabled. Enable them in your Supabase configuration to send automatic responses to customers.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <input type="checkbox" id="emailNotifications" disabled className="w-4 h-4" />
                <label htmlFor="emailNotifications" className="text-foreground font-medium">
                  Send automatic responses to quote requests
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input type="checkbox" id="emailReminders" disabled className="w-4 h-4" />
                <label htmlFor="emailReminders" className="text-foreground font-medium">
                  Send daily reminder of pending quotes
                </label>
              </div>
            </div>
          </motion.div>

          {/* Quote Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Quote Settings</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="defaultStatus" className="text-base font-medium mb-2">
                  Default Quote Status
                </Label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Pending</option>
                  <option>Reviewed</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <input type="checkbox" id="autoReply" defaultChecked className="w-4 h-4" />
                <label htmlFor="autoReply" className="text-foreground font-medium">
                  Send auto-reply when quote is received
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input type="checkbox" id="followUp" defaultChecked className="w-4 h-4" />
                <label htmlFor="followUp" className="text-foreground font-medium">
                  Send follow-up reminder after 7 days
                </label>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Button size="lg" onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
