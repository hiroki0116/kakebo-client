import { API } from '../api-client';
import { Balance, BalanceDto } from '../models/Balance';

type BalanceRepositorty = {
  getAllBalance: () => Promise<Balance[]>;
  getBalanceById: (id: number) => Promise<Balance>;
  createBalance: (balance: BalanceDto) => Promise<Balance>;
  updateBalance: (balance: BalanceDto) => Promise<Balance>;
  deleteBalance: (id: number) => Promise<Msg>;
};

const getAllBalance = async (): Promise<Balance[]> => {
  const { data } = await API.get('/balance');
  return data;
};

const getBalanceById = async (id: number): Promise<Balance> => {
  const { data } = await API.get(`/balance/${id}`);
  return data;
};

const createBalance = async (balance: BalanceDto): Promise<Balance> => {
  const { data } = await API.post('/balance', balance);
  return data;
};

const updateBalance = async (balance: BalanceDto): Promise<Balance> => {
  const { data } = await API.patch(`/balance/${balance.id}`, balance);
  return data;
};

const deleteBalance = async (id: number): Promise<Msg> => {
  const { data } = await API.delete(`/balance/${id}`);
  return data;
};

export const balanceRepository: BalanceRepositorty = {
  getAllBalance,
  getBalanceById,
  createBalance,
  updateBalance,
  deleteBalance,
};
