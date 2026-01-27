import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  meta_keywords?: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'archived';
  author_id?: string;
  view_count: number;
  is_homepage: boolean;
  template_type?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'rejected';
  assigned_to?: string;
  quote_amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  replied_at?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  price_range?: string;
  featured_image?: string;
  status: 'active' | 'inactive';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'editor' | 'viewer';
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_avatar?: string;
  content: string;
  rating: number;
  service_id?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  company_name?: string;
  company_email?: string;
  company_phone?: string;
  company_address?: string;
  company_logo?: string;
  company_favicon?: string;
  business_hours_open?: string;
  business_hours_close?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_linkedin?: string;
  social_instagram?: string;
  quote_email_notification: boolean;
  auto_reply_enabled: boolean;
  auto_reply_message?: string;
  maintenance_mode: boolean;
  theme_primary_color?: string;
  theme_accent_color?: string;
  updated_at: string;
}

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
        .single();
      if (err) throw err;
      return data as Page;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch page';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPage = useCallback(async (page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('pages')
        .insert([page])
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

  const updatePage = useCallback(async (id: string, updates: Partial<Page>) => {
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

  const createQuote = useCallback(async (quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('quotes')
        .insert([quote])
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

  const updateQuote = useCallback(async (id: string, updates: Partial<Quote>) => {
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

  const createService = useCallback(async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('services')
        .insert([service])
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

  const updateService = useCallback(async (id: string, updates: Partial<Service>) => {
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

  const createUser = useCallback(async (user: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('users')
        .insert([user])
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

  const updateUser = useCallback(async (id: string, updates: Partial<User>) => {
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
        .single();
      if (err && err.code !== 'PGRST116') throw err;
      return (data || {}) as Settings;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch settings';
      setError(errorMsg);
      return {} as Settings;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (updates: Partial<Settings>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('settings')
        .update(updates)
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

  const createTestimonial = useCallback(async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('testimonials')
        .insert([testimonial])
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

  const updateTestimonial = useCallback(async (id: string, updates: Partial<Testimonial>) => {
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
