import React from 'react';
import { BlockListFilterState, BlockListResponse } from '../types';
import { initBlockListFilterData } from '../../orders/constants';
import { initData } from '../constants';

export const BlockListContext = React.createContext<{
  blockListData: BlockListResponse,
  filterData: BlockListFilterState,
  isError: boolean,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  blockListData: initData,
  filterData: initBlockListFilterData,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
