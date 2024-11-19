import { getStakingInfo } from '@/constant/stake';
import { useQuery } from '@tanstack/react-query';

export const useUserRestaking = (userAddress: string) => {
  console.log({ userAddress });
  return useQuery({
    queryKey: ['user-restaking', userAddress],
    queryFn: () => getStakingInfo(userAddress),
    enabled: !!userAddress,
  });
};
