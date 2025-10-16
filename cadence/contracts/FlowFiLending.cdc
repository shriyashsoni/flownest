import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import NonFungibleToken from 0x1d7e57aa55817448

access(all) contract FlowFiLending {
    
    // Events
    access(all) event LoanCreated(loanId: UInt64, borrower: Address, amount: UFix64, collateralType: String)
    access(all) event LoanRepaid(loanId: UInt64, borrower: Address, amount: UFix64)
    access(all) event CollateralLiquidated(loanId: UInt64, borrower: Address)
    
    // Loan struct
    access(all) struct Loan {
        access(all) let id: UInt64
        access(all) let borrower: Address
        access(all) let principalAmount: UFix64
        access(all) var outstandingAmount: UFix64
        access(all) let collateralType: String // "NFT" or "Token"
        access(all) let collateralValue: UFix64
        access(all) let interestRate: UFix64
        access(all) let startTime: UFix64
        access(all) var status: String // "active", "repaid", "liquidated"
        
        init(
            id: UInt64,
            borrower: Address,
            principalAmount: UFix64,
            collateralType: String,
            collateralValue: UFix64,
            interestRate: UFix64
        ) {
            self.id = id
            self.borrower = borrower
            self.principalAmount = principalAmount
            self.outstandingAmount = principalAmount
            self.collateralType = collateralType
            self.collateralValue = collateralValue
            self.interestRate = interestRate
            self.startTime = getCurrentBlock().timestamp
            self.status = "active"
        }
    }
    
    // Storage
    access(self) var nextLoanId: UInt64
    access(self) let loans: {UInt64: Loan}
    access(self) let userLoans: {Address: [UInt64]}
    
    init() {
        self.nextLoanId = 1
        self.loans = {}
        self.userLoans = {}
    }
    
    // Create loan with NFT collateral
    access(all) fun createNFTLoan(
        borrower: Address,
        amount: UFix64,
        nftValue: UFix64
    ): UInt64 {
        pre {
            nftValue >= amount * 1.5: "Insufficient collateral (need 150% LTV)"
        }
        
        let loanId = self.nextLoanId
        self.nextLoanId = self.nextLoanId + 1
        
        let loan = Loan(
            id: loanId,
            borrower: borrower,
            principalAmount: amount,
            collateralType: "NFT",
            collateralValue: nftValue,
            interestRate: 8.5
        )
        
        self.loans[loanId] = loan
        
        if self.userLoans[borrower] == nil {
            self.userLoans[borrower] = []
        }
        self.userLoans[borrower]!.append(loanId)
        
        emit LoanCreated(
            loanId: loanId,
            borrower: borrower,
            amount: amount,
            collateralType: "NFT"
        )
        
        return loanId
    }
    
    // Repay loan
    access(all) fun repayLoan(loanId: UInt64, payment: @{FungibleToken.Vault}): Bool {
        pre {
            self.loans[loanId] != nil: "Loan does not exist"
            self.loans[loanId]!.status == "active": "Loan is not active"
        }
        
        let loan = self.loans[loanId]!
        let paymentAmount = payment.balance
        
        destroy payment
        
        if paymentAmount >= loan.outstandingAmount {
            loan.status = "repaid"
            self.loans[loanId] = loan
            
            emit LoanRepaid(loanId: loanId, borrower: loan.borrower, amount: paymentAmount)
            return true
        }
        
        return false
    }
    
    // Get user loans
    access(all) fun getUserLoans(user: Address): [Loan] {
        let loanIds = self.userLoans[user] ?? []
        let userLoansList: [Loan] = []
        
        for loanId in loanIds {
            if let loan = self.loans[loanId] {
                userLoansList.append(loan)
            }
        }
        
        return userLoansList
    }
    
    // Calculate current LTV
    access(all) fun calculateLTV(loanId: UInt64): UFix64 {
        if let loan = self.loans[loanId] {
            return (loan.outstandingAmount / loan.collateralValue) * 100.0
        }
        return 0.0
    }
}
