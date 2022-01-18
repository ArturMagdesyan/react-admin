import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { UserProfileNavLinks } from './UserProfileNavLinks';
import { TableFilterAction } from '../../../common/enums';
import { DateRangePicker } from '../../../components/DateRangePicker';
import { CsvExportButton } from '../../../components/CsvExportButton';
import { useExportUserDocumentsCsv } from '../api';
import { UserDocumentsContext } from '../contexts';

const UserDocumentsBodySection = () => {
  const { userId } = useParams();
  const {
    filterData,
    dispatch,
  } = useContext(UserDocumentsContext);
  const exportCsvMutation = useExportUserDocumentsCsv();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <UserProfileNavLinks />
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <DateRangePicker
          onFilter={
            (dates) => dispatch({ type: TableFilterAction.ADD_DATE_RANGE, value: dates })
          }
        />
        <CsvExportButton
          isLoading={exportCsvMutation.isLoading}
          onClick={() => {
            if (!userId) return;

            exportCsvMutation.mutate({
              userId,
              filter: filterData,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default UserDocumentsBodySection;
