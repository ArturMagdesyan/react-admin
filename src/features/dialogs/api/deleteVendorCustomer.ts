import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const deleteVendorCustomer = async (userId: number) => {
  const response = await axios.delete(`vendors-customer/${userId}`);

  return response;
};

export const useDeleteVendorCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteVendorCustomer,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('vendorsCustomers');
      },
      onError: mutationErrorHandler,
    },
  );
};
