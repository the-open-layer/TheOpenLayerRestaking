import { Wallet } from '@tonconnect/sdk';
import { Cell } from '@ton/core';
import TonWeb from 'tonweb';
export const getShortAddress = (address: string) => {
  return address.slice(0, 4) + '…' + address.slice(-4);
};

export const getAddress = (wallet: Wallet | null): string | undefined => {
  return wallet?.account?.address;
};
const t =
  'te6cckECBQEAATgAAeGIAS+LNqrBx1jXJIts2LDaCU2hwdJedJeiu5iBX8yoenaCB40EwyDk0PfzFAqEYp8dzpO+uvDUH1JEK0QcKI+sfuAv1dusrZpcM7tMhMmYc27VUlcs6y60mBX4q5/ZrtxJUDlNTRi7Oe0ouAAAAcAAHAEBaGIAD+9w3qIQWPH8g7ayOtkQREJM3cp5wHBJykB7xJyK8E0g7msoAAAAAAAAAAAAAAAAAAECAbQPin6lAAAAAAAD4OJgHRqUogAIAeLpp96V+q0wt12AHFAIFUPQ7IshJs6Flf/vnC35SK6RACXxZtVYOOsa5JFtmxYbQSm0ODpLzpL0V3MQK/mVD07QSCPDRgEDAVVAX14QCAEvizaqwcdY1ySLbNiw2glNocHSXnSXoruYgV/MqHp2goBfXhAYBAAAo1rATw==';
export const getTxResult = async (tx = t) => {
  const cell = Cell.fromBase64(tx);
  const buffer = cell.hash();
  const hashHex = buffer.toString('hex');
  console.log(cell, hashHex);
};
getTxResult();
