"use client"

export const FLOW_CONFIG = {
  network: "testnet",
  accessNode: "https://rest-testnet.onflow.org",

  // Contract addresses on Flow Testnet
  contracts: {
    FlowToken: "0x7e60df042a9c0868",
    FungibleToken: "0x9a0766d93b6608b7",
    FUSD: "0xe223d8a629e49c68",
    NFTStorefront: "0x94b06cfca1d8a476",
  },
}

interface FlowAccount {
  address: string
  balance: number
  keys: any[]
  contracts: any
}

export class FlowRestClient {
  private baseUrl: string

  constructor(network: "testnet" | "mainnet" = "testnet") {
    this.baseUrl = network === "testnet" ? "https://rest-testnet.onflow.org" : "https://rest-mainnet.onflow.org"
  }

  // Get account information including FLOW balance
  async getAccount(address: string): Promise<FlowAccount | null> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/accounts/${address}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        console.error("[v0] Failed to fetch account:", response.statusText)
        return null
      }

      const data = await response.json()
      console.log("[v0] Account data from Flow:", data)

      // Extract FLOW balance from account
      const balance = data.balance ? Number.parseInt(data.balance) / 100000000 : 0 // Convert from smallest unit

      return {
        address: data.address,
        balance,
        keys: data.keys || [],
        contracts: data.contracts || {},
      }
    } catch (error) {
      console.error("[v0] Error fetching account:", error)
      return null
    }
  }

  // Execute a Cadence script to query blockchain data
  async executeScript(script: string, args: any[] = []): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/scripts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script: Buffer.from(script).toString("base64"),
          arguments: args,
        }),
      })

      if (!response.ok) {
        console.error("[v0] Script execution failed:", response.statusText)
        return null
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("[v0] Error executing script:", error)
      return null
    }
  }

  // Get FLOW token balance for an address
  async getFlowBalance(address: string): Promise<string> {
    try {
      const account = await this.getAccount(address)
      if (!account) return "0.0"

      console.log("[v0] Flow balance for", address, ":", account.balance)
      return account.balance.toFixed(2)
    } catch (error) {
      console.error("[v0] Error getting Flow balance:", error)
      return "0.0"
    }
  }

  // Get NFTs owned by an address (simplified - would need specific NFT contract queries)
  async getNFTs(address: string): Promise<any[]> {
    try {
      // This would require querying specific NFT contracts
      // For now, return empty array as placeholder
      console.log("[v0] Fetching NFTs for:", address)
      return []
    } catch (error) {
      console.error("[v0] Error fetching NFTs:", error)
      return []
    }
  }

  // Get transaction by ID
  async getTransaction(txId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/transactions/${txId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return null
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Error fetching transaction:", error)
      return null
    }
  }

  async submitTransaction(transaction: {
    script: string
    arguments: any[]
    proposer: string
    payer: string
    authorizers: string[]
  }): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script: Buffer.from(transaction.script).toString("base64"),
          arguments: transaction.arguments,
          reference_block_id: await this.getLatestBlockId(),
          gas_limit: "9999",
          proposal_key: {
            address: transaction.proposer,
            key_index: "0",
            sequence_number: "0",
          },
          payer: transaction.payer,
          authorizers: transaction.authorizers,
        }),
      })

      if (!response.ok) {
        throw new Error(`Transaction submission failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.id
    } catch (error) {
      console.error("[v0] Error submitting transaction:", error)
      throw error
    }
  }

  async getLatestBlockId(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/blocks?height=sealed`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch latest block")
      }

      const data = await response.json()
      return data[0]?.id || ""
    } catch (error) {
      console.error("[v0] Error fetching latest block:", error)
      return ""
    }
  }
}

// Singleton instance
let flowClient: FlowRestClient | null = null

export function getFlowClient(): FlowRestClient {
  if (!flowClient) {
    flowClient = new FlowRestClient("testnet")
  }
  return flowClient
}
