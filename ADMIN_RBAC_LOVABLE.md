# Admin Dashboard - Complete RBAC & Lovable Cloud Integration

## Overview
A fully-featured admin dashboard with Role-Based Access Control (RBAC) and Lovable Cloud integration. Manage your entire website including quotes, pages, users, and content through a single powerful interface.

## Features

### 1. **Role-Based Access Control (RBAC)**
Four predefined roles with granular permissions:

#### **Admin** (Full Access)
- All permissions
- User management
- Settings configuration
- Analytics access

#### **Moderator** (Manage Content)
- View and manage quotes
- Edit pages and services
- Export quotes
- View analytics

#### **Editor** (Create Content)
- View quotes
- Create and edit pages
- Manage services
- Edit email templates
- View analytics

#### **Viewer** (Read-Only)
- View quotes
- View pages and services
- View analytics

### 2. **Quote Management** (`/admin/quotes`)
- Advanced search and filtering
- Status tracking (pending, reviewed, quoted, rejected)
- Send email replies to customers
- Quick statistics dashboard
- Pagination with navigation
- PDF export functionality

### 3. **Page Management** (`/admin/pages`)
- Create/edit website pages
- Publish or keep as draft
- URL slug management
- Content editor
- Page preview cards
- Publication status tracking

### 4. **User Management** (`/admin/users`)
- Create team members
- Assign roles with different permission levels
- Edit user information
- Delete users (with confirmation)
- Role-based permission display
- Joined date tracking

### 5. **Dashboard Analytics** (`/admin`)
- Key performance metrics
- Quote trends chart
- Service breakdown pie chart
- Recent activity timeline
- Conversion rate tracking

### 6. **Settings** (`/admin/settings`)
- Business information
- Email configuration
- Quote handling preferences
- Business hours
- Response time settings

## File Structure

### Core Components
```
src/
├── lib/
│   ├── rbac.ts              # RBAC system with permissions
│   └── lovable.ts           # Lovable Cloud API integration
├── hooks/
│   ├── use-admin-auth.ts    # Admin authentication with RBAC
│   └── use-lovable-cloud.ts # Lovable Cloud API hooks
├── pages/
│   ├── AdminLogin.tsx       # Login page
│   ├── AdminDashboard.tsx   # Main dashboard
│   ├── AdminQuotes.tsx      # Quote management
│   ├── AdminPages.tsx       # Page management
│   ├── AdminUsers.tsx       # User management
│   └── AdminSettings.tsx    # Settings
└── components/
    ├── AdminLayout.tsx      # Sidebar + navigation
    ├── QuotesTable.tsx      # Quote table component
    └── DashboardStats.tsx   # Stats cards
```

## Permissions System

### Permission Categories

#### Quotes
- `quotes_view` - View quote requests
- `quotes_create` - Create quotes
- `quotes_edit` - Edit quote details
- `quotes_delete` - Delete quotes
- `quotes_export` - Export quote data

#### Pages
- `pages_view` - View website pages
- `pages_create` - Create new pages
- `pages_edit` - Edit page content
- `pages_delete` - Delete pages
- `pages_publish` - Publish pages

#### Services
- `services_view` - View services
- `services_edit` - Edit services

#### Users
- `users_view` - View team members
- `users_create` - Create users
- `users_edit` - Edit user roles/info
- `users_delete` - Delete users

#### Settings
- `settings_view` - View settings
- `settings_edit` - Modify settings

#### Analytics
- `analytics_view` - View analytics

#### Email Templates
- `templates_view` - View email templates
- `templates_edit` - Edit email templates

## Lovable Cloud Integration

### Setup Instructions

#### 1. Environment Variables
Add these to your `.env.local` file:

```env
VITE_LOVABLE_API_KEY=your_api_key_here
VITE_LOVABLE_PROJECT_ID=your_project_id_here
VITE_LOVABLE_ENDPOINT=https://api.lovable.cloud
```

#### 2. Initialize Service
In your main app component or during app initialization:

```typescript
import { initializeLovableCloud } from '@/lib/lovable';

initializeLovableCloud({
  apiKey: import.meta.env.VITE_LOVABLE_API_KEY,
  projectId: import.meta.env.VITE_LOVABLE_PROJECT_ID,
  endpoint: import.meta.env.VITE_LOVABLE_ENDPOINT,
});
```

#### 3. API Endpoints
The Lovable Cloud service connects to:
- `GET /users` - Get all users
- `GET /users/{id}` - Get user details
- `POST /users` - Create user
- `PATCH /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `GET /quotes` - Get quotes
- `GET /quotes/{id}` - Get quote details
- `POST /quotes` - Create quote
- `PATCH /quotes/{id}` - Update quote
- `DELETE /quotes/{id}` - Delete quote
- `POST /analytics` - Get analytics data
- `GET /health` - Health check

### Using Lovable Cloud Hook

```typescript
import useLovableCloud from '@/hooks/use-lovable-cloud';

