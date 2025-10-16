-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  flow_address TEXT UNIQUE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wallets table for tracking user balances
CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token_symbol TEXT NOT NULL,
  balance DECIMAL(20, 8) DEFAULT 0,
  usd_value DECIMAL(20, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token_symbol)
);

-- Create NFTs table
CREATE TABLE IF NOT EXISTS public.nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'send', 'receive', 'swap', 'stake', 'unstake', 'nft_buy', 'nft_sell'
  from_token TEXT,
  to_token TEXT,
  amount DECIMAL(20, 8),
  usd_value DECIMAL(20, 2),
  recipient TEXT,
  tx_hash TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create staking positions table
CREATE TABLE IF NOT EXISTS public.staking_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pool_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  apy DECIMAL(5, 2) NOT NULL,
  rewards_earned DECIMAL(20, 8) DEFAULT 0,
  lock_period TEXT, -- 'flexible', '30d', '90d', '180d'
  unlock_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create lending positions table
CREATE TABLE IF NOT EXISTS public.lending_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'supply', 'borrow'
  token_symbol TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  apy DECIMAL(5, 2) NOT NULL,
  interest_earned DECIMAL(20, 8) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create NFT loans table (collateralized lending)
CREATE TABLE IF NOT EXISTS public.nft_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nft_id UUID NOT NULL REFERENCES public.nfts(id) ON DELETE CASCADE,
  loan_amount DECIMAL(20, 8) NOT NULL,
  token_symbol TEXT NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'repaid', 'defaulted'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staking_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lending_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_loans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for wallets
CREATE POLICY "Users can view their own wallets" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own wallets" ON public.wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own wallets" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for NFTs
CREATE POLICY "Users can view their own NFTs" ON public.nfts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own NFTs" ON public.nfts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own NFTs" ON public.nfts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for staking
CREATE POLICY "Users can view their own staking positions" ON public.staking_positions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own staking positions" ON public.staking_positions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own staking positions" ON public.staking_positions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own staking positions" ON public.staking_positions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for lending
CREATE POLICY "Users can view their own lending positions" ON public.lending_positions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own lending positions" ON public.lending_positions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own lending positions" ON public.lending_positions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own lending positions" ON public.lending_positions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for NFT loans
CREATE POLICY "Users can view their own NFT loans" ON public.nft_loans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own NFT loans" ON public.nft_loans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own NFT loans" ON public.nft_loans FOR UPDATE USING (auth.uid() = user_id);
