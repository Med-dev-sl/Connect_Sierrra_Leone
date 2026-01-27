import { useState, useEffect, useCallback } from 'react';
import type { UserRole } from '@/lib/rbac';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/lib/rbac';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      // TODO: Replace with actual Lovable Cloud authentication
      const mockUser: AdminUser = {
        id: 'user-1',
        email,
        name: email.split('@')[0],
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('adminToken', 'token-' + Date.now());
      localStorage.setItem('adminUser', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const hasPermissionCheck = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      return hasPermission(user.role, permission);
    },
    [user]
  );

  const hasAnyPermissionCheck = useCallback(
    (permissions: string[]): boolean => {
      if (!user) return false;
      return hasAnyPermission(user.role, permissions);
    },
    [user]
  );

  const hasAllPermissionsCheck = useCallback(
    (permissions: string[]): boolean => {
      if (!user) return false;
      return hasAllPermissions(user.role, permissions);
    },
    [user]
  );

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    hasPermission: hasPermissionCheck,
    hasAnyPermission: hasAnyPermissionCheck,
    hasAllPermissions: hasAllPermissionsCheck,
  };
};

export default useAdminAuth;
