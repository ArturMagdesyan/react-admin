import React from 'react';
import type {
  UsersTechniquesFilterState,
  UsersTechniquesResponse,
} from '../types';
import {
  initData,
  initUsersTechniquesFilterState,
} from '../constants';

export const UsersTechniquesContext = React.createContext<{
  usersTechniquesData: UsersTechniquesResponse,
  filtersState: UsersTechniquesFilterState,
  isError: boolean,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  usersTechniquesData: initData,
  filtersState: initUsersTechniquesFilterState,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
