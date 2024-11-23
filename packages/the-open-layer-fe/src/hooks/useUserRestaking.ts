import { getStakingInfo } from '@/lib/stake';
import { useQuery } from '@tanstack/react-query';
import { formatTime, getLocked } from '@/lib/stake';
import { fromNano } from '@ton/ton';
import { formatNumber } from '@/lib/numbers';
import Big from 'big.js';
import { useAccount } from './useAccount';

export const useUserRestaking = (restakingMaster:string) => {
  const { address: userAddress } = useAccount();
  return useQuery({
    queryKey: ['user-restaking', userAddress, restakingMaster],
    queryFn: async () => {
      const info = await getStakingInfo(userAddress, restakingMaster);
      if(info === null){
        return {
          pendingJettons: [],
          stakedJettons: [],
          withdrawalJettons: [],
          restakeAmount: Big(0),
          maxPendingAmount: Big(0), 
        }
      }
      const [pendingJettons, stakedJettons, withdrawalJettons] = [
        info.pendingJettons?.values()?.map((v) => {
          return {
            ...v,
            // stakeTimeFmt: formatTime(v.stakeTime),
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
      console.log("stakingInfo", { pendingJettons, stakedJettons, withdrawalJettons });
      return {
        pendingJettons,
        stakedJettons,
        withdrawalJettons,
        restakeAmount: stakedJettons?.reduce((acc, cur) => {
          return acc.add(Big(fromNano(cur.jettonAmount)));
        }, Big(0)) ?? Big(0),
        maxPendingAmount: pendingJettons?.reduce((acc, cur) => {
          return acc.add(Big(fromNano(cur.jettonAmount)));
        }, Big(0)) ?? Big(0),
      };
    },
    enabled: !!userAddress && !!restakingMaster,
  });
};
