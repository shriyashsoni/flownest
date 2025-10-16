"use client"

import { useState } from "react"
import type { Profile, Wallet, NFT, Transaction, StakingPosition, LendingPosition } from "@/lib/types"
import {
  WalletIcon,
  TrendingUp,
  Send,
  Repeat,
  Layers,
  ShoppingBag,
  Settings,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WalletView } from "@/components/wallet-view"
import { MarketplaceView } from "@/components/marketplace-view"
import { SwapView } from "@/components/swap-view"
import { SendView } from "@/components/send-view"
import { EarnView } from "@/components/earn-view"
import { SettingsView } from "@/components/settings-view"
import { useRouter } from "next/navigation"
import { useFlow } from "@/components/flow-provider"
import Image from "next/image"

interface DashboardClientProps {
  flowAddress: string
  profile: Profile | null
  wallets: Wallet[]
  nfts: NFT[]
  transactions: Transaction[]
  stakingPositions: StakingPosition[]
  lendingPositions: LendingPosition[]
}

export function DashboardClient({
  flowAddress,
  profile,
  wallets,
  nfts,
  transactions,
  stakingPositions,
  lendingPositions,
}: DashboardClientProps) {
  const [activeView, setActiveView] = useState("home")
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You earned +8.17 FLOW this week", time: "2h ago", read: false },
    { id: 2, message: "NFT purchase successful", time: "5h ago", read: false },
    { id: 3, message: "Staked 500 FLOW in FLOW Staking", time: "1d ago", read: true },
  ])
  const { disconnect } = useFlow()
  const router = useRouter()

  const totalBalance = wallets.reduce((sum, wallet) => sum + Number(wallet.usd_value), 0)
  const balanceChange = 2.34

  const handleSignOut = async () => {
    await disconnect()
    router.push("/")
  }

  const quickActions = [
    { icon: Send, label: "Send", view: "send", color: "text-blue-500" },
    { icon: ArrowDownRight, label: "Receive", view: "receive", color: "text-green-500" },
    { icon: Repeat, label: "Swap", view: "swap", color: "text-purple-500" },
    { icon: ShoppingBag, label: "Market", view: "marketplace", color: "text-orange-500" },
  ]

  const renderView = () => {
    switch (activeView) {
      case "wallet":
        return <WalletView wallets={wallets} nfts={nfts} userId={profile?.id} flowAddress={flowAddress} />
      case "marketplace":
        return <MarketplaceView />
      case "swap":
        return <SwapView wallets={wallets} userId={profile?.id} />
      case "send":
        return <SendView wallets={wallets} userId={profile?.id} />
      case "earn":
        return (
          <EarnView
            wallets={wallets}
            stakingPositions={stakingPositions}
            lendingPositions={lendingPositions}
            nfts={nfts}
            userId={profile?.id}
          />
        )
      case "settings":
        return <SettingsView profile={profile} flowAddress={flowAddress} onSignOut={handleSignOut} />
      default:
        return renderHomeView()
    }
  }

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Portfolio Balance Card */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardDescription className="text-muted-foreground">Total Portfolio Value</CardDescription>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <div className="text-4xl font-bold tracking-tight">
              {balanceVisible ? `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3" />+{balanceChange}%
              </Badge>
              <span className="text-muted-foreground">Last 24h</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 pt-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="flex flex-col h-auto py-4 gap-2 bg-transparent"
                onClick={() => setActiveView(action.view)}
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assets Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {wallets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No assets yet. Start by receiving tokens!</p>
            </div>
          ) : (
            wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-500">{wallet.token_symbol[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{wallet.token_symbol}</div>
                    <div className="text-sm text-muted-foreground">{Number(wallet.balance).toFixed(2)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${Number(wallet.usd_value).toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No transactions yet</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {tx.type === "receive" ? "R" : tx.type === "send" ? "S" : tx.type === "swap" ? "SW" : "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium capitalize">{tx.type}</div>
                    <div className="text-sm text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${tx.type === "receive" ? "text-green-500" : ""}`}>
                    {tx.type === "receive" ? "+" : "-"}${Number(tx.usd_value).toFixed(2)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
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

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-1.5 w-64">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div className="hidden md:block text-sm text-muted-foreground font-mono">
              {flowAddress.slice(0, 6)}...{flowAddress.slice(-4)}
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-background border rounded-lg shadow-lg p-3 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2 rounded-lg hover:bg-muted cursor-pointer ${!notif.read ? "bg-primary/5" : ""}`}
                      >
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>{profile?.display_name?.[0] || flowAddress[2]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 max-w-6xl mx-auto">{renderView()}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4">
          <div className="flex items-center justify-around h-16">
            <Button
              variant={activeView === "home" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView("home")}
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant={activeView === "wallet" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView("wallet")}
            >
              <WalletIcon className="h-5 w-5" />
              <span className="text-xs">Wallet</span>
            </Button>
            <Button
              variant={activeView === "marketplace" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView("marketplace")}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs">Market</span>
            </Button>
            <Button
              variant={activeView === "earn" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView("earn")}
            >
              <Layers className="h-5 w-5" />
              <span className="text-xs">Earn</span>
            </Button>
            <Button
              variant={activeView === "settings" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView("settings")}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
