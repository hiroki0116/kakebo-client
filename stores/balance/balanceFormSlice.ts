import { createSlice } from '@reduxjs/toolkit';
import { Balance, BalanceType } from '@/api-client/models/Balance';

const initialState: Pick<Balance, 'id' | 'amount' | 'title' | 'balanceType'> = {
  id: 0,
  amount: 0,
  title: '',
  balanceType: BalanceType.EXPENSE,
};

const balanceFormSlice = createSlice({
  name: 'balanceForm',
  initialState,
  reducers: {
    setBalanceForm: (state, action) => {
      state.id = action.payload.id;
      state.amount = action.payload.amount;
      state.title = action.payload.title;
      state.balanceType = action.payload.balanceType;
    },
    clearBalanceForm: (state) => {
      state.id = 0;
      state.amount = 0;
      state.title = '';
      state.balanceType = BalanceType.EXPENSE;
    },
  },
});

export const { setBalanceForm, clearBalanceForm } = balanceFormSlice.actions;

export default balanceFormSlice.reducer;
