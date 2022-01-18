import React from 'react';
import { UserOrderFilterState, UserOrdersResponse } from '../types';
import { initData, initUserOrderFilterState } from '../constants';

export const CustomerOrdersContext = React.createContext<{
  customerOrdersData: UserOrdersResponse,
  orderFilterState: UserOrderFilterState,
  isError: boolean,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  customerOrdersData: initData,
  orderFilterState: initUserOrderFilterState,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
