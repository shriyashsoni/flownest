-- This script seeds demo data for testing
-- Note: Replace 'YOUR_USER_ID' with actual user ID after signup

-- Insert demo wallet balances
INSERT INTO public.wallets (user_id, token_symbol, balance, usd_value) VALUES
  ('YOUR_USER_ID', 'FLOW', 1250.50, 1875.75),
  ('YOUR_USER_ID', 'USDC', 5000.00, 5000.00),
  ('YOUR_USER_ID', 'FUSD', 2500.00, 2500.00)
ON CONFLICT (user_id, token_symbol) DO NOTHING;

-- Insert demo NFTs
INSERT INTO public.nfts (user_id, token_id, collection_name, name, description, image_url, rarity, floor_price, last_sale_price) VALUES
  ('YOUR_USER_ID', '1234', 'Cool Cats', 'Cool Cat #1234', 'A rare cool cat NFT', '/cool-cat-nft.jpg', 'Rare', 15.5, 18.2),
  ('YOUR_USER_ID', '5678', 'Dino Punks', 'Dino Punk #5678', 'Epic dinosaur NFT', '/dinosaur-nft.jpg', 'Epic', 25.0, 30.5)
ON CONFLICT (user_id, token_id, collection_name) DO NOTHING;

-- Insert demo transactions
INSERT INTO public.transactions (user_id, type, from_token, to_token, amount, usd_value, status, created_at) VALUES
  ('YOUR_USER_ID', 'receive', NULL, 'FLOW', 100.0, 150.0, 'completed', NOW() - INTERVAL '2 hours'),
  ('YOUR_USER_ID', 'swap', 'FLOW', 'USDC', 50.0, 75.0, 'completed', NOW() - INTERVAL '1 day'),
  ('YOUR_USER_ID', 'send', 'USDC', NULL, 200.0, 200.0, 'completed', NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;
