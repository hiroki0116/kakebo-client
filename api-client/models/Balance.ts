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

enum BalanceType {
  INCOME,
  EXPENSE,
}

export type BalanceDto = {
  id?: number;
  amount?: number;
  title?: string;
  balanceType?: BalanceType;
};
