import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const deleteNotification = async (id: number) => {
  const response = await axios.delete(`notifications/${id}`);

  return response;
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteNotification,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
      onError: mutationErrorHandler,
    },
  );
};
