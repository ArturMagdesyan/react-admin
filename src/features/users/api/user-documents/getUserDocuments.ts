import { useQuery } from 'react-query';
import type { QueryFunctionContext } from 'react-query';
import axios from '../../../../app/axios';
import type {
  DocumentsFilterState,
  DocumentsResponse,
} from '../../../common/features/documents-table/types';
import { convertQueryString } from '../../../../utils/convertQueryString';
import { apiErrorHandler } from '../../../../utils/errorHandler';

export const getUserDocuments = async (
  { queryKey }: QueryFunctionContext<[string, number, DocumentsFilterState]>,
): Promise<DocumentsResponse> => {
  const [,, queryParams] = queryKey;
  const query = convertQueryString(queryParams);
  // TODO: Change the API when user documents API will be ready
  const response = await axios.get<DocumentsResponse, DocumentsResponse>(`/documents?${query}`);

  return response;
};

export const useUserDocuments = (userId: number, filter: DocumentsFilterState) => useQuery(
  ['userDocuments', userId, filter],
  getUserDocuments,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
