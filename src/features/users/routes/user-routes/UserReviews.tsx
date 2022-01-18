import React, { useContext } from 'react';
import { UserReviewsContext } from '../../contexts';
import { ReviewsTable } from '../../../common/features/reviews-table';
import { NoTableContent } from '../../../../components/NoTableContent';
import UserReviewsBodySection from '../../components/UserReviewsBodySection';
import { TabView } from '../../../common/features/tab-view/components';
import { Spinner } from '../../../../components/Spinner';

export const UserReviews = () => {
  const {
    data,
    filter,
    isError,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(UserReviewsContext);

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <TabView
      bodySection={<UserReviewsBodySection />}
      dataTable={
        isLoading ? (
          <Spinner />
        ) : (
          <ReviewsTable
            data={data}
            filterData={filter}
            isFetched={isFetched}
            dispatch={dispatch}
          />
        )
      }
    />
  );
};
