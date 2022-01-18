import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../../app/axios';
import { mutationErrorHandler } from '../../../../utils/errorHandler';

export interface UpdateBlockListComment {
  id: number;
  comment: string;
}

const updateBlockListComment = async ({
  id,
  comment,
}: UpdateBlockListComment) => {
  const response = await axios.put(
    `/block-list/${id}/comment`,
    { comment },
  );

  return response;
};

export const useUpdateBlockListComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    updateBlockListComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blockList');
      },
      onError: mutationErrorHandler,
    },
  );
};
