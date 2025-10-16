// Flow blockchain configuration
export const FLOW_CONFIG = {
  // Using Flow Testnet for development
  accessNode: "https://rest-testnet.onflow.org",
  discoveryWallet: "https://fcl-discovery.onflow.org/testnet/authn",
  network: "testnet",

  // Contract addresses (these would be your deployed contracts)
  contracts: {
    FlowToken: "0x7e60df042a9c0868",
    FUSD: "0xe223d8a629e49c68",
    NFTStorefront: "0x94b06cfca1d8a476",
  },
}

// Mock Flow wallet connection for demo
export async function connectFlowWallet() {
  // In production, this would use @onflow/fcl
  return {
    address: "0x" + Math.random().toString(16).substr(2, 16),
    connected: true,
  }
}

export async function disconnectFlowWallet() {
  return { connected: false }
}
