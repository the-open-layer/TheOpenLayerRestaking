import { sha256_sync } from '@ton/crypto';
import { Cell, Dictionary, beginCell, toNano } from '@ton/core';
import { ExampleJettonMaster } from '../../../wrappers/JettonExample_ExampleJettonMaster';
import { NetworkProvider } from '@ton/blueprint';
import { buildJettonContent } from '../utils/ton-tep64';

export async function run(provider: NetworkProvider) {
    const deployer = provider.sender();
    console.log('Deploying contract with deployer address', deployer.address);
    const jettonContent = buildJettonContent({
        name: 'TB Test Jetton',
        description: 'TB Test Jetton',
        symbol: 'TBRTJ',
        decimals: '9',
        image: 'https://openlayer-static.s3.ap-southeast-1.amazonaws.com/op_image.png',
    });

    const jettonMasterContract = provider.open(
        await ExampleJettonMaster.fromInit(provider.sender().address!!, jettonContent));

    await jettonMasterContract.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jettonMasterContract.address);
}
