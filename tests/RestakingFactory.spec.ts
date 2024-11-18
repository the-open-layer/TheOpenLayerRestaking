import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { RestakingFactory } from '../wrappers/ReStakingFactory.compile';
import '@ton/test-utils';

describe('RestakingFactory', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let restakingFactory: SandboxContract<RestakingFactory>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        restakingFactory = blockchain.openContract(
            await RestakingFactory.fromInit(0n)
        );

        deployer = await blockchain.treasury('deployer');

        const deployResult = await restakingFactory.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: restakingFactory.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // 检查是否成功部署
        expect(await restakingFactory.getId()).toBe(0n);
        expect(await restakingFactory.getCounter()).toBe(0n);
    });

    it('should deploy new master', async () => {
        const deployMasterResult = await restakingFactory.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployMasterResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: restakingFactory.address,
            success: true,
        });

        expect(await restakingFactory.getCounter()).toBe(1n);
        
        const masterAddr = await restakingFactory.getMaster(0n);
        expect(masterAddr).toBeDefined();
    });
});

