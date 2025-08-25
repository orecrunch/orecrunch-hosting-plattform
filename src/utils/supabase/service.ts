import 'server-only'

import { createClient } from '@supabase/supabase-js'
export function createServiceClient() {
  const supabase = createClient(
    process.env.NEXT_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_SERVICE_KEY!
  )
  return supabase
}
