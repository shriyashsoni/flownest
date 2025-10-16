import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get("profileId")

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID required" }, { status: 400 })
    }

    // Fetch security logs
    const { data, error } = await supabase
      .from("security_logs")
      .select("*")
      .eq("user_id", profileId)
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) {
      console.error("[v0] Security logs fetch error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ logs: data || [] })
  } catch (error: any) {
    console.error("[v0] Security logs fetch failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
