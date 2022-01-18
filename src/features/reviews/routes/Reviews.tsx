import React, { useContext } from 'react';
import { TopBar } from '../../../components/TopBar';
import { SelectTechniques } from '../../../components/SelectTechniques';
import { ReviewsTable } from '../../common/features/reviews-table';
import { ReviewsContext } from '../contexts';
import { NoTableContent } from '../../../components/NoTableContent';
import ReviewsBodySection from '../components/ReviewsBodySection';
import { TabView } from '../../common/features/tab-view/components';

export const Reviews = () => {
  const {
    data,
    filter,
    isError,
    isFetched,
    dispatch,
  } = useContext(ReviewsContext);

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <>
      <TopBar>
        <SelectTechniques dispatch={dispatch} />
      </TopBar>
      <TabView
        bodySection={<ReviewsBodySection />}
        dataTable={(
          <ReviewsTable
            data={data}
            filterData={filter}
            isFetched={isFetched}
            dispatch={dispatch}
          />
        )}
      />
    </>
  );
};
