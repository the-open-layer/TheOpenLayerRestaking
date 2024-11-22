import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano, beginCell } from '@ton/core';
import { StakingMasterTemplate, TokenTransferForwardPayload, storeStakeJetton, storeTokenTransferForwardPayload } from '../build/ReStaking/tact_StakingMasterTemplate';
import { StakingWalletTemplate } from '../build/ReStaking/tact_StakingWalletTemplate';
import { ExampleJettonMaster } from '../wrappers/JettonExample_ExampleJettonMaster';
import { ExampleJettonWallet } from '../wrappers/JettonExample_ExampleJettonWallet';
import '@ton/test-utils';
import { buildJettonContent } from '../utils/ton-tep64';
import { sleep } from '@ton/blueprint';
import { time } from 'console';

const jettonContent = buildJettonContent({
    name: 'TB Test Jetton',
    description: 'TB Test Jetton',
    symbol: 'TBRTJ',
    decimals: '9',
    image: 'https://i.tbook.com/logo.svg',
});

describe('ReStaking', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let stakingMaster: SandboxContract<StakingMasterTemplate>;
    let stakingWallet: SandboxContract<StakingWalletTemplate>;
    let jettonMaster: SandboxContract<ExampleJettonMaster>;
    let userJettonWallet: SandboxContract<ExampleJettonWallet>;
    let masterJettonWallet: SandboxContract<ExampleJettonWallet>;
    let deployerJettonWallet: SandboxContract<ExampleJettonWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user');

        // Deploy JettonMaster
        jettonMaster = blockchain.openContract(
            await ExampleJettonMaster.fromInit(deployer.getSender().address!!, jettonContent)
        );
        await jettonMaster.send(
            deployer.getSender(),
            { value: toNano('1') },
            { $$type: 'Deploy', queryId: 0n }
        );

        // Deploy StakingMaster
        stakingMaster = blockchain.openContract(
            await StakingMasterTemplate.fromInit(
                deployer.getSender().address,
                jettonMaster.address)
        );
        await stakingMaster.send(
            deployer.getSender(),
            { value: toNano('100') },
            { $$type: 'Deploy', queryId: 0n }
        );

        // Deploy StakingWallet for user
        stakingWallet = blockchain.openContract(
            await StakingWalletTemplate.fromInit(
                stakingMaster.address,
                user.getSender().address
            )
        );

        // Get user's jetton wallet
        userJettonWallet = blockchain.openContract(
            await ExampleJettonWallet.fromInit(
                user.getSender().address,
                jettonMaster.address,
            )
        );

        // Get staking master's jetton wallet
        masterJettonWallet = blockchain.openContract(
            await ExampleJettonWallet.fromInit(
                stakingMaster.address,
                jettonMaster.address,
            )
        );

        deployerJettonWallet = blockchain.openContract(
            await ExampleJettonWallet.fromInit(
                deployer.getSender().address!!,
                jettonMaster.address,
            )
        );

        await stakingMaster.send(
            deployer.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetContractJettonWallet',
                queryId: 0n,
                thisContractJettonWallet: masterJettonWallet.address,
            }
        );

        console.log('Deployer Jetton Wallet', deployerJettonWallet.address);
        console.log('Staking Master Jetton Wallet', masterJettonWallet.address);

        const thisJettonWallet = await stakingMaster.getThisJettonWallet();
        expect(thisJettonWallet).toEqualAddress(masterJettonWallet.address);

        // Mint some tokens to user
        await jettonMaster.send(
            deployer.getSender(),
            { value: toNano('1') },
            {
                $$type: "JettonMint",
                forward_ton_amount: toNano('0.2'),
                amount: toNano('1000'),
                receiver: user.getSender().address!!,
                origin: user.getSender().address!!,
                custom_payload: null,
                forward_payload: beginCell().endCell(),
            }
        );
    });

    it('should deploy contracts correctly', async () => {

        expect(await stakingMaster.getOwner()).toEqualAddress(deployer.address);
        expect(await stakingMaster.getUserWallet(user.address)).toEqualAddress(stakingWallet.address);
        // Check contracts deployed
        let ujwData = await userJettonWallet.getGetWalletData();
        console.log(ujwData.balance);
        expect(ujwData.balance).toEqual(toNano('1000'));
    });

    it('should stake jettons successfully', async () => {
        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };
    
        // Transfer jettons to staking contract
        const stakeResult = await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.5'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        //console.log(stakeResult);

        // Verify stake
        const stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(1);
        const firstStake = stakedInfo.stakedJettons.get(0n);
        expect(firstStake?.jettonAmount).toEqual(stakeAmount);
    });

    it('should unstake jettons successfully', async () => {
        // First stake some jettons multiple times
        const stakeAmount1 = toNano('10');
        const stakeAmount2 = toNano('5');
        const stakeMsg1 = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };
        
        const stakeMsg2 = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };
    
        // Transfer jettons to staking contract twice
        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount1,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg1)).endCell()
            }
        );

        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 1n,
                amount: stakeAmount2,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg2)).endCell()
            }
        );

        // Verify both stakes are recorded
        let stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(2);

        // Unstake first position
        const unstakeAmount = stakeAmount1;
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                jettonAmount: unstakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        // Verify the unstaking
        stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(1);
        expect(stakedInfo.pendingJettons.size).toEqual(1);

        const pendingJetton = stakedInfo.pendingJettons.get(0n);
        expect(pendingJetton?.jettonAmount).toEqual(unstakeAmount);
    });

    it('should withdraw jettons successfully', async () => {
        // First stake some jettons
        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };

        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Unstake the position
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                jettonAmount: stakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        // Wait for unstake threshold
        await sleep(5000);

        // Withdraw the unstaked position
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('2') },
            {
                $$type: 'Withdraw',
                queryId: 0n,
                pendingIndex: 0n,
                tonAmount: toNano('0.1'),
                forwardAmount: toNano('0.1'),
                //jettonWallet: userJettonWallet.address,
                responseDestination: user.getSender().address,
                forwardPayload: null
            }
        );

        // Verify the withdrawal
        const stakedInfo = await stakingWallet.getStakedInfo();
        console.log(stakedInfo);
        expect(stakedInfo.stakedJettons.size).toEqual(0);
        expect(stakedInfo.pendingJettons.size).toEqual(0);
        expect(stakedInfo.withdrawalJettons.size).toEqual(1);

        const withdrawalJetton = stakedInfo.withdrawalJettons.get(0n);
        expect(withdrawalJetton?.jettonAmount).toEqual(stakeAmount);
    }, 50000);

    it('should redeposit pending jettons successfully', async () => {
        // First stake some jettons
        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };

        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Unstake the position
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                jettonAmount: stakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        const curInfo = await stakingWallet.getStakedInfo();
        const idx = curInfo.pendingJettons.keys()[0];
        // Now redeposit
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'Redeposit',
                queryId: 0n,
                pendingIndex: 0n,
                forwardAmount: toNano('0.05'),
                forwardPayload: null
            }
        );

        // Verify redeposit
        const stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(1);
        expect(stakedInfo.pendingJettons.size).toEqual(0);
    });

    it('should modify unstake threshold successfully', async () => {
        const newThreshold = 10n;
        
        const result = await stakingMaster.send(
            deployer.getSender(),
            { value: toNano('0.2') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: newThreshold
            }
        );

        const threshold = await stakingMaster.getUnstakeThreshold();
        expect(threshold).toEqual(newThreshold);
    });

    it('should fail when unauthorized user tries to modify unstake threshold', async () => {
        const wrongUser = await blockchain.treasury('wrongUser');
        const newThreshold = 10n;
        
        await stakingMaster.send(
            wrongUser.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: newThreshold
            }
        );

        const threshold = await stakingMaster.getUnstakeThreshold();
        expect(threshold).not.toEqual(newThreshold);
    });

    it('should fail when unauthorized user tries to unstake', async () => {
        // Try to unstake with wrong user
        const wrongUser = await blockchain.treasury('wrongUser');
        await stakingWallet.send(
            wrongUser.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                jettonAmount: toNano('10'),
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        )
        // .expectError('Unauthorized');
    });

    it('should fail when trying to withdraw non-existent stake', async () => {
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'Withdraw',
                queryId: 0n,
                pendingIndex: 999n, // Non-existent index
                tonAmount: toNano('0.1'),
                forwardAmount: toNano('0.05'),
                //jettonWallet: userJettonWallet.address,
                responseDestination: user.address,
                forwardPayload: null
            }
        )
        //.expectError('Pending index not found');
    });

    it('should set and get unstakeThreshold correctly', async () => {
        // Check initial threshold
        const initialThreshold = await stakingMaster.getUnstakeThreshold();
        expect(initialThreshold).toEqual(5n);

        // Set new threshold
        const newThreshold = 10n;
        await stakingMaster.send(
            deployer.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: newThreshold
            }
        );

        // Verify new threshold
        const updatedThreshold = await stakingMaster.getUnstakeThreshold();
        expect(updatedThreshold).toEqual(newThreshold);
    });

    it('should fail when non-owner tries to set unstakeThreshold', async () => {
        const wrongUser = await blockchain.treasury('wrongUser');
        await stakingMaster.send(
            wrongUser.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: 20n
            }
        ).catch(e => {
            expect(e.toString()).toContain('codeUnauthorized');
        });
    });

    it('should use different thresholds for stakes made at different times', async () => {
        // Set initial threshold and stake
        const initialThreshold = 5n;
        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };

        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Change threshold
        const newThreshold = 10n;
        await stakingMaster.send(
            deployer.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: newThreshold
            }
        );

        // Make another stake
        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 1n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Verify stakes have different thresholds
        const stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(2);
        
        const firstStake = stakedInfo.stakedJettons.get(0n);
        const secondStake = stakedInfo.stakedJettons.get(1n);
        
        expect(firstStake?.unstakeThreshold).toEqual(initialThreshold);
        expect(secondStake?.unstakeThreshold).toEqual(newThreshold);
    });

    it('should respect unstakeThreshold when withdrawing', async () => {
        // First stake some jettons
        const initialBalance = (await userJettonWallet.getGetWalletData()).balance;
        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };

        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        const beforeAmount = (await userJettonWallet.getGetWalletData()).balance;
        // Unstake
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                jettonAmount: stakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        // Try to withdraw immediately (should fail)
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'Withdraw',
                queryId: 0n,
                pendingIndex: 0n,
                tonAmount: toNano('0.1'),
                forwardAmount: toNano('0.1'),
                //jettonWallet: masterJettonWallet.address,
                responseDestination: user.getSender().address,
                forwardPayload: null
            }
        ).catch(e => {
            expect(e.toString()).toContain('codePendingJettonNotMaturity');
        });

        // Wait for threshold period
        await sleep(10000);
 
        let stakedInfo = await stakingWallet.getStakedInfo();
       // Try withdraw again (should succeed)
        const withdrawResult = await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'Withdraw',
                queryId: 1n,
                pendingIndex: 0n,
                tonAmount: toNano('0.1'),
                forwardAmount: toNano('0.1'),
                //jettonWallet: masterJettonWallet.address,
                responseDestination: user.getSender().address,
                forwardPayload: null
            }
        );

        console.log(withdrawResult);

        const afterAmount = (await userJettonWallet.getGetWalletData()).balance;
        stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.pendingJettons.size).toEqual(0);
        console.log({initialBalance, beforeAmount, afterAmount, stakeAmount});
        expect(afterAmount).toEqual(beforeAmount + stakeAmount);
    }, 20000);

    it('should unstake partial amount from multiple stakes', async () => {
        // First stake 10 jettons twice
        const stakeAmount = toNano('10');
        const stakeMsg1 = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: 0n,
            forwardPayload: null
        };
        
        // First stake
        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 0n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg1)).endCell()
            }
        );

        // Second stake
        await userJettonWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'JettonTransfer',
                query_id: 1n,
                amount: stakeAmount,
                destination: stakingMaster.address,
                response_destination: stakingMaster.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg1)).endCell()
            }
        );

        // Verify initial stakes
        let stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(2);
        expect(stakedInfo.stakedJettons.get(0n)?.jettonAmount).toEqual(stakeAmount);
        expect(stakedInfo.stakedJettons.get(1n)?.jettonAmount).toEqual(stakeAmount);

        // Unstake 15 jettons (should take from both stakes)
        const unstakeAmount = toNano('15');
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                jettonAmount: unstakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        // Verify the unstaking result
        stakedInfo = await stakingWallet.getStakedInfo();
        
        // Should have one stake remaining with 5 jettons
        expect(stakedInfo.stakedJettons.size).toEqual(1);
        const remainingStake = stakedInfo.stakedJettons.get(1n);
        expect(remainingStake?.jettonAmount).toEqual(toNano('5'));

        // Should have one pending withdrawal of 15 jettons
        expect(stakedInfo.pendingJettons.size).toEqual(1);
        const pendingJetton = stakedInfo.pendingJettons.get(0n);
        expect(pendingJetton?.jettonAmount).toEqual(unstakeAmount);
    });
});
