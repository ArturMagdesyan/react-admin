import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const lockUser = async (userId: string) => {
  const response = await axios.put(
    `/users/${userId}/lock`,
    { state: 'LOCKED' },
  );

  return response;
};

export const useLockUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    lockUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
        queryClient.invalidateQueries('vendorsCustomers');
        queryClient.invalidateQueries('vendors');
        queryClient.invalidateQueries('customers');
      },
      onError: mutationErrorHandler,
    },
  );
};
