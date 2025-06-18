import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const isDevMode = import.meta.env.VITE_DEV_MODE === 'true'

// For development mode, provide fallback values
const finalUrl = supabaseUrl || 'https://demo-project.supabase.co'
const finalKey = supabaseAnonKey || 'demo-anon-key-for-development'

if (!supabaseUrl || !supabaseAnonKey) {
  if (!isDevMode) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.')
  }
  console.warn('⚠️ Running in development mode with demo Supabase credentials. Database features will be limited.')
}

// Create a single instance to avoid multiple client warnings
export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Export development mode flag for components to check
export const isDevelopmentMode = isDevMode || (!supabaseUrl || !supabaseAnonKey)
