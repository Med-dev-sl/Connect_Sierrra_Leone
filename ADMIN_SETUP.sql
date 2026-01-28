-- ============================================
-- ADMIN SETUP SCRIPT FOR SUPABASE
-- ============================================
-- This script creates admin authentication and credentials
-- Run this AFTER the main DATABASE_SCHEMA.sql

-- Step 1: Create admin user in Supabase Auth
-- NOTE: Do this manually in Supabase Console:
-- 1. Go to Authentication → Users
-- 2. Click "Add user" → "Invite with email"
-- 3. Email: admin@connectsl.com
-- 4. Password: (generate secure password or set manually)
-- 5. Auto confirm user checkbox (optional)

-- Step 2: Update the users table with admin credentials
-- After creating auth user, copy the UUID and run this:
UPDATE users 
SET role = 'admin', is_active = true 
WHERE email = 'admin@connectsl.com';

-- Step 3: Create additional team members (optional)
INSERT INTO users (email, name, role, is_active)
VALUES 
  ('moderator@connectsl.com', 'Moderator User', 'moderator', true),
  ('editor@connectsl.com', 'Editor User', 'editor', true)
ON CONFLICT (email) DO NOTHING;

-- Step 4: Verify setup
SELECT id, email, name, role, is_active, created_at FROM users ORDER BY role DESC;

-- ============================================
-- QUICK ADMIN CREDENTIALS REFERENCE
-- ============================================
/*
EMAIL: admin@connectsl.com
PASSWORD: (set in Supabase Auth Console)

ROLES AVAILABLE:
- admin: Full system access
- moderator: Manage content & quotes
- editor: Create and edit pages
- viewer: Read-only access

TO CREATE NEW ADMIN:
1. Create auth user in Supabase Console (admin@connectsl.com)
2. Run: UPDATE users SET role = 'admin' WHERE email = 'admin@connectsl.com';

TO CREATE NEW TEAM MEMBER:
1. Create auth user in Supabase Console (user@connectsl.com)
2. Run: INSERT INTO users (email, name, role, is_active) 
        VALUES ('user@connectsl.com', 'User Name', 'editor', true);
*/
