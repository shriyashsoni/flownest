"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QrCode, User, Mail, Phone, ArrowRight, CheckCircle2, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFlow } from "@/components/flow-provider"
import { toast } from "sonner"
import type { Wallet } from "@/lib/types"
import { TransactionConfirmDialog } from "@/components/transaction-confirm-dialog"

interface SendViewProps {
  wallets: Wallet[]
  userId: string
}

export function SendView({ wallets, userId }: SendViewProps) {
  const { user } = useFlow()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [selectedToken, setSelectedToken] = useState(wallets[0]?.token_symbol || "FLOW")
  const [sending, setSending] = useState(false)
  const [txSuccess, setTxSuccess] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReviewTransaction = () => {
    if (!recipient || !amount) {
      toast.error("Please enter recipient and amount")
      return
    }

    if (!recipient.startsWith("0x")) {
      toast.error("Please enter a valid Flow address (starts with 0x)")
      return
    }

    if (Number(amount) <= 0) {
      toast.error("Amount must be greater than 0")
      return
    }

    setShowConfirm(true)
  }

  const handleConfirmSend = async () => {
    setSending(true)
    setTxSuccess(false)

    try {
      console.log("[v0] Sending transaction:", { recipient, amount, token: selectedToken, note })

      const response = await fetch("/api/transactions/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient,
          amount,
          senderAddress: user.addr,
          note,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Transaction failed")
      }

      console.log("[v0] Transaction successful:", data)
      toast.success(`Successfully sent ${amount} ${selectedToken}!`, {
        description: `Transaction ID: ${data.txHash?.slice(0, 10)}...`,
      })

      setTxSuccess(true)
      setShowConfirm(false)

      // Reset form after 2 seconds
      setTimeout(() => {
        setRecipient("")
        setAmount("")
        setNote("")
        setTxSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("[v0] Transaction failed:", error)
      toast.error(error instanceof Error ? error.message : "Transaction failed")
    } finally {
      setSending(false)
    }
  }

  const selectedWallet = wallets.find((w) => w.token_symbol === selectedToken)
  const balance = selectedWallet ? Number(selectedWallet.balance) : 0
  const usdValue =
    amount && selectedWallet ? Number(amount) * (Number(selectedWallet.usd_value) / Number(selectedWallet.balance)) : 0

  const networkFee = 0.001
  const total = Number(amount) + networkFee

  const recentContacts = [
    { name: "Sarah Chen", username: "@sarahc", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Mike Johnson", username: "@mikej", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Emma Wilson", username: "@emmaw", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Alex Kim", username: "@alexk", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <>
      <div className="space-y-6 pb-20 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Send</h1>
            <p className="text-muted-foreground">Send tokens to anyone, anywhere</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <History className="h-4 w-4" />
            History
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send Payment</CardTitle>
            <CardDescription>Send tokens via username, email, phone, or wallet address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="username" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="username" className="gap-1">
                  <User className="h-3 w-3" />
                  <span className="hidden sm:inline">Address</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="gap-1">
                  <Mail className="h-3 w-3" />
                  <span className="hidden sm:inline">Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-1">
                  <Phone className="h-3 w-3" />
                  <span className="hidden sm:inline">Phone</span>
                </TabsTrigger>
                <TabsTrigger value="qr" className="gap-1">
                  <QrCode className="h-3 w-3" />
                  <span className="hidden sm:inline">QR</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="username" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Recipient Flow Address</Label>
                  <Input
                    placeholder="0x... (Flow address)"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a valid Flow blockchain address (starts with 0x)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Recipient Email</Label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Coming soon: Send to email addresses</p>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Recipient Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Coming soon: Send to phone numbers</p>
                </div>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4 mt-6">
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="h-48 w-48 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Scan QR Code</Button>
                  <p className="text-xs text-muted-foreground">Coming soon: QR code scanning</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-24 text-lg h-12"
                  step="0.01"
                  min="0"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Button variant="outline" size="sm">
                    {selectedToken}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>≈ ${usdValue.toFixed(2)}</span>
                <span>
                  Balance: {balance.toFixed(4)} {selectedToken}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Note (Optional)</Label>
              <Input placeholder="Add a message..." value={note} onChange={(e) => setNote(e.target.value)} />
            </div>

            <Button
              className="w-full h-12 text-base"
              size="lg"
              disabled={!recipient || !amount || sending || txSuccess}
              onClick={handleReviewTransaction}
            >
              {txSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Sent!
                </>
              ) : (
                <>
                  Review Transaction
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {recentContacts.map((contact) => (
                <Button
                  key={contact.username}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                  onClick={() => setRecipient(contact.username)}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-medium text-sm">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">{contact.username}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        transaction={{
          recipient,
          amount,
          token: selectedToken,
          usdValue,
          fee: networkFee,
          total,
        }}
        balance={balance}
        onConfirm={handleConfirmSend}
        isProcessing={sending}
      />
    </>
  )
}
