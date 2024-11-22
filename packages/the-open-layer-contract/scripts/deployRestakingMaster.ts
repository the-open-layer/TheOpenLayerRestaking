import { toNano } from '@ton/core';
import {  } from '../../../wrappers/ReStaking';
import { NetworkProvider } from '@ton/blueprint';
import { JettonMaster } from '@ton/ton'

export async function run(provider: NetworkProvider) {
    const restakingFactory = provider.open(await RestakingFactory.fromInit(BigInt(Math.floor(Math.random() * 10000))));
    JettonMaster()
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

    console.log('ID', await restakingFactory.getId());
}
