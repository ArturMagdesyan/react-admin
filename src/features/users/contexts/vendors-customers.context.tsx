import React from 'react';
import { VendorsCustomersFilterState, VendorsCustomersResponse } from '../types';
import { initData, initVendorsCustomerFilterState } from '../constants';

export const VendorsCustomersContext = React.createContext<{
  vendorsCustomersData: VendorsCustomersResponse,
  filtersState: VendorsCustomersFilterState,
  isError: boolean,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  vendorsCustomersData: initData,
  filtersState: initVendorsCustomerFilterState,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
