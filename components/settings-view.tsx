"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Wallet, Bell, Palette, Shield, LogOut, Upload } from "lucide-react"
import { toast } from "sonner"
import { useFlow } from "@/components/flow-provider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SettingsViewProps {
  profile: any
  flowAddress: string
  onSignOut: () => void
}

export function SettingsView({ profile, flowAddress, onSignOut }: SettingsViewProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // Notification preferences
  const [txAlerts, setTxAlerts] = useState(profile?.notification_tx_alerts ?? true)
  const [stakingAlerts, setStakingAlerts] = useState(profile?.notification_staking_alerts ?? true)
  const [priceAlerts, setPriceAlerts] = useState(profile?.notification_price_alerts ?? false)

  // Appearance
  const [darkMode, setDarkMode] = useState(profile?.theme === "dark")

  // Security
  const [showSecurityLog, setShowSecurityLog] = useState(false)
  const [securityLogs, setSecurityLogs] = useState<any[]>([])
  const [isLoadingLogs, setIsLoadingLogs] = useState(false)

  const { disconnect } = useFlow()

  useEffect(() => {
    if (showSecurityLog && profile?.id) {
      loadSecurityLogs()
    }
  }, [showSecurityLog, profile?.id])

  const loadSecurityLogs = async () => {
    setIsLoadingLogs(true)
    try {
      const response = await fetch(`/api/security/logs?profileId=${profile.id}`)
      const data = await response.json()

      if (response.ok) {
        setSecurityLogs(data.logs || [])
      } else {
        toast.error("Failed to load security logs")
      }
    } catch (error) {
      console.error("[v0] Security logs error:", error)
      toast.error("Failed to load security logs")
    } finally {
      setIsLoadingLogs(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB")
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image")
      return
    }

    setAvatarFile(file)
    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setAvatarUrl(previewUrl)
  }

  const handleUpdateProfile = async () => {
    try {
      const finalAvatarUrl = avatarUrl

      // Upload avatar if a new file was selected
      if (avatarFile) {
        const formData = new FormData()
        formData.append("file", avatarFile)

        // Note: You would need to implement avatar upload endpoint
        // For now, we'll use the preview URL
        toast.info("Avatar upload coming soon - using preview for now")
      }

      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: profile.id,
          displayName,
          bio,
          avatarUrl: finalAvatarUrl,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Profile updated successfully!")
      } else {
        toast.error(data.error || "Failed to update profile")
      }
    } catch (error) {
      console.error("[v0] Profile update error:", error)
      toast.error("Failed to update profile")
    }
  }

  const handleUpdateNotifications = async () => {
    try {
      const response = await fetch("/api/settings/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: profile.id,
          txAlerts,
          stakingAlerts,
          priceAlerts,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Notification preferences updated!")
      } else {
        toast.error(data.error || "Failed to update preferences")
      }
    } catch (error) {
      console.error("[v0] Notification update error:", error)
      toast.error("Failed to update preferences")
    }
  }

  const handleThemeChange = async (checked: boolean) => {
    setDarkMode(checked)

    try {
      const response = await fetch("/api/settings/appearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: profile.id,
          theme: checked ? "dark" : "light",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`${checked ? "Dark" : "Light"} mode enabled`)
      } else {
        toast.error(data.error || "Failed to update theme")
      }
    } catch (error) {
      console.error("[v0] Theme update error:", error)
      toast.error("Failed to update theme")
    }
  }

  const handleDisconnectWallet = async () => {
    await disconnect()
    onSignOut()
    toast.success("Wallet disconnected")
  }

  const handleSetup2FA = () => {
    toast.info("2FA setup coming soon")
  }

  const handleChangePin = () => {
    toast.info("PIN change coming soon")
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{displayName[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Change Avatar</span>
                </div>
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/png,image/jpeg,image/gif"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />
          </div>

          <Button onClick={handleUpdateProfile}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Wallet Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <CardTitle>Wallet</CardTitle>
          </div>
          <CardDescription>Manage your connected wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Connected Address</Label>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 rounded-lg bg-muted text-sm font-mono">{flowAddress}</code>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                Connected
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Network</Label>
            <div className="p-2 rounded-lg bg-muted text-sm">Flow Testnet</div>
          </div>

          <Button variant="destructive" onClick={handleDisconnectWallet}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when transactions complete</p>
            </div>
            <Switch checked={txAlerts} onCheckedChange={setTxAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Staking Rewards</Label>
              <p className="text-sm text-muted-foreground">Alerts for earned staking rewards</p>
            </div>
            <Switch checked={stakingAlerts} onCheckedChange={setStakingAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Price Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify on significant price changes</p>
            </div>
            <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
          </div>

          <Button onClick={handleUpdateNotifications}>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Customize how FlowNest looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Use dark theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={handleThemeChange} />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Protect your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleSetup2FA}>
            Setup 2FA
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleChangePin}>
            Change PIN
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => setShowSecurityLog(true)}
          >
            View Security Log
          </Button>
        </CardContent>
      </Card>

      {/* Security Log Dialog */}
      <Dialog open={showSecurityLog} onOpenChange={setShowSecurityLog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Security Log</DialogTitle>
            <DialogDescription>Recent security events for your account</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {isLoadingLogs ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : securityLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No security events yet</p>
            ) : (
              securityLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{log.event_type}</span>
                    <span className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
