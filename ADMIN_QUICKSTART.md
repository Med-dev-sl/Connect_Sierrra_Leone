# Admin Dashboard - Quick Start Guide

## Overview
Your website now has a complete admin dashboard with:
- ✅ Role-Based Access Control (RBAC) with 4 user roles
- ✅ Lovable Cloud integration for backend connectivity
- ✅ Quote management system
- ✅ Page management
- ✅ User/team management
- ✅ Settings configuration
- ✅ Analytics dashboard

## Access the Admin Dashboard

### URL
```
http://localhost:5173/admin/login
```

### Demo Credentials
```
Email: admin@connectsl.com
Password: demo123 (or any password)
```

Click "Use Demo Credentials" button to auto-fill.

## Dashboard Navigation

After login, you'll have access to:

### 1. **Dashboard** (`/admin`)
- Key performance metrics
- Quote trends chart
- Service breakdown pie chart
- Recent activity timeline

### 2. **Quotes** (`/admin/quotes`)
- View all customer quote requests
- Search and filter quotes
- Update quote status
- Send email replies
- Export quotes

### 3. **Pages** (`/admin/pages`)
- Create website pages
- Edit page content
- Publish or save as draft
- Manage URL slugs

### 4. **Users** (`/admin/users`)
- Add team members
- Assign roles (admin, moderator, editor, viewer)
- Edit user information
- Delete users

### 5. **Settings** (`/admin/settings`)
- Configure business information
- Email settings
- Quote handling preferences
- Business hours

## Role Permissions

### Admin (Full Access)
- All permissions across all modules
- Can create/edit/delete users
- Can manage settings

### Moderator (Manage Content)
- View and manage quotes
- Edit pages and services
- Export quotes
- View analytics

### Editor (Create Content)
- Create and edit pages
- Manage services
- Edit email templates
- View quotes (read-only)

### Viewer (Read-Only)
- View quotes
- View pages and services
- View analytics

## Setting Up Lovable Cloud

### Step 1: Get API Credentials
1. Visit https://lovable.cloud
2. Create an account and project
3. Generate API credentials
4. Copy API key and Project ID

### Step 2: Configure Environment Variables
Create a `.env.local` file in your project root:

```env
VITE_LOVABLE_API_KEY=your_api_key_here
VITE_LOVABLE_PROJECT_ID=your_project_id_here
VITE_LOVABLE_ENDPOINT=https://api.lovable.cloud
```

### Step 3: Verify Connection
1. Navigate to admin dashboard
2. System will automatically connect to Lovable Cloud
3. Check browser console for connection status

## Using Admin Features

### Add a Team Member
1. Navigate to `/admin/users`
2. Click "Add User" button
3. Fill in email, name, and select role
4. Click "Create User"

### Create a Website Page
1. Navigate to `/admin/pages`
2. Click "New Page" button
3. Enter title, URL slug, and content
4. Choose status (draft or published)
5. Click "Create Page"

### Manage Quote Requests
1. Navigate to `/admin/quotes`
2. Search or filter quotes
3. Click eye icon to view details
4. Update status in dropdown
5. Click message icon to send reply

### Configure Settings
1. Navigate to `/admin/settings`
2. Update business information
3. Configure email preferences
4. Set quote handling options
5. Click "Save Settings"

## Database Setup (Optional)

To store data in Supabase instead of mock data:

### Create Tables

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('admin', 'moderator', 'editor', 'viewer')),
  avatar VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes table
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  company VARCHAR,
  service VARCHAR NOT NULL,
  budget VARCHAR NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'quoted', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Permission Model

### Permission Structure
Each permission has:
- `id`: Unique identifier
- `name`: Human-readable name
- `resource`: Module (quotes, pages, users, etc.)
- `action`: Action (view, create, edit, delete)

### Example: Check Permission in Component
```typescript
import useAdminAuth from '@/hooks/use-admin-auth';

export const MyComponent = () => {
  const { hasPermission } = useAdminAuth();

  if (!hasPermission('quotes_edit')) {
    return <div>You don't have permission to edit quotes</div>;
  }

  return <div>Quote editor</div>;
};
```

## Troubleshooting

### Can't Login
- Check if localStorage is enabled
- Clear browser cookies/cache
- Verify environment variables are set

### Pages Not Loading
- Check browser console for errors
- Verify Lovable Cloud connection
- Ensure environment variables are correct

### Permission Denied
- Check user role in admin panel
- Verify role has required permissions
- Ask admin to assign correct role

### API Connection Failed
- Verify API endpoint URL
- Check API credentials
- Ensure CORS is enabled
- Check network connectivity

## File Locations

### Key Files
- Admin Login: `src/pages/AdminLogin.tsx`
- Dashboard: `src/pages/AdminDashboard.tsx`
- Quote Management: `src/pages/AdminQuotes.tsx`
- Page Management: `src/pages/AdminPages.tsx`
- User Management: `src/pages/AdminUsers.tsx`
- Settings: `src/pages/AdminSettings.tsx`
- RBAC System: `src/lib/rbac.ts`
- Lovable Integration: `src/lib/lovable.ts`
- Admin Hooks: `src/hooks/use-admin-auth.ts`
- Lovable Hook: `src/hooks/use-lovable-cloud.ts`

## Next Steps

1. **Set Up Lovable Cloud**
   - Get API credentials
   - Configure environment variables
   - Test connection

2. **Customize RBAC**
   - Add more roles if needed
   - Define custom permissions
   - Assign permissions to roles

3. **Connect Database**
   - Create Supabase/database tables
   - Replace mock data with real queries
   - Implement data persistence

4. **Set Up Email**
   - Configure email provider
   - Create email templates
   - Enable automated responses

5. **Deploy**
   - Build project
   - Set environment variables
   - Deploy to production

## Documentation Files

For more detailed information, see:
- `ADMIN_RBAC_LOVABLE.md` - Complete RBAC & Lovable documentation
- `ADMIN_DASHBOARD.md` - Original admin dashboard docs
- `QUOTE_SYSTEM.md` - Quote system documentation

## Support

For issues or questions:
1. Check the documentation files
2. Review browser console logs
3. Check Lovable Cloud dashboard
4. Contact support at support@connectsl.com

---

**Your admin dashboard is ready to use!**
Start by logging in and exploring the features.