export const MyComponent = () => {
  const { getUsers, createUser, isLoading, error } = useLovableCloud();

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      console.log(users);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // component JSX
  );
};
```

## Authentication

### Admin Login Flow
1. Navigate to `/admin/login`
2. Enter email and password
3. System stores auth token and user data in localStorage
4. Redirect to `/admin` dashboard
5. User data persists across page refreshes
6. Logout clears all auth data

### Current Implementation
- Demo mode: Accepts any email/password combination
- Token stored as `adminToken` in localStorage
- User data stored as `adminUser` JSON in localStorage

### Production Setup
Replace demo authentication with real Lovable Cloud auth:

```typescript
// In AdminLogin.tsx
const { data, error } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
});
```

## Permission Checking

### In Components
```typescript
import useAdminAuth from '@/hooks/use-admin-auth';

export const MyPage = () => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAdminAuth();

  // Single permission check
  if (!hasPermission('quotes_edit')) {
    return <AccessDenied />;
  }

  // Any permission check
  if (!hasAnyPermission(['pages_create', 'pages_edit'])) {
    return <AccessDenied />;
  }

  // All permissions check
  if (!hasAllPermissions(['pages_create', 'pages_publish'])) {
    return <AccessDenied />;
  }

  return <ProtectedContent />;
};
```

### In Routes
```typescript
const ProtectedRoute = ({ children, requiredPermission }) => {
  const { hasPermission, isLoading } = useAdminAuth();

  if (isLoading) return <Spinner />;
  if (!hasPermission(requiredPermission)) {
    return <Navigate to="/admin" />;
  }

  return children;
};

// Usage
<Route 
  path="/admin/users" 
  element={
    <ProtectedRoute requiredPermission="users_view">
      <AdminUsers />
    </ProtectedRoute>
  } 
/>
```

## Routes

### Public
- `/admin/login` - Admin login page

### Protected (Require Authentication)
- `/admin` - Dashboard home
- `/admin/quotes` - Quote management
- `/admin/pages` - Page management
- `/admin/users` - User management
- `/admin/settings` - Settings

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL, -- admin, moderator, editor, viewer
  avatar VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Quotes Table (Extended)
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  service VARCHAR NOT NULL,
  budget VARCHAR NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR DEFAULT 'pending', -- pending, reviewed, quoted, rejected
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Pages Table
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR DEFAULT 'draft', -- draft, published
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Customization

### Add New Role
Edit `src/lib/rbac.ts`:

```typescript
export const ROLES: Record<UserRole, RoleDefinition> = {
  custom_role: {
    id: 'custom_role',
    name: 'Custom Role',
    description: 'Role description',
    permissions: [
      PERMISSIONS.quotes_view,
      // Add permissions
    ],
  },
};
```

### Add New Permission
```typescript
export const PERMISSIONS = {
  // ... existing
  custom_permission: {
    id: 'custom_permission',
    name: 'Custom Permission',
    resource: 'resource_name',
    action: 'action_name',
  },
};
```

### Add New Admin Page
1. Create component in `src/pages/Admin[Feature].tsx`
2. Add route in `App.tsx`
3. Add navigation link in `AdminLayout.tsx`
4. Implement permission checks with `useAdminAuth`

## Best Practices

### 1. Security
- Always validate permissions on backend
- Use HTTPS for API calls
- Rotate API keys regularly
- Implement rate limiting
- Audit all admin actions

### 2. Performance
- Use pagination for large datasets
- Implement data caching with React Query
- Lazy load admin components
- Optimize re-renders with memoization

### 3. User Experience
- Show clear permission errors
- Provide confirmation dialogs for destructive actions
- Display loading states
- Implement undo functionality where possible

### 4. Data Management
- Regular backups
- Audit logs for all changes
- Archive old data
- Implement soft deletes

## Deployment

### Build
```bash
npm run build
```

### Environment Setup
Set environment variables in deployment platform:
- `VITE_LOVABLE_API_KEY`
- `VITE_LOVABLE_PROJECT_ID`
- `VITE_LOVABLE_ENDPOINT`

### Lovable Cloud Deployment
1. Create account at lovable.cloud
2. Create new project
3. Generate API credentials
4. Configure environment variables
5. Deploy application

## Troubleshooting

### Login Issues
- Clear browser cache and localStorage
- Check if adminToken exists
- Verify credentials in Lovable Cloud
- Check browser console for errors

### Permission Denied
- Verify user role in admin panel
- Check permission configuration in RBAC
- Ensure user has required permission
- Review audit logs

### API Connection Failed
- Verify API endpoint URL
- Check API credentials
- Ensure network connectivity
- Check CORS configuration

## Future Enhancements

1. **Audit Logging**
   - Track all admin actions
   - User activity timeline
   - Change history
   - Compliance reporting

2. **Advanced Analytics**
   - Custom date ranges
   - Revenue tracking
   - Conversion funnels
   - Customer insights

3. **Automation**
   - Scheduled reports
   - Auto-generated quotes
   - Workflow automation
   - Batch operations

4. **Collaboration**
   - Real-time editing
   - Comments and mentions
   - Task assignment
   - Notifications

5. **Integration**
   - CRM integration
   - Email service integration
   - Payment processing
   - Calendar sync

## Support

For issues or questions:
1. Check this documentation
2. Review browser console logs
3. Check Lovable Cloud dashboard
4. Contact support at support@connectsl.com
