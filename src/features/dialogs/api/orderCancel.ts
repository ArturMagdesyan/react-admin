import { useMutation, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

const orderCancel = async (orderId: number) => {
  const response = await axios.post(`/orders/${orderId}/cancel`);

  return response;
};

export const useOrderCancel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orderCancel,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        queryClient.invalidateQueries('vendorOrders');
        queryClient.invalidateQueries('customerOrders');
      },
      onError: (err: AxiosError) => {
        const errorMap = new Map<number, string>();
        errorMap.set(400, 'errors.orderActions.cancel');

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
