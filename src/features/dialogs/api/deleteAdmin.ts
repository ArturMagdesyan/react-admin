import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const deleteAdmin = async (id: number) => {
  const response = await axios.delete(`admins/${id}`);

  return response;
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteAdmin,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        queryClient.invalidateQueries('blockList');
      },
      onError: mutationErrorHandler,
    },
  );
};
