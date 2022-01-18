import React, { useContext } from 'react';
import { CustomerOrdersContext } from '../contexts';
import { UserOrdersTable } from './UserOrdersTable';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';

export const CustomerOrdersTable = () => {
  const {
    customerOrdersData: { content, total },
    orderFilterState: { page, size, orderType, orderColumn },
    isError,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(CustomerOrdersContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <UserOrdersTable
      page={page}
      size={size}
      total={total}
      orderType={orderType}
      orderColumn={orderColumn}
      isFetched={isFetched}
      userOrders={content}
      dispatch={dispatch}
    />
  );
};
