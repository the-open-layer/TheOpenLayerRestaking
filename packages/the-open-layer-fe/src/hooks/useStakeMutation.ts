import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getWithdrawTx,
  getRedepositTx,
  getStakeTx,
  getUnstakeTx,
  getStakingWalletAddress,
} from '@/lib/stake';
import { useAccount } from './useAccount';
import { checkTxStatus } from '@/lib/stake';
import { getLastTxHash } from '@/api';
import { useUserRestaking } from './useUserRestaking';
import { useBalance } from './useBalance';

export const useStakingWalletAddress = (stakeMasterAddress: string) => {
  const { address } = useAccount();
  return useQuery({
    queryKey: ['staking-wallet', address, stakeMasterAddress],
    queryFn: async () => {
      try {
        const stakingWallet = await getStakingWalletAddress(
          address,
          stakeMasterAddress
        );
        return stakingWallet.toString();
      } catch {
        return null;
      }
    },
    enabled: !!address && !!stakeMasterAddress,
    staleTime: Infinity,
  });
};

export const useWithdrawMutation = (
  jettonMaster: string,
  restakingMaster: string
) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { refetch: refetchBalance } = useBalance(jettonMaster);
  const { data: stakingWallet } = useStakingWalletAddress(restakingMaster);
  const { address, tonConnectUI } = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      console.log({ pendingIndex });
      const lastTxHash = await getLastTxHash(stakingWallet!);
      const tx = await getWithdrawTx(
        pendingIndex,
        address,
        jettonMaster,
        restakingMaster
      );
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Withdraw transaction:', result);
      const res = await checkTxStatus(lastTxHash, stakingWallet!);
      await refetch();
      await refetchBalance();
      return res;
    },
  });
};
export const useRedepositMutation = (restakingMaster: string) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { address, tonConnectUI } = useAccount();
  const { data: stakingWallet } = useStakingWalletAddress(restakingMaster);

  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      const lastTxHash = await getLastTxHash(stakingWallet!);
      const tx = await getRedepositTx(pendingIndex, address, restakingMaster);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Redeposit transaction:', result);
      const res = await checkTxStatus(lastTxHash, stakingWallet!);
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
  const { refetch: refetchBalance } = useBalance(jettonMasterAddress);
  const { address, tonConnectUI } = useAccount();
  const { data: stakingWallet } = useStakingWalletAddress(restakingMaster);
  return useMutation({
    mutationFn: async (amount: string) => {
      const lastTxHash = stakingWallet
        ? await getLastTxHash(stakingWallet!)
        : null;
      const tx = await getStakeTx(
        amount,
        address,
        jettonMasterAddress,
        restakingMaster
      );
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Stake transaction:', result);
      const res = await checkTxStatus(lastTxHash, stakingWallet!);
      await refetch();
      await refetchBalance();
      return res;
    },
  });
};

export const useUnstakeMutation = (restakingMaster: string) => {
  const { refetch } = useUserRestaking(restakingMaster);
  const { address, tonConnectUI } = useAccount();
  const { data: stakingWallet } = useStakingWalletAddress(restakingMaster);
  return useMutation({
    mutationFn: async (amount: string) => {
      const lastTxHash = await getLastTxHash(stakingWallet!);
      const tx = await getUnstakeTx(amount, address, restakingMaster);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Unstake transaction:', result);
      const res = await checkTxStatus(lastTxHash, stakingWallet!);
      await refetch();
      return res;
    },
  });
};
