import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../app/axios';
import { BucketListFilterState, BucketListResponse } from '../types';
import { convertQueryString } from '../../../utils/convertQueryString';
import { apiErrorHandler } from '../../../utils/errorHandler';

interface QueryKey extends BucketListFilterState {
  orderId: number;
}

export const getBucketList = async (
  { queryKey }: QueryFunctionContext,
): Promise<BucketListResponse> => {
  const [, queryParams] = queryKey;
  const { orderId, ...filterKeys } = queryParams as QueryKey;
  const query = convertQueryString(filterKeys);

  const response = await axios.get<BucketListResponse, BucketListResponse>(`orders/${orderId}/bucket-list?${query}`);

  return response;
};

export const useBucketList = (
  queryParams: BucketListFilterState,
  orderId: string,
) => useQuery(
  ['bucketList', { orderId, ...queryParams }],
  getBucketList,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
