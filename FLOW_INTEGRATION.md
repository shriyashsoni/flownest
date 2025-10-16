# Flow Blockchain Integration Guide

## Overview

FlowFi is now integrated with the Flow blockchain using FCL (Flow Client Library) for wallet connection and on-chain interactions.

## Features

### ✅ Implemented

1. **Wallet Connection**
   - Connect via Flow wallet discovery (Blocto, Dapper, Lilico, etc.)
   - Real-time user session management
   - Automatic reconnection on page load

2. **Real Balance Fetching**
   - Query FLOW token balance from blockchain
   - Display real-time balance in dashboard
   - Sync with Supabase database

3. **Token Transfers**
   - Send FLOW tokens to any Flow address
   - Transaction signing via connected wallet
   - Transaction status tracking

4. **Account Information**
   - Fetch account details (storage, balance, etc.)
   - Display Flow address in dashboard

### 🚧 In Progress

1. **NFT Integration**
   - Fetch NFTs from user's collections
   - Display NFT metadata and images
   - NFT marketplace integration

2. **Token Swaps**
   - Integration with Flow DEX protocols
   - Multi-token support (FUSD, USDC, etc.)

3. **Staking & Lending**
   - Stake FLOW tokens
   - NFT-collateralized loans
   - Yield farming positions

## Configuration

### Flow Network

Currently configured for **Flow Testnet**:
- Access Node: `https://rest-testnet.onflow.org`
- Discovery Wallet: `https://fcl-discovery.onflow.org/testnet/authn`

### Contract Addresses (Testnet)

\`\`\`typescript
FlowToken: 0x7e60df042a9c0868
FungibleToken: 0x9a0766d93b6608b7
FUSD: 0xe223d8a629e49c68
NFTStorefront: 0x94b06cfca1d8a476
\`\`\`

## Usage

### Connect Wallet

\`\`\`typescript
import { useFlow } from "@/components/flow-provider"

const { user, connect, disconnect } = useFlow()

// Connect wallet
await connect()

// Check if connected
if (user.loggedIn) {
  console.log("Connected address:", user.addr)
}
\`\`\`

### Get Balance

\`\`\`typescript
const { getBalance } = useFlow()

const balance = await getBalance(user.addr)
console.log("FLOW balance:", balance)
\`\`\`

### Send Tokens

\`\`\`typescript
const { sendTokens } = useFlow()

const tx = await sendTokens(recipientAddress, amount)
console.log("Transaction:", tx)
\`\`\`

## Cadence Scripts

All Cadence scripts and transactions are defined in `lib/flow/cadence-scripts.ts`.

### Available Scripts

- `GET_FLOW_BALANCE` - Get FLOW token balance
- `GET_ACCOUNT_INFO` - Get account information
- `GET_NFT_IDS` - Get NFT IDs from collection

### Available Transactions

- `TRANSFER_FLOW` - Transfer FLOW tokens
- `SETUP_FLOW_VAULT` - Setup FLOW token vault

## API Routes

### `/api/flow/balance`
Get FLOW balance for an address

### `/api/flow/account`
Get account information

### `/api/flow/nfts`
Get NFTs owned by an address

### `/api/flow/transactions`
Get transaction history

## Testing

### Testnet Faucet

Get testnet FLOW tokens: https://testnet-faucet.onflow.org/

### Test Wallets

- Blocto: https://blocto.io/
- Lilico: https://lilico.app/

## Next Steps

1. Implement NFT fetching with proper collection queries
2. Add DEX integration for token swaps
3. Implement staking contracts
4. Add NFT-collateralized lending
5. Deploy to mainnet

## Resources

- [Flow Documentation](https://developers.flow.com/)
- [FCL Documentation](https://developers.flow.com/build/tools/clients/fcl-js)
- [Cadence Language](https://cadence-lang.org/)
