import React from 'react';
import { VendorFilterState, VendorsResponse } from '../types';
import { initData, initVendorsFilterState } from '../constants';

export const VendorsContext = React.createContext<{
  vendorFilterState: VendorFilterState,
  vendorsData: VendorsResponse,
  isFetched: boolean,
  isError: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  vendorFilterState: initVendorsFilterState,
  vendorsData: initData,
  isFetched: false,
  isError: false,
  isLoading: false,
  dispatch: () => {},
});
