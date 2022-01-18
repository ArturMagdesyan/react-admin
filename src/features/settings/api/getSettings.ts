import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type {
  SettingsFilterState,
  SettingsResponse,
} from '../types';
import { apiErrorHandler } from '../../../utils/errorHandler';

export const getSettings = async (
  { queryKey }: QueryFunctionContext<[string, SettingsFilterState]>,
): Promise<SettingsResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<SettingsResponse, SettingsResponse>(`admins?${query}`);

  return response;
};

export const useSettings = (queryParams: SettingsFilterState) => useQuery(
  ['settings', queryParams],
  getSettings,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
