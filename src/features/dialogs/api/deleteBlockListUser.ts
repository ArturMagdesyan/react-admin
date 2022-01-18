import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const deleteBlockListUser = async (userId: string) => {
  const response = await axios.delete(`users/${userId}/delete`);

  return response;
};

export const useDeleteBlockListUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteBlockListUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blockList');
      },
      onError: mutationErrorHandler,
    },
  );
};
