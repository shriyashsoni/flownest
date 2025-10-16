-- Drop existing RLS policies that depend on auth.uid()
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can insert their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can update their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can view their own NFTs" ON public.nfts;
DROP POLICY IF EXISTS "Users can insert their own NFTs" ON public.nfts;
DROP POLICY IF EXISTS "Users can delete their own NFTs" ON public.nfts;
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own staking positions" ON public.staking_positions;
DROP POLICY IF EXISTS "Users can insert their own staking positions" ON public.staking_positions;
DROP POLICY IF EXISTS "Users can update their own staking positions" ON public.staking_positions;
DROP POLICY IF EXISTS "Users can delete their own staking positions" ON public.staking_positions;
DROP POLICY IF EXISTS "Users can view their own lending positions" ON public.lending_positions;
DROP POLICY IF EXISTS "Users can insert their own lending positions" ON public.lending_positions;
DROP POLICY IF EXISTS "Users can update their own lending positions" ON public.lending_positions;
DROP POLICY IF EXISTS "Users can delete their own lending positions" ON public.lending_positions;
DROP POLICY IF EXISTS "Users can view their own NFT loans" ON public.nft_loans;
DROP POLICY IF EXISTS "Users can insert their own NFT loans" ON public.nft_loans;
DROP POLICY IF EXISTS "Users can update their own NFT loans" ON public.nft_loans;

-- Drop existing tables to recreate without auth dependencies
DROP TABLE IF EXISTS public.nft_loans CASCADE;
DROP TABLE IF EXISTS public.lending_positions CASCADE;
DROP TABLE IF EXISTS public.staking_positions CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.nfts CASCADE;
DROP TABLE IF EXISTS public.wallets CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Recreate profiles table without auth.users reference
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_address TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate wallets table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token_symbol TEXT NOT NULL,
  balance DECIMAL(20, 8) DEFAULT 0,
  usd_value DECIMAL(20, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token_symbol)
);

-- Recreate NFTs table
CREATE TABLE public.nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token_id TEXT NOT NULL,
  collection_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  rarity TEXT,
  floor_price DECIMAL(20, 8),
  last_sale_price DECIMAL(20, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token_id, collection_name)
);

-- Recreate transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  from_token TEXT,
  to_token TEXT,
  amount DECIMAL(20, 8),
  usd_value DECIMAL(20, 2),
  recipient TEXT,
  tx_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate staking positions table
CREATE TABLE public.staking_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pool_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  apy DECIMAL(5, 2) NOT NULL,
  rewards_earned DECIMAL(20, 8) DEFAULT 0,
  lock_period TEXT,
  unlock_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate lending positions table
CREATE TABLE public.lending_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  apy DECIMAL(5, 2) NOT NULL,
  interest_earned DECIMAL(20, 8) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate NFT loans table
CREATE TABLE public.nft_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  nft_id UUID NOT NULL REFERENCES public.nfts(id) ON DELETE CASCADE,
  loan_amount DECIMAL(20, 8) NOT NULL,
  token_symbol TEXT NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for now (since we don't have auth.uid())
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.staking_positions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.lending_positions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_loans DISABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX idx_profiles_flow_address ON public.profiles(flow_address);
CREATE INDEX idx_wallets_user_id ON public.wallets(user_id);
CREATE INDEX idx_nfts_user_id ON public.nfts(user_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_staking_positions_user_id ON public.staking_positions(user_id);
CREATE INDEX idx_lending_positions_user_id ON public.lending_positions(user_id);
CREATE INDEX idx_nft_loans_user_id ON public.nft_loans(user_id);
