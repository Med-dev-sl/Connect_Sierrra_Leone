import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useDatabase, type Settings } from '@/hooks/use-database';
import { Save, Loader } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const { getSettings, updateSettings, isLoading, error } = useDatabase();

  const [isFetching, setIsFetching] = useState(true);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    company_name: '',
    company_email: '',
    company_phone: '',
    company_address: '',
    business_hours_open: '',
    business_hours_close: '',
    social_facebook: '',
    social_twitter: '',
    social_linkedin: '',
    social_instagram: '',
    auto_reply_enabled: false,
    auto_reply_message: '',
    quote_email_notification: true,
    maintenance_mode: false,
    theme_primary_color: '',
    theme_accent_color: '',
  });

  const canEdit = hasPermission('settings_edit');

  useEffect(() => {
    const fetchSettings = async () => {
      setIsFetching(true);
      const data = await getSettings();
      if (data) {
        setSettingsId(data.id);
        setSettings({
          company_name: data.company_name || '',
          company_email: data.company_email || '',
          company_phone: data.company_phone || '',
          company_address: data.company_address || '',
          business_hours_open: data.business_hours_open || '',
          business_hours_close: data.business_hours_close || '',
          social_facebook: data.social_facebook || '',
          social_twitter: data.social_twitter || '',
          social_linkedin: data.social_linkedin || '',
          social_instagram: data.social_instagram || '',
          auto_reply_enabled: data.auto_reply_enabled || false,
          auto_reply_message: data.auto_reply_message || '',
          quote_email_notification: data.quote_email_notification ?? true,
          maintenance_mode: data.maintenance_mode || false,
          theme_primary_color: data.theme_primary_color || '',
          theme_accent_color: data.theme_accent_color || '',
        });
      }
      setIsFetching(false);
    };
    fetchSettings();
  }, [getSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleSave = async () => {
    if (!settingsId) {
      toast({
        title: 'Error',
        description: 'Settings not initialized',
        variant: 'destructive',
      });
      return;
    }

    const updated = await updateSettings(settingsId, {
      company_name: settings.company_name || null,
      company_email: settings.company_email || null,
      company_phone: settings.company_phone || null,
      company_address: settings.company_address || null,
      business_hours_open: settings.business_hours_open || null,
      business_hours_close: settings.business_hours_close || null,
      social_facebook: settings.social_facebook || null,
      social_twitter: settings.social_twitter || null,
      social_linkedin: settings.social_linkedin || null,
      social_instagram: settings.social_instagram || null,
      auto_reply_enabled: settings.auto_reply_enabled,
      auto_reply_message: settings.auto_reply_message || null,
      quote_email_notification: settings.quote_email_notification,
      maintenance_mode: settings.maintenance_mode,
      theme_primary_color: settings.theme_primary_color || null,
      theme_accent_color: settings.theme_accent_color || null,
    });

    if (updated) {
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive',
      });
    }
  };

  if (isFetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader className="animate-spin mr-2" />
          <span>Loading settings...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Settings</h2>
          <p className="text-muted-foreground">Manage your business information and preferences</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

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
                <Label htmlFor="company_name" className="text-base font-medium mb-2">
                  Company Name
                </Label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={settings.company_name}
                  onChange={handleChange}
                  disabled={!canEdit}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="company_email" className="text-base font-medium mb-2">
                  Email Address
                </Label>
                <Input
                  id="company_email"
                  name="company_email"
                  type="email"
                  value={settings.company_email}
                  onChange={handleChange}
                  disabled={!canEdit}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="company_phone" className="text-base font-medium mb-2">
                  Phone Number
                </Label>
                <Input
                  id="company_phone"
                  name="company_phone"
                  type="tel"
                  value={settings.company_phone}
                  onChange={handleChange}
                  disabled={!canEdit}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="business_hours_open" className="text-base font-medium mb-2">
                  Business Hours Open
                </Label>
                <Input
                  id="business_hours_open"
                  name="business_hours_open"
                  value={settings.business_hours_open}
                  onChange={handleChange}
                  disabled={!canEdit}
                  placeholder="9:00 AM"
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="business_hours_close" className="text-base font-medium mb-2">
                  Business Hours Close
                </Label>
                <Input
                  id="business_hours_close"
                  name="business_hours_close"
                  value={settings.business_hours_close}
                  onChange={handleChange}
                  disabled={!canEdit}
                  placeholder="6:00 PM"
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company_address" className="text-base font-medium mb-2">
                Address
              </Label>
              <Textarea
                id="company_address"
                name="company_address"
                value={settings.company_address}
                onChange={handleChange}
                disabled={!canEdit}
                className="bg-background border-border min-h-[80px]"
              />
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Social Media</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="social_facebook">Facebook URL</Label>
                <Input
                  id="social_facebook"
                  name="social_facebook"
                  value={settings.social_facebook}
                  onChange={handleChange}
                  disabled={!canEdit}
                  placeholder="https://facebook.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="social_twitter">Twitter/X URL</Label>
                <Input
                  id="social_twitter"
                  name="social_twitter"
                  value={settings.social_twitter}
                  onChange={handleChange}
                  disabled={!canEdit}
                  placeholder="https://twitter.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                <Input
                  id="social_linkedin"
                  name="social_linkedin"
                  value={settings.social_linkedin}
                  onChange={handleChange}
                  disabled={!canEdit}
                  placeholder="https://linkedin.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input
                  id="social_instagram"
                  name="social_instagram"
                  value={settings.social_instagram}
                  onChange={handleChange}
                  disabled={!canEdit}
                  placeholder="https://instagram.com/..."
                  className="mt-1"
                />
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
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="quote_email_notification"
                  checked={settings.quote_email_notification}
                  onChange={(e) => handleCheckboxChange('quote_email_notification', e.target.checked)}
                  disabled={!canEdit}
                  className="w-4 h-4"
                />
                <label htmlFor="quote_email_notification" className="text-foreground font-medium">
                  Send email notifications for new quotes
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="auto_reply_enabled"
                  checked={settings.auto_reply_enabled}
                  onChange={(e) => handleCheckboxChange('auto_reply_enabled', e.target.checked)}
                  disabled={!canEdit}
                  className="w-4 h-4"
                />
                <label htmlFor="auto_reply_enabled" className="text-foreground font-medium">
                  Send automatic reply to quote requests
                </label>
              </div>

              {settings.auto_reply_enabled && (
                <div>
                  <Label htmlFor="auto_reply_message">Auto Reply Message</Label>
                  <Textarea
                    id="auto_reply_message"
                    name="auto_reply_message"
                    value={settings.auto_reply_message}
                    onChange={handleChange}
                    disabled={!canEdit}
                    placeholder="Thank you for your inquiry..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* System Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">System Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="maintenance_mode"
                  checked={settings.maintenance_mode}
                  onChange={(e) => handleCheckboxChange('maintenance_mode', e.target.checked)}
                  disabled={!canEdit}
                  className="w-4 h-4"
                />
                <label htmlFor="maintenance_mode" className="text-foreground font-medium">
                  Enable maintenance mode
                </label>
              </div>
              {settings.maintenance_mode && (
                <p className="text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                  Warning: When enabled, visitors will see a maintenance page instead of your website.
                </p>
              )}
            </div>
          </motion.div>

          {/* Save Button */}
          {canEdit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Button size="lg" onClick={handleSave} disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
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
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
