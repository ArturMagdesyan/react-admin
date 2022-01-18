import React from 'react';
import {
  UserTransactionFilterState,
  UserTransactionResponse,
} from '../types';
import { initData, initUserTransactionsFilterState } from '../constants';

export const UserTransactionsContext = React.createContext<{
  userTransactionsData: UserTransactionResponse,
  filterData: UserTransactionFilterState,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  userTransactionsData: initData,
  filterData: initUserTransactionsFilterState,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
