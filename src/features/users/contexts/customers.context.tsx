import React from 'react';
import { initCustomersFilterState, initData } from '../constants';
import { CustomerFilterState, CustomersResponse } from '../types';

export const CustomersContext = React.createContext<{
  filterData: CustomerFilterState,
  customersDate: CustomersResponse,
  isError: boolean,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  filterData: initCustomersFilterState,
  customersDate: initData,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
