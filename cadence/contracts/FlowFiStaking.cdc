import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

access(all) contract FlowFiStaking {
    
    // Events
    access(all) event StakeDeposited(user: Address, amount: UFix64, poolId: String)
    access(all) event StakeWithdrawn(user: Address, amount: UFix64, poolId: String)
    access(all) event RewardsClaimed(user: Address, amount: UFix64, poolId: String)
    
    // Staking Pool
    access(all) struct StakingPool {
        access(all) let id: String
        access(all) let name: String
        access(all) let apy: UFix64
        access(all) var totalStaked: UFix64
        access(all) let minStake: UFix64
        
        init(id: String, name: String, apy: UFix64, minStake: UFix64) {
            self.id = id
            self.name = name
            self.apy = apy
            self.totalStaked = 0.0
            self.minStake = minStake
        }
    }
    
    // User Stake Position
    access(all) struct StakePosition {
        access(all) let poolId: String
        access(all) var amount: UFix64
        access(all) let startTime: UFix64
        access(all) var lastClaimTime: UFix64
        
        init(poolId: String, amount: UFix64) {
            self.poolId = poolId
            self.amount = amount
            self.startTime = getCurrentBlock().timestamp
            self.lastClaimTime = getCurrentBlock().timestamp
        }
    }
    
    // Storage paths
    access(all) let StakingStoragePath: StoragePath
    access(all) let StakingPublicPath: PublicPath
    
    // Staking pools
    access(self) let pools: {String: StakingPool}
    
    // User positions
    access(self) let positions: {Address: [StakePosition]}
    
    init() {
        self.StakingStoragePath = /storage/flowFiStaking
        self.StakingPublicPath = /public/flowFiStaking
        
        self.pools = {}
        self.positions = {}
        
        // Initialize default pools
        self.pools["pool_a"] = StakingPool(
            id: "pool_a",
            name: "FlowFi Pool A",
            apy: 12.5,
            minStake: 10.0
        )
        
        self.pools["pool_b"] = StakingPool(
            id: "pool_b",
            name: "FlowFi Pool B",
            apy: 8.3,
            minStake: 5.0
        )
    }
    
    // Stake tokens
    access(all) fun stake(poolId: String, vault: @{FungibleToken.Vault}): Bool {
        pre {
            self.pools[poolId] != nil: "Pool does not exist"
            vault.balance >= self.pools[poolId]!.minStake: "Amount below minimum stake"
        }
        
        let amount = vault.balance
        let user = vault.owner!.address
        
        // Store the vault (in production, this would go to a proper vault)
        destroy vault
        
        // Create or update position
        if self.positions[user] == nil {
            self.positions[user] = []
        }
        
        self.positions[user]!.append(StakePosition(poolId: poolId, amount: amount))
        
        // Update pool total
        let pool = self.pools[poolId]!
        pool.totalStaked = pool.totalStaked + amount
        self.pools[poolId] = pool
        
        emit StakeDeposited(user: user, amount: amount, poolId: poolId)
        
        return true
    }
    
    // Calculate rewards
    access(all) fun calculateRewards(user: Address, positionIndex: Int): UFix64 {
        if self.positions[user] == nil || positionIndex >= self.positions[user]!.length {
            return 0.0
        }
        
        let position = self.positions[user]![positionIndex]
        let pool = self.pools[position.poolId]!
        
        let timeStaked = getCurrentBlock().timestamp - position.lastClaimTime
        let yearInSeconds: UFix64 = 31536000.0
        
        let rewards = position.amount * (pool.apy / 100.0) * (timeStaked / yearInSeconds)
        
        return rewards
    }
    
    // Get user positions
    access(all) fun getUserPositions(user: Address): [StakePosition] {
        return self.positions[user] ?? []
    }
    
    // Get pool info
    access(all) fun getPool(poolId: String): StakingPool? {
        return self.pools[poolId]
    }
}
