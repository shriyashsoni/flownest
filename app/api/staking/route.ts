import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { pool_name, token_symbol, amount, apy, lock_period } = body

    // Check balance
    const { data: wallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .eq("token_symbol", token_symbol)
      .single()

    if (!wallet || Number(wallet.balance) < Number(amount)) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Update wallet balance
    await supabase
      .from("wallets")
      .update({
        balance: Number(wallet.balance) - Number(amount),
        usd_value: (Number(wallet.balance) - Number(amount)) * (Number(wallet.usd_value) / Number(wallet.balance)),
      })
      .eq("user_id", user.id)
      .eq("token_symbol", token_symbol)

    // Calculate unlock date
    let unlock_date = null
    if (lock_period !== "flexible") {
      const days = Number.parseInt(lock_period)
      unlock_date = new Date()
      unlock_date.setDate(unlock_date.getDate() + days)
    }

    // Create staking position
    const { data: position } = await supabase
      .from("staking_positions")
      .insert({
        user_id: user.id,
        pool_name,
        token_symbol,
        amount,
        apy,
        lock_period,
        unlock_date: unlock_date?.toISOString(),
      })
      .select()
      .single()

    // Record transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      type: "stake",
      from_token: token_symbol,
      amount,
      usd_value: amount,
      status: "completed",
    })

    return NextResponse.json({ success: true, position })
  } catch (error) {
    console.error("[v0] Error creating staking position:", error)
    return NextResponse.json({ error: "Failed to create staking position" }, { status: 500 })
  }
}
