import {
  AnyAction,
  Dispatch,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { balanceRepository } from '@/api-client/repositories/balance_repository';
import { Balance, BalanceDto } from '@/api-client/models/Balance';

export type BalanceState = {
  name: string;
  data: Balance[];
  loading: boolean;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
};

const initialState: BalanceState = {
  name: 'balance',
  data: [],
  status: 'idle',
  loading: false,
};

export const getAllBalance = createAsyncThunk(
  'balance/getAllBalance',
  async () => {
    try {
      const data = await balanceRepository.getAllBalance();
      return {
        data,
        status: 'succeeded',
      };
    } catch (error) {
      return {
        data: [],
        status: 'failed',
      };
    }
  },
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    changePagination: (state, action: PayloadAction<number>) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllBalance.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.status = 'failed';
      });
  },
});

export const {} = balanceSlice.actions;

export default balanceSlice.reducer;
