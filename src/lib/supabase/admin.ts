import { createClient } from '@supabase/supabase-js'

// Untyped admin client for API routes — avoids complex Supabase generic constraints
export function createAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
