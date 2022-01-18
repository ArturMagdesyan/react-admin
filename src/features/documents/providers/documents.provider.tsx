import React from 'react';
import { DocumentsContext } from '../contexts';
import { useDocuments } from '../api/getDocuments';
import { userDocumentsReducer } from '../../common/features/documents-table/reducers';
import {
  initialData,
  initialDocumentsFilterState,
} from '../../common/features/documents-table/constants';

export const DocumentsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    userDocumentsReducer,
    initialDocumentsFilterState,
  );
  const {
    data,
    isFetched,
    isLoading,
  } = useDocuments(state);

  return (
    <DocumentsContext.Provider
      value={{
        documentsData: data || initialData,
        filterData: state,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
