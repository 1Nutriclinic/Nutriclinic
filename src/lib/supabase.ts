import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './supabaseConfig'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: string
          job_title: string | null
          company_id: string | null
          branch_id: string | null
          phone: string | null
          avatar_url: string | null
          is_demo: boolean
          portal_enabled: boolean
          created_at: string
          updated_at: string
        }
      }
      patients: {
        Row: {
          id: string
          user_id: string | null
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          document_id: string | null
          birth_date: string | null
          gender: string | null
          status: string
          nutritionist_id: string | null
          branch_id: string | null
          is_demo: boolean
          portal_enabled: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}

let client: SupabaseClient<Database> | null = null

export function getSupabase(): SupabaseClient<Database> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase no está configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  }
  if (!client) {
    client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
  return client
}

/** Safe accessor — returns null when env vars are missing (mock mode). */
export function getSupabaseOrNull(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) return null
  return getSupabase()
}
