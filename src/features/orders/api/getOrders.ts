import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../app/axios';
import {
  OrderResponse,
  OrderFilterState,
} from '../types';
import { convertQueryString } from '../../../utils/convertQueryString';
import { apiErrorHandler } from '../../../utils/errorHandler';

export const getOrders = async ({ queryKey }: QueryFunctionContext): Promise<OrderResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<OrderResponse, OrderResponse>(`orders?${query}`);

  return response;
};

export const useOrders = (queryParams: OrderFilterState) => useQuery(
  ['orders', queryParams],
  getOrders,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
