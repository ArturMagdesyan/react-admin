import React from 'react';
import { NotificationResponse, NotificationsFilterState } from '../types';
import { initialData, initialNotificationsFilterState } from '../constants';

export const NotificationsContext = React.createContext<{
  notificationData: NotificationResponse,
  filterData: NotificationsFilterState,
  isError: boolean,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  notificationData: initialData,
  filterData: initialNotificationsFilterState,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
