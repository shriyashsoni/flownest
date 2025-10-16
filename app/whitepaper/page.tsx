import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-background/50 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/flow-logo.png" alt="Flow Blockchain" width={32} height={32} className="h-8 w-auto" />
            <span className="text-xl font-bold">FlowFi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">FlowFi Whitepaper</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Technical specification and vision for the future of DeFi on Flow
          </p>
          <p className="text-sm text-muted-foreground mt-4">Version 1.0 • January 2025</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
          <section>
            <h2>Abstract</h2>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi is a comprehensive decentralized finance (DeFi) platform built on the Flow blockchain that unifies
              wallet management, NFT marketplace, token swaps, staking, lending, and peer-to-peer payments into a single
              user-friendly application. By leveraging Flow's resource-oriented programming model and Cadence smart
              contracts, FlowFi provides a secure, fast, and cost-effective solution for managing digital assets and
              participating in the Web3 economy.
            </p>
          </section>

          <section>
            <h2>1. Introduction</h2>
            <h3>1.1 Problem Statement</h3>
            <p className="text-muted-foreground leading-relaxed">
              The current DeFi landscape suffers from fragmentation. Users must navigate multiple platforms, each with
              different interfaces, security models, and user experiences. This creates friction, increases security
              risks, and limits mainstream adoption. Additionally, most DeFi platforms are built on Ethereum or EVM
              chains, which suffer from high gas fees and network congestion.
            </p>

            <h3>1.2 Our Solution</h3>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi addresses these challenges by providing an all-in-one platform built on Flow blockchain. We combine
              essential DeFi features with an intuitive interface, leveraging Flow's unique architecture to deliver
              fast, affordable transactions while maintaining security and decentralization.
            </p>
          </section>

          <section>
            <h2>2. Technical Architecture</h2>
            <h3>2.1 Flow Blockchain</h3>
            <p className="text-muted-foreground leading-relaxed">
              Flow is a fast, decentralized, and developer-friendly blockchain designed for the next generation of apps,
              games, and digital assets. Unlike other blockchains, Flow uses a multi-node architecture that separates
              consensus, execution, verification, and collection into specialized node types, enabling high throughput
              without sharding.
            </p>

            <h3>2.2 Cadence Smart Contracts</h3>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi's core functionality is implemented through Cadence smart contracts. Cadence is a resource-oriented
              programming language that treats digital assets as resources with built-in ownership and access control.
              This makes it inherently safer than account-based models used in Solidity.
            </p>

            <Card className="my-6 border-primary/30">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">Key Smart Contracts:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">FlowFiStaking:</strong> Manages staking pools, rewards
                    distribution, and lock periods
                  </li>
                  <li>
                    <strong className="text-foreground">FlowFiLending:</strong> Handles lending pools,
                    NFT-collateralized loans, and interest calculations
                  </li>
                  <li>
                    <strong className="text-foreground">FlowFiMarketplace:</strong> Non-custodial NFT marketplace with
                    royalty support
                  </li>
                  <li>
                    <strong className="text-foreground">FlowFiSwap:</strong> Token swap aggregator connecting to Flow
                    DEXs
                  </li>
                </ul>
              </CardContent>
            </Card>

            <h3>2.3 Frontend Architecture</h3>
            <p className="text-muted-foreground leading-relaxed">
              The FlowFi frontend is built with Next.js 15, React 19, and TypeScript, providing a modern, performant web
              application. We use the Flow Client Library (FCL) for wallet integration and blockchain interactions.
              Supabase provides real-time database functionality for user profiles and transaction history.
            </p>
          </section>

          <section>
            <h2>3. Core Features</h2>
            <h3>3.1 Unified Wallet</h3>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi provides a comprehensive wallet interface that displays all tokens and NFTs in one place. Real-time
              balance updates are fetched directly from the Flow blockchain using Cadence scripts. Portfolio analytics
              help users track performance and asset allocation.
            </p>

            <h3>3.2 NFT Marketplace</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our non-custodial NFT marketplace allows users to buy, sell, and discover NFTs without giving up custody
              of their assets. Listings are managed through smart contracts, and NFTs remain in the seller's wallet
              until purchase. The marketplace supports creator royalties and collection verification.
            </p>

            <h3>3.3 DeFi Features</h3>
            <p className="text-muted-foreground leading-relaxed">FlowFi offers three primary DeFi features:</p>
            <ul className="text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Staking:</strong> Users can stake FLOW tokens in various pools with
                different APYs and lock periods. Rewards are calculated and distributed automatically through smart
                contracts.
              </li>
              <li>
                <strong className="text-foreground">Lending & Borrowing:</strong> Supply tokens to earn interest or
                borrow against collateral. Interest rates adjust dynamically based on utilization.
              </li>
              <li>
                <strong className="text-foreground">NFT-Collateralized Loans:</strong> A unique feature allowing users
                to borrow FLOW tokens using NFTs as collateral, unlocking liquidity without selling assets.
              </li>
            </ul>

            <h3>3.4 Token Swaps</h3>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi aggregates liquidity from multiple DEXs on Flow to provide users with the best swap rates. The swap
              interface shows real-time rates, slippage, and estimated fees before execution.
            </p>

            <h3>3.5 P2P Payments</h3>
            <p className="text-muted-foreground leading-relaxed">
              Send FLOW tokens to any Flow address instantly. Transactions are confirmed in under 1 second with minimal
              fees, making FlowFi ideal for everyday payments.
            </p>
          </section>

          <section>
            <h2>4. Security</h2>
            <h3>4.1 Non-Custodial Design</h3>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi is completely non-custodial. Users maintain full control of their private keys through their chosen
              Flow wallet provider. FlowFi never has access to user funds or private keys.
            </p>

            <h3>4.2 Smart Contract Audits</h3>
            <p className="text-muted-foreground leading-relaxed">
              All FlowFi smart contracts undergo rigorous security audits by reputable third-party firms. Contracts are
              open-source and available for community review.
            </p>

            <h3>4.3 Data Privacy</h3>
            <p className="text-muted-foreground leading-relaxed">
              User profiles and transaction history are stored in Supabase with Row Level Security (RLS) policies
              ensuring users can only access their own data. Blockchain data is public by nature but pseudonymous.
            </p>
          </section>

          <section>
            <h2>5. Tokenomics</h2>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi currently operates without a native token, using FLOW as the primary currency for all transactions,
              fees, and rewards. Future versions may introduce a governance token to enable community-driven development
              and protocol upgrades.
            </p>
          </section>

          <section>
            <h2>6. Roadmap</h2>
            <Card className="my-6">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Q1 2025 - MVP Launch</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Wallet integration and portfolio tracking</li>
                      <li>• Basic NFT marketplace</li>
                      <li>• P2P payments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Q2 2025 - DeFi Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Staking pools launch</li>
                      <li>• Lending & borrowing protocol</li>
                      <li>• Token swap aggregator</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Q3 2025 - Advanced Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• NFT-collateralized loans</li>
                      <li>• Mobile app launch</li>
                      <li>• Advanced analytics dashboard</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Q4 2025 - Ecosystem Growth</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Governance token launch</li>
                      <li>• Cross-chain bridges</li>
                      <li>• Developer API and SDK</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2>7. Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              FlowFi represents the future of decentralized finance on Flow blockchain. By combining essential DeFi
              features with an intuitive interface and leveraging Flow's unique technical advantages, we're building a
              platform that makes Web3 accessible to everyone. Our non-custodial design ensures users maintain full
              control of their assets while enjoying the benefits of a unified financial super-app.
            </p>
          </section>

          <section>
            <h2>References</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>[1] Flow Blockchain Documentation - https://developers.flow.com</li>
              <li>[2] Cadence Programming Language - https://cadence-lang.org</li>
              <li>[3] Flow Client Library (FCL) - https://github.com/onflow/fcl-js</li>
              <li>[4] Next.js Documentation - https://nextjs.org/docs</li>
              <li>[5] Supabase Documentation - https://supabase.com/docs</li>
            </ul>
          </section>
        </div>

        <Card className="mt-12 border-primary/50 bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience FlowFi?</h2>
            <p className="text-muted-foreground mb-6">Connect your wallet and start using the platform today</p>
            <Button size="lg" asChild>
              <Link href="/">
                Get Started
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
