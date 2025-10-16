"use client"

// Dynamic imports will be used instead to ensure FCL only loads on client

export const FLOW_CONFIG = {
  network: "testnet",
  accessNode: "https://rest-testnet.onflow.org",
  discoveryWallet: "https://fcl-discovery.onflow.org/testnet/authn",

  // Contract addresses on Flow Testnet
  contracts: {
    FlowToken: "0x7e60df042a9c0868",
    FungibleToken: "0x9a0766d93b6608b7",
    FUSD: "0xe223d8a629e49c68",
    NFTStorefront: "0x94b06cfca1d8a476",
  },
}

let fclInstance: any = null
let typesInstance: any = null

async function getFCL() {
  if (typeof window === "undefined") {
    throw new Error("FCL can only be used in the browser")
  }

  if (!fclInstance) {
    const fcl = await import("@onflow/fcl")
    fclInstance = fcl

    // Initialize FCL configuration
    fcl
      .config()
      .put("accessNode.api", FLOW_CONFIG.accessNode)
      .put("discovery.wallet", FLOW_CONFIG.discoveryWallet)
      .put("app.detail.title", "FlowNest")
      .put("app.detail.icon", "https://flownest.app/icon.png")
      .put("flow.network", "testnet")
  }

  return fclInstance
}

async function getTypes() {
  if (typeof window === "undefined") {
    throw new Error("Types can only be used in the browser")
  }

  if (!typesInstance) {
    typesInstance = await import("@onflow/types")
  }

  return typesInstance
}

export async function connectWallet() {
  try {
    const fcl = await getFCL()
    const user = await fcl.authenticate()
    return {
      addr: user.addr,
      loggedIn: true,
    }
  } catch (error) {
    console.error("Failed to connect wallet:", error)
    throw error
  }
}

export async function disconnectWallet() {
  try {
    const fcl = await getFCL()
    await fcl.unauthenticate()
  } catch (error) {
    console.error("Failed to disconnect wallet:", error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const fcl = await getFCL()
    const user = await fcl.currentUser().snapshot()
    return {
      addr: user.addr || null,
      loggedIn: user.loggedIn || false,
    }
  } catch (error) {
    console.error("Failed to get current user:", error)
    return { addr: null, loggedIn: false }
  }
}

export async function getFlowBalance(address: string): Promise<string> {
  try {
    const fcl = await getFCL()
    const t = await getTypes()

    const script = `
      import FungibleToken from ${FLOW_CONFIG.contracts.FungibleToken}
      import FlowToken from ${FLOW_CONFIG.contracts.FlowToken}

      access(all) fun main(address: Address): UFix64 {
        let account = getAccount(address)
        let vaultRef = account.capabilities
          .borrow<&FlowToken.Vault>(/public/flowTokenBalance)
          ?? panic("Could not borrow Balance reference")
        return vaultRef.balance
      }
    `

    const balance = await fcl.query({
      cadence: script,
      args: (arg: any, types: any) => [arg(address, types.Address)],
    })

    return balance.toString()
  } catch (error) {
    console.error("Failed to get Flow balance:", error)
    return "0.0"
  }
}

export async function sendFlowTokens(recipientAddress: string, amount: string) {
  const TX_TRANSFER_FLOW = `
    import FungibleToken from ${FLOW_CONFIG.contracts.FungibleToken}
    import FlowToken from ${FLOW_CONFIG.contracts.FlowToken}

    transaction(recipient: Address, amount: UFix64) {
      prepare(signer: auth(BorrowValue) &Account) {
        let senderVault = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
          from: /storage/flowTokenVault
        ) ?? panic("Could not borrow sender's FlowToken vault")
        
        let sentVault <- senderVault.withdraw(amount: amount)
        
        let recipientAcct = getAccount(recipient)
        let receiver = recipientAcct.capabilities
          .borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
          ?? panic("Could not borrow recipient receiver")
        
        receiver.deposit(from: <- sentVault)
      }
    }
  `

  try {
    const fcl = await getFCL()
    const t = await getTypes()

    const txId = await fcl.mutate({
      cadence: TX_TRANSFER_FLOW,
      args: (arg: any, types: any) => [arg(recipientAddress, types.Address), arg(amount, types.UFix64)],
      proposer: fcl.currentUser,
      payer: fcl.currentUser,
      authorizations: [fcl.currentUser],
      limit: 100,
    })

    console.log("[v0] Transaction ID:", txId)
    const tx = await fcl.tx(txId).onceSealed()
    console.log("[v0] Transaction sealed:", tx)
    return tx
  } catch (error) {
    console.error("Failed to send FLOW tokens:", error)
    throw error
  }
}

export function subscribeToUser(callback: (user: any) => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  getFCL().then((fcl) => {
    fcl.currentUser.subscribe(callback)
  })

  return () => {}
}
