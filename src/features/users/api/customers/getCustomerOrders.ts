import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import type {
  UserOrdersResponse,
  UserOrderFilterState,
} from '../../types';
import { convertQueryString } from '../../../../utils/convertQueryString';
import { apiErrorHandler } from '../../../../utils/errorHandler';

interface QueryKey extends UserOrderFilterState {
  customerId: number;
}

export const getCustomerOrders = async (
  { queryKey }: QueryFunctionContext,
): Promise<UserOrdersResponse> => {
  const [, queryParams] = queryKey;
  const { customerId, ...filterKeys } = queryParams as QueryKey;
  const query = convertQueryString(filterKeys);
  // TODO: remove in API symbol '+' when server finish API with id
  const response = await axios.get<UserOrdersResponse, UserOrdersResponse>(`customers/+${customerId}/orders?${query}`);

  return response;
};

export const useCustomerOrders = (
  customerId: number,
  filterState: UserOrderFilterState,
) => useQuery(
  ['customerOrders', { customerId, ...filterState }],
  getCustomerOrders,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
