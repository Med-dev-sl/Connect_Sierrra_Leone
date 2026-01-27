# Database Setup Guide - Connect Sierra Leone

## SQL Database Schema

All SQL code to create your database structure is in `DATABASE_SCHEMA.sql`

### Quick Setup Steps:

#### 1. **Supabase Setup** (Recommended)
1. Go to https://supabase.com
2. Create a new project
3. Copy your `Project URL` and `Anon Key`
4. Add to `.env.local`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

#### 2. **Create Tables**
1. In Supabase, go to SQL Editor
2. Open `DATABASE_SCHEMA.sql`
3. Copy all SQL code and paste in the SQL Editor
4. Click "Run" to execute all queries

#### 3. **Enable Row Level Security (RLS)**
The schema already includes RLS policies. To verify they're active:
1. Go to Supabase > Authentication > Policies
2. You should see policies for all tables

---

## Database Tables

### 1. **pages** - Website pages
```sql
Fields: id, title, slug, content, status, featured_image, view_count, is_homepage, created_at, updated_at
```

### 2. **quotes** - Customer quote requests
```sql
Fields: id, name, email, phone, company, service, budget, message, status, assigned_to, notes, created_at
```

### 3. **users** - Team members
```sql
Fields: id, email, name, avatar, role, is_active, last_login, created_at
Roles: admin, moderator, editor, viewer
```

### 4. **services** - Services offered
```sql
Fields: id, name, slug, description, icon, price_range, status, order_index, created_at
```

### 5. **testimonials** - Customer reviews
```sql
Fields: id, client_name, client_company, content, rating, status, featured, created_at
```

### 6. **settings** - Website configuration
```sql
Fields: company_name, company_email, company_phone, business_hours_open, business_hours_close, social_*, theme_*
```

### 7. **email_templates** - Email messages
```sql
Fields: id, name, subject, content, variables, status, created_at
```

### 8. **audit_logs** - System activity log
```sql
Fields: id, user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at
```

### 9. **analytics** - Website statistics
```sql
Fields: id, page_id, event_type, user_count, session_count, page_views, bounce_rate, date, created_at
```

### 10. **team_invitations** - Invite links
```sql
Fields: id, email, role, token, invited_by, accepted_at, expires_at, created_at
```

---

## Connect to Admin Dashboard

The admin dashboard automatically connects to these tables:

### Page Management (`/admin/pages`)
- ✅ View all pages
- ✅ Create new pages
- ✅ Edit pages
- ✅ Delete pages
- ✅ Publish/Draft status
- ✅ SEO meta description

### Quote Management (`/admin/quotes`)
- ✅ View all quote requests
- ✅ Update quote status
- ✅ Send email replies
- ✅ Assign to team members
- ✅ Add quote amount and document

### User Management (`/admin/users`)
- ✅ View team members
- ✅ Create new users
- ✅ Assign roles
- ✅ Delete users

### Settings (`/admin/settings`)
- ✅ Company information
- ✅ Business hours
- ✅ Social media links
- ✅ Email notifications
- ✅ Theme colors

---

## Using the Database Hook

In any component, import and use the database:

```typescript
import { useDatabase } from '@/hooks/use-database';

export function MyComponent() {
  const { getPages, createPage, updatePage, deletePage, isLoading, error } = useDatabase();

  useEffect(() => {
    const loadPages = async () => {
      const pages = await getPages('published');
      console.log(pages);
    };
    loadPages();
  }, [getPages]);

  const handleCreate = async () => {
    const newPage = await createPage({
      title: 'New Page',
      slug: '/new-page',
      content: 'Content here',
      status: 'draft',
      author_id: 'user-123',
      view_count: 0,
      is_homepage: false,
      template_type: 'default',
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

---

## Database Methods Available

### Pages
- `getPages(status?)` - Get all pages, optionally filtered by status
- `getPageBySlug(slug)` - Get single page by URL slug
- `createPage(page)` - Create new page
- `updatePage(id, updates)` - Update page
- `deletePage(id)` - Delete page

### Quotes
- `getQuotes(status?)` - Get all quotes, optionally filtered
- `createQuote(quote)` - Submit new quote request
- `updateQuote(id, updates)` - Update quote
- `deleteQuote(id)` - Delete quote

### Services
- `getServices(activeOnly?)` - Get all services
- `createService(service)` - Create service
- `updateService(id, updates)` - Update service

### Users
- `getUsers()` - Get all team members
- `createUser(user)` - Add team member
- `updateUser(id, updates)` - Update user role/info
- `deleteUser(id)` - Remove team member

### Settings
- `getSettings()` - Get website settings
- `updateSettings(updates)` - Update settings

### Testimonials
- `getTestimonials(status?)` - Get testimonials
- `createTestimonial(testimonial)` - Submit testimonial
- `updateTestimonial(id, updates)` - Update testimonial

---

## Default Data

The schema includes default data:

1. **Admin User**
   - Email: admin@connectsl.com
   - Role: admin

2. **Default Services**
   - Software Development
   - Web Design
   - Phone Unlocking
   - Computer Solutions

3. **Default Pages**
   - Home (/)
   - About Us (/about)
   - Services (/services)

4. **Email Templates**
   - Quote Confirmation
   - Quote Response
   - Welcome Email

---

## Environment Variables Required

Create `.env.local` in your project root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# Optional: Lovable Cloud
VITE_LOVABLE_API_KEY=your_api_key
VITE_LOVABLE_PROJECT_ID=your_project_id
VITE_LOVABLE_ENDPOINT=https://api.lovable.cloud
```

---

## Troubleshooting

### "No rows returned"
- Check if table exists in Supabase
- Verify data was inserted (check default data in schema)
- Check RLS policies aren't blocking access

### "CORS error"
- Verify Supabase Project URL is correct
- Check if Supabase CORS settings allow your domain
- Make sure Anon Key has read/write permissions

### "Authentication failed"
- Verify `VITE_SUPABASE_PUBLISHABLE_KEY` is correct
- Check if user has proper role permissions in RLS policies
- Ensure JWT token is valid

### "Data not saving"
- Check if RLS policies allow INSERT operations
- Verify user has proper role (admin, moderator, editor, viewer)
- Check browser console for specific error messages

---

## API References

### Supabase Documentation
- Docs: https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript/v2

### Real-time Updates
The database hook automatically handles Supabase real-time subscriptions. To enable live updates:

```typescript
// Real-time listening is built into the hook
// Simply re-call getPages() to refresh data
```

---

## Next Steps

1. ✅ Set up Supabase account and project
2. ✅ Run SQL schema to create tables
3. ✅ Add environment variables
4. ✅ Test admin dashboard connectivity
5. ⏳ Set up RLS policies for security
6. ⏳ Configure email notifications
7. ⏳ Set up audit logging

---

## Support

For issues, check:
1. Browser console errors
2. Supabase dashboard logs
3. Network tab for failed requests
4. RLS policies in Supabase
5. User role and permissions

