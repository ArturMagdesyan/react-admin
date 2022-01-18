import React, { useContext, useEffect } from 'react';
import { UsersContext, VendorsCustomersContext } from '../contexts';
import { useVendorsCustomers } from '../api';
import {
  initData,
  initVendorsCustomerFilterState,
} from '../constants';
import type { VendorsCustomersFilterState } from '../types';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import { getOrderType } from '../../../utils/getOrderType';

function reducer(
  state: VendorsCustomersFilterState,
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

export const VendorsCustomersProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initVendorsCustomerFilterState,
  );
  const { filterData } = useContext(UsersContext);
  const {
    data,
    isFetched,
    isError,
    isLoading,
  } = useVendorsCustomers(state);

  useEffect(() => {
    dispatch({ type: TableFilterAction.ADD_PARENT_FILTER_DATA, value: filterData });
  }, [filterData]);

  return (
    <VendorsCustomersContext.Provider
      value={{
        filtersState: state,
        vendorsCustomersData: data || initData,
        isError,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </VendorsCustomersContext.Provider>
  );
};
