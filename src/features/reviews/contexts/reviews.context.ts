import React from 'react';
import type {
  ReviewResponse,
  ReviewsFilterState,
} from '../../common/features/reviews-table/types';
import {
  initialData,
  initialReviewsFilterState,
} from '../../common/features/reviews-table/constants';

export const ReviewsContext = React.createContext<{
  data: ReviewResponse,
  filter: ReviewsFilterState,
  isError: boolean,
  isFetched: boolean,
  dispatch: React.Dispatch<any>,
}>({
  data: initialData,
  filter: initialReviewsFilterState,
  isError: false,
  isFetched: false,
  dispatch: () => {},
});
