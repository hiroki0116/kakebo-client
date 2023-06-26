import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { balanceRepository } from '@/api-client/repositories/balance_repository';
import { Balance, BalanceDto } from '@/api-client/models/Balance';

export type BalanceState = {
  name: string;
  balanceData: Balance[];
  loading: boolean;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
};

const initialState: BalanceState = {
  name: 'balance',
  balanceData: [],
  status: 'idle',
  loading: false,
};

export const getAllBalance = createAsyncThunk(
  'balance/getAllBalance',
  async () => {
    try {
      const data = await balanceRepository.getAllBalance();
      return data as Balance[];
    } catch (error) {
      return [] as Balance[];
    }
  },
);

export const addBalance = createAsyncThunk(
  'balance/addBalance',
  async (balance: BalanceDto) => {
    try {
      const data = await balanceRepository.createBalance(balance);
      return data as Balance;
    } catch (error) {
      return {} as Balance;
    }
  },
);

export const updateBalance = createAsyncThunk(
  'balance/updateBalance',
  async (balance: BalanceDto) => {
    try {
      const data = await balanceRepository.updateBalance(balance);
      return data as Balance;
    } catch (error) {
      return {} as Balance;
    }
  },
);

export const deleteBalance = createAsyncThunk(
  'balance/deleteBalance',
  async (id: number): Promise<void> => {
    try {
      await balanceRepository.deleteBalance(id);
    } catch (error) {
      console.log(error);
    }
  },
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.balanceData = action.payload;
      })
      .addCase(getAllBalance.rejected, (state, action) => {
        state.loading = false;
        state.balanceData = [];
        state.status = 'failed';
      })
      .addCase(addBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balanceData = [...state.balanceData, action.payload];
      })
      .addCase(addBalance.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balanceData = state.balanceData.filter(
          (balance) => balance.id !== action.meta.arg,
        );
      })
      .addCase(deleteBalance.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balanceData = state.balanceData.map((balance) =>
          balance.id === action.payload.id ? action.payload : balance,
        );
      })
      .addCase(updateBalance.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = balanceSlice.actions;

export default balanceSlice.reducer;
