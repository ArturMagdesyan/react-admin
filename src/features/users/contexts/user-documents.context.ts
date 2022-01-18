import React from 'react';
import type { DocumentsResponse, DocumentsFilterState } from '../../common/features/documents-table/types';
import { initialData, initialDocumentsFilterState } from '../../common/features/documents-table/constants';

export const UserDocumentsContext = React.createContext<{
  documentsData: DocumentsResponse,
  filterData: DocumentsFilterState,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  documentsData: initialData,
  filterData: initialDocumentsFilterState,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
