
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lxwcvzqhhpexwzizkups.supabase.co'
const supabaseKey = import.meta.env.VITE.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)