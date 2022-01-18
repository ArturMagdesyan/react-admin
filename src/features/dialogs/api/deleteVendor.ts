import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const deleteVendor = async (userId: number) => {
  const response = await axios.delete(`vendors/${userId}`);

  return response;
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteVendor,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('vendors');
      },
      onError: mutationErrorHandler,
    },
  );
};
