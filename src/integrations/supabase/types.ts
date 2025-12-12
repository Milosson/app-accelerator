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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          points: number | null
          requirement_type: string
          requirement_value: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points?: number | null
          requirement_type: string
          requirement_value?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points?: number | null
          requirement_type?: string
          requirement_value?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          last_active_date: string | null
          streak_count: number | null
          theme_preference: string | null
          total_points: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          last_active_date?: string | null
          streak_count?: number | null
          theme_preference?: string | null
          total_points?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          last_active_date?: string | null
          streak_count?: number | null
          theme_preference?: string | null
          total_points?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_days: {
        Row: {
          activities: string[] | null
          created_at: string
          date: string | null
          day: string
          duration: string | null
          id: string
          learnings: string[] | null
          output: string | null
          resources: string[] | null
          sort_order: number | null
          title: string
          updated_at: string
          user_id: string
          week_id: string
        }
        Insert: {
          activities?: string[] | null
          created_at?: string
          date?: string | null
          day: string
          duration?: string | null
          id?: string
          learnings?: string[] | null
          output?: string | null
          resources?: string[] | null
          sort_order?: number | null
          title: string
          updated_at?: string
          user_id: string
          week_id: string
        }
        Update: {
          activities?: string[] | null
          created_at?: string
          date?: string | null
          day?: string
          duration?: string | null
          id?: string
          learnings?: string[] | null
          output?: string | null
          resources?: string[] | null
          sort_order?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_days_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "user_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_activities: number[] | null
          completed_at: string | null
          created_at: string
          day_id: string
          id: string
          is_completed: boolean | null
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_activities?: number[] | null
          completed_at?: string | null
          created_at?: string
          day_id: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_activities?: number[] | null
          completed_at?: string | null
          created_at?: string
          day_id?: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "user_days"
            referencedColumns: ["id"]
          },
        ]
      }
      user_weeks: {
        Row: {
          created_at: string
          date_range: string | null
          focus: string | null
          goal: string | null
          id: string
          is_custom: boolean | null
          keywords: string[] | null
          replicas: string[] | null
          sort_order: number | null
          title: string
          total_hours: string | null
          updated_at: string
          user_id: string
          week_id: number
        }
        Insert: {
          created_at?: string
          date_range?: string | null
          focus?: string | null
          goal?: string | null
          id?: string
          is_custom?: boolean | null
          keywords?: string[] | null
          replicas?: string[] | null
          sort_order?: number | null
          title: string
          total_hours?: string | null
          updated_at?: string
          user_id: string
          week_id: number
        }
        Update: {
          created_at?: string
          date_range?: string | null
          focus?: string | null
          goal?: string | null
          id?: string
          is_custom?: boolean | null
          keywords?: string[] | null
          replicas?: string[] | null
          sort_order?: number | null
          title?: string
          total_hours?: string | null
          updated_at?: string
          user_id?: string
          week_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
