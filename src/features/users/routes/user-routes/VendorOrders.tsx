import React, { useContext } from 'react';
import { VendorOrdersContext } from '../../contexts';
import { UserOrdersTable } from '../../components/UserOrdersTable';
import { NoTableContent } from '../../../../components/NoTableContent';
import UserOrdersBodySection from '../../components/UserOrdersBodySection';
import { TabView } from '../../../common/features/tab-view/components';
import { Spinner } from '../../../../components/Spinner';

export const VendorOrders = () => {
  const {
    vendorOrdersFilterState: { page, size, orderType, orderColumn },
    vendorOrdersData: { content: vendorOrders, total },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(VendorOrdersContext);

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <TabView
      bodySection={<UserOrdersBodySection />}
      dataTable={
        isLoading ? (
          <Spinner />
        ) : (
          <UserOrdersTable
            userOrders={vendorOrders}
            total={total}
            page={page}
            size={size}
            orderType={orderType}
            orderColumn={orderColumn}
            isFetched={isFetched}
            dispatch={dispatch}
          />
        )
      }
    />
  );
};
