import {
  useMutation,
  useQueryClient,
} from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: string;
  phoneNumbers: string[];
}

const deletePhoneNumbers = async ({ userId, phoneNumbers }: Props) => {
  const response = await axios.delete(
    `users/${userId}/delete-additional-phone-number`,
    { data: phoneNumbers },
  );

  return response;
};

export const useDeletePhoneNumbers = () => {
  const queryClient = useQueryClient();

  return useMutation(
    deletePhoneNumbers,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
      },
      onError: mutationErrorHandler,
    },
  );
};
