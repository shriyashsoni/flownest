"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Copy, ExternalLink, QrCode, Check } from "lucide-react"
import type { Wallet, NFT } from "@/lib/types"
import { toast } from "sonner"

interface WalletViewProps {
  wallets: Wallet[]
  nfts: NFT[]
  userId: string
  flowAddress?: string | null
}

export function WalletView({ wallets, nfts, userId, flowAddress }: WalletViewProps) {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const tokens = wallets.map((wallet) => ({
    symbol: wallet.token_symbol,
    name: wallet.token_name,
    balance: Number(wallet.balance),
    value: Number(wallet.usd_value),
    change: 0,
    logo: wallet.token_symbol[0],
    color: "bg-blue-500",
  }))

  const handleCopyAddress = () => {
    if (flowAddress) {
      navigator.clipboard.writeText(flowAddress)
      setCopied(true)
      toast.success("Address copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your tokens and NFTs</p>
        </div>
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <QrCode className="h-4 w-4" />
              Receive
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Receive FLOW</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${flowAddress}`}
                  alt="QR Code"
                  className="w-48 h-48"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  Scan this QR code to send FLOW to your wallet
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 rounded-lg bg-muted text-sm font-mono truncate">{flowAddress}</code>
                  <Button size="icon" variant="outline" onClick={handleCopyAddress}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Wallet Address */}
      {flowAddress && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Wallet Address</div>
                <div className="font-mono text-sm">{flowAddress}</div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={handleCopyAddress}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => window.open(`https://testnet.flowscan.org/account/${flowAddress}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4 mt-6">
          {tokens.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>No tokens yet. Start by receiving some tokens!</p>
              </CardContent>
            </Card>
          ) : (
            tokens.map((token) => (
              <Card key={token.symbol} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-full ${token.color}/10 flex items-center justify-center`}>
                        <span className={`text-xl font-bold ${token.color.replace("bg-", "text-")}`}>{token.logo}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{token.symbol}</div>
                        <div className="text-sm text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">${token.value.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          {token.balance.toLocaleString()} {token.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="nfts" className="mt-6">
          {nfts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>No NFTs yet. Browse the marketplace to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nfts.map((nft) => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={nft.image_url || "/placeholder.svg"}
                      alt={nft.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm truncate">{nft.name}</div>
                      <div className="text-xs text-muted-foreground">{nft.collection_name}</div>
                      {nft.floor_price && (
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground">Floor</span>
                          <span className="text-sm font-semibold">${nft.floor_price}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
