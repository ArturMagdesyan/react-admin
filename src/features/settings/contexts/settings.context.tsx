import React from 'react';
import { initData, initSettingsFilterState } from '../constants';
import type { SettingsFilterState, SettingsResponse } from '../types';

export const SettingsContext = React.createContext<{
  filterState: SettingsFilterState,
  settingsData: SettingsResponse,
  isFetched: boolean,
  isError: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  filterState: initSettingsFilterState,
  settingsData: initData,
  isFetched: false,
  isError: false,
  isLoading: false,
  dispatch: () => {},
});
