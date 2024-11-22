import { Wallet } from '@tonconnect/sdk';
export const getShortAddress = (address: string) => {
  return address.slice(0, 4) + '…' + address.slice(-4);
};

export const getAddress = (wallet: Wallet | null): string | undefined => {
  return wallet?.account?.address;
};

