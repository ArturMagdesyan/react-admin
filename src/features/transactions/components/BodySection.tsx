import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { TransactionsContext } from '../contexts';
import { FilterButton } from '../../../components/FilterButton';
import { TableFilterAction } from '../../../common/enums';
import { DateRangePicker } from '../../../components/DateRangePicker';
import { CsvExportButton } from '../../../components/CsvExportButton';
import { useExportTransactionsCsv } from '../api';

const TransactionsBodySection = () => {
  const {
    filterData: { isMonth, isToday, ...filter },
    dispatch,
  } = useContext(TransactionsContext);
  const { t } = useTranslation();
  const exportCsvMutation = useExportTransactionsCsv();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
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
      <Box>
        <CsvExportButton
          isLoading={exportCsvMutation.isLoading}
          onClick={() => {
            exportCsvMutation.mutate(filter);
          }}
        />
      </Box>
    </Box>
  );
};

export default TransactionsBodySection;
