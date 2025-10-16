"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Lock, Coins, Zap, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { Wallet, NFT, StakingPosition, LendingPosition } from "@/lib/types"

interface EarnViewProps {
  wallets: Wallet[]
  stakingPositions: StakingPosition[]
  lendingPositions: LendingPosition[]
  nfts: NFT[]
  userId: string
}

export function EarnView({ wallets, stakingPositions, lendingPositions, nfts, userId }: EarnViewProps) {
  const stakingPools = [
    { name: "FLOW Staking", apy: 8.5, tvl: 12500000, staked: 5000, token: "FLOW", risk: "Low", lockPeriod: "Flexible" },
    { name: "USDC Vault", apy: 5.2, tvl: 8900000, staked: 0, token: "USDC", risk: "Low", lockPeriod: "None" },
    {
      name: "High Yield Pool",
      apy: 15.8,
      tvl: 3200000,
      staked: 0,
      token: "FLOW",
      risk: "Medium",
      lockPeriod: "30 days",
    },
  ]

  const lendingPools = [
    { token: "FLOW", supplyApy: 4.2, borrowApy: 6.8, supplied: 2500, borrowed: 0, utilization: 68 },
    { token: "USDC", supplyApy: 3.5, borrowApy: 5.2, supplied: 0, borrowed: 0, utilization: 72 },
  ]

  const totalStaked = stakingPositions.reduce((sum, pos) => sum + Number(pos.usd_value), 0)
  const totalSupplied = lendingPositions
    .filter((p) => p.position_type === "supply")
    .reduce((sum, pos) => sum + Number(pos.usd_value), 0)
  const avgApy =
    stakingPositions.length > 0
      ? stakingPositions.reduce((sum, pos) => sum + Number(pos.apy), 0) / stakingPositions.length
      : 7.2

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      case "High":
        return "bg-red-500/10 text-red-600 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Earn</h1>
        <p className="text-muted-foreground">Grow your assets with DeFi</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Total Staked
              </div>
              <div className="text-2xl font-bold">${totalStaked.toLocaleString()}</div>
              <div className="text-sm text-green-500">+$45.20 this week</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Coins className="h-4 w-4" />
                Total Supplied
              </div>
              <div className="text-2xl font-bold">${totalSupplied.toLocaleString()}</div>
              <div className="text-sm text-green-500">+$8.75 this week</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                Avg APY
              </div>
              <div className="text-2xl font-bold">{avgApy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Across all positions</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="staking" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
          <TabsTrigger value="nft-collateral">NFT Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="staking" className="space-y-4 mt-6">
          {stakingPools.map((pool) => (
            <Card key={pool.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{pool.name}</h3>
                        <Badge className={getRiskColor(pool.risk)}>{pool.risk} Risk</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        TVL: ${(pool.tvl / 1000000).toFixed(1)}M • Lock: {pool.lockPeriod}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{pool.apy}%</div>
                      <div className="text-sm text-muted-foreground">APY</div>
                    </div>
                  </div>

                  {pool.staked > 0 && (
                    <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Your Stake</span>
                        <span className="font-semibold">
                          {pool.staked.toLocaleString()} {pool.token}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Earned</span>
                        <span className="font-semibold text-green-500">
                          +{((pool.staked * pool.apy) / 100 / 52).toFixed(2)} {pool.token}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1">{pool.staked > 0 ? "Add More" : "Stake"}</Button>
                    {pool.staked > 0 && (
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Unstake
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="lending" className="space-y-4 mt-6">
          {lendingPools.map((pool) => (
            <Card key={pool.token} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{pool.token} Pool</h3>
                      <div className="text-sm text-muted-foreground">Utilization: {pool.utilization}%</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm text-muted-foreground">Supply APY</div>
                      <div className="text-xl font-bold text-green-500">{pool.supplyApy}%</div>
                    </div>
                  </div>

                  <Progress value={pool.utilization} className="h-2" />

                  {pool.supplied > 0 && (
                    <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Supplied</span>
                        <span className="font-semibold">
                          {pool.supplied.toLocaleString()} {pool.token}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Interest Earned</span>
                        <span className="font-semibold text-green-500">
                          +{((pool.supplied * pool.supplyApy) / 100 / 52).toFixed(2)} {pool.token}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Button>{pool.supplied > 0 ? "Supply More" : "Supply"}</Button>
                    <Button variant="outline">Borrow ({pool.borrowApy}%)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="nft-collateral" className="space-y-4 mt-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">Pay with NFT</div>
                  <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                    Use your NFTs as collateral to borrow stablecoins instantly. Your NFT is safely locked until you
                    repay the loan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {nfts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>No NFTs available for collateral. Browse the marketplace to get started!</p>
              </CardContent>
            </Card>
          ) : (
            nfts.slice(0, 3).map((nft) => (
              <Card key={nft.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={nft.image_url || "/placeholder.svg"}
                      alt={nft.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold">{nft.name}</h3>
                        <div className="text-sm text-muted-foreground">{nft.collection_name}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Floor Price</div>
                          <div className="font-semibold">${nft.floor_price || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Max LTV</div>
                          <div className="font-semibold">60%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Max Borrow</div>
                          <div className="font-semibold text-primary">
                            ${nft.floor_price ? (Number(nft.floor_price) * 0.6).toFixed(0) : "N/A"}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Borrow Against NFT
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
