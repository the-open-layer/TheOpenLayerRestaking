import { TonConnectUI } from '@tonconnect/ui';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address, beginCell, toNano, fromNano } from "@ton/ton";
import { 
    StakingMasterTemplate, 
    storeStakeJetton,
    StakeJetton,
    UnStake,
    storeJettonTransfer,
    storeUnStake,
    storeRedeposit,
    storeWithdraw
} from '../build/ReStaking/tact_StakingMasterTemplate';
import {
    StakingWalletTemplate,
} from '../build/ReStaking/tact_StakingWalletTemplate';
import { ExampleJettonWallet } from '../build/JettonExample/tact_ExampleJettonWallet';

// UI Elements
const connectWalletBtn = document.getElementById('connectWallet') as HTMLButtonElement;
const stakeButton = document.getElementById('stakeButton') as HTMLButtonElement;
const unstakeButton = document.getElementById('unstakeButton') as HTMLButtonElement;
const redepositButton = document.getElementById('redepositButton') as HTMLButtonElement;
const withdrawButton = document.getElementById('withdrawButton') as HTMLButtonElement;
const stakeAmountInput = document.getElementById('stakeAmount') as HTMLInputElement;
const unstakeAmountInput = document.getElementById('unstakeAmount') as HTMLInputElement;
const pendingIndexInput = document.getElementById('pendingIndex') as HTMLInputElement;

// Info Elements
const walletAddressSpan = document.getElementById('walletAddress') as HTMLSpanElement;
const walletBalanceSpan = document.getElementById('walletBalance') as HTMLSpanElement;
const jettonBalanceSpan = document.getElementById('jettonBalance') as HTMLSpanElement;
const currentStakeSpan = document.getElementById('currentStake') as HTMLSpanElement;
const pendingUnstakeSpan = document.getElementById('pendingUnstake') as HTMLSpanElement;
const completedWithdrawalsSpan = document.getElementById('completedWithdrawals') as HTMLSpanElement;
const txHistoryDiv = document.getElementById('txHistory') as HTMLDivElement;

// Initialize TonConnect
const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://static.tbook.vip/ton/ton_manifest.json',
    buttonRootId: 'connectWallet'
});

// Contract addresses from environment variables
const STAKING_MASTER_ADDRESS = "EQCY2Z3jYGX_8aV4HsOxGAQkiWgKsYJOZywhB8KI2xTAgzul";
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
        
        // Enable buttons
        stakeButton.disabled = false;
        unstakeButton.disabled = false;
        redepositButton.disabled = false;
        withdrawButton.disabled = false;
        
        await updateBalances();
    } else {
        userAddress = '';
        stakingWalletAddress = undefined!;
        walletAddressSpan.textContent = 'Not connected';
        walletBalanceSpan.textContent = '0';
        jettonBalanceSpan.textContent = '0';
        currentStakeSpan.textContent = '0';
        pendingUnstakeSpan.textContent = '0';
        completedWithdrawalsSpan.textContent = '0';
        
        // Disable buttons
        stakeButton.disabled = true;
        unstakeButton.disabled = true;
        redepositButton.disabled = true;
        withdrawButton.disabled = true;
    }
});

