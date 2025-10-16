import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) throw error

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("[v0] Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

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
    const { type, from_token, to_token, amount, usd_value, recipient, tx_hash } = body

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type,
        from_token,
        to_token,
        amount,
        usd_value,
        recipient,
        tx_hash,
        status: "completed",
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ transaction: data })
  } catch (error) {
    console.error("[v0] Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
