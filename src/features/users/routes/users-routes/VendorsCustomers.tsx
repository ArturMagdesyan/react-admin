import React, { useContext } from 'react';
import UsersBodySection from '../../components/UsersBodySection';
import VendorsCustomersTable from '../../components/VendorsCustomersTable';
import { useExportVendorsCustomersCsv } from '../../api';
import { VendorsCustomersContext } from '../../contexts';
import { TabView } from '../../../common/features/tab-view/components';

export const VendorsCustomers = () => {
  const { filtersState } = useContext(VendorsCustomersContext);
  const exportCsvMutation = useExportVendorsCustomersCsv();

  return (
    <TabView
      bodySection={(
        <UsersBodySection
          isLoadingExportCsv={exportCsvMutation.isLoading}
          onExportCsv={() => {
            exportCsvMutation.mutate(filtersState);
          }}
        />
      )}
      dataTable={<VendorsCustomersTable />}
    />
  );
};
