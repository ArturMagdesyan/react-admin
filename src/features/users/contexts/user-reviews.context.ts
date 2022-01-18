import React from 'react';
import type {
  ReviewResponse,
  ReviewsFilterState,
} from '../../common/features/reviews-table/types';
import {
  initialData,
  initialReviewsFilterState,
} from '../../common/features/reviews-table/constants';

export const UserReviewsContext = React.createContext<{
  data: ReviewResponse,
  filter: ReviewsFilterState,
  isFetched: boolean,
  isError: boolean,
  isLoading: boolean,
  dispatch: React.Dispatch<any>,
}>({
  data: initialData,
  filter: initialReviewsFilterState,
  isError: false,
  isFetched: false,
  isLoading: false,
  dispatch: () => {},
});
