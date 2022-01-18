import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { SelectTechniques } from '../../../components/SelectTechniques';
import { TopBar } from '../../../components/TopBar';
import { AlarmBodySection } from '../components/AlarmsBodySection';
import AlarmsTable from '../components/AlarmsTable';
import { AlarmsContext } from '../contexts';
import { useExportAlarmsCsv } from '../api/exportAlarmsCsv';
import { TabView } from '../../common/features/tab-view/components';

export const Alarms = () => {
  const {
    filterData: { isToday, isMonth, ...filterData },
    dispatch,
    type,
  } = useContext(AlarmsContext);
  const exportCsvMutation = useExportAlarmsCsv();

  return (
    <Box>
      <TopBar>
        <SelectTechniques
          dispatch={dispatch}
        />
      </TopBar>
      <TabView
        bodySection={(
          <AlarmBodySection
            isToday={isToday}
            isMonth={isMonth}
            isLoadingExportCsv={exportCsvMutation.isLoading}
            onExportCsv={() => {
              exportCsvMutation.mutate({
                type,
                filterData,
              });
            }}
            dispatch={dispatch}
          />
        )}
        dataTable={<AlarmsTable />}
      />
    </Box>
  );
};
