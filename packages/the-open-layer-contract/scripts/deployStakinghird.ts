import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { StakingMasterTemplate } from '../build/ReStaking/tact_StakingMasterTemplate';

const jettonMasterAddress = 'kQAzft3exsq946eO92eOF0QkQqNFOLaPHak18Xdy4OYG9WjN';

export async function run(provider: NetworkProvider) {
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
}
