// Role-Based Access Control System

export type UserRole = 'admin' | 'moderator' | 'editor' | 'viewer';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

export interface RoleDefinition {
  id: UserRole;
  name: string;
  description: string;
  permissions: Permission[];
}

export const PERMISSIONS = {
  // Quote Management
  quotes_view: { id: 'quotes_view', name: 'View Quotes', resource: 'quotes', action: 'view' },
  quotes_create: { id: 'quotes_create', name: 'Create Quotes', resource: 'quotes', action: 'create' },
  quotes_edit: { id: 'quotes_edit', name: 'Edit Quotes', resource: 'quotes', action: 'edit' },
  quotes_delete: { id: 'quotes_delete', name: 'Delete Quotes', resource: 'quotes', action: 'delete' },
  quotes_export: { id: 'quotes_export', name: 'Export Quotes', resource: 'quotes', action: 'export' },

  // Pages Management
  pages_view: { id: 'pages_view', name: 'View Pages', resource: 'pages', action: 'view' },
  pages_create: { id: 'pages_create', name: 'Create Pages', resource: 'pages', action: 'create' },
  pages_edit: { id: 'pages_edit', name: 'Edit Pages', resource: 'pages', action: 'edit' },
  pages_delete: { id: 'pages_delete', name: 'Delete Pages', resource: 'pages', action: 'delete' },
  pages_publish: { id: 'pages_publish', name: 'Publish Pages', resource: 'pages', action: 'publish' },

  // Services Management
  services_view: { id: 'services_view', name: 'View Services', resource: 'services', action: 'view' },
  services_edit: { id: 'services_edit', name: 'Edit Services', resource: 'services', action: 'edit' },

  // Users Management
  users_view: { id: 'users_view', name: 'View Users', resource: 'users', action: 'view' },
  users_create: { id: 'users_create', name: 'Create Users', resource: 'users', action: 'create' },
  users_edit: { id: 'users_edit', name: 'Edit Users', resource: 'users', action: 'edit' },
  users_delete: { id: 'users_delete', name: 'Delete Users', resource: 'users', action: 'delete' },

  // Settings Management
  settings_view: { id: 'settings_view', name: 'View Settings', resource: 'settings', action: 'view' },
  settings_edit: { id: 'settings_edit', name: 'Edit Settings', resource: 'settings', action: 'edit' },

  // Analytics
  analytics_view: { id: 'analytics_view', name: 'View Analytics', resource: 'analytics', action: 'view' },

  // Email Templates
  templates_view: { id: 'templates_view', name: 'View Email Templates', resource: 'templates', action: 'view' },
  templates_edit: { id: 'templates_edit', name: 'Edit Email Templates', resource: 'templates', action: 'edit' },
};

export const ROLES: Record<UserRole, RoleDefinition> = {
  admin: {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all features and settings',
    permissions: Object.values(PERMISSIONS) as Permission[],
  },
  moderator: {
    id: 'moderator',
    name: 'Moderator',
    description: 'Can manage quotes, pages, and services',
    permissions: [
      PERMISSIONS.quotes_view,
      PERMISSIONS.quotes_edit,
      PERMISSIONS.quotes_delete,
      PERMISSIONS.quotes_export,
      PERMISSIONS.pages_view,
      PERMISSIONS.pages_edit,
      PERMISSIONS.services_view,
      PERMISSIONS.services_edit,
      PERMISSIONS.analytics_view,
    ],
  },
  editor: {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit pages and services',
    permissions: [
      PERMISSIONS.quotes_view,
      PERMISSIONS.pages_view,
      PERMISSIONS.pages_create,
      PERMISSIONS.pages_edit,
      PERMISSIONS.pages_publish,
      PERMISSIONS.services_view,
      PERMISSIONS.services_edit,
      PERMISSIONS.templates_view,
      PERMISSIONS.analytics_view,
    ],
  },
  viewer: {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can only view content',
    permissions: [
      PERMISSIONS.quotes_view,
      PERMISSIONS.pages_view,
      PERMISSIONS.services_view,
      PERMISSIONS.analytics_view,
    ],
  },
};

export const hasPermission = (userRole: UserRole, permissionId: string): boolean => {
  const role = ROLES[userRole];
  return role.permissions.some((p) => p.id === permissionId);
};

export const hasAnyPermission = (userRole: UserRole, permissionIds: string[]): boolean => {
  return permissionIds.some((permId) => hasPermission(userRole, permId));
};

export const hasAllPermissions = (userRole: UserRole, permissionIds: string[]): boolean => {
  return permissionIds.every((permId) => hasPermission(userRole, permId));
};
