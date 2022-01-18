import React, { useContext } from 'react';
import UsersBodySection from '../../components/UsersBodySection';
import { CustomersTable } from '../../components/CustomersTable';
import { CustomersContext } from '../../contexts';
import { useExportCustomersCsv } from '../../api/customers';
import { TabView } from '../../../common/features/tab-view/components';

export const Customers = () => {
  const { filterData } = useContext(CustomersContext);
  const exportCsvMutation = useExportCustomersCsv();

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
      dataTable={<CustomersTable />}
    />
  );
};
