import React from 'react';
import { useParams } from 'react-router-dom';
import { OrderInnerContext } from '../contexts';
import type { BucketListFilterState } from '../types';
import type { ReducerAction } from '../../../common/types';
import { TableFilterAction } from '../../../common/enums';
import { initBucketListFilterData, initData } from '../constants';
import { useOrderDetails, useBucketList } from '../api';
import { getOrderType } from '../../../utils/getOrderType';

function reducer(
  state: BucketListFilterState,
  action: ReducerAction,
) {
  switch (action.type) {
    case TableFilterAction.ADD_FILTER: {
      return {
        ...state,
        page: 0,
        [action.value.key]: action.value.value,
      };
    }
    case TableFilterAction.ADD_SORT: {
      return {
        ...state,
        orderColumn: action.value,
        orderType: getOrderType({
          orderType: state.orderType,
          orderColumn: state.orderColumn,
          newOrderColumn: action.value,
        }),
      };
    }
    case TableFilterAction.ADD_CURRENT_PAGE: {
      return {
        ...state,
        page: action.value,
      };
    }
    case TableFilterAction.ADD_CURRENT_PAGE_SIZE: {
      return {
        ...state,
        size: action.value,
      };
    }
    default:
      return state;
  }
}

export const OrderInnerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initBucketListFilterData,
  );
  const { orderId } = useParams();
  const { data: bucketList, isFetched, isError, isLoading } = useBucketList(state, orderId!);
  const {
    data: orderDetails,
    isError: isErrorDetails,
    isFetched: isFetchedDetails,
    isLoading: isLoadingDetails,
  } = useOrderDetails(orderId!);

  return (
    <OrderInnerContext.Provider
      value={{
        filters: state,
        bucketListData: bucketList || initData,
        orderDetails: orderDetails || null,
        isLoading,
        isLoadingDetails,
        isFetched,
        isFetchedDetails,
        isError,
        isErrorDetails,
        dispatch,
      }}
    >
      {children}
    </OrderInnerContext.Provider>
  );
};
