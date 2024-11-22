import { useQuery } from '@tanstack/react-query';
import { getStakeList } from '@/api';

export const useStakeList = () => {
  return useQuery({
    queryKey: ['stakers'],
    queryFn: getStakeList,
    refetchOnMount: false,
  });
};
