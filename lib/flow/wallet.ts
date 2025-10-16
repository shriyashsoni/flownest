"use client"

export interface FlowUser {
  addr: string | null
  loggedIn: boolean
}

const STORAGE_KEY = "flownest_wallet"

export function getStoredWallet(): FlowUser {
  if (typeof window === "undefined") {
    return { addr: null, loggedIn: false }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return { addr: null, loggedIn: false }
    }
  }
  return { addr: null, loggedIn: false }
}

export function connectWallet(): Promise<FlowUser> {
  return new Promise((resolve) => {
    // Simulate wallet connection with a demo address
    const demoAddress = "0x" + Math.random().toString(16).substring(2, 18)
    const user: FlowUser = {
      addr: demoAddress,
      loggedIn: true,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    resolve(user)
  })
}

export function disconnectWallet(): Promise<void> {
  return new Promise((resolve) => {
    localStorage.removeItem(STORAGE_KEY)
    resolve()
  })
}
