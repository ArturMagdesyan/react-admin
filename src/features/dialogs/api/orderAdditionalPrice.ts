import { useMutation, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

interface Props {
  orderId: number;
  amount: number;
}

const orderAdditionalPrice = async ({
  orderId,
  amount,
}: Props) => {
  const response = await axios.post(
    `/orders/${orderId}/price`,
    { amount },
  );

  return response;
};

export const useOrderAdditionalPrice = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orderAdditionalPrice,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        queryClient.invalidateQueries('vendorOrders');
        queryClient.invalidateQueries('customerOrders');
        queryClient.invalidateQueries('documents');
        queryClient.invalidateQueries('userDocuments');
      },
      onError: (err: AxiosError) => {
        const errorMap = new Map<number, string>();
        errorMap.set(400, 'errors.orderActions.additionalPrice');

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
