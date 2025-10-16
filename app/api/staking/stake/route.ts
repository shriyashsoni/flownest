import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, poolName, amount, tokenSymbol } = await request.json()

    if (!userId || !poolName || !amount || !tokenSymbol) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Create staking position
    const { data: position, error: positionError } = await supabase
      .from("staking_positions")
      .insert({
        user_id: userId,
        pool_name: poolName,
        token_symbol: tokenSymbol,
        amount: amount.toString(),
        apy: poolName === "FLOW Staking" ? "8.5" : poolName === "High Yield Pool" ? "15.8" : "5.2",
        usd_value: (amount * 0.45).toString(), // Mock FLOW price
        status: "active",
      })
      .select()
      .single()

    if (positionError) {
      console.error("[v0] Staking position creation failed:", positionError)
      return NextResponse.json({ error: "Failed to create staking position" }, { status: 500 })
    }

    // Update wallet balance
    const { error: walletError } = await supabase
      .from("wallets")
      .update({
        balance: (Number.parseFloat(amount) * -1).toString(), // Deduct staked amount
      })
      .eq("user_id", userId)
      .eq("token_symbol", tokenSymbol)

    if (walletError) {
      console.error("[v0] Wallet update failed:", walletError)
    }

    // Create transaction record
    await supabase.from("transactions").insert({
      user_id: userId,
      type: "stake",
      token_symbol: tokenSymbol,
      amount: amount.toString(),
      usd_value: (amount * 0.45).toString(),
      status: "completed",
      from_address: "user_wallet",
      to_address: poolName,
    })

    return NextResponse.json({
      success: true,
      position,
      message: `Successfully staked ${amount} ${tokenSymbol}`,
    })
  } catch (error) {
    console.error("[v0] Staking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
