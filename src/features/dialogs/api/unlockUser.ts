import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const unlockUser = async (userId: string) => {
  const response = await axios.put(
    `/users/${userId}/unlock`,
    { state: 'UNLOCKED' },
  );

  return response;
};

export const useUnlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    unlockUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
        queryClient.invalidateQueries('vendorsCustomers');
        queryClient.invalidateQueries('vendors');
        queryClient.invalidateQueries('customers');
        queryClient.invalidateQueries('blockList');
      },
      onError: mutationErrorHandler,
    },
  );
};
