import React from 'react';
import { UsersFilterState } from '../types';
import { initUsersFilterState } from '../constants';

export const UsersContext = React.createContext<{
  filterData: UsersFilterState,
  dispatch: React.Dispatch<any>,
}>({
  filterData: initUsersFilterState,
  dispatch: () => {},
});
