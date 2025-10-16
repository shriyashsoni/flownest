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

##Component Structure


       app/
    ├── (dashboard)/
    │   ├── wallet/
    │   ├── nft/
    │   ├── staking/
    │   ├── lending/
    │   └── profile/
    ├── api/
    │   ├── flow/
    │   ├── transactions/
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
 ---   

## 📜 Smart Contracts
FlowFiStaking.cdc
Contract Address (Testnet): 0x[PENDING_DEPLOYMENT]

Purpose: Flexible staking protocol with multiple pools and lock periods.

Main Functions:

       // Create a new staking pool
     pub fun createPool(name: String, apy: UFix64, lockPeriod: UInt64): UInt64

     // Stake tokens in a pool
    pub fun stake(poolId: UInt64, amount: UFix64): UInt64
    
 # Deployment Command:
    flow accounts add-contract FlowFiStaking ./cadence/contracts/FlowFiStaking.cdc --network=testnet --signer=testnet-account
---


    // Unstake tokens from a pool
    pub fun unstake(stakeId: UInt64)

    // Claim accumulated rewards
    pub fun claimRewards(stakeId: UInt64): UFix64
---
##FlowFiLending.cdc
Contract Address (Testnet): 0x[PENDING_DEPLOYMENT]

Purpose: NFT-collateralized lending protocol with dynamic interest rates.

Main Functions:

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

---
##Flow Standard Contracts (Testnet)
