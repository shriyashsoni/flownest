import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { nftId, price, buyerAddress } = body

    console.log("[v0] Processing NFT purchase:", { nftId, price, buyerAddress })

    // Validate inputs
    if (!nftId || !price || !buyerAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Cadence transaction for buying NFT from storefront
    const buyNFTTransaction = `
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTStorefront from 0x94b06cfca1d8a476
      import NonFungibleToken from 0x631e88ae7f1d7c20

      transaction(listingResourceID: UInt64, storefrontAddress: Address) {
        let paymentVault: @FungibleToken.Vault
        let nftCollection: &AnyResource{NonFungibleToken.CollectionPublic}
        let storefront: &NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}
        let listing: &NFTStorefront.Listing{NFTStorefront.ListingPublic}

        prepare(acct: AuthAccount) {
          self.storefront = getAccount(storefrontAddress)
            .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
              NFTStorefront.StorefrontPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

          self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
            ?? panic("No Listing with that ID in Storefront")

          let price = self.listing.getDetails().salePrice

          let mainFlowVault = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from acct storage")
          
          self.paymentVault <- mainFlowVault.withdraw(amount: price)

          self.nftCollection = acct.borrow<&AnyResource{NonFungibleToken.CollectionPublic}>(
            from: /storage/NFTCollection
          ) ?? panic("Cannot borrow NFT collection receiver from account")
        }

        execute {
          let item <- self.listing.purchase(
            payment: <-self.paymentVault
          )

          self.nftCollection.deposit(token: <-item)

          self.storefront.cleanup(listingResourceID: listingResourceID)
        }
      }
    `

    // Simulate transaction
    const txHash = "0x" + Math.random().toString(16).substr(2, 64)

    console.log("[v0] NFT purchase simulated:", txHash)

    // Find user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("flow_address", buyerAddress)
      .maybeSingle()

    if (profile) {
      // Deduct FLOW from buyer's wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", profile.id)
        .eq("token_symbol", "FLOW")
        .maybeSingle()

      if (wallet) {
        const newBalance = Number.parseFloat(wallet.balance) - Number.parseFloat(price)
        if (newBalance < 0) {
          return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
        }

        await supabase
          .from("wallets")
          .update({
            balance: newBalance.toString(),
            usd_value: (newBalance * 0.5).toString(),
          })
          .eq("id", wallet.id)
      }

      // Add NFT to user's collection
      await supabase.from("nfts").insert({
        user_id: profile.id,
        name: `NFT #${nftId}`,
        collection: "Marketplace Purchase",
        image_url: "/placeholder.svg",
        token_id: nftId.toString(),
        contract_address: "0x94b06cfca1d8a476",
        floor_price: price,
      })

      // Record transaction
      await supabase.from("transactions").insert({
        user_id: profile.id,
        type: "buy",
        from_token: "FLOW",
        amount: price,
        usd_value: (Number.parseFloat(price) * 0.5).toString(),
        status: "completed",
        tx_hash: txHash,
      })
    }

    return NextResponse.json({
      success: true,
      txHash,
      message: "NFT purchased successfully",
      note: "In production, this would be signed by your wallet",
    })
  } catch (error) {
    console.error("[v0] Error processing NFT purchase:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Purchase failed" }, { status: 500 })
  }
}
