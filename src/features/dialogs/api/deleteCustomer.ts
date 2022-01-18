import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const deleteCustomer = async (userId: number) => {
  const response = await axios.delete(`customers/${userId}`);

  return response;
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteCustomer,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('customers');
      },
      onError: mutationErrorHandler,
    },
  );
};
