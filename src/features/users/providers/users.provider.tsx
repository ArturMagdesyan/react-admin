import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UsersContext } from '../contexts';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import { initUsersFilterState } from '../constants';
import type { UsersFilterState } from '../types';

function reducer(
  state: UsersFilterState,
  action: ReducerAction,
) {
  switch (action.type) {
    case TableFilterAction.ADD_TECHNIQUE_IDS: {
      return {
        ...state,
        techniqueIds: action.value,
      };
    }
    case TableFilterAction.ADD_DATE_RANGE: {
      return {
        ...state,
        startDate: action.value.startDate,
        endDate: action.value.endDate,
      };
    }
    case TableFilterAction.INIT_STATE: {
      return action.value;
    }
    default:
      return state;
  }
}

export const UsersProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const [state, dispatch] = React.useReducer(
    reducer,
    initUsersFilterState,
  );

  useEffect(() => {
    dispatch({ type: TableFilterAction.INIT_STATE, value: initUsersFilterState });
  }, [location.pathname]);

  return (
    <UsersContext.Provider
      value={{
        dispatch,
        filterData: state,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
