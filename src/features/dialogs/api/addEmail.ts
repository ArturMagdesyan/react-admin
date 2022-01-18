import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: string;
  email: string;
}

const addEmail = async ({ userId, email }: Props) => {
  const response = await axios.put(`user/${userId}/email`, { email });

  return response;
};

export const useAddEmail = () => {
  const queryClient = useQueryClient();

  return useMutation(
    addEmail,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
      },
      onError: mutationErrorHandler,
    },
  );
};
