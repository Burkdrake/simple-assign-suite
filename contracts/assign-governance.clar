;; ===========================================
;; Simple Assign Suite - Governance Contract
;; ===========================================
;; A decentralized contract management system enabling flexible
;; task allocation, voting, and resource distribution across teams.

;; ===========================================
;; Error Constants
;; ===========================================
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-MEMBER (err u101))
(define-constant ERR-NOT-MEMBER (err u102))
(define-constant ERR-INSUFFICIENT-TOKENS (err u103))
(define-constant ERR-TASK-NOT-FOUND (err u104))
(define-constant ERR-INVALID-TASK-STATE (err u105))
(define-constant ERR-ALREADY-VOTED (err u106))
(define-constant ERR-VOTING-CLOSED (err u107))
(define-constant ERR-TASK-ACTIVE (err u108))
(define-constant ERR-INVALID-AMOUNT (err u109))
(define-constant ERR-MILESTONE-INCOMPLETE (err u110))

;; ===========================================
;; Task States and Phases
;; ===========================================
(define-constant TASK-STATE-DRAFT u0)
(define-constant TASK-STATE-ACTIVE u1)
(define-constant TASK-STATE-COMPLETED u2)
(define-constant TASK-STATE-REJECTED u3)

(define-constant PHASE-SUBMISSION u0)
(define-constant PHASE-REVIEW u1)
(define-constant PHASE-VOTING u2)
(define-constant PHASE-EXECUTION u3)

;; Rest of the contract remains the same as previous implementation...
(define-map members principal { 
  token-balance: uint, 
  is-active: bool, 
  joined-at: uint,
  delegated-to: (optional principal),
  is-expert: bool
})

;; Continuation follows the same pattern as the LoomDAO contract