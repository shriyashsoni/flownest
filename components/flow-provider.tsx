"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getFlowClient } from "@/lib/flow/rest-client"

interface FlowUser {
  addr: string | null
  loggedIn: boolean
}

interface FlowContextType {
  user: FlowUser
  isLoading: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getBalance: (address: string) => Promise<string>
  sendTokens: (recipient: string, amount: string) => Promise<any>
}

const FlowContext = createContext<FlowContextType>({
  user: { addr: null, loggedIn: false },
  isLoading: true,
  connect: async () => {},
  disconnect: async () => {},
  getBalance: async () => "0.0",
  sendTokens: async () => {},
})

export function FlowProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FlowUser>({ addr: null, loggedIn: false })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] Checking for stored wallet connection")
    const storedAddress = localStorage.getItem("flownest_wallet_address")

    if (storedAddress) {
      console.log("[v0] Found stored wallet:", storedAddress)
      setUser({ addr: storedAddress, loggedIn: true })
    }

    setIsLoading(false)
  }, [])

  const connect = async () => {
    console.log("[v0] Connecting wallet...")

    // In production, this would integrate with Blocto, Dapper, or other Flow wallets
    const address = prompt("Enter your Flow wallet address (or use demo address):", "0x1234567890abcdef")

    if (!address) {
      throw new Error("No address provided")
    }

    // Validate address format (basic check)
    if (!address.startsWith("0x") || address.length < 18) {
      throw new Error("Invalid Flow address format")
    }

    console.log("[v0] Wallet connected:", address)

    localStorage.setItem("flownest_wallet_address", address)

    setUser({ addr: address, loggedIn: true })
  }

  const disconnect = async () => {
    console.log("[v0] Disconnecting wallet...")
    localStorage.removeItem("flownest_wallet_address")
    setUser({ addr: null, loggedIn: false })
  }

  const getBalance = async (address: string) => {
    const client = getFlowClient()
    return await client.getFlowBalance(address)
  }

  const sendTokens = async (recipient: string, amount: string) => {
    console.log("[v0] Send transaction:", { recipient, amount })
    throw new Error("Transaction signing requires wallet integration (Blocto/Dapper)")
  }

  return (
    <FlowContext.Provider value={{ user, isLoading, connect, disconnect, getBalance, sendTokens }}>
      {children}
    </FlowContext.Provider>
  )
}

export function useFlow() {
  const context = useContext(FlowContext)
  if (!context) {
    throw new Error("useFlow must be used within FlowProvider")
  }
  return context
}
