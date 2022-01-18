import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';
import type { AssignVendorError } from '../types';

interface Props {
  orderId: number;
  phones: string[];
}

const assignVendors = async ({
  orderId,
  phones,
}: Props): Promise<AssignVendorError[]> => {
  const formattedPhones = phones.filter((phone) => phone.length).map((phone) => (`+7${phone}`));
  const response = await axios.post<AssignVendorError[], AssignVendorError[]>(
    `/orders/${orderId}/bucket-list/assign-vendors`,
    { phones: formattedPhones },
  );

  return response;
};

export const useAssignVendors = () => {
  const queryClient = useQueryClient();

  return useMutation(
    assignVendors,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bucketList');
      },
      onError: (err: AxiosError) => {
        const errorCode = err.response?.data.errorCode;
        const errorMap = new Map<number, string>();
        errorMap.set(400, `errors.assignVendors.${errorCode}`);

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
