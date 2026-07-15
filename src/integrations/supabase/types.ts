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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          booked_by: string
          booking_code: string
          created_at: string
          duration_minutes: number
          id: string
          internal_notes: string | null
          patient_id: string
          patient_mobile: string
          patient_name: string
          payment_amount: number | null
          payment_method: string
          payment_paid_at: string | null
          payment_reference: string | null
          payment_status: string
          reason: string | null
          status: string
          treatment_id: string | null
          treatment_name: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          booked_by?: string
          booking_code?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          internal_notes?: string | null
          patient_id: string
          patient_mobile: string
          patient_name: string
          payment_amount?: number | null
          payment_method?: string
          payment_paid_at?: string | null
          payment_reference?: string | null
          payment_status?: string
          reason?: string | null
          status?: string
          treatment_id?: string | null
          treatment_name?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          booked_by?: string
          booking_code?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          internal_notes?: string | null
          patient_id?: string
          patient_mobile?: string
          patient_name?: string
          payment_amount?: number | null
          payment_method?: string
          payment_paid_at?: string | null
          payment_reference?: string | null
          payment_status?: string
          reason?: string | null
          status?: string
          treatment_id?: string | null
          treatment_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_dates: {
        Row: {
          blocked_date: string
          created_at: string
          id: string
          reason: string | null
        }
        Insert: {
          blocked_date: string
          created_at?: string
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_date?: string
          created_at?: string
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      clinic_settings: {
        Row: {
          about_doctor: string | null
          address: string | null
          awards: string | null
          certifications: string | null
          clinic_logo_url: string | null
          clinic_name: string
          consultation_fee: number | null
          created_at: string
          doctor_name: string
          doctor_photo_url: string | null
          education: string | null
          email: string | null
          emergency_contact: string | null
          google_maps_embed: string | null
          google_maps_url: string | null
          id: number
          languages_spoken: string | null
          max_per_slot: number
          memberships: string | null
          phone: string | null
          professional_experience: string | null
          qualifications: string | null
          slot_duration_minutes: number
          specialization: string | null
          tagline: string | null
          updated_at: string
          whatsapp: string | null
          years_experience: number | null
        }
        Insert: {
          about_doctor?: string | null
          address?: string | null
          awards?: string | null
          certifications?: string | null
          clinic_logo_url?: string | null
          clinic_name?: string
          consultation_fee?: number | null
          created_at?: string
          doctor_name?: string
          doctor_photo_url?: string | null
          education?: string | null
          email?: string | null
          emergency_contact?: string | null
          google_maps_embed?: string | null
          google_maps_url?: string | null
          id?: number
          languages_spoken?: string | null
          max_per_slot?: number
          memberships?: string | null
          phone?: string | null
          professional_experience?: string | null
          qualifications?: string | null
          slot_duration_minutes?: number
          specialization?: string | null
          tagline?: string | null
          updated_at?: string
          whatsapp?: string | null
          years_experience?: number | null
        }
        Update: {
          about_doctor?: string | null
          address?: string | null
          awards?: string | null
          certifications?: string | null
          clinic_logo_url?: string | null
          clinic_name?: string
          consultation_fee?: number | null
          created_at?: string
          doctor_name?: string
          doctor_photo_url?: string | null
          education?: string | null
          email?: string | null
          emergency_contact?: string | null
          google_maps_embed?: string | null
          google_maps_url?: string | null
          id?: number
          languages_spoken?: string | null
          max_per_slot?: number
          memberships?: string | null
          phone?: string | null
          professional_experience?: string | null
          qualifications?: string | null
          slot_duration_minutes?: number
          specialization?: string | null
          tagline?: string | null
          updated_at?: string
          whatsapp?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      doctor_notes: {
        Row: {
          appointment_id: string
          created_at: string
          created_by: string | null
          id: string
          notes: string
          patient_id: string
          updated_at: string
        }
        Insert: {
          appointment_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes: string
          patient_id: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_notes_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_notes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          mobile: string
          used: boolean
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          mobile: string
          used?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          mobile?: string
          used?: boolean
        }
        Relationships: []
      }
      patients: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          full_name: string
          gender: string | null
          id: string
          mobile: string
          updated_at: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          full_name: string
          gender?: string | null
          id?: string
          mobile: string
          updated_at?: string
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          mobile?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          patient_name: string
          rating: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          patient_name: string
          rating?: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          patient_name?: string
          rating?: number
        }
        Relationships: []
      }
      treatments: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number
          fee: number
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          fee?: number
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          fee?: number
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      working_hours: {
        Row: {
          evening_end: string | null
          evening_start: string | null
          id: string
          is_open: boolean
          morning_end: string | null
          morning_start: string | null
          weekday: number
        }
        Insert: {
          evening_end?: string | null
          evening_start?: string | null
          id?: string
          is_open?: boolean
          morning_end?: string | null
          morning_start?: string | null
          weekday: number
        }
        Update: {
          evening_end?: string | null
          evening_start?: string | null
          id?: string
          is_open?: boolean
          morning_end?: string | null
          morning_start?: string | null
          weekday?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "doctor" | "receptionist"
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
    Enums: {
      app_role: ["doctor", "receptionist"],
    },
  },
} as const
