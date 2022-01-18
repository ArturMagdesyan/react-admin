import { useMutation, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

export const orderFullRefund = async (orderId: number) => {
  const response = await axios.post(`/orders/${orderId}/full-refund`);

  return response;
};

export const useOrderFullRefund = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orderFullRefund,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        queryClient.invalidateQueries('vendorOrders');
        queryClient.invalidateQueries('customerOrders');
      },
      onError: (err: AxiosError) => {
        const errorCode = err.response?.data.errorCode;
        const errorMap = new Map<number, string>();
        errorMap.set(400, `errors.orderActions.fullRefund.${errorCode}`);

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
