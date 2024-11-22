import {
  useTonWallet,
  useTonConnectUI,
  useTonAddress,
} from '@tonconnect/ui-react';
import { getShortAddress } from '@/lib/address';

export const useAccount = () => {
  const wallet = useTonWallet();
  const connected = Boolean(wallet);
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress(true);
  
  return {
    wallet,
    connected,
    rawAddress: wallet ? wallet.account.address : '',
    tonConnectUI,
    address,
    shortAddress: wallet ? getShortAddress(address) : '',
  };
};
