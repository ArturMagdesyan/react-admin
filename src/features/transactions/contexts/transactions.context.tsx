import React from 'react';
import { initData, initTransactionsFilterState } from '../constants';
import type { TransactionFilterState, TransactionsResponse } from '../types';

export const TransactionsContext = React.createContext<{
  transactionsData: TransactionsResponse,
  filterData: TransactionFilterState,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  transactionsData: initData,
  filterData: initTransactionsFilterState,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
