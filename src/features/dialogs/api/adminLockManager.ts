import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: number;
  enabled: boolean;
}

const adminLockManager = async ({ userId, enabled }: Props) => {
  const response = await axios.patch(`admins/${userId}`, { enabled });

  return response;
};

export const useAdminLockManager = () => {
  const queryClient = useQueryClient();

  return useMutation(
    adminLockManager,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      },
      onError: mutationErrorHandler,
    },
  );
};
