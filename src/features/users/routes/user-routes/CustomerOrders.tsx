import React, { useContext } from 'react';
import { CustomerOrdersContext } from '../../contexts';
import { UserOrdersTable } from '../../components/UserOrdersTable';
import { NoTableContent } from '../../../../components/NoTableContent';
import UserOrdersBodySection from '../../components/UserOrdersBodySection';
import { TabView } from '../../../common/features/tab-view/components';
import { Spinner } from '../../../../components/Spinner';

export const CustomerOrders = () => {
  const {
    customerOrdersData: { content, total },
    orderFilterState: { page, size, orderType, orderColumn },
    isError,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(CustomerOrdersContext);

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
            page={page}
            size={size}
            total={total}
            orderType={orderType}
            orderColumn={orderColumn}
            isFetched={isFetched}
            userOrders={content}
            dispatch={dispatch}
          />
        )
      }
    />
  );
};
