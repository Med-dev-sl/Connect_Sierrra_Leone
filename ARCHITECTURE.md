# 🎯 Admin Dashboard Database Integration - Visual Guide

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                             │
│           http://localhost:5173/admin                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │     React Components                  │
        ├──────────────────────────────────────┤
        │ • AdminPages.tsx      (Pages)         │
        │ • AdminQuotes.tsx     (Quotes)        │
        │ • AdminUsers.tsx      (Users)         │
        │ • AdminSettings.tsx   (Settings)      │
        └──────────────────────┬────────────────┘
                               │
                               ↓
        ┌──────────────────────────────────────┐
        │   Hooks (Business Logic)              │
        ├──────────────────────────────────────┤
        │ • useDatabase()          ← NEW        │
        │ • useAdminAuth()                      │
        │ • useLovableCloud()                   │
        │ • useToast()                          │
        └──────────────────────┬────────────────┘
                               │
                               ↓
        ┌──────────────────────────────────────┐
        │   Database Service Layer              │
        ├──────────────────────────────────────┤
        │ • src/lib/rbac.ts                     │
        │ • src/lib/lovable.ts                  │
        │ • src/integrations/supabase/client.ts │
        └──────────────────────┬────────────────┘
                               │
                               ↓
        ┌──────────────────────────────────────┐
        │   SUPABASE / LOVABLE CLOUD            │
        ├──────────────────────────────────────┤
        │  PostgreSQL Database with Tables:     │
        │  • pages                              │
        │  • quotes                             │
        │  • users                              │
        │  • services                           │
        │  • testimonials                       │
        │  • settings                           │
        │  • email_templates                    │
        │  • audit_logs                         │
        │  • analytics                          │
        │  • team_invitations                   │
        └──────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION
      ↓
┌─────────────────────────────────────┐
│ Admin clicks "Create Page"           │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ AdminPages.tsx                       │
│ • handleCreate()                     │
│ • Validates form data                │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ useDatabase Hook                     │
│ • createPage({...})                  │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Supabase Client                      │
│ • supabase.from('pages')             │
│ • .insert([page])                    │
│ • .select()                          │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Supabase API                         │
│ POST /rest/v1/pages                  │
│ Headers: Authorization Bearer token  │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ PostgreSQL Database                  │
│ INSERT INTO pages (...)              │
│ VALUES (...)                         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Response                             │
│ • New page with ID                   │
│ • Timestamps set                     │
│ • Returned to component              │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ AdminPages.tsx                       │
│ • Update state: setPages([...])      │
│ • Close dialog                       │
│ • Show success toast                 │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ UI Updates                           │
│ • New page appears in grid           │
│ • User sees "Page created" toast     │
└─────────────────────────────────────┘
```

---

## Component Hierarchy

```
App.tsx
├── Routes
│   ├── /admin → AdminLayout
│   │   ├── Sidebar Navigation
│   │   └── Outlet (Page Content)
│   │       ├── /admin → AdminDashboard
│   │       │   ├── DashboardStats
│   │       │   ├── Charts
│   │       │   └── RecentActivity
│   │       ├── /admin/pages → AdminPages ✨
│   │       │   ├── PageGrid
│   │       │   ├── CreateDialog
│   │       │   └── EditDialog
│   │       ├── /admin/quotes → AdminQuotes
│   │       │   ├── QuotesTable
│   │       │   ├── Filters
│   │       │   └── ReplyDialog
│   │       ├── /admin/users → AdminUsers
│   │       │   ├── UsersList
│   │       │   └── CreateUserDialog
│   │       └── /admin/settings → AdminSettings
│   │           └── FormFields
│   └── / → HomePage
│       ├── Navbar
│       ├── Hero
│       ├── Services
│       ├── Features
│       ├── Testimonials
│       ├── CTA
│       └── Footer
```

---

## Database Schema Visualization

```
pages TABLE
┌───────────────────────────────────────┐
│ id (UUID)              PRIMARY KEY     │
│ title (VARCHAR)        ✨ INDEXED      │
│ slug (VARCHAR UNIQUE)  ✨ INDEXED      │
│ content (TEXT)                         │
│ status (VARCHAR)       ✨ INDEXED      │
│ meta_description (VARCHAR)             │
│ featured_image (VARCHAR)               │
│ view_count (INTEGER)   DEFAULT 0       │
│ is_homepage (BOOLEAN)  DEFAULT false   │
│ template_type (VARCHAR)                │
│ author_id (UUID)       → users.id      │
│ created_at (TIMESTAMP) ✨ INDEXED      │
│ updated_at (TIMESTAMP) AUTO-UPDATE     │
│ published_at (TIMESTAMP)               │
└───────────────────────────────────────┘

