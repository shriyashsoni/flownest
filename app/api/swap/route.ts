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
    const { from_token, to_token, from_amount, to_amount } = body

    // Get current balances
    const { data: fromWallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .eq("token_symbol", from_token)
      .single()

    if (!fromWallet || Number(fromWallet.balance) < Number(from_amount)) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Update from token balance
    await supabase
      .from("wallets")
      .update({
        balance: Number(fromWallet.balance) - Number(from_amount),
        usd_value:
          (Number(fromWallet.balance) - Number(from_amount)) *
          (Number(fromWallet.usd_value) / Number(fromWallet.balance)),
      })
      .eq("user_id", user.id)
      .eq("token_symbol", from_token)

    // Update to token balance
    const { data: toWallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .eq("token_symbol", to_token)
      .single()

    if (toWallet) {
      await supabase
        .from("wallets")
        .update({
          balance: Number(toWallet.balance) + Number(to_amount),
          usd_value: Number(toWallet.usd_value) + Number(to_amount),
        })
        .eq("user_id", user.id)
        .eq("token_symbol", to_token)
    } else {
      await supabase.from("wallets").insert({
        user_id: user.id,
        token_symbol: to_token,
        balance: to_amount,
        usd_value: to_amount,
      })
    }

    // Record transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      type: "swap",
      from_token,
      to_token,
      amount: from_amount,
      usd_value: from_amount,
      status: "completed",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing swap:", error)
    return NextResponse.json({ error: "Failed to process swap" }, { status: 500 })
  }
}
