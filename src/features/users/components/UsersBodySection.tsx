import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import UsersNavLinks from './UsersNavLinks';
import { DateRangePicker } from '../../../components/DateRangePicker';
import { UsersContext } from '../contexts';
import { TableFilterAction } from '../../../common/enums';
import { CsvExportButton } from '../../../components/CsvExportButton';

interface Props {
  isLoadingExportCsv: boolean,
  onExportCsv: () => void;
}

const UsersBodySection = ({
  isLoadingExportCsv,
  onExportCsv,
}: Props) => {
  const { dispatch } = useContext(UsersContext);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <UsersNavLinks />
        <DateRangePicker
          onFilter={
            (dates) => dispatch({ type: TableFilterAction.ADD_DATE_RANGE, value: dates })
          }
        />
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

export default UsersBodySection;
