import React, { useContext, useEffect } from 'react';
import { CustomersContext, UsersContext } from '../contexts';
import type { CustomerFilterState } from '../types';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import { initCustomersFilterState, initData } from '../constants';
import { useCustomers } from '../api';
import { getOrderType } from '../../../utils/getOrderType';

function reducer(
  state: CustomerFilterState,
  action: ReducerAction,
) {
  switch (action.type) {
    case TableFilterAction.ADD_FILTER: {
      return {
        ...state,
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
      const { startDate, endDate } = action.value;
      return {
        ...state,
        startDate,
        endDate,
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

export const CustomersProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initCustomersFilterState,
  );
  const { filterData } = useContext(UsersContext);
  const {
    data,
    isFetched,
    isError,
    isLoading,
  } = useCustomers(state);

  useEffect(() => {
    dispatch({ type: TableFilterAction.ADD_PARENT_FILTER_DATA, value: filterData });
  }, [filterData]);

  return (
    <CustomersContext.Provider
      value={{
        filterData: state,
        customersDate: data || initData,
        isFetched,
        isError,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
