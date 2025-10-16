It sounds like you need the final, complete, correctly formatted text for your `README.md` file, provided as a single block that can be directly saved as that file.

Here is the entire content, formatted as the markdown file itself:

\`\`\``markdown
<div align="center">

# 🌊 FlowNest

### Next-Generation DeFi Platform on Flow Blockchain

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Flow](https://img.shields.io/badge/Flow-Testnet-00EF8B?style=for-the-badge&logo=flow)](https://flow.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Website](https://flowfiyour.vercel.app) • [Documentation](https://flowfiyour.vercel.app/docs) • [Whitepaper](https://flowfiyour.vercel.app/whitepaper)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Smart Contracts](#-smart-contracts)
- [Database Schema](#-database-schema)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Configuration](#-configuration)
- [Flow Testnet Setup](#-flow-testnet-setup)
- [Usage Examples](#usage-examples)
- [Security](#security)
- [Performance](#performance)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#faq)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)
- [Links](#-links)

---

## 🌟 Overview

**FlowNest** is a comprehensive **DeFi platform** built on the **Flow blockchain**, offering seamless wallet integration, **NFT marketplace**, staking pools, and lending protocols. Designed for both beginners and advanced users, FlowNest provides a secure, fast, and user-friendly experience for managing digital assets.

### Why FlowNest?

- **🚀 Fast & Scalable** - Built on Flow's high-performance blockchain
- **🔒 Secure** - Multi-layer security with RLS and server-side validation
- **💎 NFT Marketplace** - Buy, sell, and trade NFTs with ease
- **💰 Staking Rewards** - Earn passive income with flexible staking pools
- **🏦 Lending Protocol** - Borrow against NFT collateral
- **📱 Responsive Design** - Works seamlessly on all devices
- **⚡ Real-time Updates** - Live balance and transaction tracking

---

## ✨ Features

### 🔐 Wallet Management
- Connect with **Blocto**, **Lilico**, or **Dapper** wallets
- Real-time **FLOW** balance tracking
- Multi-token support (**FLOW**, **FUSD**)
- Transaction history with detailed logs
- QR code generation for easy payments
- Address book for frequent recipients

### 💎 NFT Marketplace
- Browse and discover NFTs across collections
- Advanced filtering by rarity, price, and collection
- Buy and sell NFTs instantly
- Detailed NFT metadata and attributes
- Collection analytics and floor prices
- Trending and featured NFTs

### 💰 Staking Platform
- Multiple staking pools with varying **APYs**
- Flexible lock periods (30, 90, 180 days)
- Real-time rewards calculation
- Auto-compounding options
- Early unstaking with penalties
- Staking history and analytics

### 🏦 Lending Protocol
- Borrow against **NFT collateral**
- Dynamic interest rates based on utilization
- **Health factor** monitoring
- Automatic liquidation protection
- Supply assets to earn interest
- Loan management dashboard

### 👤 Profile & Settings
- Customizable user profiles
- Theme selection (Light/Dark mode)
- Notification preferences
- Security settings with **2FA**
- PIN protection for transactions
- Activity logs and security events

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.2.4 | React framework with App Router |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **Tailwind CSS** | 4.1.9 | Utility-first CSS framework |
| **shadcn/ui** | Latest | UI component library |
| **Lucide React** | 0.469.0 | Icon library |
| **Recharts** | 2.15.0 | Chart library for analytics |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.49.2 | Backend as a service |
| **PostgreSQL** | 15+ | Relational database |
| **Supabase Auth** | 2.49.2 | Authentication (optional) |

### Blockchain
| Technology | Version | Purpose |
|------------|---------|---------|
| **Flow Client Library** | 1.13.0 | Flow blockchain integration |
| **Flow Cadence** | Latest | Smart contract language |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9 | Code linting |
| **Prettier** | Latest | Code formatting |
| **Git** | Latest | Version control |

---

## 🏗 Architecture

### System Architecture

\`\`\`mermaid
graph TD
    A[Frontend: Next.js] --> B{API Routes: Next.js};
    B --> C(Flow Blockchain: Smart Contracts);
    B --> D(Supabase Database: PostgreSQL);
    C --> FlowContracts[Staking, Lending, NFT Store];
    D --> SupabaseTables[profiles, wallets, nfts, staking, lending];
    subgraph Frontend Pages
        A1(Wallet Page)
        A2(NFT Page)
        A3(Staking Page)
        A4(Lending Page)
    end
    subgraph API Endpoints
        B1(Flow APIs)
        B2(NFT APIs)
        B3(Staking APIs)
        B4(Profile APIs)
    end
\`\`\``

### Component Structure

\`\`\`
app/
├── (dashboard)/
│   ├── wallet/
│   ├── nft/
│   ├── staking/
│   ├── lending/
│   └── profile/
├── api/
│   ├── flow/
│   ├── transactions/
│   ├── staking/
│   └── marketplace/
└── layout.tsx

components/
├── ui/              # shadcn/ui components
├── wallet/          # Wallet-related components
├── nft/             # NFT components
├── staking/         # Staking components
└── shared/          # Shared components

lib/
├── flow/            # Flow blockchain utilities
├── supabase/        # Supabase client
└── utils/           # Helper functions
\`\`\`

-----

## 📜 Smart Contracts

### FlowFiStaking.cdc

**Contract Address (Testnet)**: `0x[PENDING_DEPLOYMENT]`

**Purpose**: Flexible staking protocol with multiple pools and lock periods.

**Main Functions**:

\`\`\`cadence
// Create a new staking pool
pub fun createPool(name: String, apy: UFix64, lockPeriod: UInt64): UInt64

// Stake tokens in a pool
pub fun stake(poolId: UInt64, amount: UFix64): UInt64

// Unstake tokens from a pool
pub fun unstake(stakeId: UInt64)

// Claim accumulated rewards
pub fun claimRewards(stakeId: UInt64): UFix64
\`\`\`

**Deployment Command**:

\`\`\`bash
flow accounts add-contract FlowFiStaking ./cadence/contracts/FlowFiStaking.cdc --network=testnet --signer=testnet-account
\`\`\`

-----

### FlowFiLending.cdc

**Contract Address (Testnet)**: `0x[PENDING_DEPLOYMENT]`

**Purpose**: NFT-collateralized lending protocol with dynamic interest rates.

**Main Functions**:

\`\`\`cadence
// Supply assets to lending pool
pub fun supply(amount: UFix64): UInt64

// Borrow against NFT collateral
pub fun borrow(amount: UFix64, collateralNFT: @NFT): UInt64

// Repay loan
pub fun repay(loanId: UInt64, amount: UFix64)

// Withdraw supplied assets
pub fun withdraw(supplyId: UInt64, amount: UFix64)

// Liquidate under-collateralized loan
pub fun liquidate(loanId: UInt64)
\`\`\`

**Deployment Command**:

\`\`\`bash
flow accounts add-contract FlowFiLending ./cadence/contracts/FlowFiLending.cdc --network=testnet --signer=testnet-account
\`\`\`

-----

### Flow Standard Contracts (Testnet)

| Contract | Address | Purpose | Documentation |
|----------|---------|---------|---------------|
| **FlowToken** | `0x7e60df042a9c0868` | Native FLOW token | [Docs](https://developers.flow.com/build/core-contracts/flow-token) |
| **FungibleToken** | `0x9a0766d93b6608b7` | Fungible token standard | [Docs](https://developers.flow.com/build/core-contracts/fungible-token) |
| **FUSD** | `0xe223d8a629e49c68` | Flow USD stablecoin | [Docs](https://www.google.com/search?q=https://developers.flow.com/build/core-contracts/fusd) |
| **NFTStorefront** | `0x94b06cfca1d8a476` | NFT marketplace standard | [Docs](https://developers.flow.com/build/core-contracts/nft-storefront) |
| **NonFungibleToken** | `0x631e88ae7f1d7c20` | NFT standard | [Docs](https://developers.flow.com/build/core-contracts/non-fungible-token) |

-----

## 🗄 Database Schema

### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
    profiles ||--o{ wallets : "has"
    profiles ||--o{ transactions : "performs"
    profiles ||--o{ staking_positions : "holds"
    profiles ||--o{ nfts : "owns"
    profiles ||--o{ lending_positions : "has"
    
    profiles {
        uuid id PK
        text flow_address UK
        text username
    }
    
    wallets {
        uuid id PK
        uuid user_id FK
        text token_symbol UK
        numeric balance
    }
    
    transactions {
        uuid id PK
        uuid user_id FK
        text type
        numeric amount
    }
    
    staking_positions {
        uuid id PK
        uuid user_id FK
        text pool_name
        numeric amount
    }

    nfts {
        uuid id PK
        uuid user_id FK
        text token_id UK
        text collection_name UK
    }

    lending_positions {
        uuid id PK
        uuid user_id FK
        text type
        numeric amount
    }
\`\`\`

### Detailed Schema

#### profiles

\`\`\`sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_address TEXT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark')),
  notification_tx_alerts BOOLEAN DEFAULT true,
  notification_staking_alerts BOOLEAN DEFAULT true,
  notification_price_alerts BOOLEAN DEFAULT false,
  two_fa_enabled BOOLEAN DEFAULT false,
  pin_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profiles_flow_address ON profiles(flow_address);
CREATE INDEX idx_profiles_username ON profiles(username);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
\`\`\`

#### wallets

\`\`\`sql
CREATE TABLE wallets (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
token_symbol TEXT NOT NULL,
balance NUMERIC(20, 8) DEFAULT 0 CHECK (balance >= 0),
usd_value NUMERIC(20, 2) DEFAULT 0,
last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
UNIQUE(user_id, token_symbol)
);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_token_symbol ON wallets(token_symbol);

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
\`\`\`

#### transactions

\`\`\`sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('send', 'receive', 'stake', 'unstake', 'swap', 'buy_nft', 'sell_nft')),
  amount NUMERIC(20, 8) NOT NULL,
  from_token TEXT,
  to_token TEXT,
  recipient TEXT,
  sender TEXT,
  tx_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  usd_value NUMERIC(20, 2),
  gas_fee NUMERIC(20, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
\`\`\`

#### staking\_positions

\`\`\`sql
CREATE TABLE staking_positions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
pool_name TEXT NOT NULL,
amount NUMERIC(20, 8) NOT NULL CHECK (amount > 0),
apy NUMERIC(5, 2) NOT NULL CHECK (apy >= 0),
rewards_earned NUMERIC(20, 8) DEFAULT 0,
lock_period INTEGER NOT NULL CHECK (lock_period IN (30, 90, 180)),
start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
end_date TIMESTAMP WITH TIME ZONE NOT NULL,
status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_staking_user_id ON staking_positions(user_id);
CREATE INDEX idx_staking_status ON staking_positions(status);
CREATE INDEX idx_staking_end_date ON staking_positions(end_date);

ALTER TABLE staking_positions ENABLE ROW LEVEL SECURITY;
\`\`\`

#### nfts

\`\`\`sql
CREATE TABLE nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  token_id TEXT NOT NULL,
  collection_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price NUMERIC(20, 8),
  rarity TEXT CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')),
  attributes JSONB,
  is_listed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(token_id, collection_name)
);

CREATE INDEX idx_nfts_user_id ON nfts(user_id);
CREATE INDEX idx_nfts_collection ON nfts(collection_name);
CREATE INDEX idx_nfts_rarity ON nfts(rarity);
CREATE INDEX idx_nfts_is_listed ON nfts(is_listed);

ALTER TABLE nfts ENABLE ROW LEVEL SECURITY;
\`\`\`

-----

## API Endpoints

### Flow Blockchain APIs

#### GET /api/flow/balance

Get FLOW token balance for an address

**Query Parameters**:

\`\`\`typescript
{
  address: string // Flow address (0x...)
}
\`\`\`

**Response**:

\`\`\`json
{
  "balance": "123.45678900",
  "address": "0x1234567890abcdef",
  "timestamp": "2025-01-16T10:30:00Z"
}
\`\`\`

**Example**:

\`\`\`bash
curl "[https://flowfiyour.vercel.app/api/flow/balance?address=0x1234567890abcdef](https://flowfiyour.vercel.app/api/flow/balance?address=0x1234567890abcdef)"
\`\`\`

-----

#### GET /api/flow/account

Get complete account information

**Query Parameters**:

\`\`\`typescript
{
  address: string
}
\`\`\`

**Response**:

\`\`\`json
{
  "address": "0x1234567890abcdef",
  "balance": "123.45678900",
  "code": "",
  "contracts": {},
  "keys": [
    {
      "index": 0,
      "publicKey": "...",
      "signAlgo": 2,
      "hashAlgo": 3,
      "weight": 1000,
      "sequenceNumber":
