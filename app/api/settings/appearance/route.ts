import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const { profileId, theme } = body

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID required" }, { status: 400 })
    }

    // Update theme preference
    const { data, error } = await supabase
      .from("profiles")
      .update({
        theme: theme,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profileId)
      .select()
      .single()

    if (error) {
      console.error("[v0] Theme update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile: data })
  } catch (error: any) {
    console.error("[v0] Theme update failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
