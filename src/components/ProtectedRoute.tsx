import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'moderator' | 'editor' | 'viewer';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const roleHierarchy = { admin: 4, moderator: 3, editor: 2, viewer: 1 };
    const userLevel = roleHierarchy[user?.role || 'viewer'] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    if (userLevel < requiredLevel) {
      return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
}
