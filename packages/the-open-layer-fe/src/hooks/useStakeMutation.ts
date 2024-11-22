import { useMutation } from '@tanstack/react-query';
import {
  getWithdrawTx,
  getRedepositTx,
  getStakeTx,
  getUnstakeTx,
} from '@/lib/stake';
import { useAccount } from './useAccount';
import { checkTxStatus } from '@/lib/stake';
import { getLastTxHash } from '@/api';
import { useUserRestaking } from './useUserRestaking';
import { useBalance } from './useBalance';

export const useWithdrawMutation = (
  jettonMaster: string,
  restakingMaster: string
) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { refetch: refetchBalance } =useBalance(jettonMaster);

  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      console.log({ pendingIndex });
      const lastTxHash = await getLastTxHash(address);
      const tx = await getWithdrawTx(
        pendingIndex,
        address,
        jettonMaster,
        restakingMaster
      );
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Withdraw transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      await refetchBalance();
      return res;
    },
  });
};
export const useRedepositMutation = (restakingMaster: string) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getRedepositTx(pendingIndex, address, restakingMaster);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Redeposit transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      return res;
    },
  });
};

export const useStakeMutation = (
  jettonMasterAddress: string,
  restakingMaster: string
) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { refetch: refetchBalance } =useBalance(jettonMasterAddress);
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (amount: string) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getStakeTx(
        amount,
        address,
        jettonMasterAddress,
        restakingMaster
      );
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Stake transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      await refetchBalance();
      return res;
    },
  });
};

export const useUnstakeMutation = (restakingMaster: string) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (amount: string) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getUnstakeTx(amount, address, restakingMaster);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Unstake transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      return res;
    },
  });
};
