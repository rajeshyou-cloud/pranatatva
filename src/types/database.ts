export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ServiceCategory = 'healing' | 'manifestation' | 'consultation' | 'subscription'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed'
export type SessionType = '1on1' | 'group' | 'event'

export interface Database {
  public: {
    Tables: {
      practitioners: {
        Row: {
          id: string
          name: string
          slug: string
          title: string
          bio: string
          photo_url: string | null
          specialties: string[]
          languages: string[]
          zoom_link: string | null
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['practitioners']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['practitioners']['Insert']>
      }
      services: {
        Row: {
          id: string
          slug: string
          name: string
          name_hi: string | null
          name_te: string | null
          description: string
          description_hi: string | null
          description_te: string | null
          category: ServiceCategory
          duration_minutes: number
          price_paise: number
          practitioner_id: string | null
          session_type: SessionType
          max_seats: number | null
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      availability_slots: {
        Row: {
          id: string
          practitioner_id: string
          date: string
          start_time: string
          end_time: string
          is_available: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['availability_slots']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['availability_slots']['Insert']>
      }
      bookings: {
        Row: {
          id: string
          booking_ref: string
          service_id: string
          practitioner_id: string
          slot_id: string
          client_name: string
          client_email: string
          client_phone: string
          client_concern: string | null
          intake_consent: boolean
          intake_consent_at: string
          whatsapp_opt_in: boolean
          status: BookingStatus
          payment_status: PaymentStatus
          payment_id: string | null
          amount_paise: number
          zoom_link: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'booking_ref' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          razorpay_order_id: string
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          amount_paise: number
          status: PaymentStatus
          invoice_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
    }
    Views: Record<string, { Row: Record<string, unknown>; Relationships: unknown[] }>
    Functions: Record<string, unknown>
    Enums: Record<string, string>
    CompositeTypes: Record<string, unknown>
  }
}

export type Practitioner = Database['public']['Tables']['practitioners']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type AvailabilitySlot = Database['public']['Tables']['availability_slots']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
