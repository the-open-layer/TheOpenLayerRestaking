export enum REWARDTYPE {
  POINTS = 'point',
  TON = 'ton',
}

export const navItems = [
  { text: 'Dashboard', link: '/dashboard', isReady: false },
  { text: 'Restake', link: '/restake', isReady: true },
  { text: 'Validator', link: '/validator', isReady: false },
  { text: 'AVS', link: '/avs', isReady: false },
];

export enum ACTION_TYPES {
  DEPOSIT = 'deposit',
  UNSTAKE = 'unstake',
  REDEPOSIT = 'redeposit',
  WITHDRAW = 'withdraw',
}
export const SUPPORTED_ACTION_TYPES = [
  ACTION_TYPES.DEPOSIT,
  ACTION_TYPES.UNSTAKE,
];
export const ACTION_TYPES_LIST = Object.values(ACTION_TYPES);

export const ACTION_TYPES_TITLE_MAP = {
  [ACTION_TYPES.DEPOSIT]: 'Deposit',
  [ACTION_TYPES.UNSTAKE]: 'Unstake',
  [ACTION_TYPES.REDEPOSIT]: 'Redeposit',
  [ACTION_TYPES.WITHDRAW]: 'Withdraw',
};
export const ACTION_TYPES_NOW_MAP = {
  [ACTION_TYPES.DEPOSIT]: 'Depositing',
  [ACTION_TYPES.UNSTAKE]: 'Unstaking',
  [ACTION_TYPES.REDEPOSIT]: 'Redepositing',
  [ACTION_TYPES.WITHDRAW]: 'Withdrawing',
};
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export enum WITHDRAWSTATUS {
  PENDING = 'pending',
  COMPLETED = 'compeleted',
}