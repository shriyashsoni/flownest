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

    const { data: wallets, error } = await supabase.from("wallets").select("*").eq("user_id", user.id)

    if (error) throw error

    return NextResponse.json({ wallets })
  } catch (error) {
    console.error("[v0] Error fetching wallet balance:", error)
    return NextResponse.json({ error: "Failed to fetch wallet balance" }, { status: 500 })
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
    const { token_symbol, balance, usd_value } = body

    const { data, error } = await supabase
      .from("wallets")
      .upsert(
        {
          user_id: user.id,
          token_symbol,
          balance,
          usd_value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,token_symbol" },
      )
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ wallet: data })
  } catch (error) {
    console.error("[v0] Error updating wallet balance:", error)
    return NextResponse.json({ error: "Failed to update wallet balance" }, { status: 500 })
  }
}
