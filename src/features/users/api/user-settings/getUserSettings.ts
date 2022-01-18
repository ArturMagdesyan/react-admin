import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import type { UserSettings } from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getUserSettings = async (
  { queryKey }: QueryFunctionContext<[string, string]>,
): Promise<UserSettings> => {
  const [, userId] = queryKey;
  const response = await axios.get<UserSettings, UserSettings>(`/settings/user/${userId}`);

  return response;
};

export const useGetUserSettings = (userId: string) => useQuery(
  ['userSettings', userId],
  getUserSettings,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
