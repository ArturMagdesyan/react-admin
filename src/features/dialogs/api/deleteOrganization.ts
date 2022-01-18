import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: number;
  tin: string;
}

const deleteOrganization = async (data: Props) => {
  const response = await axios.delete('companies', { data });

  return response;
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deleteOrganization,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('companies');
      },
      onError: mutationErrorHandler,
    },
  );
};
