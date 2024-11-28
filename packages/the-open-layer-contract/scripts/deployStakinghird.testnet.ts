import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import TonWeb from 'tonweb';
import { StakingMasterTemplate } from '../build/ReStaking/tact_StakingMasterTemplate';

// Ty Test Jetton for testing
const tyTestJettonMasterAddress = 'kQAzft3exsq946eO92eOF0QkQqNFOLaPHak18Xdy4OYG9WjN';

// TB Test Jetton for testing
const tbTestjettonMasterAddress = 'kQAqymw5ia-MrqO2pV2EXSYufylqtirvFbPR65ipNO1WwJuS';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

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

async function deployOfJettonMaster(jettonMasterAddress: string, provider: NetworkProvider) {
    const deployer = provider.sender();
    console.log('Deploying contract with deployer address', deployer.address);
    const stakingMasterContract = provider.open(
        await StakingMasterTemplate.fromInit(
            provider.sender().address!!,
            Address.parseFriendly(jettonMasterAddress).address
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

    await provider.waitForDeploy(stakingMasterContract.address);

    const masterJettonWallet = await getJettonWalletAddress(
        stakingMasterContract.address.toString(), jettonMasterAddress)
    await stakingMasterContract.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'SetContractJettonWallet',
            queryId: 0n,
            thisContractJettonWallet: Address.parseRaw(masterJettonWallet),
        }
    );
    const thisJettonWallet = await stakingMasterContract.getThisJettonWallet();
    console.log('Master Jetton Wallet', masterJettonWallet);

    await stakingMasterContract.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'SetUnstakeThreshold',
            queryId: 0n,
            threshold: BigInt(60 * 5)
        });
}

export async function run(provider: NetworkProvider) {
    await deployOfJettonMaster(tbTestjettonMasterAddress, provider);
    await deployOfJettonMaster(tyTestJettonMasterAddress, provider);
}
