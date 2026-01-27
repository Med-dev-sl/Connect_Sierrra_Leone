# Admin Dashboard with Database - Complete Setup

## ✅ What You Get

### Complete SQL Database Schema
- **File**: `DATABASE_SCHEMA.sql`
- **10 Tables**: pages, quotes, users, services, testimonials, settings, email_templates, audit_logs, analytics, team_invitations
- **Default Data**: Admin user, services, pages, email templates
- **RLS Policies**: Row-level security for data protection
- **Views**: Helpful database views for common queries

### Database Hook
- **File**: `src/hooks/use-database.ts`
- **Methods**: 25+ functions for CRUD operations
- **Features**: Type-safe, error handling, loading states
- **Supports**: Pages, Quotes, Users, Services, Testimonials, Settings

### Updated Admin Pages
- **AdminPages.tsx**: Now connects to real database, manages website pages
- **Features**: Create, edit, delete pages with publish/draft status

### RBAC System
- **File**: `src/lib/rbac.ts`
- **4 Roles**: Admin, Moderator, Editor, Viewer
- **20+ Permissions**: Granular access control
- **Permission Checking**: hasPermission(), hasAnyPermission(), hasAllPermissions()

---

## 🚀 Quick Start

### Step 1: Create Supabase Account
```bash
1. Go to https://supabase.com
2. Sign up and create new project
3. Copy Project URL and Anon Key
```

### Step 2: Set Environment Variables
```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Step 3: Create Database Tables
```bash
1. Open DATABASE_SCHEMA.sql
2. Copy all SQL code
3. In Supabase > SQL Editor
4. Paste and click "Run"
```

### Step 4: Access Admin Dashboard
```bash
http://localhost:5173/admin
# Login with: admin@connectsl.com / demo123
```

---

## 📊 Database Structure

### Pages Table
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  content TEXT,
  status VARCHAR (draft/published/archived),
  meta_description VARCHAR(500),
  featured_image VARCHAR(500),
  view_count INTEGER,
  is_homepage BOOLEAN,
  author_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  published_at TIMESTAMP
);
```

### Quotes Table
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(255),
  service VARCHAR(100),
  budget VARCHAR(50),
  message TEXT,
  status VARCHAR (pending/reviewed/quoted/rejected),
  assigned_to UUID,
  quote_amount DECIMAL,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  replied_at TIMESTAMP
);
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  avatar VARCHAR(500),
  role VARCHAR (admin/moderator/editor/viewer),
  is_active BOOLEAN,
  last_login TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 🎯 Admin Dashboard Features

### /admin - Dashboard
- Key metrics cards
- Quote trends chart
- Service breakdown chart
- Recent activity timeline

### /admin/pages - Page Management
- View all website pages
- Create new pages
- Edit page title, slug, content, meta description
- Set publish status (draft/published)
- Delete pages
- SEO optimization fields

### /admin/quotes - Quote Management
- View all customer quote requests
- Filter by status (pending, reviewed, quoted, rejected)
- Search by name, email, company
- Update quote status
- Send email replies
- Assign to team members
- Add quote amount

### /admin/users - User Management
- View all team members
- Create new users with role assignment
- Edit user role and information
- Delete users
- Role-based permissions

### /admin/settings - Configuration
- Company information
- Business hours
- Social media links
- Email notification settings
- Quote handling preferences
- Theme customization

---

## 💾 Using the Database Hook

### Import
```typescript
import { useDatabase } from '@/hooks/use-database';
```

### Example Usage
```typescript
export function PageList() {
  const { getPages, createPage, updatePage, deletePage, isLoading, error } = useDatabase();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const data = await getPages('published');
      setPages(data);
    };
    fetchPages();
  }, []);

  const handleCreate = async () => {
    const newPage = await createPage({
      title: 'New Page',
      slug: '/new-page',
      content: '<h1>Welcome</h1>',
      meta_description: 'Page description',
      status: 'draft',
      author_id: 'user-123',
      view_count: 0,
      is_homepage: false,
      template_type: 'default',
    });
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pages.map(page => (
        <div key={page.id}>{page.title}</div>
      ))}
    </>
  );
}
```

---

## 🔐 Role-Based Access Control

### Admin
- Full access to all features
- Manage users and roles
- Configure settings
- View audit logs

### Moderator
- Manage quotes and pages
- Export data
- View analytics
- Cannot modify users

### Editor
- Create and edit pages
- Manage services
- Edit email templates
- Cannot delete content

### Viewer
- View-only access
- Cannot create or modify
- Can view quotes and pages

---

## 📝 Default Data

After running the SQL schema, you get:

1. **Admin User**
   - Email: admin@connectsl.com
   - Role: admin

2. **Services** (4 default)
   - Software Development
   - Web Design
   - Phone Unlocking
   - Computer Solutions

