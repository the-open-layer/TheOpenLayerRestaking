import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  counter: number;
}

const initialState: AccountState = {
  counter: 0,
};

export const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
  },
});

export const { updateCounter } = AccountSlice.actions;

export default AccountSlice.reducer;
