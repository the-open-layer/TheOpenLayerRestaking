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
            stakeTimeFmt: formatTime(v.stakeTime),
            unstakeTimeFmt: formatTime(v.unstakeTime),
            isLocked: getLocked(v.unstakeTime, v.unstakeThreshold),
            amount: `${formatNumber(Big(fromNano(v.jettonAmount)).toFixed(2))}`,
          };
        }),
        info.stakedJettons?.values().map((v) => {
          return {
            ...v,
            createdTime: formatTime(v.stakeTime),
            isLocked: getLocked(v.stakeTime, v.unstakeThreshold),
            amount: `${formatNumber(Big(fromNano(v.jettonAmount)).toFixed(2))}`,
          };
        }),
        info.withdrawalJettons?.values().map((v) => {
          return {
            ...v,
            createdTime: formatTime(v.withdrawTime),
            amount: `${formatNumber(Big(fromNano(v.jettonAmount)).toFixed(2))}`,
          };
        }),
      ];
      return {
        pendingJettons,
        stakedJettons,
        withdrawalJettons,
      };
    },
    enabled: !!userAddress,
  });
};