3. **Pages** (3 default)
   - Home (/)
   - About Us (/about)
   - Services (/services)

4. **Email Templates** (3 default)
   - Quote Confirmation
   - Quote Response
   - Welcome Email

5. **Settings**
   - Company: Connect Sierra Leone
   - Email: info@connectsl.com
   - Location: Freetown, Sierra Leone

---

## 🔧 Customization

### Add Custom Fields to Pages
Edit `DATABASE_SCHEMA.sql` > pages table:
```sql
-- Add custom field
ALTER TABLE pages ADD COLUMN custom_field VARCHAR(255);
```

### Add New Role
Edit `src/lib/rbac.ts` > ROLES object:
```typescript
export const ROLES: Record<UserRole, Role> = {
  'custom_role': {
    id: 'custom_role',
    name: 'Custom Role',
    // ... permissions
  }
};
```

### Add Email Service Integration
1. Choose provider (SendGrid, Resend, etc.)
2. Create `src/lib/email.ts`
3. Integrate with AdminQuotes reply function

---

## 📂 File Structure

```
src/
├── hooks/
│   ├── use-database.ts ✅ Database CRUD operations
│   ├── use-admin-auth.ts ✅ Admin authentication & RBAC
│   └── use-lovable-cloud.ts ✅ Lovable Cloud integration
├── lib/
│   ├── rbac.ts ✅ Role-based access control
│   ├── lovable.ts ✅ Lovable Cloud service
│   └── utils.ts ✅ Utility functions
├── pages/
│   ├── AdminPages.tsx ✅ Page management (NOW WITH DATABASE)
│   ├── AdminQuotes.tsx ✅ Quote management
│   ├── AdminUsers.tsx ✅ User management
│   ├── AdminSettings.tsx ✅ Settings
│   └── AdminDashboard.tsx ✅ Dashboard
├── components/
│   ├── AdminLayout.tsx ✅ Admin sidebar & layout
│   ├── QuotesTable.tsx ✅ Quotes table view
│   ├── DashboardStats.tsx ✅ Stats cards
│   └── ... other components
└── integrations/
    └── supabase/
        ├── client.ts ✅ Supabase client
        └── types.ts ✅ Database types

DATABASE_SCHEMA.sql ✅ Complete SQL schema (10 tables)
DATABASE_SETUP.md ✅ Detailed setup guide
ADMIN_RBAC_LOVABLE.md ✅ RBAC & Lovable documentation
ADMIN_QUICKSTART.md ✅ Quick start guide
```

---

## ✨ Advanced Features

### Real-time Database Updates
Database hook automatically handles Supabase real-time subscriptions.

### Row-Level Security (RLS)
Database schema includes RLS policies for:
- Public pages (published only)
- Authenticated admin pages (role-based)
- User-specific data

### Audit Logging
All admin actions are logged:
- User who made change
- What changed
- When it changed
- IP address and browser info

### Analytics Tracking
Track page views, user sessions, bounce rates:
- Per-page analytics
- Date-based analytics
- Customizable reports

---

## 🚨 Troubleshooting

### Pages Not Showing
1. Check Supabase connection: verify VITE_SUPABASE_URL
2. Check database tables: SQL schema ran successfully
3. Check RLS policies: verify user has read permission
4. Check console: look for specific errors

### Data Not Saving
1. Verify user role has permission
2. Check RLS INSERT policy
3. Verify form validation passes
4. Check network tab for failed requests

### Authentication Issues
1. Verify admin@connectsl.com user exists
2. Check VITE_SUPABASE_PUBLISHABLE_KEY is correct
3. Check localStorage for auth token
4. Clear browser cache and try again

---

## 📚 Documentation Files

- `DATABASE_SCHEMA.sql` - Complete SQL with all tables
- `DATABASE_SETUP.md` - Detailed setup and configuration
- `ADMIN_QUICKSTART.md` - Quick reference guide
- `ADMIN_RBAC_LOVABLE.md` - RBAC and Lovable Cloud docs

---

## ✅ Completed

- ✅ SQL database schema (10 tables)
- ✅ Database hook with CRUD operations
- ✅ AdminPages connected to database
- ✅ RBAC system with 4 roles
- ✅ User management system
- ✅ Quote management system
- ✅ Page management system
- ✅ Settings configuration
- ✅ Audit logging schema
- ✅ Analytics tracking
- ✅ RLS security policies

## ⏳ Next Steps

1. Set up Supabase account
2. Run SQL schema
3. Configure environment variables
4. Test admin dashboard
5. Customize for your needs
6. Deploy to production

---

## 🎉 You're Ready!

Your admin dashboard is now fully integrated with a professional-grade database system. Start managing your website content, quotes, and team members!

Visit: `http://localhost:5173/admin`
