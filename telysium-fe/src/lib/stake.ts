import { Address, beginCell, toNano } from '@ton/ton';
import {
  StakingMasterTemplate,
  storeStakeJetton,
  storeUnStake,
  StakeJetton,
  UnStake,
  storeRedeposit,
  storeWithdraw,
  storeJettonTransfer,
} from '../../../build/ReStaking/tact_StakingMasterTemplate';
import { StakingWalletTemplate } from '../../../build/ReStaking/tact_StakingWalletTemplate';
import { getTonClient, getLastTxHash, getUserJettonWallet } from '@/api';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/constant';
import { delay } from '@/lib/utils';

export const getStakingWalletAddress = async (
  userAddress: string,
  STAKING_MASTER_ADDRESS: string
) => {
  const stakingWallet = await StakingWalletTemplate.fromInit(
    Address.parse(STAKING_MASTER_ADDRESS),
    Address.parse(userAddress)
  );
  return stakingWallet.address;
};

export const getStakeTx = async (
  amount: string,
  userAddress: string,
  JETTON_MASTER_ADDRESS: string,
  STAKING_MASTER_ADDRESS: string
) => {
  // Prepare stake message using the generated type
  const stakeMsg: StakeJetton = {
    $$type: 'StakeJetton',
    tonAmount: toNano('0.1'),
    responseDestination: Address.parse(userAddress),
    forwardAmount: toNano('0.05'),
    forwardPayload: beginCell().endCell(),
  };

  const jettonTransfer = {
    $$type: 'JettonTransfer' as const,
    query_id: BigInt(Math.ceil(Math.random() * 1000000)),
    amount: toNano(amount),
    destination: Address.parseFriendly(STAKING_MASTER_ADDRESS).address,
    response_destination: Address.parse(userAddress),
    custom_payload: null,
    forward_ton_amount: toNano('0.3'),
    forward_payload: beginCell().store(storeStakeJetton(stakeMsg)).endCell(),
  };
  // Create transaction
  const userJettonWallet = await getUserJettonWallet(userAddress, JETTON_MASTER_ADDRESS);
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: userJettonWallet.toString(),
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

export const getUnstakeTx = async (
  amount: string,
  userAddress: string,
  STAKING_MASTER_ADDRESS: string
) => {
  const unstakeMsg: UnStake = {
    $$type: 'UnStake',
    queryId: BigInt(Math.ceil(Math.random() * 1000000)),
    // stakeIndex: 0n,
    jettonAmount: toNano(amount),
    jettonWallet: Address.parse(userAddress),
    forwardPayload: beginCell().endCell(),
  };
  console.log('unstakeMsg', unstakeMsg);
  const stakingWalletAddress = await getStakingWalletAddress(
    userAddress,
    STAKING_MASTER_ADDRESS
  );
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: stakingWalletAddress.toString(),
        amount: toNano('0.2').toString(),
        payload: beginCell()
          .store(storeUnStake(unstakeMsg))
          .endCell()
          .toBoc()
          .toString('base64'),
      },
    ],
  };
  return transaction;
};

export const getRedepositTx = async (
  pendingIndex: bigint,
  userAddress: string,
  STAKING_MASTER_ADDRESS: string
) => {
  const stakingWalletAddress = await getStakingWalletAddress(
    userAddress,
    STAKING_MASTER_ADDRESS
  );
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: stakingWalletAddress.toString(),
        amount: toNano('0.1').toString(),
        payload: beginCell()
          .store(
            storeRedeposit({
              $$type: 'Redeposit' as const,
              queryId: BigInt(Math.ceil(Math.random() * 1000000)),
              pendingIndex: pendingIndex,
              forwardAmount: toNano('0.05'),
              forwardPayload: beginCell().endCell(),
            })
          )
          .endCell()
          .toBoc()
          .toString('base64'),
      },
    ],
  };
  return transaction;
};
export const getWithdrawTx = async (
  pendingIndex: bigint,
  userAddress: string,
  // jettonMaster
  JETTON_MASTER_ADDRESS: string,
  STAKING_MASTER_ADDRESS: string
) => {
  console.log({
    pendingIndex,
    userAddress,
    JETTON_MASTER_ADDRESS,
    STAKING_MASTER_ADDRESS,
  });
  const stakingWalletAddress = await getStakingWalletAddress(
    userAddress,
    STAKING_MASTER_ADDRESS
  );
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: stakingWalletAddress.toString(),
        amount: toNano('0.1').toString(),
        payload: beginCell()
          .store(
            storeWithdraw({
              $$type: 'Withdraw' as const,
              queryId: BigInt(Math.ceil(Math.random() * 1000000)),
              pendingIndex: pendingIndex,
              tonAmount: toNano('0.1'),
              forwardAmount: toNano('0.05'),
              jettonWallet: Address.parse(JETTON_MASTER_ADDRESS),
              responseDestination: Address.parse(userAddress),
              forwardPayload: beginCell().endCell(),
            })
          )
          .endCell()
          .toBoc()
          .toString('base64'),
      },
    ],
  };
  return transaction;
};

export const getStakingInfo = async (
  userAddress: string,
  STAKING_MASTER_ADDRESS: string
) => {
  const client = await getTonClient();
  const stakingWalletAddress = await getStakingWalletAddress(
    userAddress,
    STAKING_MASTER_ADDRESS
  );
  const stakingWallet = client.open(
    StakingWalletTemplate.fromAddress(stakingWalletAddress)
  );
  const res = await stakingWallet.getStakedInfo();
  return res;
};

export const getTokenTVL = async (tokenAddress: string) => {
  return 100000000;
};

export const formatTime = (timestamp: bigint) => {
  return dayjs.unix(Number(timestamp)).format(dateTimeFormat);
};
export const getLocked = (timestamp: bigint, threshold: bigint) => {
  // lockTime  + threshold < now ? true : false
  // console.log(
  //   formatTime(timestamp),
  //   formatTime(timestamp + threshold),
  //   dayjs().format(dateTimeFormat),
  //   dayjs.unix(Number(timestamp + threshold)).isAfter(dayjs())
  // );
  return dayjs.unix(Number(timestamp) + Number(threshold)).isAfter(dayjs());
};

// https://toncenter.com/api/v2/#/accounts/get_address_information_getAddressInformation_get
export const checkTxStatus = async (
  lastTxHash: string,
  userAddress: string,
  retryTimes = 60
) => {
  // https://testnet.toncenter.com/api/v2/getTransactions?address=0QCXxZtVYOOsa5JFtmxYbQSm0ODpLzpL0V3MQK_mVD07QZxq
  let time = 0;
  while (true) {
    const newLastTxHash = await getLastTxHash(userAddress);
    console.log({ newLastTxHash, lastTxHash, time });
    if (newLastTxHash !== lastTxHash) {
      return true;
    }
    await delay(1000);
    time++;
    if (time > retryTimes) {
      return false;
    }
  }
};
