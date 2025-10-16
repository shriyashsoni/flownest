import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur">
      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
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
            </div>
            <p className="text-sm text-muted-foreground">
              The all-in-one DeFi and NFT banking app built on Flow blockchain.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Powered by</span>
              <Image src="/flow-logo.png" alt="Flow Blockchain" width={80} height={24} className="h-6 w-auto" />
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-muted-foreground hover:text-foreground transition-colors">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-4">
            <h3 className="font-semibold">Technology</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Image src="/flow-logo.png" alt="Flow" width={16} height={16} className="h-4 w-auto" />
                Flow Blockchain
              </li>
              <li>Cadence Smart Contracts</li>
              <li>Next.js 15</li>
              <li>Supabase</li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FlowNest. Powered by Flow Blockchain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
