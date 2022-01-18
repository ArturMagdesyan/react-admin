import React from 'react';
import { initData } from '../../orders/constants';
import { initAlarmsFilterState } from '../constants';
import { AlarmFilterState, AlarmsResponse, AlarmType } from '../types';

export const AlarmsContext = React.createContext<{
  alarmsData: AlarmsResponse,
  filterData: AlarmFilterState,
  isFetched: boolean,
  isError: boolean,
  isLoading: boolean,
  type: AlarmType
  dispatch: React.Dispatch<any>,
}>({
  alarmsData: initData,
  filterData: initAlarmsFilterState,
  isFetched: false,
  isError: false,
  isLoading: false,
  type: 'A',
  dispatch: () => {},
});
