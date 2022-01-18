import React from 'react';
import { useParams } from 'react-router-dom';
import { CustomerOrdersContext } from '../contexts';
import { initData, initUserOrderFilterState } from '../constants';
import { useCustomerOrders } from '../api';
import { userOrdersReducer } from './reducers';

export const CustomerOrdersProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    userOrdersReducer,
    initUserOrderFilterState,
  );
  const { userId } = useParams();
  const {
    data,
    isFetched,
    isError,
    isLoading,
  } = useCustomerOrders(
    Number(userId!),
    state,
  );

  return (
    <CustomerOrdersContext.Provider
      value={{
        customerOrdersData: data || initData,
        orderFilterState: state,
        isError,
        isFetched,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </CustomerOrdersContext.Provider>
  );
};
