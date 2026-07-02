import { createClient } from '@supabase/supabase-js'

// Get these from your Supabase project settings > API
// 1. Create .env file (copy from .env.example)
// 2. Run this SQL in Supabase SQL Editor to create the table:

/*
CREATE TABLE IF NOT EXISTS blogs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  date text,
  "readTime" text,
  category text,
  views text,
  created_at timestamptz DEFAULT now()
);

-- Make blogs publicly readable (for the website)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON blogs FOR SELECT USING (true);

-- For writing: Use Supabase dashboard (Table Editor) or add auth later.
*/

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not set. Falling back to static data.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface Blog {
  id?: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  views: string
  created_at?: string
}