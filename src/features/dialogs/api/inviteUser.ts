import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import type { UserInvitation } from '../types';

const inviteUser = async (data: UserInvitation) => {
  const response = await axios.post('admins', data);

  return response;
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    inviteUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      },
    },
  );
};
