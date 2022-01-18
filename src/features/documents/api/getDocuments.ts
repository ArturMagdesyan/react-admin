import { useQuery } from 'react-query';
import type { QueryFunctionContext } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type { DocumentsResponse, DocumentsFilterState } from '../../common/features/documents-table/types';
import { apiErrorHandler } from '../../../utils/errorHandler';

export const getDocuments = async (
  { queryKey }: QueryFunctionContext,
): Promise<DocumentsResponse> => {
  const [, queryParams] = queryKey;
  const query = convertQueryString(queryParams);
  const response = await axios.get<DocumentsResponse, DocumentsResponse>(`documents?${query}`);

  return response;
};

export const useDocuments = (queryParams: DocumentsFilterState) => useQuery(
  ['documents', queryParams],
  getDocuments,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
