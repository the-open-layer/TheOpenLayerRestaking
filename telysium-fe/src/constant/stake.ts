import { TonConnectUI } from '@tonconnect/ui';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, Address, beginCell, toNano, fromNano } from '@ton/ton';
import {
  StakingMasterTemplate,
  storeStakeJetton,
  storeUnStake,
  StakeJetton,
  UnStake,
  storeJettonTransfer,
} from '../../../build/ReStaking/tact_StakingMasterTemplate';
import { StakingWalletTemplate } from '../../../build/ReStaking/tact_StakingWalletTemplate';
import { ExampleJettonWallet } from '../../../build/JettonExample/tact_ExampleJettonWallet';

import { CHAIN } from '@tonconnect/sdk';

export const STAKING_MASTER_ADDRESS = import.meta.env
  .VITE_STAKING_MASTER_ADDRESS;

// "0:2857319c2822760acf20831aa249bf6b7f9d51832cd6709c7ea19585d51af230"
// "0:2857319c2822760acf20831aa249bf6b7f9d51832cd6709c7ea19585d51af230"
// "EQDxdNPvSv1WmFuuwA4oBAqh6HZFkJNnQsr_984W_KRXSD23"
export const getStakeTx = async (
  amount: string,
  userAddress: string,
  JETTON_MASTER_ADDRESS: string
) => {
  // Prepare stake message using the generated type
  console.log({
    amount,
    userAddress,
    JETTON_MASTER_ADDRESS,
    STAKING_MASTER_ADDRESS,
  });
  const stakeMsg: StakeJetton = {
    $$type: 'StakeJetton',
    tonAmount: toNano('0.1'),
    responseDestination: Address.parseRaw(userAddress),
    forwardAmount: toNano('0.05'),
    forwardPayload: beginCell().endCell(),
  };

  const jettonTransfer = {
    $$type: 'JettonTransfer' as const,
    query_id: BigInt(Math.ceil(Math.random() * 1000000)),
    amount: toNano(amount),
    destination: Address.parseFriendly(STAKING_MASTER_ADDRESS).address,
    response_destination: Address.parseRaw(userAddress),
    custom_payload: null,
    forward_ton_amount: toNano('0.3'),
    forward_payload: beginCell().store(storeStakeJetton(stakeMsg)).endCell(),
  };
  // Create transaction
  const userJettonWallet = await ExampleJettonWallet.fromInit(
    Address.parseRaw(userAddress),
    Address.parseFriendly(JETTON_MASTER_ADDRESS).address
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
      },
    ],
  };
  return transaction;
};


