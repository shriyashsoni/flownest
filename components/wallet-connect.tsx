"use client"

import { useFlow } from "@/components/flow-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { WalletIcon, Shield, TrendingUp, Layers, ArrowRight, CheckCircle2 } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"

const Hero3DScene = dynamic(() => import("@/components/hero-3d-scene").then((mod) => mod.Hero3DScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Loading 3D Experience...</p>
      </div>
    </div>
  ),
})

export function WalletConnect() {
  const { connect, isLoading } = useFlow()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-background/50 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-[#2C3E50] flex items-center justify-center">
                <Image
                  src="/flownest-logo.png"
                  alt="FlowNest"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold">FlowNest</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
              <Link href="/whitepaper" className="text-muted-foreground hover:text-foreground transition-colors">
                Whitepaper
              </Link>
            </nav>
          </div>
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container px-4 py-16 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="gap-2">
              <Image src="/flow-logo.png" alt="Flow" width={16} height={16} className="h-4 w-4" />
              Powered by Flow Blockchain
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Your All-in-One
              <br />
              <span className="text-primary">Web3 Finance Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Trade NFTs, swap tokens, stake assets, and send payments — all in one beautiful interface powered by Flow
              blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button size="lg" onClick={handleConnect} disabled={isLoading} className="gap-2">
                <WalletIcon className="h-5 w-5" />
                {isLoading ? "Connecting..." : "Connect Flow Wallet"}
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: 3D Scene */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl -z-10"></div>
            <Hero3DScene />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need in One App</h2>
            <p className="text-muted-foreground text-lg">Powerful DeFi features designed for everyone</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <WalletIcon className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Unified Wallet</CardTitle>
                <CardDescription>
                  Manage all your tokens and NFTs in one place. Track portfolio performance in real-time with beautiful
                  analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>DeFi Made Easy</CardTitle>
                <CardDescription>
                  Swap tokens instantly, stake for rewards, and lend assets with just a few clicks. No complex
                  interfaces.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-emerald-500" />
                </div>
                <CardTitle>NFT Marketplace</CardTitle>
                <CardDescription>
                  Buy, sell, and discover unique NFTs. Revolutionary feature: use NFTs as collateral for instant loans.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built with Best-in-Class Technology</h2>
            <p className="text-muted-foreground text-lg">Powered by industry-leading blockchain and web technologies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-2">
                  <Image src="/flow-logo.png" alt="Flow Blockchain" width={48} height={48} className="h-12 w-auto" />
                </div>
                <h3 className="font-semibold mb-1">Flow Blockchain</h3>
                <p className="text-sm text-muted-foreground">Fast & scalable L1</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">📜</div>
                <h3 className="font-semibold mb-1">Cadence</h3>
                <p className="text-sm text-muted-foreground">Resource-oriented contracts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">⚛️</div>
                <h3 className="font-semibold mb-1">Next.js 15</h3>
                <p className="text-sm text-muted-foreground">Modern React framework</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">🗄️</div>
                <h3 className="font-semibold mb-1">Supabase</h3>
                <p className="text-sm text-muted-foreground">Real-time database</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose FlowNest?</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Non-Custodial Security</h3>
                    <p className="text-sm text-muted-foreground">You always control your private keys and assets</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">
                      Flow blockchain delivers sub-second transaction finality
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Low Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      Enjoy minimal transaction costs compared to other chains
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">User-Friendly</h3>
                    <p className="text-sm text-muted-foreground">Designed for both crypto natives and newcomers</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold text-lg">Audited Smart Contracts</div>
                      <div className="text-sm text-muted-foreground">Security-first development</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-3xl font-bold mb-1">$0 Gas Fees</div>
                    <p className="text-sm text-muted-foreground">For most transactions on Flow testnet</p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-3xl font-bold mb-1">&lt;1s</div>
                    <p className="text-sm text-muted-foreground">Average transaction confirmation time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Connect your Flow wallet and experience the future of decentralized finance
            </p>
            <Button size="lg" onClick={handleConnect} disabled={isLoading} className="gap-2">
              <WalletIcon className="h-5 w-5" />
              {isLoading ? "Connecting..." : "Connect Wallet Now"}
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