async function updateBalances() {
    try {
        // Get wallet balance
        const balance = await client.getBalance(Address.parse(userAddress));
        walletBalanceSpan.textContent = fromNano(balance);

        // Get staking info
        if (stakingWalletAddress) {
            const stakingWallet = client.open(StakingWalletTemplate.fromAddress(
                Address.parseFriendly(stakingWalletAddress.toString()).address));
            const stakedInfo = await stakingWallet.getStakedInfo();
            
            // Format staked positions
            let totalStaked = 0n;
            const stakeItems = [];
            for (const key of stakedInfo.stakedJettons.keys()) {
                const stakedJetton = stakedInfo.stakedJettons.get(key)!!;
                totalStaked += stakedJetton.jettonAmount;
                stakeItems.push(`Position ${key}: ${fromNano(stakedJetton.jettonAmount)} TBRTJ`);
            }
            
            // Format pending positions
            let totalPending = 0n;
            const pendingItems = [];
            for (const key of stakedInfo.pendingJettons.keys()) {
                const pendingJetton = stakedInfo.pendingJettons.get(key)!!;
                totalPending += pendingJetton.jettonAmount;
                pendingItems.push(`Pending ${key}: ${fromNano(pendingJetton.jettonAmount)} TBRTJ (Unstaked at: ${new Date(Number(pendingJetton.unstakeTime) * 1000).toLocaleString()})`);
            }
            
            // Format withdrawal positions
            let totalWithdrawn = 0n;
            const withdrawalItems = [];
            for (const key of stakedInfo.withdrawalJettons.keys()) {
                const withdrawalJetton = stakedInfo.withdrawalJettons.get(key)!!;
                totalWithdrawn += withdrawalJetton.jettonAmount;
                withdrawalItems.push(`Withdrawal ${key}: ${fromNano(withdrawalJetton.jettonAmount)} TBRTJ (Withdrawn at: ${new Date(Number(withdrawalJetton.withdrawTime) * 1000).toLocaleString()})`);
            }

            // Update UI
            currentStakeSpan.innerHTML = `Total: ${fromNano(totalStaked)} TBRTJ<br><br>${stakeItems.join('<br>')}`;
            pendingUnstakeSpan.innerHTML = `Total: ${fromNano(totalPending)} TBRTJ<br><br>${pendingItems.join('<br>')}`;
            completedWithdrawalsSpan.innerHTML = `Total: ${fromNano(totalWithdrawn)} TBRTJ<br><br>${withdrawalItems.join('<br>')}`;
        }
    } catch (error) {
        console.error('Error updating balances:', error);
    }
}

async function stake() {
    try {
        const amount = toNano(stakeAmountInput.value);

        // Prepare stake message
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
            validUntil: Math.floor(Date.now() / 1000) + 60,
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

        // Prepare unstake message
        const unstakeMsg: UnStake = {
            $$type: 'UnStake' as const,
            queryId: BigInt(Math.ceil(Math.random() * 1000000)),
            jettonAmount: amount,
            jettonWallet: userWalletAddress,
            forwardPayload: beginCell().endCell()
        };

        // Create transaction
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: stakingWalletAddress.toString(),
                    amount: toNano('0.1').toString(),
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

async function redeposit() {
    try {
        const pendingIndex = BigInt(pendingIndexInput.value);

        // Create transaction
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: stakingWalletAddress.toString(),
                    amount: toNano('0.1').toString(),
                    payload: beginCell()
                        .store(storeRedeposit({
                            $$type: 'Redeposit' as const,
                            queryId: BigInt(Math.ceil(Math.random() * 1000000)),
                            pendingIndex: pendingIndex,
                            forwardAmount: toNano('0.05'),
                            forwardPayload: beginCell().endCell()
                        }))
                        .endCell()
                        .toBoc()
                        .toString('base64'),
                }
            ]
        };

        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Redeposit transaction:', result);
        
        addToHistory(`Redeposited pending position ${pendingIndex}`);
        await updateBalances();
    } catch (error) {
        console.error('Error redepositing:', error);
    }
}

async function withdraw() {
    try {
        const pendingIndex = BigInt(pendingIndexInput.value);

        // Create transaction
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: stakingWalletAddress.toString(),
                    amount: toNano('0.1').toString(),
                    payload: beginCell()
                        .store(storeWithdraw({
                            $$type: 'Withdraw' as const,
                            queryId: BigInt(Math.ceil(Math.random() * 1000000)),
                            pendingIndex: pendingIndex,
                            tonAmount: toNano('0.1'),
                            forwardAmount: toNano('0.05'),
                            jettonWallet: userWalletAddress,
                            responseDestination: userWalletAddress,
                            forwardPayload: beginCell().endCell()
                        }))
                        .endCell()
                        .toBoc()
                        .toString('base64'),
                }
            ]
        };

        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Withdraw transaction:', result);
        
        addToHistory(`Withdrew from pending position ${pendingIndex}`);
        await updateBalances();
    } catch (error) {
        console.error('Error withdrawing:', error);
    }
}

function addToHistory(message: string) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${message}`;
    txHistoryDiv.insertBefore(entry, txHistoryDiv.firstChild);
}

// Event Listeners
stakeButton.addEventListener('click', stake);
unstakeButton.addEventListener('click', unstake);
redepositButton.addEventListener('click', redeposit);
withdrawButton.addEventListener('click', withdraw);
