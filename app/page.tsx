"use client"

import { useEffect, useState } from "react"
import { useFlow } from "@/components/flow-provider"
import { WalletConnect } from "@/components/wallet-connect"
import { DashboardClient } from "@/components/dashboard-client"
import { createClient } from "@/lib/supabase/client"
import type { Wallet, NFT, Transaction, StakingPosition, LendingPosition, Profile } from "@/lib/types"

export default function HomePage() {
  const { user, isLoading, getBalance } = useFlow()
  const [data, setData] = useState<{
    profile: Profile | null
    wallets: Wallet[]
    nfts: NFT[]
    transactions: Transaction[]
    stakingPositions: StakingPosition[]
    lendingPositions: LendingPosition[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!user.addr) return

      console.log("[v0] Starting data fetch for wallet:", user.addr)
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()

        // Fetch or create profile
        let { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("flow_address", user.addr)
          .maybeSingle()

        console.log("[v0] Profile fetch result:", { profile, profileError })

        if (!profile && !profileError) {
          console.log("[v0] Creating new profile for wallet:", user.addr)

          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert({
              flow_address: user.addr,
              display_name: `User ${user.addr.slice(0, 8)}`,
              username: `user_${user.addr.slice(2, 10)}`,
            })
            .select()
            .single()

          console.log("[v0] Profile creation result:", { newProfile, insertError })

          if (insertError) {
            console.error("[v0] Failed to create profile:", insertError.message, insertError)
            setError(
              `Failed to create user profile: ${insertError.message}. Please make sure the database migration has been run.`,
            )
            setLoading(false)
            return
          }

          profile = newProfile
        }

        if (profileError) {
          console.error("[v0] Profile fetch error:", profileError)
          setError(`Failed to fetch user profile: ${profileError.message}`)
          setLoading(false)
          return
        }

        if (!profile) {
          console.error("[v0] No profile found and creation failed")
          setError("Unable to load user profile. Please reconnect your wallet.")
          setLoading(false)
          return
        }

        console.log("[v0] Fetching real blockchain data...")

        // Fetch real Flow balance from blockchain
        const flowBalance = await getBalance(user.addr)
        console.log("[v0] Real Flow balance from blockchain:", flowBalance)

        // Fetch NFTs from blockchain
        const nftsResponse = await fetch(`/api/flow/nfts?address=${user.addr}`)
        const nftsData = await nftsResponse.json()
        console.log("[v0] NFTs from blockchain:", nftsData)

        // Fetch database records
        const [walletsRes, nftsRes, transactionsRes, stakingRes, lendingRes] = await Promise.all([
          supabase.from("wallets").select("*").eq("user_id", profile.id),
          supabase.from("nfts").select("*").eq("user_id", profile.id),
          supabase
            .from("transactions")
            .select("*")
            .eq("user_id", profile.id)
            .order("created_at", { ascending: false })
            .limit(10),
          supabase.from("staking_positions").select("*").eq("user_id", profile.id),
          supabase.from("lending_positions").select("*").eq("user_id", profile.id),
        ])

        // Update or create FLOW wallet with real balance
        let flowWallet = walletsRes.data?.find((w) => w.token_symbol === "FLOW")

        if (flowWallet) {
          // Update existing wallet with real balance
          await supabase
            .from("wallets")
            .update({
              balance: flowBalance,
              usd_value: (Number.parseFloat(flowBalance) * 1.25).toFixed(2), // Mock USD conversion
            })
            .eq("id", flowWallet.id)

          flowWallet.balance = flowBalance
          flowWallet.usd_value = (Number.parseFloat(flowBalance) * 1.25).toFixed(2)
        } else {
          // Create new wallet with real balance
          const { data: newWallet } = await supabase
            .from("wallets")
            .insert({
              user_id: profile.id,
              token_symbol: "FLOW",
              balance: flowBalance,
              usd_value: (Number.parseFloat(flowBalance) * 1.25).toFixed(2),
            })
            .select()
            .single()

          if (newWallet) {
            flowWallet = newWallet
          }
        }

        console.log("[v0] Data fetch complete with real blockchain data")

        setData({
          profile,
          wallets: walletsRes.data || [],
          nfts: nftsRes.data || [],
          transactions: transactionsRes.data || [],
          stakingPositions: stakingRes.data || [],
          lendingPositions: lendingRes.data || [],
        })
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
        setError(`An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    if (user.loggedIn && user.addr) {
      fetchData()
    }
  }, [user, getBalance])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading FlowNest...</p>
        </div>
      </div>
    )
  }

  if (!user.loggedIn) {
    return <WalletConnect />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your portfolio from Flow blockchain...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-destructive text-4xl">⚠️</div>
          <h2 className="text-xl font-semibold">Error Loading Data</h2>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Initializing your account...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardClient
      flowAddress={user.addr!}
      profile={data.profile}
      wallets={data.wallets}
      nfts={data.nfts}
      transactions={data.transactions}
      stakingPositions={data.stakingPositions}
      lendingPositions={data.lendingPositions}
    />
  )
}
