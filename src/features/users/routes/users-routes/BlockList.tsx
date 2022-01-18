import React, { useContext } from 'react';
import UsersBodySection from '../../components/UsersBodySection';
import { BlockListContext } from '../../contexts';
import { useExportBlockListCsv } from '../../api';
import BlockListTable from '../../components/BlockListTable';
import { TabView } from '../../../common/features/tab-view/components';

export const BlockList = () => {
  const { filterData } = useContext(BlockListContext);
  const exportCsvMutation = useExportBlockListCsv();

  return (
    <TabView
      bodySection={(
        <UsersBodySection
          isLoadingExportCsv={exportCsvMutation.isLoading}
          onExportCsv={() => {
            exportCsvMutation.mutate(filterData);
          }}
        />
      )}
      dataTable={<BlockListTable />}
    />
  );
};
