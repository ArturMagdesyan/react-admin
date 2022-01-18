import type { ReducerAction } from '../../../../../common/types';
import { TableFilterAction } from '../../../../../common/enums';
import { getOrderType } from '../../../../../utils/getOrderType';
import {
  getMonthEndDate,
  getMonthStartDate,
  getTodayEndDate,
  getTodayStartDate,
} from '../../../../../utils/dateFormat';
import type { ReviewsFilterState } from '../types';

export const reviewsReducer = (
  state: ReviewsFilterState,
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
    case TableFilterAction.ADD_TECHNIQUE_IDS: {
      return {
        ...state,
        techniqueIds: action.value,
      };
    }
    case TableFilterAction.ADD_TODAY_DATE: {
      return {
        ...state,
        page: 0,
        isToday: true,
        isMonth: false,
        startDate: getTodayStartDate(),
        endDate: getTodayEndDate(),
      };
    }
    case TableFilterAction.ADD_MONTH_DATE: {
      return {
        ...state,
        page: 0,
        isToday: false,
        isMonth: true,
        startDate: getMonthStartDate(),
        endDate: getMonthEndDate(),
      };
    }
    case TableFilterAction.ADD_DATE_RANGE: {
      return {
        ...state,
        page: 0,
        isToday: false,
        isMonth: false,
        startDate: action.value.startDate,
        endDate: action.value.endDate,
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
    default: {
      return state;
    }
  }
};
