export interface Profile {
  id: string
  flow_address: string | null
  username: string | null
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Wallet {
  id: string
  user_id: string
  token_symbol: string
  balance: number
  usd_value: number
  created_at: string
  updated_at: string
}

export interface NFT {
  id: string
  user_id: string
  token_id: string
  collection_name: string
  name: string
  description: string | null
  image_url: string | null
  rarity: string | null
  floor_price: number | null
  last_sale_price: number | null
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: string
  from_token: string | null
  to_token: string | null
  amount: number | null
  usd_value: number | null
  recipient: string | null
  tx_hash: string | null
  status: string
  created_at: string
}

export interface StakingPosition {
  id: string
  user_id: string
  pool_name: string
  token_symbol: string
  amount: number
  apy: number
  rewards_earned: number
  lock_period: string | null
  unlock_date: string | null
  created_at: string
  updated_at: string
}

export interface LendingPosition {
  id: string
  user_id: string
  type: string
  token_symbol: string
  amount: number
  apy: number
  interest_earned: number
  created_at: string
  updated_at: string
}

export interface NFTLoan {
  id: string
  user_id: string
  nft_id: string
  loan_amount: number
  token_symbol: string
  interest_rate: number
  duration_days: number
  due_date: string
  status: string
  created_at: string
}
