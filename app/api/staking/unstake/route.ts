import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { positionId, userId } = await request.json()

    if (!positionId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get staking position
    const { data: position, error: fetchError } = await supabase
      .from("staking_positions")
      .select("*")
      .eq("id", positionId)
      .eq("user_id", userId)
      .single()

    if (fetchError || !position) {
      return NextResponse.json({ error: "Staking position not found" }, { status: 404 })
    }

    // Update position status
    const { error: updateError } = await supabase
      .from("staking_positions")
      .update({ status: "withdrawn" })
      .eq("id", positionId)

    if (updateError) {
      console.error("[v0] Position update failed:", updateError)
      return NextResponse.json({ error: "Failed to unstake" }, { status: 500 })
    }

    // Return tokens to wallet
    const { error: walletError } = await supabase.rpc("increment_wallet_balance", {
      p_user_id: userId,
      p_token_symbol: position.token_symbol,
      p_amount: Number.parseFloat(position.amount),
    })

    if (walletError) {
      console.error("[v0] Wallet update failed:", walletError)
    }

    // Create transaction record
    await supabase.from("transactions").insert({
      user_id: userId,
      type: "unstake",
      token_symbol: position.token_symbol,
      amount: position.amount,
      usd_value: position.usd_value,
      status: "completed",
      from_address: position.pool_name,
      to_address: "user_wallet",
    })

    return NextResponse.json({
      success: true,
      message: `Successfully unstaked ${position.amount} ${position.token_symbol}`,
    })
  } catch (error) {
    console.error("[v0] Unstaking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
