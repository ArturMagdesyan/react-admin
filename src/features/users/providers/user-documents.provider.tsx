import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { UserDocumentsContext } from '../contexts';
import { initialData, initialDocumentsFilterState } from '../../common/features/documents-table/constants';
import { userDocumentsReducer } from '../../common/features/documents-table/reducers';
import { useUserDocuments } from '../api';

export const UserDocumentsProvider: React.FC = ({ children }) => {
  const { userId } = useParams();
  const [state, dispatch] = useReducer(
    userDocumentsReducer,
    initialDocumentsFilterState,
  );
  const {
    data,
    isFetched,
    isLoading,
  } = useUserDocuments(Number(userId), state);

  return (
    <UserDocumentsContext.Provider
      value={{
        documentsData: data || initialData,
        filterData: state,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </UserDocumentsContext.Provider>
  );
};
