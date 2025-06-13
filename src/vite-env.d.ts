/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_VETERANS_CRISIS_LINE_API: string
  readonly VITE_VA_API_KEY: string
  readonly VITE_ALEX_AI_ENDPOINT: string
  readonly VITE_ECOSYSTEM_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
