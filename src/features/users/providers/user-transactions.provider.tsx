import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { UserTransactionsContext } from '../contexts';
import { initData, initUserTransactionsFilterState } from '../constants';
import type { UserTransactionFilterState } from '../types';
import { TableFilterAction } from '../../../common/enums';
import { getOrderType } from '../../../utils/getOrderType';
import { useUserTransactions } from '../api';

interface Action {
  type: TableFilterAction;
  value: any;
}

const reducer = (
  state: UserTransactionFilterState,
  action: Action,
) => {
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
};

export const UserTransactionsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initUserTransactionsFilterState,
  );
  const { userId } = useParams();
  const {
    data,
    isFetched,
    isLoading,
  } = useUserTransactions(userId!, state);

  return (
    <UserTransactionsContext.Provider
      value={{
        userTransactionsData: data || initData,
        filterData: state,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </UserTransactionsContext.Provider>
  );
};
