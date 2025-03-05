import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!", { supabaseUrl, supabaseAnonKey });
  throw new Error("Supabase URL or Key is missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
