import React, { useReducer } from 'react';
import { TableFilterAction } from '../../../common/enums';
import { getOrderType } from '../../../utils/getOrderType';
import type { ReducerAction } from '../../../common/types';
import { useSettings } from '../api';
import { initData, initSettingsFilterState } from '../constants';
import { SettingsContext } from '../contexts';
import type { SettingsFilterState } from '../types';

function reducer(
  state: SettingsFilterState,
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
    case TableFilterAction.ADD_CURRENT_PAGE: {
      return {
        ...state,
        page: action.value,
      };
    }
    case TableFilterAction.ADD_CURRENT_PAGE_SIZE: {
      return {
        ...state,
        size: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export const SettingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initSettingsFilterState,
  );
  const {
    data,
    isFetched,
    isError,
    isLoading,
  } = useSettings(state);

  return (
    <SettingsContext.Provider
      value={{
        filterState: state,
        settingsData: data || initData,
        isError,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
