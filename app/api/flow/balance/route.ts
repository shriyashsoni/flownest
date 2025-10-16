import { type NextRequest, NextResponse } from "next/server"
import { getFlowClient } from "@/lib/flow/rest-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    console.log("[v0] Fetching real Flow balance for:", address)

    const client = getFlowClient()
    const balance = await client.getFlowBalance(address)

    console.log("[v0] Real Flow balance from blockchain:", balance)

    return NextResponse.json({ balance, address, source: "flow-rest-api" })
  } catch (error) {
    console.error("[v0] Error fetching Flow balance:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch balance" },
      { status: 500 },
    )
  }
}
