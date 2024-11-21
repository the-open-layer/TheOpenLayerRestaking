import { useMutation } from "@tanstack/react-query";
import { getWithdrawTx, getRedepositTx } from "@/lib/stake";
import { useAccount } from "./useAccount";

export const useWithdrawMutation = () => {
  const { address , tonConnectUI} = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      const tx = await getWithdrawTx(pendingIndex, address);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Withdraw transaction:', result);
      return result;
    },
  })
};
export const useRedepositMutation = () => {
  const { address , tonConnectUI} = useAccount();
  return useMutation({
    mutationFn: async (pendingIndex: bigint) => {
      const tx = await getRedepositTx(pendingIndex, address);
      const result = await tonConnectUI.sendTransaction(tx);
      console.log('Redeposit transaction:', result);
      return result;
    },
  })
};