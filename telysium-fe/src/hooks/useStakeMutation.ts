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

export const useWithdrawMutation = () => {
  const { refetch } = useUserRestaking();
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getWithdrawTx(pendingIndex, address);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Withdraw transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      return res;
    },
  });
};
export const useRedepositMutation = () => {
  const { refetch } = useUserRestaking();
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getRedepositTx(pendingIndex, address);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Redeposit transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      return res;
    },
  });
};

export const useStakeMutation = (jettonMasterAddress: string) => {
  const { refetch } = useUserRestaking();
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (amount: string) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getStakeTx(amount, address, jettonMasterAddress);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Stake transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      return res;
    },
  });
};


export const useUnstakeMutation = () => {
  const { refetch } = useUserRestaking();
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (amount: string) => {
      const lastTxHash = await getLastTxHash(address);
      const tx = await getUnstakeTx(amount, address);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Unstake transaction:', result);
      const res = await checkTxStatus(lastTxHash, address);
      await refetch();
      return res;
    },
  });
};