message(0x9e1b5d2f) StakeInternal {
    queryId: Int as uint64;
    // the address of the jetton wallet
    jettonWallet: Address;
    jettonAmount: Int as coins;
    // address to send the response to
    responseDestination: Address;
    // amount of TON to forward
    forwardAmount: Int as coins;
    // payload to forward
    forwardPayload: Cell?;
    // unstake threshold in seconds
    unstakeThreshold: Int as uint32;
}

message(0x4d8a3c70) UnStake {
    queryId: Int as uint64;
    jettonAmount: Int as coins;
    jettonWallet: Address;
    forwardPayload: Cell?;
}

message(0x6b2f1e9d) Withdraw {
    queryId: Int as uint64;
    pendingIndex: Int as uint32;
    tonAmount: Int as coins;
    forwardAmount: Int as coins;
    responseDestination: Address;
    forwardPayload: Cell?;
}

message(0xc5b9a2d1) WithdrawInternal {
    queryId: Int as uint64;
    jettonAmount: Int as coins;
    forwardAmount: Int as coins;
    tonAmount: Int as coins;
    stakeIndex: Int as uint32;
    destination: Address;
    responseDestination: Address;
    forwardPayload: Cell?;
}

message(0xc5a9b412) Redeposit {
    queryId: Int as uint64;
    pendingIndex: Int as uint32;
    forwardAmount: Int as coins;
    forwardPayload: Cell?;
}

message(0x7f3e2d85) StakeNotification {
    queryId: Int as uint64;
    jettonAmount: Int as coins;
    jettonWallet: Address;
    forwardPayload: Cell?;
}

message(0xe656dfa2) StakeReleaseNotification {
    queryId: Int as uint64;
    // the amount of TON coins released
    amount: Int as coins;
    stakeIndex: Int as uint64;
    // the address to receive released assets
    destination: Address;
    // payload to forward
    forwardPayload: Cell?;
}

// only stakingMaster's owner can call this message
message(0x51fa3a81) StakeRelease {
    queryId: Int as uint64;
    // the amount of TON coins to release
    amount: Int as coins;
    // the amount of jettons to release
    jettons: map<Int as uint64, StakeReleaseJettonInfo>;
    jettonsIdx: Int as uint64;
    // the address of the staked asset owner that will be released
    owner: Address;
    // the address to receive the released assets
    destination: Address;
    // the address to send the excesses to
    responseDestination: Address;
    // the custom payload to be sent with the released ton coins
    customPayload: Cell?;
    // amount of TON to forward
    forwardAmount: Int as coins;
    // payload to forward
    forwardPayload: Cell?;
}

message(0xe1c6a3d9) SetContractJettonWallet {
    queryId: Int as uint64;
    thisContractJettonWallet: Address;
}

struct TokenTransferForwardPayload {
    // the data structure of the forwardPayload should be
    //  - 0: undefined
    //  - 1: StakeJetton
    //  - 2: StakeReleaseNotification
    type: Int as uint8;
    stakeJetton: StakeJetton?;
    stakeRelease: StakeReleaseNotification?;
}

// put StakeJetton as the forwardPayload in TokenTransfer.
// and the forwardAmount of TokenTransfer should be greater than
// the sum of the tonAmount and forwardAmount of StakeJetton.
struct StakeJetton {
    tonAmount: Int as coins;
    // address to send the response to
    responseDestination: Address;
    // amount of TON to forward
    forwardAmount: Int as coins;
    // payload to forward
    forwardPayload: Cell?;
}

struct StakeReleaseJettonInfo {
    // pay the token transfer fee,
    // should be greater than forwardAmount.
    tonAmount: Int as coins;
    jettonAmount: Int as coins;
    jettonWallet: Address;
    // the address to receive the released jettons.
    // should be wallet address, not the jetton wallet address.
    destination: Address;
    customPayload: Cell?;
    // amount of TON to forward
    forwardAmount: Int as coins;
    // payload to forward
    forwardPayload: Cell?;
}

struct JettonWithdrawInfo {
    // pay the token transfer fee,
    // should be greater than forwardAmount.
    tonAmount: Int as coins;
    jettonAmount: Int as coins;
    jettonWallet: Address;
    // the address to receive the released jettons.
    // should be wallet address, not the jetton wallet address.
    destination: Address;
    customPayload: Cell?;
    // amount of TON to forward
    forwardAmount: Int as coins;
    // payload to forward
    forwardPayload: Cell?;
}

struct StakedJettonInfo {
    jettonAmount: Int as coins;
    stakeIndex: Int as uint32;
    stakeTime: Int as uint32;
    unstakeThreshold: Int as uint32;
}

struct PendingJettonInfo {
    jettonAmount: Int as coins;
    pendingIndex: Int as uint32;
    unstakeTime: Int as uint32;
    unstakeThreshold: Int as uint32;
}

struct StakedToPending {
    jettonAmount: Int as coins;
    pendingIndex: Int as uint32;
}

struct PendingToStaked {
    jettonAmount: Int as coins;
    pendingIndex: Int as uint32;
    stakedIndex: Int as uint32;
}

struct StakedInfo {
    stakedJettons: map<Int, StakedJettonInfo>;
    pendingJettons: map<Int, PendingJettonInfo>;
    withdrawalJettons: map<Int, WithdrawalJettonInfo>;
}

struct WithdrawalJettonInfo {
    jettonAmount: Int as coins;
    withdrawTime: Int as uint32;
}

struct StakingData {
    index: Int as uint64;
    walletOwner: Address;
    masterAddress: Address;
}
struct StakeRecord {
    stakeAddress: Address;
    jettonStakeAmount: Int as coins;
    stakeTime: Int as uint32;
}

// For the end-point of the Tx, this data means nothing important.
// (Ref: https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md)
// ===== LOG Event ===== //
message TransferEvent {
    senderAddress: Address;
    jettonAmount: Int as coins;
}
message UnStakeEvent {
    receiverAddress: Address;
    jettonAmount: Int as coins;
    indexId: Int as uint32;
}
message UnStakeAllEvent {
    receiverAddress: Address;
    jettonAmount: Int as coins;
}
// ================================================================================ //
message AddingJettonAddress {
    thisContractJettonWallet: Address;
}
message Unstake {
    indexId: Int as uint32;
}
message Redeem {
    queryId: Int as uint64;
    projectId: Int as uint16;
}

message StakedNotification {
    from: Address;
    masterAddress: Address;
    amount: Int as coins;
}

message UnStakedNotification {
    from: Address;
    masterAddress: Address;
    amount: Int as coins;
}

message SetUnstakeThreshold {
    queryId: Int as uint64;
    threshold: Int as uint32;
}