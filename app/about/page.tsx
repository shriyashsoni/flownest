import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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

      <main className="container px-4 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About FlowFi</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Building the future of decentralized finance on Flow blockchain
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2>Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            FlowFi is on a mission to make decentralized finance accessible to everyone. We believe that managing
            digital assets, trading NFTs, and participating in DeFi should be as simple as using traditional financial
            apps — but with the added benefits of blockchain technology: true ownership, transparency, and financial
            sovereignty.
          </p>

          <h2>The Problem We're Solving</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Web3 ecosystem is fragmented. Users need multiple apps for different tasks: one wallet for tokens,
            another marketplace for NFTs, separate platforms for staking and lending. This creates friction, confusion,
            and barriers to entry for mainstream users.
          </p>

          <h2>Our Solution</h2>
          <p className="text-muted-foreground leading-relaxed">
            FlowFi unifies all essential DeFi and NFT features into one beautiful, intuitive interface. Built on Flow
            blockchain, we leverage Cadence smart contracts to provide fast, secure, and cost-effective transactions.
            Our platform combines wallet management, NFT marketplace, token swaps, staking, lending, and P2P payments in
            a single app.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
              <p className="text-sm text-muted-foreground">
                To become the go-to financial super-app for the Flow ecosystem and beyond
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Values</h3>
              <p className="text-sm text-muted-foreground">
                User-first design, security, transparency, and community-driven development
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Technology</h3>
              <p className="text-sm text-muted-foreground">
                Built on Flow blockchain with Cadence smart contracts for maximum performance
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">Why Flow Blockchain?</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">Developer-Friendly:</strong> Cadence is a resource-oriented
                programming language designed specifically for digital assets, making it safer and more intuitive than
                Solidity.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Fast & Scalable:</strong> Flow's multi-node architecture enables
                high throughput without sharding, delivering sub-second finality.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">User Experience:</strong> Flow prioritizes mainstream adoption with
                features like account abstraction and human-readable addresses.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Proven Track Record:</strong> Flow powers major NFT projects like
                NBA Top Shot and has processed millions of transactions.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
