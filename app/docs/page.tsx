import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Code, Wallet, ShoppingBag, TrendingUp, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-background/50 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/flow-logo.png" alt="Flow Blockchain" width={32} height={32} className="h-8 w-auto" />
            <span className="text-xl font-bold">FlowFi</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-muted-foreground text-balance">Everything you need to know about using FlowFi</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="h-6 w-6 text-primary" />
                <CardTitle>Getting Started</CardTitle>
              </div>
              <CardDescription>Connect your Flow wallet and set up your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Click the "Connect Wallet" button and choose your preferred Flow wallet provider (Blocto, Dapper,
                  Lilico, etc.). Approve the connection request in your wallet.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Automatic Account Creation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  FlowFi automatically creates your profile when you first connect. Your Flow address is used as your
                  unique identifier.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Explore Your Dashboard</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once connected, you'll see your portfolio dashboard with real-time balances, NFTs, and transaction
                  history.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="h-6 w-6 text-primary" />
                <CardTitle>Wallet Management</CardTitle>
              </div>
              <CardDescription>View and manage your tokens and NFTs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Token Balances</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  View all your Flow tokens in one place. FlowFi fetches real-time balances directly from the Flow
                  blockchain using Cadence scripts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">NFT Gallery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Browse your NFT collection with beautiful card layouts. Click any NFT to view details, metadata, and
                  available actions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Portfolio Analytics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track your total portfolio value, asset allocation, and performance over time with interactive charts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <CardTitle>NFT Marketplace</CardTitle>
              </div>
              <CardDescription>Buy, sell, and discover NFTs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Browse Collections</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Explore featured NFT collections, trending items, and new releases. Filter by category, price, and
                  rarity.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Purchase NFTs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Buy NFTs instantly with FLOW tokens. Transactions are executed through secure Cadence smart contracts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">List Your NFTs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  List your NFTs for sale by setting a price. Your NFTs remain in your wallet until sold (non-custodial
                  marketplace).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>DeFi Features</CardTitle>
              </div>
              <CardDescription>Stake, lend, and earn rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Staking Pools</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stake your FLOW tokens to earn rewards. Choose from various pools with different APYs and lock
                  periods. Rewards are distributed automatically.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Lending & Borrowing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supply tokens to earn interest or borrow against your assets. Interest rates adjust dynamically based
                  on supply and demand.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">NFT-Collateralized Loans</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Revolutionary feature: use your NFTs as collateral to borrow FLOW tokens. Unlock liquidity without
                  selling your NFTs.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Send className="h-6 w-6 text-primary" />
                <CardTitle>Send & Swap</CardTitle>
              </div>
              <CardDescription>Transfer tokens and swap assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">P2P Payments</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Send FLOW tokens to any Flow address instantly. Transactions are confirmed in under 1 second with
                  minimal fees.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Token Swaps</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Swap between different tokens at the best available rates. FlowFi aggregates liquidity from multiple
                  DEXs on Flow.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle>Technical Details</CardTitle>
              </div>
              <CardDescription>Smart contracts and architecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Smart Contracts</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  FlowFi uses Cadence smart contracts deployed on Flow blockchain. All contracts are open-source and
                  audited for security.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Storage</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  User profiles and transaction history are stored in Supabase with Row Level Security. Blockchain data
                  is fetched in real-time from Flow access nodes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  FlowFi is non-custodial. We never have access to your private keys. All transactions require approval
                  in your wallet.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 border-primary/50 bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Join our community or check out the whitepaper for more technical details
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/whitepaper">Read Whitepaper</Link>
              </Button>
              <Button asChild>
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
