export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          created_at: string | null
          date: string
          event_type: string
          id: string
          page_id: string | null
          page_views: number | null
          session_count: number | null
          user_count: number | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          date: string
          event_type: string
          id?: string
          page_id?: string | null
          page_views?: number | null
          session_count?: number | null
          user_count?: number | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          date?: string
          event_type?: string
          id?: string
          page_id?: string | null
          page_views?: number | null
          session_count?: number | null
          user_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "published_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          name: string
          status: string
          subject: string
          updated_at: string | null
          variables: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          name: string
          status?: string
          subject: string
          updated_at?: string | null
          variables?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string | null
          variables?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          featured_image: string | null
          id: string
          is_homepage: boolean | null
          meta_description: string | null
          meta_keywords: string | null
          published_at: string | null
          slug: string
          status: string
          template_type: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          featured_image?: string | null
          id?: string
          is_homepage?: boolean | null
          meta_description?: string | null
          meta_keywords?: string | null
          published_at?: string | null
          slug: string
          status?: string
          template_type?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          featured_image?: string | null
          id?: string
          is_homepage?: boolean | null
          meta_description?: string | null
          meta_keywords?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          template_type?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          assigned_to: string | null
          budget: string
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string
          quote_amount: number | null
          quote_document: string | null
          replied_at: string | null
          service: string
          status: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          budget: string
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone: string
          quote_amount?: number | null
          quote_document?: string | null
          replied_at?: string | null
          service: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          budget?: string
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string
          quote_amount?: number | null
          quote_document?: string | null
          replied_at?: string | null
          service?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          detailed_page_id: string | null
          featured_image: string | null
          icon: string | null
          id: string
          name: string
          order_index: number | null
          price_range: string | null
          slug: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          detailed_page_id?: string | null
          featured_image?: string | null
          icon?: string | null
          id?: string
          name: string
          order_index?: number | null
          price_range?: string | null
          slug: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          detailed_page_id?: string | null
          featured_image?: string | null
          icon?: string | null
          id?: string
          name?: string
          order_index?: number | null
          price_range?: string | null
          slug?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_detailed_page_id_fkey"
            columns: ["detailed_page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_detailed_page_id_fkey"
            columns: ["detailed_page_id"]
            isOneToOne: false
            referencedRelation: "published_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          auto_reply_enabled: boolean | null
          auto_reply_message: string | null
          business_hours_close: string | null
          business_hours_open: string | null
          company_address: string | null
          company_email: string | null
          company_favicon: string | null
          company_logo: string | null
          company_name: string | null
          company_phone: string | null
          id: string
          maintenance_mode: boolean | null
          quote_email_notification: boolean | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_twitter: string | null
          theme_accent_color: string | null
          theme_primary_color: string | null
          updated_at: string | null
        }
        Insert: {
          auto_reply_enabled?: boolean | null
          auto_reply_message?: string | null
          business_hours_close?: string | null
          business_hours_open?: string | null
          company_address?: string | null
          company_email?: string | null
          company_favicon?: string | null
          company_logo?: string | null
          company_name?: string | null
          company_phone?: string | null
          id?: string
          maintenance_mode?: boolean | null
          quote_email_notification?: boolean | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          theme_accent_color?: string | null
          theme_primary_color?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_reply_enabled?: boolean | null
          auto_reply_message?: string | null
          business_hours_close?: string | null
          business_hours_open?: string | null
          company_address?: string | null
          company_email?: string | null
          company_favicon?: string | null
          company_logo?: string | null
          company_name?: string | null
          company_phone?: string | null
          id?: string
          maintenance_mode?: boolean | null
          quote_email_notification?: boolean | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          theme_accent_color?: string | null
          theme_primary_color?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          role: string
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          invited_by?: string | null
          role?: string
          token: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          role?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_avatar: string | null
          client_company: string | null
          client_name: string
          content: string
          created_at: string | null
          featured: boolean | null
          id: string
          rating: number | null
          service_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          client_avatar?: string | null
          client_company?: string | null
          client_name: string
          content: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          rating?: number | null
          service_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          client_avatar?: string | null
          client_company?: string | null
          client_name?: string
          content?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          rating?: number | null
          service_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "active_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_services: {
        Row: {
          description: string | null
          featured_image: string | null
          icon: string | null
          id: string | null
          name: string | null
          price_range: string | null
          slug: string | null
        }
        Insert: {
          description?: string | null
          featured_image?: string | null
          icon?: string | null
          id?: string | null
          name?: string | null
          price_range?: string | null
          slug?: string | null
        }
        Update: {
          description?: string | null
          featured_image?: string | null
          icon?: string | null
          id?: string | null
          name?: string | null
          price_range?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      analytics_summary: {
        Row: {
          avg_bounce_rate: number | null
          avg_duration: number | null
          page_id: string | null
          total_views: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "published_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      published_pages: {
        Row: {
          content: string | null
          created_at: string | null
          featured_image: string | null
          id: string | null
          slug: string | null
          title: string | null
          view_count: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: string | null
          slug?: string | null
          title?: string | null
          view_count?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: string | null
          slug?: string | null
          title?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      quote_stats: {
        Row: {
          pending_quotes: number | null
          quoted_quotes: number | null
          rejected_quotes: number | null
          reviewed_quotes: number | null
          total_quotes: number | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar: string | null
          email: string | null
          id: string | null
          is_active: boolean | null
          last_login: string | null
          name: string | null
          role: string | null
        }
        Insert: {
          avatar?: string | null
          email?: string | null
          id?: string | null
          is_active?: boolean | null
          last_login?: string | null
          name?: string | null
          role?: string | null
        }
        Update: {
          avatar?: string | null
          email?: string | null
          id?: string | null
          is_active?: boolean | null
          last_login?: string | null
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
