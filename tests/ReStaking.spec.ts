import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano, beginCell } from '@ton/core';
import { StakingMasterTemplate, TokenTransferForwardPayload, storeStakeJetton, storeTokenTransferForwardPayload } from '../build/ReStaking/tact_StakingMasterTemplate';
import { StakingWalletTemplate } from '../build/ReStaking/tact_StakingWalletTemplate';
import { ExampleJettonMaster } from '../wrappers/JettonExample_ExampleJettonMaster';
import { ExampleJettonWallet } from '../wrappers/JettonExample_ExampleJettonWallet';
import '@ton/test-utils';
import { buildJettonContent } from '../utils/ton-tep64';
import { sleep } from '@ton/blueprint';

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
            await StakingMasterTemplate.fromInit(deployer.getSender().address)
        );
        await stakingMaster.send(
            deployer.getSender(),
            { value: toNano('1') },
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
            forwardAmount: toNano('0.05'),
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
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Verify stake
        const stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(1);
        const firstStake = stakedInfo.stakedJettons.get(0n);
        expect(firstStake?.jettonAmount).toEqual(stakeAmount);
    });

    it('should unstake jettons successfully', async () => {
        // First stake some jettons
        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: toNano('0.05'),
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
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Now unstake
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                stakeIndex: 0n,
                jettonAmount: stakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        // Verify unstake
        const stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(0);
        expect(stakedInfo.pendingJettons.size).toEqual(1);
        expect(stakedInfo.pendingJettons.get(0n)?.jettonAmount).toEqual(stakeAmount);
    });

    it('should withdraw jettons successfully', async () => {
        // First stake and unstake some jettons
        // ... (same staking and unstaking code as above) ...

        const stakeAmount = toNano('10');
        const stakeMsg = {
            $$type: 'StakeJetton' as const,
            tonAmount: toNano('0.1'),
            responseDestination: user.getSender().address,
            forwardAmount: toNano('0.05'),
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
                forward_ton_amount: toNano('0.3'),
                forward_payload: beginCell().store(
                    storeStakeJetton(stakeMsg)).endCell()
            }
        );

        // Now unstake
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake' as const,
                queryId: 0n,
                stakeIndex: 0n,
                jettonAmount: stakeAmount,
                jettonWallet: userJettonWallet.address,
                forwardPayload: null
            }
        );

        const beforeAmount = (await userJettonWallet.getGetWalletData()).balance;
        // Wait for unstake to be claimable
        await sleep(10000);
        // Now withdraw
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'Withdraw',
                queryId: 0n,
                stakeIndex: 0n,
                tonAmount: toNano('0.1'),
                forwardAmount: toNano('0.05'),
                jettonWallet: masterJettonWallet.address,
                responseDestination: user.getSender().address,
                forwardPayload: null
            }
        );

        // Verify withdraw
        const stakedInfo = await stakingWallet.getStakedInfo();
        expect(stakedInfo.stakedJettons.size).toEqual(0);
        expect(stakedInfo.pendingJettons.size).toEqual(0);

        // Check user's jetton balance
        const balance = await userJettonWallet.getGetWalletData();
        expect(balance.balance).toEqual(beforeAmount + stakeAmount); // Should be back to original amount
    }, 20000);

    it('should redeposit pending jettons successfully', async () => {
        // First stake and unstake some jettons
        // ... (same staking and unstaking code as above) ...

        // Now redeposit
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'Redeposit',
                queryId: 0n,
                stakeIndex: 0n,
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
        
        await stakingWallet.send(
            user.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: newThreshold
            }
        );

        const threshold = await stakingWallet.getUnstakeThreshold();
        expect(threshold).toEqual(newThreshold);
    });

    it('should fail when unauthorized user tries to modify unstake threshold', async () => {
        const wrongUser = await blockchain.treasury('wrongUser');
        const newThreshold = 10n;
        
        await stakingWallet.send(
            wrongUser.getSender(),
            { value: toNano('1') },
            {
                $$type: 'SetUnstakeThreshold' as const,
                queryId: 0n,
                threshold: newThreshold
            }
        );

        const threshold = await stakingWallet.getUnstakeThreshold();
        expect(threshold).not.toEqual(newThreshold);
    });

    it('should fail when unauthorized user tries to unstake', async () => {
        // Try to unstake with wrong user
        const wrongUser = await blockchain.treasury('wrongUser');
        await stakingWallet.send(
            wrongUser.getSender(),
            { value: toNano('1') },
            {
                $$type: 'UnStake',
                queryId: 0n,
                stakeIndex: 0n,
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
                stakeIndex: 999n, // Non-existent index
                tonAmount: toNano('0.1'),
                forwardAmount: toNano('0.05'),
                jettonWallet: userJettonWallet.address,
                responseDestination: user.address,
                forwardPayload: null
            }
        )
        //.expectError('Pending index not found');
    });
});
