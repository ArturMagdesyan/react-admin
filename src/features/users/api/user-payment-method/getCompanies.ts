import { QueryFunctionContext, useQuery } from 'react-query';
import axios from '../../../../app/axios';
import type { UserCompanyResponse } from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getCompanies = async (
  { queryKey }: QueryFunctionContext<[string, string]>,
): Promise<UserCompanyResponse[]> => {
  const [, userId] = queryKey;
  const response = await axios.get<UserCompanyResponse[], UserCompanyResponse[]>(`companies/user/${userId}`);

  return response;
};

export const useGetCompany = (userId: string) => useQuery(
  ['companies', userId],
  getCompanies,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