quotes TABLE
┌───────────────────────────────────────┐
│ id (UUID)              PRIMARY KEY     │
│ name (VARCHAR)                         │
│ email (VARCHAR)        ✨ INDEXED      │
│ phone (VARCHAR)                        │
│ company (VARCHAR)                      │
│ service (VARCHAR)                      │
│ budget (VARCHAR)                       │
│ message (TEXT)                         │
│ status (VARCHAR)       ✨ INDEXED      │
│ assigned_to (UUID)     → users.id      │
│ quote_amount (DECIMAL)                 │
│ quote_document (VARCHAR)               │
│ notes (TEXT)                           │
│ created_at (TIMESTAMP) ✨ INDEXED      │
│ updated_at (TIMESTAMP) AUTO-UPDATE     │
│ replied_at (TIMESTAMP)                 │
└───────────────────────────────────────┘

users TABLE
┌───────────────────────────────────────┐
│ id (UUID)              PRIMARY KEY     │
│ email (VARCHAR UNIQUE) ✨ INDEXED      │
│ name (VARCHAR)                         │
│ avatar (VARCHAR)                       │
│ role (VARCHAR)         CHECK CONSTRAINT│
│ is_active (BOOLEAN)    DEFAULT true    │
│ last_login (TIMESTAMP)                 │
│ created_at (TIMESTAMP)                 │
│ updated_at (TIMESTAMP) AUTO-UPDATE     │
└───────────────────────────────────────┘
```

---

## API Request Flow

```
CLIENT SIDE
┌─────────────────────────────────┐
│ Click "Create Page"             │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ Form Validation                 │
│ • Check title not empty         │
│ • Check slug not empty          │
│ • Check content not empty       │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ Call useDatabase Hook           │
│ createPage({                    │
│   title: string                 │
│   slug: string                  │
│   content: string               │
│   ...                           │
│ })                              │
└────────────┬────────────────────┘
             ↓
        HTTP REQUEST
┌─────────────────────────────────┐
│ POST /rest/v1/pages             │
│                                 │
│ Headers:                        │
│ • Authorization: Bearer token   │
│ • Content-Type: application/json│
│ • Accept: application/json      │
│                                 │
│ Body: {                         │
│   "title": "...",              │
│   "slug": "...",               │
│   ...                          │
│ }                              │
└────────────┬────────────────────┘
             ↓
      SUPABASE API
┌─────────────────────────────────┐
│ Validate JWT Token              │
│ Check RLS Policies              │
│ Validate Data Types             │
│ Check Unique Constraints        │
│ Insert into PostgreSQL          │
└────────────┬────────────────────┘
             ↓
     HTTP RESPONSE
┌─────────────────────────────────┐
│ 201 Created                     │
│                                 │
│ {                              │
│   "id": "uuid",                │
│   "title": "...",              │
│   "created_at": "...",         │
│   ...                          │
│ }                              │
└────────────┬────────────────────┘
             ↓
    CLIENT SIDE HANDLER
┌─────────────────────────────────┐
│ Update Component State          │
│ • setPages([...])               │
│ • Close Dialog                  │
│ • Show Success Toast            │
│ • Reset Form                    │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ UI Re-renders                   │
│ • New page visible in grid      │
│ • "Page created" notification   │
└─────────────────────────────────┘
```

---

## Authentication & Authorization Flow

```
USER ACTION
    ↓
┌──────────────────────────────────┐
│ Admin logs in                    │
│ admin@connectsl.com / demo123    │
└─────────────┬────────────────────┘
              ↓
┌──────────────────────────────────┐
│ useAdminAuth Hook                │
│ • Check localStorage for token   │
│ • Verify user exists in DB       │
│ • Get user role                  │
└─────────────┬────────────────────┘
              ↓
┌──────────────────────────────────┐
│ RBAC System (rbac.ts)            │
│ • Load role definition           │
│ • Get role permissions           │
│ • Cache permissions              │
└─────────────┬────────────────────┘
              ↓
