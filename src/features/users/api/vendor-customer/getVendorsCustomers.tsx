import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type {
  VendorsCustomersFilterState,
  VendorsCustomersResponse,
} from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getVendorsCustomers = async (
  { queryKey }: QueryFunctionContext,
): Promise<VendorsCustomersResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<VendorsCustomersResponse, VendorsCustomersResponse>(
    `vendor-customers?${query}`,
  );

  return response;
};

export const useVendorsCustomers = (
  queryParams: VendorsCustomersFilterState,
) => useQuery(
  ['vendorsCustomers', queryParams],
  getVendorsCustomers,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
