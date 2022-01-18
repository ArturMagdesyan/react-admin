import React, { useContext, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { ConfigurationsContext } from '../contexts';
import { TableFilterAction } from '../../../common/enums';
import { useDialog } from '../../../hooks';
import { Configuration } from '../types';
import { DataTable } from '../../data-table';
import { ConfigurationsTableHeadColumns } from '../constants';
import type { TableFilterChange } from '../../data-table/types';
import { EditCommentDialog, EditConfigurationDialog } from '../../dialogs';
import { TableButton } from '../../../components/TableButton';
import { EditIcon } from '../../../components/Icons';
import { useEditConfiguration } from '../../dialogs/api';
import { NoTableContent } from '../../../components/NoTableContent';
import { TableCommentField } from '../../../components/TableCommentField';
import { Spinner } from '../../../components/Spinner';

const styles = {
  paper: {
    '& .MuiTableHead-root': {
      '& .MuiTableRow-root': {
        '& > :first-of-type': {
          paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
        },
      },
    },
  },
  firstCol: {
    paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
  },
  valueView: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
};

const ConfigurationsTable = () => {
  const [currentConfiguration, setCurrentConfiguration] = useState<null | Configuration>(null);
  const editDialog = useDialog();
  const commentDialog = useDialog();
  const {
    configurationsData: { content },
    isError,
    isLoading,
    dispatch,
  } = useContext(ConfigurationsContext);
  const mutateConfiguration = useEditConfiguration();

  const handleChange = (filterData : TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <>
      <DataTable
        tableHeadColumns={ConfigurationsTableHeadColumns}
        onFilterChange={handleChange}
        paperStyles={styles.paper}
      >
        <TableBody>
          {
            content.map((configuration) => (
              <TableRow key={configuration.key}>
                <TableCell align="left" sx={styles.firstCol} width="400">
                  <Typography variant="body2">
                    {configuration.title}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="200">
                  <Box
                    sx={styles.valueView}
                  >
                    <TableButton
                      background="primary"
                      isColorLight
                      onClick={() => {
                        setCurrentConfiguration(configuration);
                        editDialog.onTrigger();
                      }}
                    >
                      <EditIcon />
                    </TableButton>
                    <Typography variant="body2">
                      {configuration.value}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left" width="160">
                  <Typography variant="body2">
                    {configuration.lastUpdated}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="600">
                  <TableCommentField
                    comment={configuration.comment}
                    onSubmit={() => {
                      setCurrentConfiguration(configuration);
                      commentDialog.onTrigger();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </DataTable>
      {
        currentConfiguration && (
          <EditConfigurationDialog
            open={editDialog.open}
            initialValue={currentConfiguration.value || ''}
            configurationKey={currentConfiguration.key}
            inputType={
              currentConfiguration.key.search('PHONE') > -1 ? 'phone' : 'number'
            }
            onClose={editDialog.onClose}
          />
        )
      }
      <EditCommentDialog
        open={commentDialog.open}
        initialComment={currentConfiguration?.comment || ''}
        onSuccess={(comment) => {
          mutateConfiguration.mutate({
            configurationKey: currentConfiguration!.key,
            data: {
              comment,
            },
          });
        }}
        onClose={commentDialog.onClose}
      />
    </>
  );
};

export default ConfigurationsTable;
