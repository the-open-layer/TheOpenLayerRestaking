import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/restaking/ReStakingFactory.tact',
    options: {
        debug: true,
    },
};
