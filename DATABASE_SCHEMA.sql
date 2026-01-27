-- Connect Sierra Leone Website - Database Schema
-- Lovable Cloud / Supabase SQL

-- ============================================
-- 1. USERS TABLE (Team Members)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'moderator', 'editor', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. PAGES TABLE (Website Pages)
-- ============================================
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(500),
  featured_image VARCHAR(500),
  status VARCHAR(50) NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  view_count INTEGER DEFAULT 0,
  is_homepage BOOLEAN DEFAULT false,
  template_type VARCHAR(50) DEFAULT 'default',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);

-- ============================================
-- 3. QUOTES TABLE (Customer Quote Requests)
-- ============================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company VARCHAR(255),
  service VARCHAR(100) NOT NULL,
  budget VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'reviewed', 'quoted', 'rejected')) DEFAULT 'pending',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  quote_amount DECIMAL(10, 2),
  quote_document VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  replied_at TIMESTAMP
);

-- ============================================
-- 4. SERVICES TABLE (Services Offered)
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50),
  price_range VARCHAR(100),
  featured_image VARCHAR(500),
  detailed_page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. TESTIMONIALS TABLE (Customer Reviews)
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_avatar VARCHAR(500),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. SETTINGS TABLE (Website Configuration)
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255),
  company_email VARCHAR(255),
  company_phone VARCHAR(20),
  company_address TEXT,
  company_logo VARCHAR(500),
  company_favicon VARCHAR(500),
  business_hours_open VARCHAR(10),
  business_hours_close VARCHAR(10),
  social_facebook VARCHAR(255),
  social_twitter VARCHAR(255),
  social_linkedin VARCHAR(255),
  social_instagram VARCHAR(255),
  quote_email_notification BOOLEAN DEFAULT true,
  auto_reply_enabled BOOLEAN DEFAULT false,
  auto_reply_message TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  theme_primary_color VARCHAR(7),
  theme_accent_color VARCHAR(7),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. EMAIL_TEMPLATES TABLE (Email Messages)
-- ============================================
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  variables VARCHAR(500),
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. AUDIT_LOGS TABLE (System Activity)
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(100),
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 9. ANALYTICS TABLE (Website Statistics)
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  event_type VARCHAR(50) NOT NULL,
  user_count INTEGER DEFAULT 0,
  session_count INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5, 2),
  avg_session_duration INTEGER,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 10. TEAM_INVITATIONS TABLE (Invite Links)
-- ============================================
CREATE TABLE IF NOT EXISTS team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'viewer',
  token VARCHAR(255) UNIQUE NOT NULL,
  invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
  accepted_at TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES (Performance)
