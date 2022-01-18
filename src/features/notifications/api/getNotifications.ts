import { QueryFunctionContext, useQuery } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type { NotificationResponse, NotificationsFilterState } from '../types';
import { apiErrorHandler } from '../../../utils/errorHandler';

const getNotifications = async (
  { queryKey }: QueryFunctionContext<[string, NotificationsFilterState]>,
): Promise<NotificationResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<NotificationResponse, NotificationResponse>(`notifications?${query}`);

  return response;
};

export const useNotifications = (queryParams: NotificationsFilterState) => useQuery(
  ['notifications', queryParams],
  getNotifications,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
