import React from 'react';
import { ConfigurationsFilterState, ConfigurationsResponse } from '../types';
import { initConfigurationsFilterState, initData } from '../constants';

export const ConfigurationsContext = React.createContext<{
  filtersState: ConfigurationsFilterState,
  configurationsData: ConfigurationsResponse,
  isError: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  filtersState: initConfigurationsFilterState,
  configurationsData: initData,
  isError: false,
  isLoading: false,
  dispatch: () => {},
});
