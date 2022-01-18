import { useMutation, useQueryClient } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: number;
  tin: string;
  bic: string;
  primary: boolean;
  settlementAccount: string;
}

const addOrganization = async (data: Props) => {
  const response = await axios.post('companies', data);

  return response;
};

export const useAddOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation(
    addOrganization,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('companies');
      },
      onError: (err: AxiosError) => {
        const errorMap = new Map<number, string>();
        errorMap.set(400, 'addOrganization.companyAlreadyExists');

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
