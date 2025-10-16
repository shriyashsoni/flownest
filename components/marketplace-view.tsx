"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Flame, Clock } from "lucide-react"
import { toast } from "sonner"
import { useFlow } from "@/components/flow-provider"

export function MarketplaceView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [buying, setBuying] = useState<number | null>(null)
  const { user } = useFlow()

  const collections = [
    { name: "Cool Cats", floor: 1200, volume: 45000, change: 12.5, items: 234, image: "/cool-cat.jpg" },
    {
      name: "Dapper Dinos",
      floor: 850,
      volume: 32000,
      change: 8.3,
      items: 189,
      image: "/prehistoric-jungle-dinosaur.png",
    },
    { name: "Flow Punks", floor: 2100, volume: 78000, change: -3.2, items: 456, image: "/punk-street-style.png" },
    { name: "NBA Top Shot", floor: 450, volume: 125000, change: 15.7, items: 892, image: "/basketball-action.png" },
  ]

  const featuredNFTs = [
    {
      id: 1,
      name: "Cool Cat #1234",
      collection: "Cool Cats",
      price: 1250,
      image: "/cool-cat-nft.jpg",
      rarity: "Rare",
    },
    {
      id: 2,
      name: "Dapper Dino #567",
      collection: "Dapper Dinos",
      price: 890,
      image: "/dinosaur-nft.jpg",
      rarity: "Epic",
    },
    {
      id: 3,
      name: "Flow Punk #89",
      collection: "Flow Punks",
      price: 2200,
      image: "/punk-nft.jpg",
      rarity: "Legendary",
    },
    {
      id: 4,
      name: "NBA Moment #234",
      collection: "NBA Top Shot",
      price: 480,
      image: "/basketball-nft.jpg",
      rarity: "Common",
    },
    {
      id: 5,
      name: "Flovatar #456",
      collection: "Flovatars",
      price: 340,
      image: "/avatar-nft.jpg",
      rarity: "Rare",
    },
    {
      id: 6,
      name: "Versus #789",
      collection: "Versus",
      price: 1850,
      image: "/art-nft.jpg",
      rarity: "Epic",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400"
      case "Rare":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      case "Epic":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400"
      case "Legendary":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const handleBuyNFT = async (nft: any) => {
    if (!user.addr) {
      toast.error("Please connect your wallet first")
      return
    }

    setBuying(nft.id)

    try {
      const response = await fetch("/api/marketplace/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nftId: nft.id,
          price: nft.price,
          buyerAddress: user.addr,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Purchase failed")
      }

      toast.success(`Successfully purchased ${nft.name}!`)
      if (data.note) {
        toast.info(data.note)
      }
    } catch (error) {
      console.error("[v0] Purchase failed:", error)
      toast.error(error instanceof Error ? error.message : "Purchase failed")
    } finally {
      setBuying(null)
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">Discover and trade NFTs on Flow</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search collections or NFTs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured" className="gap-2">
            <Flame className="h-4 w-4" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="trending" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            <Clock className="h-4 w-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6 mt-6">
          {/* Top Collections */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Top Collections</h2>
            <div className="space-y-3">
              {collections.map((collection, index) => (
                <Card key={collection.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
                        <img
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-semibold">{collection.name}</div>
                          <div className="text-sm text-muted-foreground">{collection.items} items</div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-muted-foreground">Floor</div>
                        <div className="font-semibold">${collection.floor}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-muted-foreground">Volume</div>
                        <div className="font-semibold">${(collection.volume / 1000).toFixed(1)}K</div>
                      </div>
                      <Badge variant={collection.change >= 0 ? "default" : "destructive"}>
                        {collection.change >= 0 ? "+" : ""}
                        {collection.change}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured NFTs */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured NFTs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {featuredNFTs.map((nft) => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-2 right-2 ${getRarityColor(nft.rarity)}`}>{nft.rarity}</Badge>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <div className="font-semibold truncate">{nft.name}</div>
                      <div className="text-sm text-muted-foreground">{nft.collection}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">Price</div>
                        <div className="font-bold text-lg">${nft.price}</div>
                      </div>
                      <Button size="sm" onClick={() => handleBuyNFT(nft)} disabled={buying === nft.id}>
                        {buying === nft.id ? "Buying..." : "Buy Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredNFTs
              .slice()
              .reverse()
              .map((nft) => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <div className="font-semibold truncate">{nft.name}</div>
                      <div className="text-sm text-muted-foreground">{nft.collection}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold">${nft.price}</div>
                      <Button size="sm">Buy</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredNFTs.slice(0, 4).map((nft) => (
              <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <div className="font-semibold truncate">{nft.name}</div>
                    <div className="text-sm text-muted-foreground">{nft.collection}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">${nft.price}</div>
                    <Button size="sm">Buy</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
