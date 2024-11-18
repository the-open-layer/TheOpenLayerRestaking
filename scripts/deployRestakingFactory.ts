import { Address, toNano } from '@ton/core';
import { RestakingFactory } from '../wrappers/ReStakingFactory.compile';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const restakingFactory = provider.open(
        await RestakingFactory.fromInit(BigInt(Math.floor(Math.random() * 10000)))
    );

    await restakingFactory.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(restakingFactory.address);
    
    console.log('Factory deployed at:', restakingFactory.address);
    console.log('Factory ID:', await restakingFactory.getId());
}