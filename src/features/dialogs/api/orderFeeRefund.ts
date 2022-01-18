import { useMutation, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

const orderFeeRefund = async (orderId: number) => {
  const response = await axios.post(`/orders/${orderId}/fee-refund`);

  return response;
};

export const useOrderFeeRefund = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orderFeeRefund,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        queryClient.invalidateQueries('vendorOrders');
        queryClient.invalidateQueries('customerOrders');
      },
      onError: (err: AxiosError) => {
        const errorCode = err.response?.data.errorCode;
        const errorMap = new Map<number, string>();
        errorMap.set(400, `errors.orderActions.feeRefund.${errorCode}`);

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
