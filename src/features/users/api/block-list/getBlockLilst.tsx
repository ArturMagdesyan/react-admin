import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type {
  BlockListResponse,
  BlockListFilterState,
} from '../../types';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getBlockList = async (
  { queryKey }: QueryFunctionContext,
): Promise<BlockListResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);

  const response = await axios.get<BlockListResponse, BlockListResponse>(`block-list?${query}`);

  return response;
};

export const useBlockList = (queryParams: BlockListFilterState) => useQuery(
  ['blockList', queryParams],
  getBlockList,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
