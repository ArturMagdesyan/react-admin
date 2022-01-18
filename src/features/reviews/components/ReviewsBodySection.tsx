import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { FilterButton } from '../../../components/FilterButton';
import { TableFilterAction } from '../../../common/enums';
import { DateRangePicker } from '../../../components/DateRangePicker';
import { ReviewsContext } from '../contexts';
import NavigationSwitch from './NavigationSwitch';

const ReviewsBodySection = () => {
  const { t } = useTranslation();
  const {
    filter: { isToday, isMonth },
    dispatch,
  } = useContext(ReviewsContext);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        '& .MuiButton-root': {
          mr: (theme) => theme.spacing(1),
        },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <FilterButton
          title={t('filters.today')}
          minWidth={90}
          onClick={() => dispatch({ type: TableFilterAction.ADD_TODAY_DATE })}
          isActive={isToday}
        />
        <FilterButton
          title={t('filters.month')}
          minWidth={90}
          onClick={() => dispatch({ type: TableFilterAction.ADD_MONTH_DATE })}
          isActive={isMonth}
        />
        <DateRangePicker
          onFilter={
            (dates) => (
              dispatch({ type: TableFilterAction.ADD_DATE_RANGE, value: dates })
            )
          }
        />
      </Box>
      <NavigationSwitch />
    </Box>
  );
};

export default ReviewsBodySection;
