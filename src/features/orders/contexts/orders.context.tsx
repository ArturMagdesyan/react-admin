import React from 'react';
import { OrderResponse, OrderFilterState } from '../types';
import { initOrderFilterState, initData } from '../constants';

export const OrdersContext = React.createContext<{
  filters: OrderFilterState;
  data: OrderResponse,
  isFetched: boolean,
  isError: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  filters: initOrderFilterState,
  data: initData,
  isFetched: false,
  isError: false,
  isLoading: false,
  dispatch: () => {},
});
