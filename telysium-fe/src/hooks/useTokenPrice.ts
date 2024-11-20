import { useQuery } from '@tanstack/react-query';
import {  getTokenUSDTPrice } from '@/api';

export const useTokenPrice = (tokenSybmol: string) => {
  return useQuery({
    queryKey: ['token-price', tokenSybmol],
    queryFn: async () => {
      return await getTokenUSDTPrice(tokenSybmol);
    },
    enabled: !!tokenSybmol,
  });
};

