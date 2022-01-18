import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { UserRole } from '../../../common/enums';
import { mutationErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: number;
  data: {
    roleName?: UserRole;
    enabled?: boolean;
  };
}

const updateSettings = ({ userId, data }: Props) => {
  const response = axios.patch(`admins/${userId}`, data);

  return response;
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation(
    updateSettings,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      },
      onError: mutationErrorHandler,
    },
  );
};
