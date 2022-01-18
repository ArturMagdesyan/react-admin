import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../../../app/axios';

interface Props {
  documentId: number;
  resourceId: number;
  resourceType: string,
}

const attachFile = async ({ documentId, resourceType, resourceId }: Props) => {
  const response = await axios.post(
    `documents/${documentId}/files`,
    {
      resourceId,
      resourceType,
    },
  );

  return response;
};

export const useAttachFile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    attachFile,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
        queryClient.invalidateQueries('user-documents');
      },
    },
  );
};
