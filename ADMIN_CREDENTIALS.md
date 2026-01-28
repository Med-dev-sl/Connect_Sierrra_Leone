# 🔐 ADMIN CREDENTIALS & AUTHENTICATION SETUP

## ⚡ QUICK SETUP (5 MINUTES)

### Step 1: Create Admin User in Supabase

1. Go to your Supabase project dashboard
2. Click **Authentication** → **Users** (left sidebar)
3. Click **Add user** button
4. Select **Invite with email**
5. Fill in:
   - **Email**: `admin@connectsl.com`
   - **Password**: Create a strong password (or let Supabase generate one)
6. Click **Send invite** (optional: check "Auto confirm user" to skip email verification)

![Supabase Auth Setup](https://via.placeholder.com/600x400?text=Supabase+Auth+Setup)

### Step 2: Verify in Database

After creating the auth user, the `admin@connectsl.com` user should already exist in the `users` table from DEFAULT DATA section of DATABASE_SCHEMA.sql.

Verify with this SQL query in Supabase SQL Editor:

```sql
SELECT id, email, name, role, is_active FROM users WHERE email = 'admin@connectsl.com';
```

You should see:
```
id          | email                 | name       | role  | is_active
------------|----------------------|------------|-------|----------
[UUID]      | admin@connectsl.com   | Admin User | admin | true
```

### Step 3: Login to Admin Dashboard

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:5173/login`
3. Enter credentials:
   - **Email**: `admin@connectsl.com`
   - **Password**: (the password you set above)
4. Click **Login**
5. You'll be redirected to `/admin` dashboard

✅ **Success!** You're now logged in.

---

## 👥 CREATE ADDITIONAL TEAM MEMBERS

### Method 1: Via Supabase Console (Recommended)

```bash
# 1. Create auth user in Supabase Console (same as Step 1 above)
Email: user@connectsl.com
Password: [secure password]

# 2. Run this SQL to assign role:
UPDATE users 
SET role = 'moderator'  -- or 'editor' or 'viewer'
WHERE email = 'user@connectsl.com';
```

### Method 2: Via SQL Script

```sql
-- Create user record (auth user must exist in Supabase first)
INSERT INTO users (email, name, role, is_active)
VALUES ('newuser@connectsl.com', 'New User', 'editor', true)
ON CONFLICT (email) DO NOTHING;
```

---

## 🎯 USER ROLES & PERMISSIONS

### Admin
- ✅ Full system access
- ✅ Manage pages, quotes, users, settings
- ✅ View analytics
- ✅ Delete content
- ✅ Manage team members
- ✅ View audit logs

### Moderator
- ✅ Manage content (pages)
- ✅ Manage quotes & testimonials
- ✅ View analytics
- ❌ Cannot delete users or change settings

### Editor
- ✅ Create and edit pages
- ✅ Manage media files
- ✅ View own content
- ❌ Cannot delete pages
- ❌ Cannot manage quotes or users

### Viewer
- ✅ Read-only access
- ✅ View published pages
- ✅ View analytics
- ❌ Cannot create or modify content

---

## 🔑 DEFAULT CREDENTIALS

```
EMAIL: admin@connectsl.com
PASSWORD: (set during Supabase setup)
ROLE: Admin
```

**⚠️ Important**: Change the default admin password in production!

---

## 🛡️ SECURITY SETUP

### 1. Row-Level Security (RLS) - Already Enabled ✅

All tables have RLS policies configured:
- Published pages visible to all
- Admin pages restricted to authenticated users
- Role-based access control on all operations
- Audit logging enabled

### 2. Environment Variables

Make sure your `.env.local` has:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

Get these from: **Supabase Project Settings** → **API** → **Project URL & Keys**

### 3. Authentication Flow

```
User Login → Supabase Auth → JWT Token → Stored in localStorage
                                     ↓
            useAuth hook checks session on app load
                                     ↓
            ProtectedRoute wraps admin pages
                                     ↓
            RLS policies enforce backend security
```

---

## 🔍 VERIFY AUTHENTICATION WORKS

### 1. Check localStorage

Open browser DevTools (F12) → Application → Local Storage
You should see:
- `sb-[project-id]-auth-token`
- `sb-[project-id]-auth-token-code-verifier`

### 2. Check User Session

In browser console:
```javascript
// Get current session
const session = await supabase.auth.getSession();
console.log(session);

// Get current user
const user = await supabase.auth.getUser();
console.log(user);
```

### 3. Test Protected Routes

- ✅ `/admin` - Should load (authenticated)
- ✅ `/admin/pages` - Should load (authenticated)
- ❌ `/admin` without login - Should redirect to `/login`

---

## 🚨 TROUBLESHOOTING

### "Invalid credentials"

**Problem**: Login fails with "Invalid email or password"

**Solutions**:
1. Verify user exists in Supabase Auth (Authentication → Users)
2. Check email is exactly `admin@connectsl.com`
3. Verify password is correct (case-sensitive)
4. If user not yet confirmed, check email inbox for verification link

### "User profile not found"

**Problem**: Login succeeds but profile doesn't load

**Solutions**:
1. Verify user exists in `users` table:
```sql
SELECT * FROM users WHERE email = 'admin@connectsl.com';
```
2. If missing, insert:
```sql
INSERT INTO users (email, name, role, is_active)
VALUES ('admin@connectsl.com', 'Admin User', 'admin', true);
```

### "Unauthorized" on page load

**Problem**: See "403 Unauthorized" errors

**Solutions**:
1. Check RLS policies are correct (should see policies in SQL Editor)
2. Verify JWT token has proper `app_metadata.role` claim
3. Check Supabase logs for policy violations

### Redirected to login unexpectedly

**Problem**: Keep getting redirected to `/login`

**Solutions**:
1. Clear browser cache and localStorage
2. Check auth session: `supabase.auth.getSession()`
3. Try logging in again
4. Check console for errors (F12 → Console)

---

## 📋 ADMIN SETUP CHECKLIST

- [ ] Create Supabase account and project
- [ ] Copy DATABASE_SCHEMA.sql to Supabase SQL Editor and run
- [ ] Create admin user (email: `admin@connectsl.com`) in Auth console
- [ ] Verify admin user in users table
- [ ] Set environment variables (.env.local)
- [ ] Run `npm run dev` to start frontend
- [ ] Navigate to http://localhost:5173/login
- [ ] Login with admin credentials
- [ ] Access /admin dashboard
- [ ] Create pages, quotes, etc. to test
- [ ] Verify data in Supabase dashboard

---

## 🔄 LOGIN FLOW DIAGRAM

```
┌─────────────────┐
│   Login Page    │
└────────┬────────┘
         │ Email + Password
         ↓
┌─────────────────────────────┐
│  Supabase Auth.signIn()     │
└────────┬────────────────────┘
         │ Returns Session + User
         ↓
┌─────────────────────────────┐
│  Fetch User Profile from DB │
└────────┬────────────────────┘
         │ Returns role, name, etc.
         ↓
┌─────────────────────────────┐
│  Store in useAuth Context   │
└────────┬────────────────────┘
         │ isAuthenticated = true
         ↓
┌─────────────────────────────┐
│  Redirect to /admin         │
└─────────────────────────────┘
```

---

## 📞 NEXT STEPS

1. ✅ Setup complete? Test all functionality
2. Create other team members (moderator, editor, viewer)
3. Create sample pages, quotes, testimonials
4. Configure settings (company info, social media, etc.)
5. Setup email templates
6. Deploy to production
7. Change default admin password

---

**Version**: 1.0  
**Last Updated**: Jan 27, 2026  
**Status**: Production Ready ✅
