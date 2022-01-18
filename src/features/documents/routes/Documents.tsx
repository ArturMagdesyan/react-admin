import React, { useContext } from 'react';
import { TopBar } from '../../../components/TopBar';
import { SelectTechniques } from '../../../components/SelectTechniques';
import DocumentsBodySection from '../components/DocumentsBodySection';
import { DocumentsContext } from '../contexts';
import { DocumentsTable } from '../../common/features/documents-table';
import { TabView } from '../../common/features/tab-view/components';
import { Spinner } from '../../../components/Spinner';

export const Documents = () => {
  const {
    documentsData,
    filterData,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(DocumentsContext);

  return (
    <>
      <TopBar>
        <SelectTechniques dispatch={dispatch} />
      </TopBar>
      <TabView
        bodySection={<DocumentsBodySection />}
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
    </>
  );
};
