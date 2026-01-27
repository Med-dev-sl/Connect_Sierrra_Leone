# Quote System Documentation

## Overview
The Quote System is a comprehensive customer quote request feature integrated into your Connect Sierra Leone website. It allows customers to request customized quotes for various services offered by your business.

## Features

### 1. **Full Quote Request Page** (`/quote`)
- Dedicated page for customers to request quotes
- Service selection (Software Development, Graphic Design, Phone Unlock Services, Computer Software Solutions)
- Budget range selection
- Personal information collection
- Project details form
- Timeline preference selection
- Success notification after submission

### 2. **Reusable Quote Form Component** (`QuoteForm.tsx`)
A flexible component with two modes:
- **Full Mode** (default): Complete quote form with all fields
- **Compact Mode**: Lightweight version suitable for CTAs or sidebars

#### Usage:
```tsx
import { QuoteForm } from '@/components/QuoteForm';

// Full form
<QuoteForm />

// Compact form
<QuoteForm compact={true} />

// With callback
<QuoteForm onSubmitSuccess={() => console.log('Quote submitted!')} />

// With initial service
<QuoteForm initialService="software" />
```

### 3. **Quote Submission Hook** (`use-quote-submit.ts`)
A React hook for handling quote submission logic with error handling and loading states.

#### Usage:
```tsx
import { useQuoteSubmit } from '@/hooks/use-quote-submit';

const MyComponent = () => {
  const { submitQuote, isSubmitting, error } = useQuoteSubmit();
  
  const handleSubmit = async (quoteData) => {
    const result = await submitQuote(quoteData);
    if (result.success) {
      // Handle success
    }
  };
};
```

## Navigation Integration

### Navbar Updates
- Added "Quote" link to main navigation
- Updated CTA button to link to `/quote` page
- Available on both desktop and mobile menus

### Services Page
- Updated "Get Started" button to link directly to quote page
- Customers can request quotes immediately from service descriptions

## Current Submission Flow

Currently, the quote system:
1. ✅ Validates all required fields
2. ✅ Shows loading state during submission
3. ✅ Displays success notification
4. ✅ Logs submission data to console
5. ⏳ **Ready for Supabase integration** (commented code available)

## Setting Up Supabase Integration

To enable database storage for quotes, follow these steps:

### 1. Create Supabase Table
```sql
CREATE TABLE quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  company VARCHAR,
  services TEXT[] NOT NULL,
  budget VARCHAR NOT NULL,
  project_title VARCHAR,
  project_description TEXT NOT NULL,
  timeline VARCHAR,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Enable Row Level Security (Optional)
```sql
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON quotes
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads" ON quotes
FOR SELECT USING (true);
```

### 3. Update Quote Submission Hook
Uncomment the Supabase submission code in `use-quote-submit.ts`:

```tsx
const { data, error } = await supabase
  .from('quotes')
  .insert([{
    ...quoteData,
    status: 'pending',
    created_at: new Date(),
  }]);
```

## Email Notifications Setup (Optional)

To send automatic emails to customers and admins:

### Using Supabase Functions
1. Create an Edge Function for email sending
2. Set up database triggers to call the function on new quotes
3. Configure email provider (SendGrid, Resend, etc.)

### Using External Service
1. Integrate with email service API
2. Call API after successful quote submission

## Files Created/Modified

### New Files
- `src/pages/Quote.tsx` - Main quote request page
- `src/components/QuoteForm.tsx` - Reusable quote form component
- `src/hooks/use-quote-submit.ts` - Quote submission hook

### Modified Files
- `src/App.tsx` - Added quote route
- `src/components/Navbar.tsx` - Added quote navigation
- `src/pages/Services.tsx` - Updated CTA button

## Customization

### Change Services List
Edit the `services` array in `Quote.tsx`:
```tsx
const services = [
  { id: 'custom-service', icon: Icon, label: 'Custom Service', color: 'text-color' },
  // ...
];
```

### Change Budget Ranges
Edit the `budgetRanges` array:
```tsx
const budgetRanges = [
  { id: 'custom-range', label: 'Custom Range' },
  // ...
];
```

### Styling
All components use Tailwind CSS and follow your existing design system with:
- `bg-card` - Card backgrounds
- `text-foreground` - Text colors
- `border-border` - Border colors
- `text-primary` - Primary accent color

## Testing

### Test Quote Submission
1. Navigate to `/quote`
2. Fill in the form
3. Check browser console for logged data
4. You should see a success toast notification

### Test Form Validation
- Try submitting with empty fields
- Verify error messages appear
- Try different combinations of selections

## Future Enhancements

1. **Email Notifications**: Auto-send emails to customer and admin
2. **Quote Templates**: Create invoice-style quote documents
3. **Admin Dashboard**: View and manage submitted quotes
4. **Email Reminders**: Follow-up emails for pending quotes
5. **Integration with Pricing**: Auto-calculate quotes based on selections
6. **Quote History**: Allow customers to track their quotes
7. **Multi-step Form**: Break quote form into steps
8. **File Uploads**: Allow customers to upload project files/images

## Support

For questions or issues with the quote system, check:
1. Browser console for error messages
2. Network tab for failed submissions
3. Quote submission hook error state
4. Supabase dashboard (once integrated)
