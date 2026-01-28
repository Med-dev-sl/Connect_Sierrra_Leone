import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, AuthError } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator' | 'editor' | 'viewer';
  avatar?: string;
}

interface UseAuthReturn {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

// Permission mappings by role
const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ['all'],
  moderator: ['manage_content', 'view_analytics', 'manage_quotes', 'manage_testimonials'],
  editor: ['create_pages', 'edit_own_pages', 'manage_media'],
  viewer: ['view_pages', 'view_analytics'],
};

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          setSession(session);
          
          // Fetch user profile from database
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('id, email, name, role, avatar')
            .eq('id', session.user.id)
            .single();
          
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          if (userProfile) {
            setUser(userProfile as AuthUser);
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name || 'Unknown',
              role: 'viewer',
            });
          }
        }
      } catch (err) {
        console.error('Error checking session:', err);
        setError(err as AuthError);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          try {
            const { data: userProfile, error: profileError } = await supabase
              .from('users')
              .select('id, email, name, role, avatar')
              .eq('id', newSession.user.id)
              .single();
            
            if (!profileError && userProfile) {
              setUser(userProfile as AuthUser);
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      
      if (signUpError) throw signUpError;
      if (!newUser) throw new Error('User creation failed');

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: newUser.id,
          email,
          name,
          role: 'viewer',
          is_active: true,
        });

      if (profileError) throw profileError;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      setUser(null);
      setSession(null);
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  }, [user]);

  return {
    user,
    session,
    isLoading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!session,
    hasPermission,
  };
}
