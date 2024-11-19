import { useQuery } from '@tanstack/react-query';
import { getTokenBalance } from '@/api';
import { getUserJettonWalletFromMaster } from '@/constant/stake';
import { useAccount } from './useAccount';

export const useBalance = (tokenMasterAddress: string) => {
  const { address } = useAccount();
  return useQuery({
    queryKey: ['balance', address, tokenMasterAddress],
    queryFn: async () => {
      const tokenAddress = await getUserJettonWalletFromMaster(
        address,
        tokenMasterAddress
      );
      return await getTokenBalance(tokenAddress);
    },
    enabled: !!tokenMasterAddress,
  });
};
