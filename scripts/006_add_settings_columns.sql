-- Add settings columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS notification_tx_alerts BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_staking_alerts BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_price_alerts BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'dark',
ADD COLUMN IF NOT EXISTS two_fa_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS pin_hash TEXT;

-- Create security_logs table
CREATE TABLE IF NOT EXISTS public.security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON public.security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON public.security_logs(created_at DESC);

-- Add comment
COMMENT ON TABLE public.security_logs IS 'Tracks security events for user accounts';
