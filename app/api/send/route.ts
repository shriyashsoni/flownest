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
    const { token, amount, recipient } = body

    // Get current balance
    const { data: wallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .eq("token_symbol", token)
      .single()

    if (!wallet || Number(wallet.balance) < Number(amount)) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Update balance
    await supabase
      .from("wallets")
      .update({
        balance: Number(wallet.balance) - Number(amount),
        usd_value: (Number(wallet.balance) - Number(amount)) * (Number(wallet.usd_value) / Number(wallet.balance)),
      })
      .eq("user_id", user.id)
      .eq("token_symbol", token)

    // Record transaction
    const { data: transaction } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type: "send",
        from_token: token,
        amount,
        usd_value: amount,
        recipient,
        status: "completed",
        tx_hash: "0x" + Math.random().toString(16).substr(2, 64),
      })
      .select()
      .single()

    return NextResponse.json({ success: true, transaction })
  } catch (error) {
    console.error("[v0] Error processing send:", error)
    return NextResponse.json({ error: "Failed to process send" }, { status: 500 })
  }
}
