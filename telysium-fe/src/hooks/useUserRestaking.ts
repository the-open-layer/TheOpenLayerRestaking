import { getStakingInfo } from '@/constant/stake';
import { useQuery } from '@tanstack/react-query';

export const useUserRestaking = (userAddress: string) => {
  return useQuery({
    queryKey: ['user-restaking', userAddress],
    queryFn: async () => {
      const info = await getStakingInfo(userAddress);
      return {
        pendingJettons: info.pendingJettons?.values(),
        stakedJettons: info.stakedJettons?.values(),
      };
    },
    enabled: !!userAddress,
  });
};
