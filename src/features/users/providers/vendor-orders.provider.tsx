import React from 'react';
import { useParams } from 'react-router-dom';
import { VendorOrdersContext } from '../contexts';
import { useVendorOrders } from '../api';
import { initData, initUserOrderFilterState } from '../constants';
import { userOrdersReducer } from './reducers';

export const VendorOrdersProvider: React.FC = ({ children }) => {
  const [vendorOrdersFilterState, dispatch] = React.useReducer(
    userOrdersReducer,
    initUserOrderFilterState,
  );
  const { userId } = useParams();
  const {
    data: vendorOrders,
    isFetched,
    isError,
    isLoading,
  } = useVendorOrders(Number(userId!), vendorOrdersFilterState);

  return (
    <VendorOrdersContext.Provider
      value={{
        vendorOrdersFilterState,
        vendorOrdersData: vendorOrders || initData,
        isError,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </VendorOrdersContext.Provider>
  );
};
