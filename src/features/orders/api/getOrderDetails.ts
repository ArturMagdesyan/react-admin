import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../app/axios';
import { OrderDetails } from '../types';
import { apiErrorHandler } from '../../../utils/errorHandler';

export const getOrderDetails = async (
  { queryKey }: QueryFunctionContext,
): Promise<OrderDetails> => {
  const [, { orderId }] = queryKey as [string, { orderId: number }];
  const response = await axios.get<OrderDetails, OrderDetails>(`orders/${orderId}/details`);

  return response;
};

export const useOrderDetails = (orderId: string) => useQuery(
  ['orderDetails', { orderId }],
  getOrderDetails,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
