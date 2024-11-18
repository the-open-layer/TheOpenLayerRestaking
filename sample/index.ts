import { TonConnectUI } from '@tonconnect/ui';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address, beginCell, toNano, fromNano } from "@ton/ton";
//import {  Address as CoreAddress } from "@ton/core";
import { 
    StakingMasterTemplate, 
    storeStakeJetton,
    storeUnStake,
    StakeJetton,
    UnStake,
    storeJettonTransfer
} from '../build/ReStaking/tact_StakingMasterTemplate';
import {
    StakingWalletTemplate,
} from '../build/ReStaking/tact_StakingWalletTemplate';
import { ExampleJettonWallet } from './tact_build/JettonExample/tact_ExampleJettonWallet';

// UI Elements
const connectWalletBtn = document.getElementById('connectWallet') as HTMLButtonElement;
const stakeButton = document.getElementById('stakeButton') as HTMLButtonElement;
const unstakeButton = document.getElementById('unstakeButton') as HTMLButtonElement;
const stakeAmountInput = document.getElementById('stakeAmount') as HTMLInputElement;
const unstakeAmountInput = document.getElementById('unstakeAmount') as HTMLInputElement;

// Info Elements
const walletAddressSpan = document.getElementById('walletAddress') as HTMLSpanElement;
const walletBalanceSpan = document.getElementById('walletBalance') as HTMLSpanElement;
const jettonBalanceSpan = document.getElementById('jettonBalance') as HTMLSpanElement;
const currentStakeSpan = document.getElementById('currentStake') as HTMLSpanElement;
const pendingUnstakeSpan = document.getElementById('pendingUnstake') as HTMLSpanElement;
const txHistoryDiv = document.getElementById('txHistory') as HTMLDivElement;

// Initialize TonConnect
const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://static.tbook.vip/ton/ton_manifest.json',
    buttonRootId: 'connectWallet'
});

// Contract addresses
const STAKING_MASTER_ADDRESS = "EQDxdNPvSv1WmFuuwA4oBAqh6HZFkJNnQsr_984W_KRXSD23";
const JETTON_MASTER_ADDRESS = "kQAqymw5ia-MrqO2pV2EXSYufylqtirvFbPR65ipNO1WwJuS";

let userAddress: string;
let userWalletAddress: Address;
let stakingWalletAddress: Address;
let client: TonClient;

// Initialize TON client
async function initClient() {
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    client = new TonClient({ endpoint });
}

// Initialize on load
await initClient().catch(console.error);

// Update UI when wallet connection changes
tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet) {
        userAddress = wallet.account.address;
        userWalletAddress = Address.parseRaw(userAddress);
        walletAddressSpan.textContent = userAddress;
        
        // Calculate staking wallet address
        const address = Address.parseFriendly(STAKING_MASTER_ADDRESS);
        const mc = StakingMasterTemplate.fromAddress(address.address);
        const stakingMaster = client.open(mc);
        const stakingWallet = await StakingWalletTemplate.fromInit(
            Address.parseFriendly(STAKING_MASTER_ADDRESS).address,
            Address.parseRaw(userAddress)
        );
        stakingWalletAddress = stakingWallet.address;
        stakeButton.disabled = false;
        unstakeButton.disabled = false;
        await updateBalances();
    } else {
        userAddress = '';
        stakingWalletAddress = undefined!;
        walletAddressSpan.textContent = 'Not connected';
        walletBalanceSpan.textContent = '0';
        jettonBalanceSpan.textContent = '0';
        currentStakeSpan.textContent = '0';
        pendingUnstakeSpan.textContent = '0';
        stakeButton.disabled = true;
        unstakeButton.disabled = true;
    }
});

