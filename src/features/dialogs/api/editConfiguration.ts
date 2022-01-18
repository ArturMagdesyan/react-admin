import { useMutation, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

export interface EditData {
  comment?: string;
  value?: number | string;
}

export interface EditConfigurationMutate {
  configurationKey: string;
  data: EditData;
}

const editConfiguration = async ({
  configurationKey,
  data,
}: EditConfigurationMutate) => {
  const response = await axios.patch(
    `/configurations/${configurationKey}`,
    data,
  );

  return response;
};

export const useEditConfiguration = () => {
  const queryClient = useQueryClient();

  return useMutation(
    editConfiguration,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('configurations');
      },
      onError: (err: AxiosError) => {
        const errorMap = new Map<number, string>();
        errorMap.set(400, 'errors.dataNotFound');

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
