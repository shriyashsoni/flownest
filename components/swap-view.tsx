"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDownUp, Settings, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Wallet } from "@/lib/types"

interface SwapViewProps {
  wallets: Wallet[]
  userId: string
}

export function SwapView({ wallets, userId }: SwapViewProps) {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [fromToken, setFromToken] = useState(wallets[0]?.token_symbol || "FLOW")
  const [toToken, setToToken] = useState(wallets[1]?.token_symbol || "USDC")

  const tokens = wallets.map((wallet) => ({
    symbol: wallet.token_symbol,
    name: wallet.token_name,
    balance: Number(wallet.balance),
    price: Number(wallet.usd_value) / Number(wallet.balance) || 1,
  }))

  const handleSwapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const calculateSwap = (amount: string) => {
    if (!amount) return ""
    const fromPrice = tokens.find((t) => t.symbol === fromToken)?.price || 1
    const toPrice = tokens.find((t) => t.symbol === toToken)?.price || 1
    const result = (Number.parseFloat(amount) * fromPrice) / toPrice
    return result.toFixed(2)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(calculateSwap(value))
  }

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Swap</h1>
        <p className="text-muted-foreground">Exchange tokens instantly</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Swap Tokens</CardTitle>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Trade tokens at the best available rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <Label>From</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="pr-24 text-lg h-14"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  {fromToken}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Balance: {tokens.find((t) => t.symbol === fromToken)?.balance.toLocaleString()}</span>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0"
                onClick={() =>
                  handleFromAmountChange(tokens.find((t) => t.symbol === fromToken)?.balance.toString() || "")
                }
              >
                Max
              </Button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button variant="outline" size="icon" className="rounded-full bg-transparent" onClick={handleSwapTokens}>
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <Label>To</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="pr-24 text-lg h-14 bg-muted"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  {toToken}
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Balance: {tokens.find((t) => t.symbol === toToken)?.balance.toLocaleString()}
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && toAmount && (
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">
                    1 {fromToken} = {(Number.parseFloat(toAmount) / Number.parseFloat(fromAmount)).toFixed(4)} {toToken}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fee (0.3%)</span>
                  <span className="font-medium">
                    $
                    {(
                      Number.parseFloat(fromAmount) *
                      0.003 *
                      (tokens.find((t) => t.symbol === fromToken)?.price || 1)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Slippage Tolerance</span>
                  <span className="font-medium">0.5%</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            className="w-full h-12 text-base"
            size="lg"
            disabled={!fromAmount || Number.parseFloat(fromAmount) <= 0}
          >
            {!fromAmount ? "Enter an amount" : "Swap Tokens"}
          </Button>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Swaps are executed through liquidity pools. The final amount may vary slightly due to price movement.</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Swaps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Swaps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { from: "FLOW", to: "USDC", fromAmount: 100, toAmount: 2324, time: "2 hours ago" },
            { from: "USDC", to: "FLOW", fromAmount: 5000, toAmount: 215.2, time: "1 day ago" },
            { from: "FLOW", to: "FUSD", fromAmount: 50, toAmount: 1162, time: "3 days ago" },
          ].map((swap, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Badge variant="outline">{swap.from}</Badge>
                  <ArrowDownUp className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="outline">{swap.to}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">
                  {swap.fromAmount} → {swap.toAmount}
                </div>
                <div className="text-xs text-muted-foreground">{swap.time}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
