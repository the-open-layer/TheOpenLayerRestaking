import { useQuery } from '@tanstack/react-query';
import { getTokenBalance } from '@/api';
import { useAccount } from './useAccount';

export const useBalance = (tokenMasterAddress: string) => {
  const { address } = useAccount();
  return useQuery({
    queryKey: ['balance', address, tokenMasterAddress],
    queryFn: async () => {
      return await getTokenBalance(address, tokenMasterAddress);
    },
    enabled: !!tokenMasterAddress,
  });
};
