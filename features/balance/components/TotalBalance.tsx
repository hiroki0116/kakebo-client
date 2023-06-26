import { useEffect } from 'react';
// redux
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores/store';
import {
  BalanceState,
  getAllBalance,
  deleteBalance,
} from '@/stores/balance/balanceSlice';
import { setBalanceForm } from '@/stores/balance/balanceFormSlice';
// third parties
import { Card, Badge, Loader } from '@mantine/core';
import NoData from '../elements/NoData';
import { camelCaseAll } from '@/utils/formatter';
import { BalanceType } from '@/api-client/models/Balance';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';

const TotalBalance = () => {
  const dispatch: ThunkDispatch<BalanceState, void, AnyAction> = useDispatch();
  const { balanceData, loading } = useSelector(
    (state: RootState) => state.balance,
  );

  useEffect(() => {
    dispatch(getAllBalance());
  }, [dispatch]);

  if (loading) return <Loader color="cyan" />;
  return (
    <>
      {balanceData.length > 0 ? (
        <div className="grid grid-cols-4 gap-5 rounded border border-gray-400 p-5 shadow">
          {balanceData.map((balance) => (
            <Card
              key={balance.id}
              className={`rounded text-center ${
                balance.balanceType === BalanceType.INCOME
                  ? 'bg-cyan-500/50'
                  : 'bg-red-500/50'
              }`}
              shadow="lg"
              radius="sm"
            >
              <p className="font-bold">{camelCaseAll(balance?.title || '')}</p>
              <p className="py-5 text-2xl font-bold">${balance.amount}</p>
              <Badge
                color={
                  balance.balanceType === BalanceType.INCOME ? 'cyan' : 'red'
                }
                variant="filled"
              >
                {balance.balanceType}
              </Badge>
              <hr className="my-3 text-gray-400 " />
              <div className="flex justify-center gap-5">
                <TrashIcon
                  className="h-5 w-5 hover:scale-110 hover:cursor-pointer"
                  onClick={() => dispatch(deleteBalance(balance.id))}
                />
                <span className="text-gray-400">|</span>
                <PencilIcon
                  className="h-5 w-5 hover:scale-110 hover:cursor-pointer"
                  onClick={() => dispatch(setBalanceForm(balance))}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TotalBalance;
