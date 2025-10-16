// Cadence scripts and transactions for Flow blockchain

export const FLOW_SCRIPTS = {
  // Get FLOW token balance
  GET_FLOW_BALANCE: `
    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868

    access(all) fun main(address: Address): UFix64 {
      let account = getAccount(address)
      
      let vaultRef = account.capabilities
        .borrow<&FlowToken.Vault>(/public/flowTokenBalance)
        ?? panic("Could not borrow Balance reference")
      
      return vaultRef.balance
    }
  `,

  // Get account info
  GET_ACCOUNT_INFO: `
    access(all) fun main(address: Address): AccountInfo {
      let account = getAccount(address)
      
      return AccountInfo(
        address: address,
        balance: account.balance,
        availableBalance: account.availableBalance,
        storageUsed: account.storage.used,
        storageCapacity: account.storage.capacity
      )
    }

    access(all) struct AccountInfo {
      access(all) let address: Address
      access(all) let balance: UFix64
      access(all) let availableBalance: UFix64
      access(all) let storageUsed: UInt64
      access(all) let storageCapacity: UInt64

      init(address: Address, balance: UFix64, availableBalance: UFix64, storageUsed: UInt64, storageCapacity: UInt64) {
        self.address = address
        self.balance = balance
        self.availableBalance = availableBalance
        self.storageUsed = storageUsed
        self.storageCapacity = storageCapacity
      }
    }
  `,

  // Get NFT IDs from account
  GET_NFT_IDS: `
    import NonFungibleToken from 0x1d7e57aa55817448

    access(all) fun main(address: Address, collectionPath: PublicPath): [UInt64] {
      let account = getAccount(address)
      
      let collectionRef = account.capabilities
        .borrow<&{NonFungibleToken.Collection}>(collectionPath)
      
      if collectionRef == nil {
        return []
      }
      
      return collectionRef!.getIDs()
    }
  `,
}

export const FLOW_TRANSACTIONS = {
  // Transfer FLOW tokens
  TRANSFER_FLOW: `
    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868

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
  `,

  // Setup account for FLOW tokens (if needed)
  SETUP_FLOW_VAULT: `
    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868

    transaction {
      prepare(signer: auth(Storage, Capabilities) &Account) {
        if signer.storage.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) == nil {
          signer.storage.save(<-FlowToken.createEmptyVault(), to: /storage/flowTokenVault)
          
          let receiverCap = signer.capabilities.storage.issue<&{FungibleToken.Receiver}>(/storage/flowTokenVault)
          signer.capabilities.publish(receiverCap, at: /public/flowTokenReceiver)
          
          let balanceCap = signer.capabilities.storage.issue<&FlowToken.Vault>(/storage/flowTokenVault)
          signer.capabilities.publish(balanceCap, at: /public/flowTokenBalance)
        }
      }
    }
  `,
}
