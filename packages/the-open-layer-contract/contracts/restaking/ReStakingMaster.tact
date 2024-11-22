import "@stdlib/deploy";
import "@stdlib/ownable";

import "../packages/common/traits";
import "../packages/token/jetton/JettonMaster";
import "../packages/token/jetton/JettonWallet";

import "./messages.tact";
import "./errcodes.tact";
import "./ReStakingWallet.tact";

const MinimalGas: Int = ton("0.01");

contract StakingWalletTemplate with StakingWallet {
    owner: Address;
    master: Address;
    staticTax: Int as coins = ton("0.001");
    lockedValue: Int as coins = 0;
    stakeIndex: Int = 0;
    pendingIndex: Int = 0;

    stakedJettons: map<Int, StakedJettonInfo> = emptyMap();
    pendingJettons: map<Int, PendingJettonInfo> = emptyMap();
    withdrawalJettons: map<Int, WithdrawalJettonInfo> = emptyMap();

    init(master: Address, owner: Address) {
        self.owner = owner;
        self.master = master;
    }
}

contract StakingMasterTemplate with StakingMaster {
    owner: Address;
    jettonMaster: Address;
    thisContractJettonWallet: Address? = null;
    staticTax: Int as coins = ton("0.001");
    lockedValue: Int as coins = 0;
    unstakeThreshold: Int as uint32 = 5;

    init(owner: Address, jettonMaster: Address) {
        self.owner = owner;
        self.jettonMaster = jettonMaster;
    }

    override inline fun getUserWallet(owner: Address): StateInit {
        return initOf StakingWalletTemplate(
            myAddress(),
            owner,
        );
    }
}

trait StakingMaster with Common, OwnableTransferable {
    owner: Address;
    jettonMaster: Address;
    thisContractJettonWallet: Address?;
    staticTax: Int;
    lockedValue: Int;
    unstakeThreshold: Int;

    receive(msg: WithdrawInternal) {
        self.receiveWithdrawInternal(msg);
    }

    receive(msg: JettonTransferNotification) {
        self.receiveTransferNotification(msg);
    }

    receive(msg: SetUnstakeThreshold) {
        let ctx = context();
        // Only owner can modify the threshold
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        self.unstakeThreshold = msg.threshold;
    }

    receive(msg: SetContractJettonWallet) {
        let ctx = context();
        // Only owner can modify the threshold
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        self.thisContractJettonWallet = msg.thisContractJettonWallet;
    }

    // user transfer jetton to staking master address,
    // and also set responseDestination to the staking master address.
    virtual fun receiveTransferNotification(msg: JettonTransferNotification) {
        let ctx = context();
        nativeThrowUnless(codeForwardPayloadInvalid, msg.forward_payload != null);
        nativeThrowUnless(codeStakeAmountMustBePositive, msg.amount >= 0);

        let stakeMsg = StakeJetton.fromCell(msg.forward_payload!!);
        nativeThrowUnless(codeInflowValueNotSufficient,
            ctx.value > stakeMsg.forwardAmount + self.staticTax + MinimalGas);

        let userWallet = self.getUserWallet(stakeMsg.responseDestination);

        // notify stake wallet to update staked info
        send(SendParameters{
            to: contractAddress(userWallet),
            bounce: false,
            value: 0,
            mode: SendRemainingValue,
            body: StakeInternal{
                queryId: msg.query_id,
                jettonWallet: sender(),
                jettonAmount: msg.amount,
                responseDestination: stakeMsg.responseDestination,
                forwardAmount: stakeMsg.forwardAmount,
                forwardPayload: stakeMsg.forwardPayload,
                unstakeThreshold: self.unstakeThreshold
            }.toCell(),
            data: userWallet.data,
            code: userWallet.code,
        });
    }

    virtual fun receiveWithdrawInternal(msg: WithdrawInternal) {
        let ctx = context();
        // check sender
        nativeThrowUnless(codeUnauthorized,
            ctx.sender == contractAddress(self.getUserWallet(msg.destination)));
        let totalCost: Int = 0;

        dump(msg.forwardAmount);
        send(SendParameters{
            to: self.thisContractJettonWallet!!,
            bounce: false,
            value: msg.forwardAmount,
            body: JettonTransfer{
                query_id: msg.queryId,
                amount: msg.jettonAmount,
                destination: msg.destination,
                response_destination: msg.responseDestination,
                custom_payload: "jetton-withdraw".asComment(),
                forward_ton_amount: 0,
                forward_payload: emptyCell()
            }.toCell(),
        });

        // check cost
        totalCost += msg.forwardAmount;
        nativeThrowUnless(codeInflowValueNotSufficient, ctx.value >= totalCost + self.staticTax);

        // forward
        send(SendParameters{
            to: msg.destination,
            bounce: false,
            value: 0,
            body: StakeReleaseNotification{
                queryId: msg.queryId,
                amount: msg.jettonAmount,
                stakeIndex: msg.stakeIndex,
                destination: msg.destination,
                forwardPayload: msg.forwardPayload,
            }.toCell(),
        });

        // refund
        send(SendParameters{
            to: msg.responseDestination,
            bounce: false,
            value: 0,
            mode: SendRemainingValue,
            body: JettonExcesses{
                query_id: msg.queryId,
            }.toCell(),
        });
    }

    // getWalletContract creates a new wallet contract for the specified owner
    abstract inline fun getUserWallet(owner: Address): StateInit;

    get fun userWallet(owner: Address): Address {
        return contractAddress(self.getUserWallet(owner));
    }

    get fun unstakeThreshold(): Int {
        return self.unstakeThreshold;
    }

    get fun thisJettonWallet(): Address? {
        return self.thisContractJettonWallet;
    }
}