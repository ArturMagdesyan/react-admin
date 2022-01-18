import { QueryFunctionContext, useQuery } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type { AlarmFilterState, AlarmsResponse, AlarmType } from '../types';
import { apiErrorHandler } from '../../../utils/errorHandler';

export const getAlarms = async (
  { queryKey }: QueryFunctionContext<[string, AlarmType, AlarmFilterState]>,
): Promise<AlarmsResponse> => {
  const [, type, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<AlarmsResponse, AlarmsResponse>(`alarms/${type.toLowerCase()}?${query}`);

  return response;
};

export const useAlarms = (type: AlarmType, queryParams: AlarmFilterState) => useQuery(
  ['alarms', type, queryParams],
  getAlarms,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
