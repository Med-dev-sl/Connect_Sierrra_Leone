import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

// Export types using the Supabase generated types
export type Page = Tables<'pages'>;
export type Quote = Tables<'quotes'>;
export type Service = Tables<'services'>;
export type User = Tables<'users'>;
export type Testimonial = Tables<'testimonials'>;
export type Settings = Tables<'settings'>;

// Database Hook
export const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========== PAGES ==========
  const getPages = useCallback(async (status?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase.from('pages').select('*');
      if (status) {
        query = query.eq('status', status);
      }
      const { data, error: err } = await query.order('created_at', { ascending: false });
      if (err) throw err;
      return data as Page[];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch pages';
      setError(errorMsg);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPageBySlug = useCallback(async (slug: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (err) throw err;
      return data as Page | null;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch page';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPage = useCallback(async (page: TablesInsert<'pages'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('pages')
        .insert(page)
        .select()
        .single();
      if (err) throw err;
      return data as Page;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create page';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePage = useCallback(async (id: string, updates: TablesUpdate<'pages'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      return data as Page;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update page';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePage = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);
      if (err) throw err;
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete page';
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== QUOTES ==========
  const getQuotes = useCallback(async (status?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase.from('quotes').select('*');
      if (status) {
        query = query.eq('status', status);
      }
      const { data, error: err } = await query.order('created_at', { ascending: false });
      if (err) throw err;
      return data as Quote[];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch quotes';
      setError(errorMsg);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createQuote = useCallback(async (quote: TablesInsert<'quotes'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('quotes')
        .insert(quote)
        .select()
        .single();
      if (err) throw err;
      return data as Quote;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create quote';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuote = useCallback(async (id: string, updates: TablesUpdate<'quotes'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('quotes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      return data as Quote;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update quote';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteQuote = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);
      if (err) throw err;
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete quote';
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== SERVICES ==========
  const getServices = useCallback(async (activeOnly = false) => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase.from('services').select('*');
      if (activeOnly) {
        query = query.eq('status', 'active');
      }
      const { data, error: err } = await query.order('order_index', { ascending: true });
      if (err) throw err;
      return data as Service[];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMsg);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createService = useCallback(async (service: TablesInsert<'services'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();
      if (err) throw err;
      return data as Service;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create service';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateService = useCallback(async (id: string, updates: TablesUpdate<'services'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      return data as Service;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update service';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== USERS ==========
  const getUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw err;
      return data as User[];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMsg);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = useCallback(async (user: TablesInsert<'users'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single();
      if (err) throw err;
      return data as User;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, updates: TablesUpdate<'users'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      return data as User;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      if (err) throw err;
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== SETTINGS ==========
  const getSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('settings')
        .select('*')
        .maybeSingle();
      if (err) throw err;
      return data as Settings | null;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch settings';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (id: string, updates: TablesUpdate<'settings'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('settings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      return data as Settings;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update settings';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== TESTIMONIALS ==========
  const getTestimonials = useCallback(async (status?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase.from('testimonials').select('*');
      if (status) {
        query = query.eq('status', status);
      }
      const { data, error: err } = await query.order('created_at', { ascending: false });
      if (err) throw err;
      return data as Testimonial[];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch testimonials';
      setError(errorMsg);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTestimonial = useCallback(async (testimonial: TablesInsert<'testimonials'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();
      if (err) throw err;
      return data as Testimonial;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create testimonial';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTestimonial = useCallback(async (id: string, updates: TablesUpdate<'testimonials'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      return data as Testimonial;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update testimonial';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    // Pages
    getPages,
    getPageBySlug,
    createPage,
    updatePage,
    deletePage,
    // Quotes
    getQuotes,
    createQuote,
    updateQuote,
    deleteQuote,
    // Services
    getServices,
    createService,
    updateService,
    // Users
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    // Settings
    getSettings,
    updateSettings,
    // Testimonials
    getTestimonials,
    createTestimonial,
    updateTestimonial,
  };
};

export default useDatabase;
