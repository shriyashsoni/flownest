"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface TransactionConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: {
    recipient: string
    amount: string
    token: string
    usdValue: number
    fee: number
    total: number
  }
  balance: number
  onConfirm: () => void
  isProcessing: boolean
}

export function TransactionConfirmDialog({
  open,
  onOpenChange,
  transaction,
  balance,
  onConfirm,
  isProcessing,
}: TransactionConfirmDialogProps) {
  const insufficientBalance = Number(transaction.amount) > balance

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Transaction</DialogTitle>
          <DialogDescription>Please review the transaction details before confirming</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Transaction Details */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recipient</span>
              <span className="font-mono text-xs">
                {transaction.recipient.slice(0, 10)}...{transaction.recipient.slice(-8)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <div className="text-right">
                <div className="font-semibold">
                  {transaction.amount} {transaction.token}
                </div>
                <div className="text-xs text-muted-foreground">≈ ${transaction.usdValue.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span>
                {transaction.fee.toFixed(4)} {transaction.token}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <div className="text-right">
                <div>
                  {transaction.total.toFixed(4)} {transaction.token}
                </div>
                <div className="text-xs text-muted-foreground font-normal">
                  ≈ ${(transaction.usdValue + transaction.fee * 0.5).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex justify-between text-sm pt-2">
              <span className="text-muted-foreground">Your Balance</span>
              <span className={insufficientBalance ? "text-destructive font-medium" : ""}>
                {balance.toFixed(4)} {transaction.token}
              </span>
            </div>
          </div>

          {/* Warnings */}
          {insufficientBalance && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Insufficient balance. You need {(transaction.total - balance).toFixed(4)} more {transaction.token}.
              </AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              This transaction will be executed on the Flow blockchain. Make sure the recipient address is correct as
              transactions cannot be reversed.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={insufficientBalance || isProcessing} className="gap-2">
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Confirm & Send
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
