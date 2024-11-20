import { getStakingInfo } from '@/lib/stake';
import { useQuery } from '@tanstack/react-query';
import { formatTime, getLocked } from '@/lib/stake';
export const useUserRestaking = (userAddress: string) => {
  return useQuery({
    queryKey: ['user-restaking', userAddress],
    queryFn: async () => {
      const info = await getStakingInfo(userAddress);
      const [pendingJettons, stakedJettons, withdrawalJettons] = [
        info.pendingJettons?.values()?.map(v =>{
          return {
            ...v,
            unstakeTime: formatTime(v.unstakeTime),
            isLocked: getLocked(v.unstakeTime, v.unstakeThreshold),
          }
        }),
        info.stakedJettons?.values().map(v =>{
          return {
            ...v,
            unstakeTime: formatTime(v.stakeTime),
            isLocked: getLocked(v.stakeTime, v.unstakeThreshold),
          }
        }),
        info.withdrawalJettons?.values().map(v =>{
          return {
            ...v,
          }
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
