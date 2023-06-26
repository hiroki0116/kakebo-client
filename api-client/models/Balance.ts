import { Dayjs } from 'dayjs';

export type Balance = {
  id: number;
  amount: number;
  title: string;
  balanceType: BalanceType;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  userId: number;
};

export enum BalanceType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type BalanceDto = {
  id?: number;
  amount?: number;
  title?: string;
  balanceType?: BalanceType;
};
