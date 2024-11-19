import { useQuery } from '@tanstack/react-query';
import { getTokenBalance } from '@/api';

export const useBalance = (tokenAddress: string) => {
  return useQuery({
    queryKey: ['balance', tokenAddress],
    queryFn: () => getTokenBalance(tokenAddress),
    enabled: !!tokenAddress,
  });
};
