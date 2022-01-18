import React, { useContext } from 'react';
import { DocumentsTable } from '../../../common/features/documents-table';
import { UserDocumentsContext } from '../../contexts';
import UserDocumentsBodySection from '../../components/UserDocumentsBodySection';
import { TabView } from '../../../common/features/tab-view/components';
import { Spinner } from '../../../../components/Spinner';

export const UserDocuments = () => {
  const {
    documentsData,
    filterData,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(UserDocumentsContext);

  return (
    <TabView
      bodySection={<UserDocumentsBodySection />}
      dataTable={
        isLoading ? (
          <Spinner />
        ) : (
          <DocumentsTable
            data={documentsData}
            filterData={filterData}
            isFetched={isFetched}
            dispatch={dispatch}
          />
        )
      }
    />
  );
};
