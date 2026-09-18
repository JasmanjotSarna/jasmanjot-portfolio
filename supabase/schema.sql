-- Supabase Schema for Contact Form Messages
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) >= 3 AND char_length(email) <= 254),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),
  ip_hash TEXT,
  user_agent TEXT CHECK (user_agent IS NULL OR char_length(user_agent) <= 200),
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'read', 'replied', 'spam')),
  email_sent BOOLEAN DEFAULT false NOT NULL
);

-- 2. Create index on created_at for fast time-based sorting and rate limit queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);

-- 3. Create composite index on (ip_hash, created_at) for efficient DB-level rate limiting
CREATE INDEX IF NOT EXISTS idx_contact_messages_ip_hash_created_at
  ON public.contact_messages (ip_hash, created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policy Invariant:
-- We define NO public policies (no anon select, insert, update, or delete).
-- This guarantees that the public client anon key CANNOT read, insert, or modify records.
-- Only the server-side backend using the SUPABASE_SERVICE_ROLE_KEY bypasses RLS to read and write.

-- (Optional verification query to confirm RLS is active)
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'contact_messages';
