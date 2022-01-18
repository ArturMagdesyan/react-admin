import React, { useContext } from 'react';
import { VendorOrdersContext } from '../contexts';
import { UserOrdersTable } from './UserOrdersTable';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';

export const VendorOrdersTable = () => {
  const {
    vendorOrdersFilterState: { page, size, orderType, orderColumn },
    vendorOrdersData: { content: vendorOrders, total },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(VendorOrdersContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
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
  );
};
