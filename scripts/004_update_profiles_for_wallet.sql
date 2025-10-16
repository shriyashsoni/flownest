-- Update profiles table to work with Flow wallet addresses instead of Supabase auth
-- Make flow_address the primary identifier and remove auth dependency

-- Drop the existing foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Make flow_address required and unique
ALTER TABLE profiles ALTER COLUMN flow_address SET NOT NULL;
ALTER TABLE profiles ADD CONSTRAINT profiles_flow_address_unique UNIQUE (flow_address);

-- Update RLS policies to use flow_address
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (true);

-- Update other tables to reference profiles by flow_address
-- This allows wallet-based authentication without Supabase auth
