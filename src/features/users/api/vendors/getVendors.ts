import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type {
  VendorFilterState,
  VendorsResponse,
} from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getVendors = async ({ queryKey }: QueryFunctionContext): Promise<VendorsResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<VendorsResponse, VendorsResponse>(`vendors?${query}`);

  return response;
};

export const useVendors = (queryParams: VendorFilterState) => useQuery(
  ['vendors', queryParams],
  getVendors,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
