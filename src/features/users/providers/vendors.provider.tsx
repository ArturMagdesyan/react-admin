import React, { useContext, useEffect } from 'react';
import { UsersContext, VendorsContext } from '../contexts';
import { useVendors } from '../api';
import { initData, initVendorsFilterState } from '../constants';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import type { VendorFilterState } from '../types';
import { getOrderType } from '../../../utils/getOrderType';

function reducer(
  state: VendorFilterState,
  action: ReducerAction,
) {
  switch (action.type) {
    case TableFilterAction.ADD_FILTER: {
      return {
        ...state,
        page: 0,
        [action.value.key]: action.value.value,
      };
    }
    case TableFilterAction.ADD_SORT: {
      return {
        ...state,
        orderColumn: action.value,
        orderType: getOrderType({
          orderType: state.orderType,
          orderColumn: state.orderColumn,
          newOrderColumn: action.value,
        }),
      };
    }
    case TableFilterAction.ADD_PARENT_FILTER_DATA: {
      return {
        ...state,
        ...action.value,
      };
    }
    case TableFilterAction.ADD_CURRENT_PAGE_SIZE: {
      return {
        ...state,
        size: action.value,
      };
    }
    case TableFilterAction.ADD_CURRENT_PAGE: {
      return {
        ...state,
        page: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export const VendorsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initVendorsFilterState,
  );
  const { filterData } = useContext(UsersContext);
  const {
    data: vendorsData,
    isFetched,
    isError,
    isLoading,
  } = useVendors(state);

  useEffect(() => {
    dispatch({ type: TableFilterAction.ADD_PARENT_FILTER_DATA, value: filterData });
  }, [filterData]);

  return (
    <VendorsContext.Provider
      value={{
        vendorFilterState: state,
        vendorsData: vendorsData || initData,
        isFetched,
        isError,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </VendorsContext.Provider>
  );
};
