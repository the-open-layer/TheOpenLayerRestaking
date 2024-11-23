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
    pendingIndex: Int;

    stakedJettons: map<Int, StakedJettonInfo>;
    pendingJettons: map<Int, PendingJettonInfo>;
    withdrawalJettons: map<Int, WithdrawalJettonInfo>;

    get fun stakedInfo(): StakedInfo {
        return self.getStakedInfo();
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
                unstakeThreshold: msg.unstakeThreshold
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

    virtual fun receiveUnstake(msg: UnStake) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        
        let remainingToUnstake: Int = msg.jettonAmount;
        let totalUnstaked: Int = 0;
        
        // Create a single pending record for all unstaked amounts
        let pending = PendingJettonInfo { 
            jettonAmount: 0,
            pendingIndex: self.pendingIndex,
            unstakeTime: now(),
            unstakeThreshold: 0
        };

        // Iterate through all staked positions
        let stakes = self.stakedJettons;
        foreach (i, staked in stakes) {
            if (remainingToUnstake > 0) {
                let amountFromStake: Int = min(remainingToUnstake, staked.jettonAmount);
                remainingToUnstake = remainingToUnstake - amountFromStake;
                totalUnstaked = totalUnstaked + amountFromStake;
                
                // If we're using the entire staked amount
                if (amountFromStake == staked.jettonAmount) {
                    self.stakedJettons.del(i);
                } else {
                    // Update the staked record with remaining amount
                    self.stakedJettons.set(i, StakedJettonInfo{
                        jettonAmount: staked.jettonAmount - amountFromStake,
                        stakeIndex: staked.stakeIndex,
                        stakeTime: staked.stakeTime,
                        unstakeThreshold: staked.unstakeThreshold
                    });
                }
                
                // Add to the pending amount
                pending.jettonAmount = pending.jettonAmount + amountFromStake;
                pending.unstakeThreshold = max(pending.unstakeThreshold, staked.unstakeThreshold);
            }
        }
        
        // Ensure we found enough staked tokens
        nativeThrowUnless(codeInsufficientStakeAmount, totalUnstaked >= msg.jettonAmount);
        
        // Store the merged pending record
        if (pending.jettonAmount > 0) {
            self.pendingJettons.set(self.pendingIndex, pending);
            emit(StakedToPending{
                jettonAmount: pending.jettonAmount,
                pendingIndex: self.pendingIndex,
            }.toCell());
            self.pendingIndex += 1;
        }
    }

    virtual fun receiveReDeposit(msg: Redeposit) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        let index = msg.pendingIndex;
        let pending = self.pendingJettons.get(index);
        nativeThrowUnless(codePendingIndexNotFound, pending != null);

        self.pendingJettons.del(index);
        let newStaked = StakedJettonInfo { 
            jettonAmount: pending!!.jettonAmount,
            stakeIndex: self.stakeIndex,
            stakeTime: now(),
            unstakeThreshold: pending!!.unstakeThreshold
        };
        self.stakedJettons.set(self.stakeIndex, newStaked);
        self.stakeIndex += 1;

        emit(PendingToStaked{
            jettonAmount: newStaked.jettonAmount,
            pendingIndex: index,
            stakedIndex: newStaked.stakeIndex
        }.toCell());
    }

    virtual fun receiveWithdraw(msg: Withdraw) {
        let ctx = context();
        nativeThrowUnless(codeUnauthorized, ctx.sender == self.owner);
        let pending = self.pendingJettons.get(msg.pendingIndex);
        nativeThrowUnless(codePendingIndexNotFound, pending != null);
        nativeThrowUnless(codePendingJettonNotMaturity, 
            pending!!.unstakeTime + pending!!.unstakeThreshold <= now());

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
            destination: ctx.sender,
            stakeIndex: pending!!.pendingIndex,
            responseDestination: msg.responseDestination,
        };
        self.pendingJettons.del(pending!!.pendingIndex);
        self.withdrawalJettons.set(pending!!.pendingIndex, WithdrawalJettonInfo{
            jettonAmount: pending!!.jettonAmount,
            withdrawTime: now(),
        });
        // told staking master to transfer released jetton
        send(SendParameters{
            to: self.master,
            bounce: true,
            value: msg.forwardAmount,
            mode: SendRemainingValue,
            body: withdrawInternal.toCell(),
        });
    }

    virtual fun receiveExcesses(msg: JettonExcesses) {
         send(SendParameters{
                 to: self.owner,
                 bounce: false,
                 value: 0,
                 mode: SendRemainingValue,
                 body: msg.toCell(),
             }
         );
    }

    virtual fun getStakedInfo(): StakedInfo {
        return StakedInfo{
            stakedJettons: self.stakedJettons,
            pendingJettons: self.pendingJettons,
            withdrawalJettons: self.withdrawalJettons
        }
    }
}
