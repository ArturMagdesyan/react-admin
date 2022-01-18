import React, { useContext } from 'react';
import UsersBodySection from '../../components/UsersBodySection';
import { VendorsTable } from '../../components/VendorsTable';
import { VendorsContext } from '../../contexts';
import { useExportVendorsCsv } from '../../api/vendors';
import { TabView } from '../../../common/features/tab-view/components';

export const Vendors = () => {
  const { vendorFilterState } = useContext(VendorsContext);
  const exportCsvMutation = useExportVendorsCsv();

  return (
    <TabView
      bodySection={(
        <UsersBodySection
          isLoadingExportCsv={exportCsvMutation.isLoading}
          onExportCsv={() => {
            exportCsvMutation.mutate(vendorFilterState);
          }}
        />
      )}
      dataTable={<VendorsTable />}
    />
  );
};