async function updateBalances() {
    //if (!client || !userAddress) return;

    try {
        // Get wallet balance
        const balance = await client.getBalance(Address.parse(userAddress));
        walletBalanceSpan.textContent = fromNano(balance);

        // Get staking info from contract using TonClient
        if (stakingWalletAddress) {
            const stakingWallet = client.open(StakingWalletTemplate.fromAddress(
                Address.parseFriendly(stakingWalletAddress.toString()).address));
            const stakedInfo = await stakingWallet.getStakedInfo();
            console.log('Staked info:', stakedInfo);
            
            let totalStaked = 0n;
            let totalPending = 0n;

            for (const key of stakedInfo.stakedJettons.keys()) {
                const stakedJetton = stakedInfo.stakedJettons.get(key)!!;
                totalStaked += stakedJetton.jettonAmount;
            }

            for (const key of stakedInfo.pendingJettons.keys()) {
                const pendingJetton = stakedInfo.pendingJettons.get(key)!!;
                totalPending += pendingJetton.jettonAmount;
            }

            currentStakeSpan.textContent = fromNano(totalStaked);
            pendingUnstakeSpan.textContent = fromNano(totalPending);
        }
    } catch (error) {
        console.error('Error updating balances:', error);
    }
}

async function stake() {
    try {
        const amount = toNano(stakeAmountInput.value);

        
        // Prepare stake message using the generated type
        const stakeMsg: StakeJetton = {
            $$type: 'StakeJetton',
            tonAmount: toNano('0.1'),
            responseDestination: Address.parse(userAddress),
            forwardAmount: toNano('0.05'),
            forwardPayload: beginCell().endCell()
        };

        const jettonTransfer = {
            $$type: 'JettonTransfer' as const,
            query_id: BigInt(Math.ceil(Math.random() * 1000000)),
            amount: amount,
            destination: Address.parseFriendly(STAKING_MASTER_ADDRESS).address,
            response_destination: userWalletAddress,
            custom_payload: null,
            forward_ton_amount: toNano('0.3'),
            forward_payload: beginCell().store(storeStakeJetton(stakeMsg)).endCell()
        };
        // Create transaction
        const userJettonWallet = await ExampleJettonWallet.fromInit(
            userWalletAddress,
            Address.parseFriendly(JETTON_MASTER_ADDRESS).address,
        );
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
            messages: [
                {
                    address: userJettonWallet.address.toString(),
                    amount: toNano('0.5').toString(),
                    payload: beginCell()
                        .store(storeJettonTransfer(jettonTransfer))
                        .endCell()
                        .toBoc()
                        .toString('base64'),
                }
            ]
        };

        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Stake transaction:', result);
        
        addToHistory(`Staked ${stakeAmountInput.value} TBRTJ`);
        await updateBalances();
    } catch (error) {
        console.error('Error staking:', error);
    }
}

async function unstake() {
    try {
        const amount = toNano(unstakeAmountInput.value);

        // Prepare unstake message using the generated type
        const unstakeMsg: UnStake = {
            $$type: 'UnStake',
            queryId: 0n,
            stakeIndex: 0n,
            jettonAmount: amount,
            jettonWallet: Address.parse(userAddress),
            forwardPayload: beginCell().endCell()
        };

        // Create transaction
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
            messages: [
                {
                    address: stakingWalletAddress.toString(),
                    amount: toNano('1').toString(),
                    payload: beginCell()
                        .store(storeUnStake(unstakeMsg))
                        .endCell()
                        .toBoc()
                        .toString('base64'),
                }
            ]
        };

        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Unstake transaction:', result);

        addToHistory(`Unstaked ${unstakeAmountInput.value} TBRTJ`);
        await updateBalances();
    } catch (error) {
        console.error('Error unstaking:', error);
    }
}

function addToHistory(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const historyEntry = document.createElement('p');
    historyEntry.textContent = `[${timestamp}] ${message}`;
    txHistoryDiv.insertBefore(historyEntry, txHistoryDiv.firstChild);
}

// Event Listeners
connectWalletBtn.addEventListener('click', () => tonConnectUI.connectWallet());
stakeButton.addEventListener('click', stake);
unstakeButton.addEventListener('click', unstake);
