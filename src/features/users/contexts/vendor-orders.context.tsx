import React from 'react';
import { UserOrdersResponse, UserOrderFilterState } from '../types';
import { initData, initUserOrderFilterState } from '../constants';

export const VendorOrdersContext = React.createContext<{
  vendorOrdersData: UserOrdersResponse,
  dispatch: React.Dispatch<any>,
  isFetched: boolean,
  isError: boolean,
  isLoading: boolean,
  vendorOrdersFilterState: UserOrderFilterState,
}>({
  vendorOrdersData: initData,
  vendorOrdersFilterState: initUserOrderFilterState,
  isFetched: false,
  isError: false,
  isLoading: false,
  dispatch: () => {},
});
