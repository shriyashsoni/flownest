import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const { profileId, displayName, bio, avatarUrl } = body

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID required" }, { status: 400 })
    }

    // Update profile in database
    const { data, error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio: bio,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profileId)
      .select()
      .single()

    if (error) {
      console.error("[v0] Profile update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log security event
    await supabase.from("security_logs").insert({
      user_id: profileId,
      event_type: "profile_updated",
      description: "Profile information updated",
    })

    return NextResponse.json({ success: true, profile: data })
  } catch (error: any) {
    console.error("[v0] Profile update failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