┌──────────────────────────────────┐
│ Permission Checks                │
│ hasPermission('pages_edit')       │
│ • Checks if role has permission  │
│ • Returns true/false             │
└─────────────┬────────────────────┘
              ↓
┌──────────────────────────────────┐
│ Component Rendering              │
│ • Show UI if permission: true    │
│ • Hide UI if permission: false   │
│ • Show "Access Denied" if admin  │
└──────────────────────────────────┘
```

---

## File Structure Overview

```
📁 src/
├── 📁 hooks/
│   ├── use-database.ts          ✨ NEW - Database CRUD
│   ├── use-admin-auth.ts        ✅ RBAC + Auth
│   ├── use-lovable-cloud.ts     ✅ Lovable Cloud
│   ├── use-quote-submit.ts      ✅ Quote form
│   ├── use-toast.ts             ✅ Notifications
│   └── use-mobile.tsx           ✅ Mobile detection
│
├── 📁 lib/
│   ├── rbac.ts                  ✅ Role definitions
│   ├── lovable.ts               ✅ Cloud service
│   └── utils.ts                 ✅ Helpers
│
├── 📁 pages/
│   ├── AdminPages.tsx           ✨ LIVE - Database
│   ├── AdminQuotes.tsx          ✅ Quote manager
│   ├── AdminUsers.tsx           ✅ User manager
│   ├── AdminSettings.tsx        ✅ Settings
│   ├── AdminDashboard.tsx       ✅ Dashboard
│   ├── AdminLogin.tsx           ✅ Login
│   ├── Quote.tsx                ✅ Quote form
│   └── ...other pages
│
├── 📁 components/
│   ├── AdminLayout.tsx          ✅ Sidebar + nav
│   ├── QuotesTable.tsx          ✅ Table
│   ├── DashboardStats.tsx       ✅ Stats cards
│   └── ...ui components
│
├── 📁 integrations/
│   └── 📁 supabase/
│       ├── client.ts            ✅ Supabase client
│       └── types.ts             ✅ DB types
│
└── App.tsx                      ✅ Routes
    index.tsx                    ✅ Entry point
```

---

## State Management Flow

```
GLOBAL STATE (useAdminAuth)
├── isAuthenticated
├── user
│   ├── id
│   ├── email
│   ├── name
│   ├── role (admin/moderator/editor/viewer)
│   └── permissions
├── hasPermission()
├── login()
└── logout()

COMPONENT STATE (AdminPages)
├── pages: Page[]
├── isCreateOpen: boolean
├── isEditOpen: boolean
├── editingPage: Page | null
├── isFetching: boolean
├── formData
│   ├── title
│   ├── slug
│   ├── content
│   ├── meta_description
│   └── status

HOOK STATE (useDatabase)
├── isLoading: boolean
├── error: string | null
└── Methods:
    ├── getPages()
    ├── createPage()
    ├── updatePage()
    └── deletePage()
```

---

## Performance Optimizations

```
✅ Database Indexes
   • pages.slug (UNIQUE)
   • pages.status
   • pages.created_at
   • quotes.email
   • quotes.status
   • quotes.created_at

✅ Lazy Loading
   • Pages load on mount
   • Pagination ready

✅ Caching
   • localStorage for auth
   • React state for UI

✅ Error Handling
   • Try-catch in hooks
   • User-friendly messages

✅ Type Safety
   • Full TypeScript
   • Interface definitions
   • Type checking
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────┐
│              USER BROWSER                    │
│       http://localhost:5173/admin            │
└────────────────────┬─────────────────────────┘
                     │
                     ↓ (HTTPS)
┌──────────────────────────────────────────────┐
│            VITE DEV SERVER / BUILD            │
│     React + TypeScript + Tailwind CSS         │
└────────────────────┬─────────────────────────┘
                     │
                     ↓ (Supabase URL)
┌──────────────────────────────────────────────┐
│           SUPABASE / LOVABLE CLOUD            │
│     PostgreSQL + Real-time + Auth             │
└────────────────────┬─────────────────────────┘
                     │
                     ↓ (SQL)
┌──────────────────────────────────────────────┐
│          POSTGRESQL DATABASE                 │
│     Tables, Indexes, RLS Policies             │
└──────────────────────────────────────────────┘
```

---

**Version:** 1.0  
**Status:** ✅ Complete  
**Last Updated:** Jan 27, 2026
