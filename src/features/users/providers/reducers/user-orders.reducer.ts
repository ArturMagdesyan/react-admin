import { UserOrderFilterState } from '../../types';
import type { ReducerAction } from '../../../../common/types';
import { TableFilterAction } from '../../../../common/enums';
import { getOrderType } from '../../../../utils/getOrderType';

export const userOrdersReducer = (
  state: UserOrderFilterState,
  action: ReducerAction,
) => {
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
    case TableFilterAction.ADD_CURRENT_PAGE_SIZE: {
      return {
        ...state,
        size: action.value,
      };
    }
    case TableFilterAction.ADD_CURRENT_PAGE: {
      return {
        ...state,
        page: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
