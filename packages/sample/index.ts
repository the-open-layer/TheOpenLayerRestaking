import { TonConnectUI } from '@tonconnect/ui';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address, beginCell, toNano, fromNano } from "@ton/ton";
import TonWeb from 'tonweb';
import { 
    StakingMasterTemplate, 
    storeStakeJetton,
    StakeJetton,
    UnStake,
    storeJettonTransfer,
    storeUnStake,
    storeRedeposit,
    storeWithdraw
} from '../the-open-layer-contract/build/ReStaking/tact_StakingMasterTemplate';
import {
    StakingWalletTemplate,
} from '../the-open-layer-contract/build/ReStaking/tact_StakingWalletTemplate';

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
const STAKING_MASTER_ADDRESS = "EQBMpNvxOUm0jr9FgKMHxUNwTj_ChgVsDgFahQwIgQQW_zWZ";
//const JETTON_MASTER_ADDRESS = "kQAqymw5ia-MrqO2pV2EXSYufylqtirvFbPR65ipNO1WwJuS";
const JETTON_MASTER_ADDRESS = "kQAzft3exsq946eO92eOF0QkQqNFOLaPHak18Xdy4OYG9WjN";

let userAddress: string;
let userWalletAddress: Address;
let userStakingAddress: Address;
let stakingWalletAddress: Address;
let stakeMasterJettonAddress: Address;
let client: TonClient;

// Initialize TON client
async function initClient() {
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    client = new TonClient({ endpoint });
}

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
    apiKey: ''
  })
);
// Helper function to calculate jetton wallet address
async function getJettonWalletAddress(ownerAddress: string, jettonMasterAddress: string): Promise<string> {
    //@ts-ignore
    const jettonMasterContract = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
        address: jettonMasterAddress
    });

    const jettonWalletAddress = await jettonMasterContract.getJettonWalletAddress(
        new TonWeb.utils.Address(ownerAddress));
    return jettonWalletAddress.toString();
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
        
        // Calculate master jetton wallet address using TonWeb
        const masterJettonWalletAddress = await getJettonWalletAddress(
            STAKING_MASTER_ADDRESS,
            JETTON_MASTER_ADDRESS
        );
        stakeMasterJettonAddress = Address.parse(masterJettonWalletAddress);
        console.log('masterJettonWalletAddress', masterJettonWalletAddress);
        userStakingAddress = stakingWalletAddress;
        
        // Enable buttons
        stakeButton.disabled = false;
        unstakeButton.disabled = false;
        redepositButton.disabled = false;
        withdrawButton.disabled = false;
        
        await updateBalances();
    } else {
        userAddress = '';
        stakingWalletAddress = undefined!;
        userStakingAddress = undefined!;
        stakeMasterJettonAddress = undefined!;
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

        // Get user's jetton wallet address
        const userJettonWalletAddress = await getJettonWalletAddress(
            userAddress,
            JETTON_MASTER_ADDRESS
        );

        // Get staking info
        if (stakingWalletAddress) {
            const stakingWallet = client.open(StakingWalletTemplate.fromAddress(stakingWalletAddress));
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
        const amount = stakeAmountInput.value;
        if (!amount) return;

        // Get user's jetton wallet address
        const userJettonWalletAddress = await getJettonWalletAddress(
            userAddress,
            JETTON_MASTER_ADDRESS
        );

        // Prepare stake message
        const stakeMsg: StakeJetton = {
            $$type: 'StakeJetton',
            tonAmount: toNano('0.1'),
            responseDestination: userWalletAddress,
            forwardAmount: 0n,
            forwardPayload: beginCell().endCell(),
        };

        const jettonTransfer = {
            $$type: 'JettonTransfer' as const,
            query_id: BigInt(Math.ceil(Math.random() * 1000000)),
            amount: toNano(amount),
            destination: Address.parseFriendly(STAKING_MASTER_ADDRESS).address,
            response_destination: userWalletAddress,
            custom_payload: null,
            forward_ton_amount: toNano('0.3'),
            forward_payload: beginCell().store(storeStakeJetton(stakeMsg)).endCell()
        };

        // Create transaction
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: userJettonWalletAddress,
                    amount: toNano('0.5').toString(),
                    payload: beginCell()
                        .store(storeJettonTransfer(jettonTransfer))
                        .endCell()
                        .toBoc()
                        .toString('base64'),
                }
            ]
        };

        // Send transaction
        await tonConnectUI.sendTransaction(transaction);
        addToHistory(`Staked ${amount} TBRTJ`);
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
                    address: userStakingAddress.toString(),
                    amount: toNano('0.1').toString(),
                    payload: beginCell()
                        .store(storeWithdraw({
                            $$type: 'Withdraw' as const,
                            queryId: BigInt(Math.ceil(Math.random() * 1000000)),
                            pendingIndex: pendingIndex,
                            tonAmount: toNano('0.1'),
                            forwardAmount: toNano('0.05'),
                            // jettonWallet: stakeMasterJettonAddress,
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
