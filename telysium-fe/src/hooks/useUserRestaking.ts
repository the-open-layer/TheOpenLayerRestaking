import { getStakingInfo } from '@/lib/stake';
import { useQuery } from '@tanstack/react-query';
import { formatTime, getLocked } from '@/lib/stake';
import { WITHDRAWSTATUS } from '@/constant';
import { fromNano } from '@ton/ton';
import { formatNumber } from '@/lib/numbers';
import Big from 'big.js';

export const useUserRestaking = (userAddress: string) => {
  return useQuery({
    queryKey: ['user-restaking', userAddress],
    queryFn: async () => {
      const info = await getStakingInfo(userAddress);
      const [pendingJettons, stakedJettons, withdrawalJettons] = [
        info.pendingJettons?.values()?.map((v) => {
          return {
            ...v,
            unstakeTime: formatTime(v.unstakeTime),
            isLocked: getLocked(v.unstakeTime, v.unstakeThreshold),
          };
        }),
        info.stakedJettons?.values().map((v) => {
          return {
            ...v,
            unstakeTime: formatTime(v.stakeTime),
            isLocked: getLocked(v.stakeTime, v.unstakeThreshold),
          };
        }),
        info.withdrawalJettons?.values().map((v) => {
          return {
            ...v,
          };
        }),
      ];
      const withdrawList = [
        ...pendingJettons.map((v) => ({
          // ...v,
          status: WITHDRAWSTATUS.PENDING,
          amount: `${formatNumber(Big(fromNano(v.jettonAmount)).toFixed(2))}`,
          txTime: v.unstakeTime
        })),
        ...withdrawalJettons.map((v) => ({
          // ...v,
          status: WITHDRAWSTATUS.COMPLETED,
          amount: `${formatNumber(Big(fromNano(v.jettonAmount)).toFixed(2))}`,
          txTime: null
        })),
      ];
      return {
        pendingJettons,
        stakedJettons,
        withdrawalJettons,
        withdrawList
      };
    },
    enabled: !!userAddress,
  });
};