-- ============================================
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_author_id ON pages(author_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_email ON quotes(email);
CREATE INDEX idx_quotes_created_at ON quotes(created_at);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_analytics_page_id ON analytics(page_id);
CREATE INDEX idx_analytics_date ON analytics(date);

-- ============================================
-- DEFAULT DATA (Initial Setup)
-- ============================================

-- Insert default admin user
INSERT INTO users (email, name, role, is_active) 
VALUES ('admin@connectsl.com', 'Admin User', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- Insert default settings
INSERT INTO settings (company_name, company_email, company_phone, company_address)
VALUES (
  'Connect Sierra Leone',
  'info@connectsl.com',
  '+232 XX XXX XXXX',
  'Freetown, Sierra Leone'
)
ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (name, slug, description, icon, status, order_index)
VALUES 
  ('Software Development', 'software-development', 'Custom software solutions for your business', 'Code', 'active', 1),
  ('Web Design', 'web-design', 'Beautiful and responsive web design', 'Palette', 'active', 2),
  ('Phone Unlocking', 'phone-unlocking', 'Professional phone unlocking services', 'Smartphone', 'active', 3),
  ('Computer Solutions', 'computer-solutions', 'Computer repair and maintenance', 'Cpu', 'active', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert default pages
INSERT INTO pages (title, slug, content, status, is_homepage, template_type)
VALUES 
  (
    'Home',
    '/',
    '<h1>Welcome to Connect Sierra Leone</h1><p>Your trusted technology partner</p>',
    'published',
    true,
    'homepage'
  ),
  (
    'About Us',
    '/about',
    '<h1>About Connect Sierra Leone</h1><p>We are dedicated to providing excellent service</p>',
    'published',
    false,
    'default'
  ),
  (
    'Services',
    '/services',
    '<h1>Our Services</h1><p>Explore what we can offer you</p>',
    'published',
    false,
    'services'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert default email templates
INSERT INTO email_templates (name, subject, content)
VALUES 
  (
    'Quote Confirmation',
    'Thank you for your quote request',
    '<p>Dear {{client_name}},</p><p>Thank you for requesting a quote. We will review your request and get back to you shortly.</p>'
  ),
  (
    'Quote Response',
    'Your quote from Connect Sierra Leone',
    '<p>Dear {{client_name}},</p><p>Here is your requested quote: {{quote_amount}}</p>'
  ),
  (
    'Welcome',
    'Welcome to Connect Sierra Leone',
    '<p>Welcome to our platform!</p>'
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;

-- Users: Anyone can view, only admins can modify


-- Pages: Published pages visible to all, editing restricted by role
CREATE POLICY "pages_select_public" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "pages_select_admin" ON pages FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor'));
CREATE POLICY "pages_insert" ON pages FOR INSERT WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor'));
CREATE POLICY "pages_update" ON pages FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor'));
CREATE POLICY "pages_delete" ON pages FOR DELETE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Quotes: Authenticated users can view/manage based on role
CREATE POLICY "quotes_select" ON quotes FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') IS NOT NULL);
CREATE POLICY "quotes_insert" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "quotes_update" ON quotes FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator'));
CREATE POLICY "quotes_delete" ON quotes FOR DELETE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Services: Public read, admin edit
CREATE POLICY "services_select" ON services FOR SELECT USING (status = 'active' OR (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor'));
CREATE POLICY "services_insert" ON services FOR INSERT WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'editor'));
CREATE POLICY "services_update" ON services FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor'));
CREATE POLICY "services_delete" ON services FOR DELETE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Settings: Only admins can modify
CREATE POLICY "settings_select" ON settings FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor') OR true);
CREATE POLICY "settings_update" ON settings FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Testimonials: Public approved ones visible, admins manage all
CREATE POLICY "testimonials_select_public" ON testimonials FOR SELECT USING (status = 'approved' AND featured = true);
CREATE POLICY "testimonials_select_admin" ON testimonials FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator'));
CREATE POLICY "testimonials_insert" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "testimonials_update" ON testimonials FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator'));
CREATE POLICY "testimonials_delete" ON testimonials FOR DELETE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Email Templates: Only admins can modify
CREATE POLICY "email_templates_select" ON email_templates FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator', 'editor'));
CREATE POLICY "email_templates_update" ON email_templates FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Audit Logs: Only admins can view
CREATE POLICY "audit_logs_select" ON audit_logs FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
CREATE POLICY "audit_logs_insert" ON audit_logs FOR INSERT WITH CHECK (true);

-- Analytics: Moderators and admins can view
CREATE POLICY "analytics_select" ON analytics FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'moderator'));
CREATE POLICY "analytics_insert" ON analytics FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for pages
CREATE TRIGGER pages_updated_at BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for quotes
CREATE TRIGGER quotes_updated_at BEFORE UPDATE ON quotes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for services
CREATE TRIGGER services_updated_at BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for testimonials
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for email_templates
CREATE TRIGGER email_templates_updated_at BEFORE UPDATE ON email_templates
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log audit records
CREATE OR REPLACE FUNCTION log_audit_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (action, entity_type, entity_id, new_values)
  VALUES (
    TG_ARGV[0],
    TG_TABLE_NAME,
    NEW.id::text,
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS (Useful Queries)
-- ============================================

-- Published pages view
CREATE OR REPLACE VIEW published_pages AS
SELECT id, title, slug, content, featured_image, view_count, created_at
FROM pages
WHERE status = 'published'
ORDER BY is_homepage DESC, created_at DESC;

-- Active services view
CREATE OR REPLACE VIEW active_services AS
SELECT id, name, slug, description, icon, price_range, featured_image
FROM services
WHERE status = 'active'
ORDER BY order_index ASC;

-- Quote stats view
CREATE OR REPLACE VIEW quote_stats AS
SELECT 
  COUNT(*) as total_quotes,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_quotes,
  COUNT(CASE WHEN status = 'reviewed' THEN 1 END) as reviewed_quotes,
  COUNT(CASE WHEN status = 'quoted' THEN 1 END) as quoted_quotes,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_quotes
FROM quotes;

-- Team members view
CREATE OR REPLACE VIEW team_members AS
SELECT id, email, name, avatar, role, is_active, last_login
FROM users
WHERE is_active = true
ORDER BY role DESC, created_at ASC;

-- Analytics summary view
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
  page_id,
  SUM(page_views) as total_views,
  AVG(bounce_rate) as avg_bounce_rate,
  AVG(avg_session_duration) as avg_duration
FROM analytics
GROUP BY page_id;
