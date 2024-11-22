export interface Action {
  type: string;
}

export enum txStateEnum {
  IDLE = 'idle',
  CONFIRMING = 'confirming',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface txState {
  amount: string;
  status: txStateEnum;
}
