export interface Action {
  type: string;
}

export enum DepositStateEnum {
  IDLE = 'idle',
  CONFIRMING = 'confirming',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface DepositState {
  amount: string;
  status: DepositStateEnum;
}
