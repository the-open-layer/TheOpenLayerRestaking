import { NetworkProvider } from '@ton/blueprint';
import { beginCell, comment, Dictionary, fromNano, toNano } from '@ton/core';

import { ExampleJettonMaster } from '../wrappers/JettonExample_ExampleJettonMaster';
import { ExampleJettonWallet } from '../wrappers/JettonExample_ExampleJettonWallet';

import {
    StakingMasterTemplate, storeStakeJetton
} from '../build/ReStaking/tact_StakingMasterTemplate';
import {
    StakingWalletTemplate,
} from '../build/ReStaking/tact_StakingWalletTemplate';

import { buildJettonContent } from '../utils/ton-tep64';

const randomInt = (): number => {
    return Math.floor(Math.random() * 10000);
}

export async function run(provider: NetworkProvider): Promise<void> {
    const jettonContent = buildJettonContent({
        name: 'TB Test Jetton',
        description: 'TB Test Jetton',
        symbol: 'TBRTJ',
        decimals: '9',
        image: 'https://i.tbook.com/logo.svg',
    });

    const jettonMasterContract = provider.open(
        await ExampleJettonMaster.fromInit(provider.sender().address!!, jettonContent));

    const stakingMasterContract = provider.open(
        await StakingMasterTemplate.fromInit(
            provider.sender().address!!,
            jettonMasterContract.address
        )
    );

    await stakingMasterContract.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );
    console.log("-------------------------------------")
    console.log('>> wait staking master deploy to: ' + stakingMasterContract.address.toString());
    console.log("-------------------------------------")
    await provider.waitForDeploy(stakingMasterContract.address, 50);

    const stakingWalletContract = provider.open(
        await StakingWalletTemplate.fromInit(
            stakingMasterContract.address,
            provider.sender().address!!
        )
    );

    const jettonWalletContract = provider.open(
        await ExampleJettonWallet.fromInit(
            provider.sender().address!!,
            jettonMasterContract.address,
        )
    );

    const stakingJettonWalletContract = provider.open(
        await ExampleJettonWallet.fromInit(
            jettonMasterContract.address,
            stakingMasterContract.address,
        )
    );

    console.log("-------------------------------------")
    console.log('>> mint jetton to yourself from master: ' + jettonMasterContract.address.toString());
    console.log("-------------------------------------")
    console.log(`mint jetton to ${provider.sender().address!!.toString()}`);
    const amount = randomInt();

    await jettonMasterContract.send(
        provider.sender(),
        {
            value: toNano("1"),
            bounce: false,
        },
        {
            $$type: "JettonMint",
            forward_ton_amount: toNano('0.2'),
            amount: toNano(amount),
            receiver: provider.sender().address!!,
            origin: provider.sender().address!!,
            custom_payload: null,
            forward_payload: beginCell().endCell(),
        }
    );

    console.log("-------------------------------------")
    console.log('>> wait jetton wallet deploy to: ' + jettonWalletContract.address.toString());
    console.log("-------------------------------------")
    await provider.waitForDeploy(jettonWalletContract.address, 50);

    console.log("-------------------------------------")
    console.log("staking jetton...")
    console.log("-------------------------------------")

    // Prepare stake message
    const stakeMsg = {
        $$type: 'StakeJetton' as const,
        tonAmount: toNano('0.1'),
        responseDestination: provider.sender().address!!,
        forwardAmount: toNano('0.05'),
        forwardPayload: beginCell().endCell()
    };

    // Transfer jettons to staking contract
    await jettonWalletContract.send(
        provider.sender(),
        {
            value: toNano('0.5'),
            bounce: false
        },
        {
            $$type: 'JettonTransfer',
            query_id: BigInt(Math.ceil(Math.random() * 1000000)),
            amount: toNano('1'),
            destination: stakingMasterContract.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano('0.3'),
            forward_payload: beginCell().store(storeStakeJetton(stakeMsg)).endCell()
        }
    );

    console.log("-------------------------------------")
    console.log("wait staking wallet deploy: " + stakingWalletContract.address.toString());
    console.log("-------------------------------------")
    await provider.waitForDeploy(stakingWalletContract.address, 50);

    console.log("-------------------------------------")
    console.log("show staking info")
    console.log("-------------------------------------")
    const stakedInfo = await stakingWalletContract.getStakedInfo();
    console.log("Staked Positions:");
    for (const key of stakedInfo.stakedJettons.keys()) {
        const stakedJetton = stakedInfo.stakedJettons.get(key)!!;
        console.log(`Position ${key}: ${fromNano(stakedJetton.jettonAmount)} jettons`);
    }

    // Unstake some tokens
    console.log("-------------------------------------")
    console.log("unstaking jettons...")
    console.log("-------------------------------------")
    await stakingWalletContract.send(
        provider.sender(),
        {
            value: toNano("0.1"),
            bounce: false,
        },
        {
            $$type: "UnStake" as const,
            queryId: BigInt(randomInt()),
            jettonAmount: toNano("1"),
            jettonWallet: jettonWalletContract.address,
            forwardPayload: beginCell().endCell()
        }
    );

    console.log("-------------------------------------")
    console.log("updated staking info:")
    console.log("-------------------------------------")

    const updatedInfo = await stakingWalletContract.getStakedInfo();
    
    console.log("Staked Positions:");
    for (const key of updatedInfo.stakedJettons.keys()) {
        const stakedJetton = updatedInfo.stakedJettons.get(key)!!;
        console.log(`Position ${key}: ${fromNano(stakedJetton.jettonAmount)} jettons`);
    }

    console.log("\nPending Withdrawals:");
    for (const key of updatedInfo.pendingJettons.keys()) {
        const pendingJetton = updatedInfo.pendingJettons.get(key)!!;
        console.log(`Withdrawal ${key}: ${fromNano(pendingJetton.jettonAmount)} jettons, Unstake Time: ${pendingJetton.unstakeTime}`);
    }

    console.log("\nCompleted Withdrawals:");
    for (const key of updatedInfo.withdrawalJettons.keys()) {
        const withdrawalJetton = updatedInfo.withdrawalJettons.get(key)!!;
        console.log(`Withdrawal ${key}: ${fromNano(withdrawalJetton.jettonAmount)} jettons, Withdraw Time: ${withdrawalJetton.withdrawTime}`);
    }

    /*
    console.log("-------------------------------------")
    console.log("withdrawing pending jettons...")
    console.log("-------------------------------------")
    await stakingWalletContract.send(
        provider.sender(),
        {
            value: toNano("0.1"),
            bounce: false,
        },
        {
            $$type: "Withdraw",
            queryId: BigInt(randomInt()),
            pendingIndex: 0n,
            tonAmount: toNano("0.1"),
            forwardAmount: toNano("0.05"),
            jettonWallet: jettonWalletContract.address,
            responseDestination: provider.sender().address!!,
            forwardPayload: beginCell().endCell()
        }
    );
    */
}
