import "@stdlib/deploy";
import "@stdlib/ownable";

import "../packages/common/traits.tact";
import "../packages/token/jetton/JettonMaster.tact";
import "../packages/token/jetton/JettonWallet.tact";

import "./messages.tact";
import "./errcodes.tact";

trait StakingWallet with Common, Ownable {
    owner: Address;
    master: Address;
    staticTax: Int;
    lockedValue: Int;
    stakeIndex: Int;
    unstakeThreshold: Int;

    // stakedJettons is the map of staked jettons.
    // key is the index of operation, value is the staked jetton info.
    stakedJettons: map<Int, StakedJettonInfo>;
    pendingJettons: map<Int, PendingJettonInfo>;

    get fun stakedInfo(): StakedInfo {
        return self.getStakedInfo();
    }

    get fun getUnstakeThreshold(): Int {
        return self.unstakeThreshold;
    }

    receive(msg: StakeInternal) {
        self.receiveStakeInternal(msg);
    }

    receive(msg: Redeposit) {
        self.receiveReDeposit(msg);
    }

    receive(msg: UnStake) {
        self.receiveUnstake(msg);
    }

    receive(msg: Withdraw) {
        self.receiveWithdraw(msg);
    }

    receive(msg: SetUnstakeThreshold) {
        let ctx = context();
        // Only owner can modify the threshold
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        self.unstakeThreshold = msg.threshold;
    }

    receive(msg: JettonExcesses) {
        self.receiveExcesses(msg);
    }

    virtual fun receiveStakeInternal(msg: StakeInternal) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.master);

        self.stakedJettons.set(
            self.stakeIndex,
            StakedJettonInfo{
                jettonAmount: msg.jettonAmount,
                stakeIndex: self.stakeIndex,
                stakeTime: now(),
            }
        );
        self.stakeIndex += 1;

        if (msg.forwardAmount > 0) {
            send(SendParameters{
                to: self.owner,
                bounce: false,
                value: msg.forwardAmount,
                body: StakeNotification{
                    queryId: msg.queryId,
                    jettonAmount: msg.jettonAmount,
                    jettonWallet: msg.jettonWallet,
                    forwardPayload: msg.forwardPayload,
                }.toCell(),
            });
        }

        // refund
        self.reserveValue(0);
        send(SendParameters{
            to: msg.responseDestination,
            bounce: false,
            value: 0,
            mode: SendRemainingBalance,
            body: JettonExcesses{
                query_id: msg.queryId,
            }.toCell(),
        });
    }

    virtual fun receiveUnstake(msg: UnStake) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        let index = msg.stakeIndex;
        let staked = self.stakedJettons.get(index);
        nativeThrowUnless(codeStakeIndexNotFound, staked != null);

        self.stakedJettons.del(index);
        let pending = PendingJettonInfo { 
            jettonAmount: staked!!.jettonAmount,
            stakeTime: staked!!.stakeTime,
            stakeIndex: staked!!.stakeIndex,
            unstakeTime: now(),
        };
        self.pendingJettons.set(index, pending);

        emit(StakedToPending{
            jettonAmount: pending.jettonAmount,
            stakeIndex: pending.stakeIndex,
        }.toCell());
    }

    virtual fun receiveReDeposit(msg: Redeposit) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        let index = msg.stakeIndex;
        let pending = self.pendingJettons.get(index);
        nativeThrowUnless(codePendingIndexNotFound, pending != null);

        self.pendingJettons.del(index);
        let newStaked = StakedJettonInfo { 
            jettonAmount: pending!!.jettonAmount,
            stakeTime: now(),
            stakeIndex: self.stakeIndex,
        };
        self.stakedJettons.set(index, newStaked);
        self.stakeIndex += 1;

        emit(PendingToStaked{
            jettonAmount: newStaked.jettonAmount,
            stakeIndex: newStaked.stakeIndex,
        }.toCell());
    }

    virtual fun receiveWithdraw(msg: Withdraw) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        let pending = self.pendingJettons.get(msg.stakeIndex);
        nativeThrowUnless(codePendingIndexNotFound, pending != null);
        nativeThrowUnless(codePendingJettonNotMaturity, pending!!.unstakeTime + self.unstakeThreshold < now());

        self.pendingJettons.del(pending!!.stakeIndex);
        let totalCost = 0;
        // check cost
        totalCost += msg.forwardAmount;
        nativeThrowUnless(codeInflowValueNotSufficient, ctx.value >= totalCost + self.staticTax);

        let withdrawInternal = WithdrawInternal{
            queryId: msg.queryId,
            jettonAmount: pending!!.jettonAmount,
            forwardAmount: msg.forwardAmount,
            tonAmount: msg.tonAmount,
            forwardPayload: msg.forwardPayload,
            jettonWallet: msg.jettonWallet,
            destination: ctx.sender,
            stakeIndex: pending!!.stakeIndex,
            responseDestination: msg.responseDestination,
        };
        // told staking master to transfer released jetton
        self.reserveValue(0);
        send(SendParameters{
            to: self.master,
            bounce: false,
            value: 0,
            mode: SendRemainingBalance,
            body: withdrawInternal.toCell(),
        });
    }

    virtual fun receiveExcesses(msg: JettonExcesses) {
        self.reserveValue(0);
         send(SendParameters{
                 to: self.owner,
                 bounce: false,
                 value: 0,
                 mode: SendRemainingBalance,
                 body: msg.toCell(),
             }
         );
    }

    virtual fun getStakedInfo(): StakedInfo {
        return StakedInfo{
            stakedJettons: self.stakedJettons,
            pendingJettons: self.pendingJettons,
        }
    }

    get fun unstakeThreshold(): Int {
        return self.unstakeThreshold;
    }
}
