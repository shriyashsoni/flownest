import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    console.log("[v0] Fetching transactions for:", address)

    const supabase = await createClient()

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("id").eq("flow_address", address).single()

    if (!profile) {
      return NextResponse.json({ transactions: [] })
    }

    // Get transactions from database
    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(25)

    return NextResponse.json({ transactions: transactions || [] })
  } catch (error) {
    console.error("[v0] Error fetching transactions:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch transactions" },
      { status: 500 },
    )
  }
}
