"use client"

import { useEffect, useState } from "react"
import { useFlow } from "@/components/flow-provider"
import { useRouter } from "next/navigation"
import { DashboardClient } from "@/components/dashboard-client"
import { createClient } from "@/lib/supabase/client"
import type { Wallet, NFT, Transaction, StakingPosition, LendingPosition, Profile } from "@/lib/types"

export default function DashboardPage() {
  const { user, isLoading } = useFlow()
  const router = useRouter()
  const [data, setData] = useState<{
    profile: Profile | null
    wallets: Wallet[]
    nfts: NFT[]
    transactions: Transaction[]
    stakingPositions: StakingPosition[]
    lendingPositions: LendingPosition[]
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user.loggedIn) {
      router.push("/")
      return
    }

    async function fetchData() {
      if (!user.addr) return

      const supabase = createClient()

      // Get or create profile based on Flow address
      let { data: profile } = await supabase.from("profiles").select("*").eq("flow_address", user.addr).single()

      if (!profile) {
        // Create new profile for this wallet
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({
            flow_address: user.addr,
            display_name: `User ${user.addr.slice(0, 6)}`,
          })
          .select()
          .single()
        profile = newProfile

        // Seed demo data for new users
        if (profile) {
          await seedDemoData(supabase, profile.id)
        }
      }

      if (!profile) {
        setLoading(false)
        return
      }

      // Fetch all user data
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

      setData({
        profile,
        wallets: walletsRes.data || [],
        nfts: nftsRes.data || [],
        transactions: transactionsRes.data || [],
        stakingPositions: stakingRes.data || [],
        lendingPositions: lendingRes.data || [],
      })
      setLoading(false)
    }

    if (user.loggedIn && user.addr) {
      fetchData()
    }
  }, [user, isLoading, router])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data) {
    return null
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

async function seedDemoData(supabase: any, userId: string) {
  // Add demo wallets
  await supabase.from("wallets").insert([
    {
      user_id: userId,
      token_symbol: "FLOW",
      balance: "125.50",
      usd_value: "157.50",
    },
    {
      user_id: userId,
      token_symbol: "USDC",
      balance: "500.00",
      usd_value: "500.00",
    },
  ])

  // Add demo NFTs
  await supabase.from("nfts").insert([
    {
      user_id: userId,
      name: "Cool Cat #1234",
      collection: "Cool Cats",
      image_url: "/cool-cat-nft.jpg",
      floor_price: "2.5",
    },
    {
      user_id: userId,
      name: "Dino #5678",
      collection: "Dapper Dinos",
      image_url: "/dinosaur-nft.jpg",
      floor_price: "1.8",
    },
  ])

  // Add demo transaction
  await supabase.from("transactions").insert([
    {
      user_id: userId,
      type: "receive",
      amount: "125.50",
      token_symbol: "FLOW",
      usd_value: "157.50",
      status: "completed",
    },
  ])
}
