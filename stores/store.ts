import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './balance/balanceSlice';
import balanceFormReducer from './balance/balanceFormSlice';

export const store = configureStore({
  devTools: process.env.NEXT_PUBLIC_STAGE == 'dev',
  reducer: {
    balance: balanceReducer,
    balanceForm: balanceFormReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
