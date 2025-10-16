import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const { profileId, txAlerts, stakingAlerts, priceAlerts } = body

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID required" }, { status: 400 })
    }

    // Update notification preferences
    const { data, error } = await supabase
      .from("profiles")
      .update({
        notification_tx_alerts: txAlerts,
        notification_staking_alerts: stakingAlerts,
        notification_price_alerts: priceAlerts,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profileId)
      .select()
      .single()

    if (error) {
      console.error("[v0] Notification settings update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile: data })
  } catch (error: any) {
    console.error("[v0] Notification settings update failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
