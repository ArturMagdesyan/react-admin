import React, { useContext, useEffect, useReducer } from 'react';
import { BlockListContext, UsersContext } from '../contexts';
import { initBlockListFilterData } from '../../orders/constants';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import { getOrderType } from '../../../utils/getOrderType';
import { BlockListFilterState } from '../types';
import { useBlockList } from '../api';
import { initData } from '../constants';

function reducer(
  state: BlockListFilterState,
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

export const BlockListProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initBlockListFilterData);
  const { filterData } = useContext(UsersContext);
  const {
    data,
    isFetched,
    isError,
    isLoading,
  } = useBlockList(state);

  useEffect(() => {
    dispatch({ type: TableFilterAction.ADD_PARENT_FILTER_DATA, value: filterData });
  }, [filterData]);

  return (
    <BlockListContext.Provider
      value={{
        blockListData: data || initData,
        filterData: state,
        isError,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </BlockListContext.Provider>
  );
};
