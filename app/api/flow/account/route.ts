import { type NextRequest, NextResponse } from "next/server"
import { getFlowClient } from "@/lib/flow/rest-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    console.log("[v0] Fetching real account info for:", address)

    const client = getFlowClient()
    const account = await client.getAccount(address)

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    return NextResponse.json({
      address: account.address,
      balance: account.balance.toFixed(2),
      availableBalance: account.balance.toFixed(2),
      keys: account.keys.length,
      source: "flow-rest-api",
    })
  } catch (error) {
    console.error("[v0] Error fetching account info:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch account info" },
      { status: 500 },
    )
  }
}
