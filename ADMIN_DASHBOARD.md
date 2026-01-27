# Admin Dashboard Documentation

## Overview
The Admin Dashboard is a comprehensive management system for handling customer quotes, business settings, and performance analytics. It provides administrators with tools to efficiently manage quote requests, respond to customers, and track business metrics.

## Features

### 1. **Dashboard Home** (`/admin`)
The main dashboard providing:
- **Key Metrics**: Total quotes, conversion rates, unique customers, monthly stats
- **Trend Charts**: Line chart showing quote and conversion trends over time
- **Service Breakdown**: Pie chart showing distribution across services
- **Recent Activity**: Timeline of recent quote submissions and actions

### 2. **Quote Management** (`/admin/quotes`)
Comprehensive quote management system with:
- **Search & Filter**: Find quotes by name, email, or company
- **Status Filtering**: Filter by pending, reviewed, quoted, or rejected
- **Quick Actions**: View details, send replies, delete quotes
- **Status Updates**: Change quote status in real-time
- **Pagination**: Browse through quotes with page navigation
- **Statistics**: Quick stats showing quote distribution by status
- **Bulk Actions**: View PDF exports, send automated replies

### 3. **Settings Page** (`/admin/settings`)
Configure business operations:
- **Business Information**: Company name, contact details, address
- **Email Settings**: Enable/disable automated notifications
- **Quote Settings**: Default statuses, auto-reply options, follow-up reminders
- **Preferences**: Response times and business hours

## File Structure

### Pages
- `src/pages/AdminLogin.tsx` - Admin login page
- `src/pages/AdminDashboard.tsx` - Main dashboard with analytics
- `src/pages/AdminQuotes.tsx` - Quote management page
- `src/pages/AdminSettings.tsx` - Settings configuration

### Components
- `src/components/AdminLayout.tsx` - Sidebar and top navigation layout
- `src/components/QuotesTable.tsx` - Quote table with management features
- `src/components/DashboardStats.tsx` - Statistics cards

### Hooks
- `src/hooks/use-admin-auth.ts` - Authentication state management
- `src/hooks/use-quote-submit.ts` - Quote submission handling

## Routes

### Public Routes
```
/admin/login - Admin login page
```

### Protected Routes (Require Authentication)
```
/admin - Dashboard home
/admin/quotes - Quote management
/admin/settings - Settings
```

## Authentication

### Current Implementation
- Demo mode: Accepts any email/password combination
- Token stored in localStorage as `adminToken`

### Production Setup
To implement real authentication with Supabase:

```typescript
// In AdminLogin.tsx
const { data, error } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
});

if (data.session) {
  localStorage.setItem('adminToken', data.session.access_token);
  navigate('/admin');
}
```

## Protecting Routes

To protect admin routes, create a `ProtectedRoute` component:

```tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  
  return <>{children}</>;
};
```

Then update routes:
```tsx
<Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
```

## Quote Management Features

### Viewing Quotes
1. Navigate to `/admin/quotes`
2. Search or filter quotes as needed
3. Click the eye icon to view full details
4. Update status in the dialog

### Sending Replies
1. Click the message icon on any quote
2. Type your response
3. Click "Send Reply"
4. Email is sent to customer (when email service is configured)

### Deleting Quotes
1. Click trash icon
2. Confirm deletion
3. Quote is removed from database

## Dashboard Analytics

### Metrics Displayed
- **Total Quotes**: Overall count of all submissions
- **Quote Conversion**: Percentage of quotes converted to projects
- **Unique Customers**: Number of distinct customers
- **Monthly Quotes**: Count for current month

### Charts
- **Trend Chart**: Line graph showing weekly quote and conversion data
- **Service Breakdown**: Pie chart of quotes by service type
- **Recent Activity**: Timeline of important events

## Email Integration

### Setting Up Email Notifications

1. **With Supabase Functions**:
```sql
-- Create function to send emails
CREATE FUNCTION send_quote_confirmation(email TEXT, name TEXT)
RETURNS void AS $$
BEGIN
  -- Call email service (SendGrid, Resend, etc.)
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_quote_created
AFTER INSERT ON quotes
FOR EACH ROW
EXECUTE FUNCTION send_quote_confirmation(NEW.email, NEW.name);
```

2. **With External Service**:
```typescript
// In use-quote-submit.ts
const { status } = await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    to: quoteData.email,
    subject: 'Quote Received',
    template: 'quote-confirmation',
  }),
});
```

## Customization

### Change Branding
Edit `AdminLayout.tsx`:
```tsx
<span className="text-lg font-display font-bold">Your Company</span>
```

### Add New Statuses
Update quote status options in `QuotesTable.tsx`:
```tsx
const statusConfig = {
  pending: { label: 'Pending', color: '...' },
  // Add more statuses here
};
```

### Customize Dashboard Stats
Edit mock data in `AdminDashboard.tsx`:
```tsx
const quotesTrendData = [
  { name: 'Week 1', quotes: 4, converted: 3 },
  // Add your data
];
```

## Best Practices

### 1. **Security**
- Always validate admin tokens on the backend
- Use secure session management
- Never store sensitive data in localStorage
- Implement role-based access control (RBAC)

### 2. **Performance**
- Implement pagination for large datasets
- Use React Query for data caching
- Optimize re-renders with memoization
- Lazy load dashboard components

### 3. **User Experience**
- Show loading states during operations
- Provide confirmation dialogs for destructive actions
- Display success/error notifications
- Implement search and filtering

### 4. **Data Management**
- Backup admin data regularly
- Archive old quotes
- Maintain audit logs
- Validate all inputs

## Integration Checklist

- [ ] Set up Supabase authentication
- [ ] Create quotes table in Supabase
- [ ] Implement email sending service
- [ ] Add database triggers for notifications
- [ ] Set up protected routes
- [ ] Configure admin user roles
- [ ] Create backup/export functionality
- [ ] Add audit logging
- [ ] Test all admin flows

## Future Enhancements

1. **Advanced Analytics**
   - Export data to CSV/PDF
   - Custom date range filtering
   - Revenue tracking
   - Customer lifetime value

2. **Automation**
   - Scheduled email reminders
   - Auto-generated quotes
   - AI-powered quote suggestions
   - Automated follow-ups

3. **Team Collaboration**
   - Multiple admin users
   - Quote assignment system
   - Team performance metrics
   - Comments and notes

4. **Customer Portal**
   - Quote status tracking
   - Self-service portal
   - Invoice generation
   - Payment integration

5. **Advanced Reporting**
   - Custom dashboards
   - Scheduled reports
   - Performance KPIs
   - Forecasting

## Troubleshooting

### Login Issues
- Clear browser cache and cookies
- Check if adminToken is in localStorage
- Verify Supabase configuration

### Data Not Displaying
- Check Supabase connection
- Verify database permissions
- Check browser console for errors
- Ensure mock data is loaded correctly

### Email Not Sending
- Verify email service configuration
- Check email provider API keys
- Test email with simple text first
- Check spam folder

## Support

For issues with the admin dashboard:
1. Check browser console for errors
2. Verify Supabase connection
3. Review authentication status
4. Check admin documentation
5. Contact support at admin@connectsl.com
