<div align="center">

# 🌊 FlowNest

### Next-Generation DeFi Platform on Flow Blockchain

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://flowfiyour.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Flow Blockchain](https://img.shields.io/badge/Flow-Blockchain-00EF8B?style=for-the-badge&logo=flow)](https://flow.com)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

[Live Demo](https://flowfiyour.vercel.app) • [Documentation](https://flowfiyour.vercel.app/docs) • [Whitepaper](https://flowfiyour.vercel.app/whitepaper)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Smart Contracts](#-smart-contracts)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Flow Testnet Setup](#-flow-testnet-setup)
- [Usage](#-usage)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Credits](#-credits)

---

## 🌟 Overview

**FlowNest** is a comprehensive DeFi platform built on the Flow blockchain, offering wallet management, NFT marketplace, staking, and lending services. Built with Next.js 15, Supabase, and Flow's powerful blockchain infrastructure.

### Key Highlights

- Real-time wallet balance tracking from Flow blockchain
- NFT marketplace with instant purchases
- Flexible staking pools with competitive APYs
- NFT-collateralized lending protocol
- Secure profile and settings management
- Beautiful, responsive UI with dark mode

---

## ✨ Features

### 💼 Wallet Management
- Connect Flow wallets (Blocto, Lilico, Dapper)
- Real-time FLOW token balance
- Multi-token support
- Transaction history with filters
- Send/receive FLOW tokens

### 🎨 NFT Marketplace
- Browse NFT collections
- Filter by price, rarity, collection
- Instant purchase with FLOW
- NFT portfolio management
- Transaction confirmation dialogs

### 💰 Staking Platform
- Multiple staking pools
- Flexible lock periods (30/90/180 days)
- Competitive APYs (5-15%)
- Real-time reward tracking
- One-click stake/unstake

### 🏦 Lending Protocol
- Supply assets to earn interest
- Borrow against NFT collateral
- Dynamic interest rates
- Health factor monitoring
- Liquidation protection

### ⚙️ Settings & Security
- Profile customization
- Avatar upload
- Notification preferences
- Theme switching (Light/Dark)
- Security activity logs
- 2FA support (coming soon)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Lucide Icons** - Icon library

### Backend
- **Supabase** - PostgreSQL database & auth
- **Next.js API Routes** - Serverless functions
- **Flow Client Library (FCL)** - Blockchain integration

### Blockchain
- **Flow Blockchain** - High-performance L1
- **Cadence** - Smart contract language
- **Flow REST API** - Blockchain queries

### Deployment
- **Vercel** - Hosting & deployment
- **GitHub** - Version control
- **Vercel Blob** - File storage

---

## 🏗 Architecture

FlowNest follows a modern, scalable architecture:

1. **Frontend Layer**: Next.js 15 with React Server Components
2. **API Layer**: Next.js API routes for backend logic
3. **Database Layer**: Supabase PostgreSQL with Row Level Security
4. **Blockchain Layer**: Flow blockchain via REST API
5. **Storage Layer**: Vercel Blob for avatars and assets

---

## 📜 Smart Contracts

### FlowFiStaking.cdc

**Purpose**: Token staking with flexible lock periods

**Key Features**:
- Multiple staking pools
- Flexible lock periods
- Automatic reward calculation
- Emergency unstake mechanism

**Main Functions**:
```cadence
pub fun stake(amount: UFix64, lockPeriod: UInt64)
pub fun unstake(stakeId: UInt64)
pub fun claimRewards(stakeId: UInt64)
pub fun getStakeInfo(stakeId: UInt64): StakeInfo
