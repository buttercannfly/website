import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hurbnpkzpwzuptjbpwzd.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cmJucGt6cHd6dXB0amJwd3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzY0NTQsImV4cCI6MjA3MjcxMjQ1NH0.YmUYUQN6cF8eYL1_qQ2OT-LYtB-m_ZPMiVDSlNN3eaM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 服务端Supabase客户端（用于API路由）
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// 数据库类型定义
export interface User {
  id: number
  created_at: string
  email: string | null
  type: string | null
  credits: number | null
  last_refresh_date: string | null
  remaining: number | null
}

export interface Payment {
  id: number
  created_at: string
  user_id: number | null
  credits: number | null
  payment_id: string | null
  verified: boolean | null
}

export interface CreditsData {
  total: number
}
