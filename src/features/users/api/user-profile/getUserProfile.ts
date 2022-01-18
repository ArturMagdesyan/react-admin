import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import type { UserProfile } from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getUserProfile = async (
  { queryKey }: QueryFunctionContext,
): Promise<UserProfile> => {
  const [, { userId }] = queryKey as [string, { userId: number }];
  const response = await axios.get<UserProfile, UserProfile>(`users/${userId}/profile`);

  return response;
};

export const useUserProfile = (userId: string) => useQuery(
  ['userProfile', { userId }],
  getUserProfile,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
