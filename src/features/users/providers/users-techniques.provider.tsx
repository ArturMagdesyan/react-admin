import React from 'react';
import { UsersTechniquesContext } from '../contexts';
import { initData, initUsersTechniquesFilterState, UsersTechniquesTable } from '../constants';
import type { UsersTechniquesFilterState } from '../types';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';

function reducer(
  state: UsersTechniquesFilterState,
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

export const UsersTechniquesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initUsersTechniquesFilterState,
  );

  return (
    <UsersTechniquesContext.Provider
      value={{
        filtersState: state,
        usersTechniquesData: UsersTechniquesTable || initData,
        isError: false,
        isFetched: true,
        isLoading: false,
        dispatch,
      }}
    >
      {children}
    </UsersTechniquesContext.Provider>
  );
};
