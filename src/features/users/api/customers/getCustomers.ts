import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type {
  CustomerFilterState,
  CustomersResponse,
} from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getCustomers = async (
  { queryKey }: QueryFunctionContext,
): Promise<CustomersResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<CustomersResponse, CustomersResponse>(`customers?${query}`);

  return response;
};

export const useCustomers = (queryParams: CustomerFilterState) => useQuery(
  ['customers', queryParams],
  getCustomers,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
