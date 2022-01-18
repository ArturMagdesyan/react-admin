import React, { useReducer } from 'react';
import { ReviewsContext } from '../contexts';
import {
  initialData,
  initialReviewsFilterState,
  ReviewsData,
} from '../../common/features/reviews-table/constants';
import { reviewsReducer } from '../../common/features/reviews-table/reducers';

export const ReviewsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    reviewsReducer,
    initialReviewsFilterState,
  );

  return (
    <ReviewsContext.Provider
      value={{
        data: ReviewsData || initialData,
        filter: state,
        isFetched: true,
        isError: false,
        dispatch,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};
