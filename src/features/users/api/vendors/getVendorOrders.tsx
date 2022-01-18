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
  vendorId: number;
}

export const getVendorOrders = async (
  { queryKey }: QueryFunctionContext,
): Promise<UserOrdersResponse> => {
  const [, queryParams] = queryKey;
  const { vendorId, ...filterKeys } = queryParams as QueryKey;
  const query = convertQueryString(filterKeys);
  // TODO: remove in API symbol '+' when server finish API with id
  const response = await axios.get<UserOrdersResponse, UserOrdersResponse>(`vendors/+${vendorId}/orders?${query}`);

  return response;
};

export const useVendorOrders = (
  vendorId: number,
  filterState: UserOrderFilterState,
) => useQuery(
  ['vendorOrders', { vendorId, ...filterState }],
  getVendorOrders,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
