import React from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { TableFilterAction } from '../../../common/enums';
import { FilterButton } from '../../../components/FilterButton';
import { AlarmSwitchNavigation } from './AlarmSwitchNavigation';
import { DateRangePicker } from '../../../components/DateRangePicker';
import { CsvExportButton } from '../../../components/CsvExportButton';

interface Props {
  isToday: boolean;
  isMonth: boolean;
  isLoadingExportCsv: boolean;
  onExportCsv: () => void;
  dispatch: React.Dispatch<any>;
}

export const AlarmBodySection = ({
  isToday,
  isMonth,
  isLoadingExportCsv,
  onExportCsv,
  dispatch,
}: Props) => {
  const { t } = useTranslation();

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
      <Box sx={{ display: 'flex', gap: 2.5 }}>
        <AlarmSwitchNavigation />
        <Box sx={{ display: 'flex' }}>
          <FilterButton
            title={t('filters.today')}
            isActive={isToday}
            minWidth={90}
            onClick={() => dispatch({ type: TableFilterAction.ADD_TODAY_DATE })}
          />
          <FilterButton
            title={t('filters.month')}
            isActive={isMonth}
            minWidth={90}
            onClick={() => dispatch({ type: TableFilterAction.ADD_MONTH_DATE })}
          />
          <DateRangePicker
            onFilter={
              (dates) => (
                dispatch({ type: TableFilterAction.ADD_DATE_RANGE, value: dates })
              )
            }
          />
        </Box>
      </Box>
      <Box>
        <CsvExportButton
          isLoading={isLoadingExportCsv}
          onClick={onExportCsv}
        />
      </Box>
    </Box>
  );
};
