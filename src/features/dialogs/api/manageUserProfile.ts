import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../app/axios';
import { mutationErrorHandler } from '../../../utils/errorHandler';
import type { UserManageType } from '../types';

export interface ManageUserProfileMutation {
  username: string;
  data: number;
  type: UserManageType;
}

const manageUserProfile = async ({
  username,
  type,
  data,
}: ManageUserProfileMutation) => {
  const response = await axios.patch(
    `/users/${username}/profile`,
    { [type]: data },
  );

  return response;
};

export const useManageUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    manageUserProfile,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
      },
      onError: mutationErrorHandler,
    },
  );
};
