import React from 'react';
import { BucketListResponse, BucketListFilterState, OrderDetails } from '../types';
import { initBucketListFilterData, initData } from '../constants';

export const OrderInnerContext = React.createContext<{
  filters: BucketListFilterState,
  bucketListData: BucketListResponse,
  orderDetails: OrderDetails | null,
  isLoadingDetails: boolean,
  isLoading: boolean,
  isFetched: boolean,
  isFetchedDetails: boolean,
  isError: boolean,
  isErrorDetails: boolean,
  dispatch: React.Dispatch<any>,
}>({
  filters: initBucketListFilterData,
  bucketListData: initData,
  orderDetails: null,
  isLoading: false,
  isLoadingDetails: false,
  isFetchedDetails: false,
  isFetched: false,
  isError: false,
  isErrorDetails: false,
  dispatch: () => {},
});
