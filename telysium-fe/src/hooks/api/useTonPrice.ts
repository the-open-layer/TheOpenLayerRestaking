import { useQuery } from '@tanstack/react-query';
import { getTokenUSDTPrice } from '@/api';

const useTonPrice = () => {
  return useQuery({
    queryKey: ['ton-usdt'],
    queryFn: () => getTokenUSDTPrice('TON'),
    staleTime: 10000,
    refetchInterval: 60_000, // 60 seconds
  });
};
export default useTonPrice;
