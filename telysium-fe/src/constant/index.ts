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
  WITHDRAW = 'withdraw',
}

export const ACTION_TYPES_LIST = Object.values(ACTION_TYPES);

export const ACTION_TYPES_TITLE_MAP = {
  [ACTION_TYPES.DEPOSIT]: 'Deposit',
  [ACTION_TYPES.WITHDRAW]: 'Withdraw',
};

export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';