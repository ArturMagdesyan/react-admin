import React, { useCallback } from 'react';
import { ConfigurationsContext } from '../contexts';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import { initConfigurationsFilterState, initData } from '../constants';
import { ConfigurationsFilterState, ConfigurationsResponse } from '../types';
import { useConfigurations } from '../api';

function reducer(
  state: ConfigurationsFilterState,
  action: ReducerAction,
) {
  switch (action.type) {
    case TableFilterAction.ADD_TECHNIQUE_IDS: {
      return {
        ...state,
        truckId: action.value,
      };
    }
    case TableFilterAction.ADD_FILTER: {
      return {
        ...state,
        [action.value.key]: action.value.value,
      };
    }
    default:
      return state;
  }
}

export const ConfigurationsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initConfigurationsFilterState,
  );
  const {
    data,
    isError,
    isLoading,
  } = useConfigurations(state.truckId);

  const filteredData = useCallback((): ConfigurationsResponse | undefined => {
    if (!data) return undefined;

    return {
      total: data.total,
      content: data.content.filter((configuration) => (
        !state.title ? true : configuration.title.search(state.title) > -1
      ) && (
        !state.value ? true : configuration.value.search(state.value) > -1
      )),
    };
  }, [
    data,
    state.title,
    state.value,
  ]);

  return (
    <ConfigurationsContext.Provider
      value={{
        filtersState: state,
        configurationsData: filteredData() || initData,
        isError,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </ConfigurationsContext.Provider>
  );
};
