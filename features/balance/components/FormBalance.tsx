// redux
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores/store';
import {
  BalanceState,
  addBalance,
  updateBalance,
} from '@/stores/balance/balanceSlice';
// third parties
import { BalanceType } from '@/api-client/models/Balance';
import { Button, Select, TextInput } from '@mantine/core';
import {
  clearBalanceForm,
  setBalanceForm,
} from '@/stores/balance/balanceFormSlice';
const FormBalance = () => {
  const dispatch: ThunkDispatch<BalanceState, void, AnyAction> = useDispatch();
  const { loading } = useSelector((state: RootState) => state.balance);
  const balanceForm = useSelector((state: RootState) => state.balanceForm);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (balanceForm.id != 0) {
      dispatch(updateBalance(balanceForm));
    } else {
      dispatch(addBalance(balanceForm));
    }
    dispatch(clearBalanceForm());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded border border-gray-400 p-5"
    >
      <p className="text-center font-bold text-gray-400">
        {balanceForm.id != 0 ? 'Update Item' : 'New Item'}
      </p>
      <TextInput
        mt="md"
        id="title"
        label="Title"
        value={balanceForm.title || ''}
        name="title"
        placeholder="eg. Groceries"
        onChange={(e) =>
          dispatch(setBalanceForm({ ...balanceForm, title: e.target.value }))
        }
      />
      <TextInput
        mt="md"
        id="amount"
        name="amount"
        label="Amount"
        placeholder="$"
        type="number"
        value={balanceForm.amount}
        onChange={(e) =>
          dispatch(
            setBalanceForm({
              ...balanceForm,
              amount: parseInt(e.target.value),
            }),
          )
        }
      />
      <Select
        mt="md"
        id="balanceType"
        name="balanceType"
        label="Balance Type"
        value={balanceForm.balanceType || BalanceType.EXPENSE}
        data={[
          { value: BalanceType.EXPENSE, label: BalanceType.EXPENSE },
          { value: BalanceType.INCOME, label: BalanceType.INCOME },
        ]}
        onChange={(value) => {
          dispatch(
            setBalanceForm({
              ...balanceForm,
              balanceType: value,
            }),
          );
        }}
      />
      <Button
        mt="md"
        type="submit"
        variant="light"
        color="cyan"
        fullWidth
        radius="md"
        loading={loading}
      >
        {balanceForm.id != 0 ? 'Update' : 'Add'}
      </Button>
      <hr className="mx-auto my-3 w-20" />
      <Button
        mt="md"
        variant="light"
        fullWidth
        radius="md"
        onClick={() => dispatch(clearBalanceForm())}
      >
        Clear
      </Button>
    </form>
  );
};

export default FormBalance;
