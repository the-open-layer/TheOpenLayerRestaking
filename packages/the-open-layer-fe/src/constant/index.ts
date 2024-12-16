export enum REWARDTYPE {
  POINTS = 'point',
  TON = 'ton',
}

export const navItems = [
  // { text: 'Dashboard', link: '/dashboard', isReady: false },
  { text: 'Dashboard', link: '/restake', isReady: true },
  { text: 'Validator', link: '/validator', isReady: false },
  { text: 'AVS', link: '/avs', isReady: false },
];

export enum ACTION_TYPES {
  STAKE = 'stake',
  UNSTAKE = 'unstake',
  WITHDRAW = 'withdraw',
  RESTAKE = 'restake',
}
export const SUPPORTED_ACTION_TYPES = [
  ACTION_TYPES.UNSTAKE,
  ACTION_TYPES.STAKE,
];
export const ACTION_TYPES_LIST = Object.values(ACTION_TYPES);



export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export enum WITHDRAWSTATUS {
  PENDING = 'pending',
  COMPLETED = 'compeleted',
}

export const precision = 4;