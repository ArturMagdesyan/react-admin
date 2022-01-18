import React from 'react';
import type { DocumentsFilterState, DocumentsResponse } from '../../common/features/documents-table/types';
import { initialData, initialDocumentsFilterState } from '../../common/features/documents-table/constants';

export const DocumentsContext = React.createContext<{
  documentsData: DocumentsResponse,
  filterData: DocumentsFilterState,
  isFetched: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  documentsData: initialData,
  filterData: initialDocumentsFilterState,
  isLoading: false,
  isFetched: false,
  dispatch: () => {},
});
