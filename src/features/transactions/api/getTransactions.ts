import { QueryFunctionContext, useQuery } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type { TransactionFilterState, TransactionsResponse } from '../types';
import { apiErrorHandler } from '../../../utils/errorHandler';

export const getTransactions = async (
  { queryKey }: QueryFunctionContext<[string, TransactionFilterState]>,
): Promise<TransactionsResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);
  const response = await axios.get<TransactionsResponse, TransactionsResponse>(`transactions?${query}`);

  return response;
};

export const useTransactions = (queryParams: TransactionFilterState) => useQuery(
  ['transactions', queryParams],
  getTransactions,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
