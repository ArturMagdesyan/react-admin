import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../../app/axios';
import { mutationErrorHandler } from '../../../../utils/errorHandler';
import type { UserSettings } from '../../types';

interface Props {
  userId: string;
  data: UserSettings;
}

const updateUserSettings = ({ userId, data }: Props) => {
  const response = axios.put(`settings/user/${userId}`, data);

  return response;
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation(
    updateUserSettings,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSettings');
      },
      onError: mutationErrorHandler,
    },
  );
};
