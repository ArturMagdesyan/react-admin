import { QueryFunctionContext, useQuery } from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type {
  UserTransactionFilterState,
  UserTransactionResponse,
} from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getUserTransactions = async (
  { queryKey }: QueryFunctionContext<[string, string, UserTransactionFilterState]>,
): Promise<UserTransactionResponse> => {
  const [, userId, queryParams] = queryKey;
  const query = convertQueryString(queryParams);
  const response = await axios.get<UserTransactionResponse, UserTransactionResponse>(`users/${userId}/transactions?${query}`);

  return response;
};

export const useUserTransactions = (
  userId: string,
  filterState: UserTransactionFilterState,
) => useQuery(
  ['userTransactions', userId, filterState],
  getUserTransactions,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
