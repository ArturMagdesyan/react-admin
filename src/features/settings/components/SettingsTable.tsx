import React, { useContext, useMemo, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import type { Theme } from '@mui/material';
import type { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import { DeleteIcon, LockIcon, UnlockIcon } from '../../../components/Icons';
import { TableButton } from '../../../components/TableButton';
import { DataTable } from '../../data-table';
import { SettingsContext } from '../contexts';
import { useDialog } from '../../../hooks';
import { SettingsTableHeaderData } from '../constants';
import { TableFilterAction } from '../../../common/enums';
import { TablePagination } from '../../../components/TablePagination';
import { TableStatus } from '../../../components/TableStatus';
import SelectRole from './SelectRole';
import { AdminDeleteDialog, AdminLockManagerDialog } from '../../dialogs';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
  paper: {
    height: '92%',
    '& .MuiTableCell-root': {
      padding: (theme: Theme) => theme.spacing(0, 0.5),
    },
    '& .MuiTableHead-root': {
      '& .MuiTableRow-root': {
        '& > :first-of-type': {
          paddingLeft: (theme: Theme) => `${theme.spacing(5)}`,
        },
      },
    },
  },
  firstColumn: {
    paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
  },
};

export const SettingsTable = () => {
  const unlockDialog = useDialog();
  const lockDialog = useDialog();
  const deleteDialog = useDialog();
  const [userId, setUserId] = useState<number | null>(null);
  const {
    settingsData: { content, total },
    filterState: { size, page, orderColumn, orderType },
    isError,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(SettingsContext);

  const handleChange = (filterData: TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  const handleSortClick = (field: string) => {
    dispatch({
      type: TableFilterAction.ADD_SORT,
      value: field,
    });
  };

  const onOpenDialog = (
    id: number,
    onOpen: () => void,
  ) => {
    setUserId(id);
    onOpen();
  };

  const tableHeadColumns = useMemo(() => (
    SettingsTableHeaderData.map((column) => {
      if (column.sortable) {
        return {
          ...column,
          sort: {
            ...column.sort,
            orderType: column.sort!.orderColumn === orderColumn ? orderType : null,
          },
        } as TableHeadColumn<string>;
      }

      return column;
    })
  ), [orderType, orderColumn]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <>
      <DataTable
        paperStyles={styles.paper}
        tableHeadColumns={tableHeadColumns}
        onFilterChange={handleChange}
        onSortClick={handleSortClick}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((user) => (
              <TableRow
                key={user.id}
              >
                <TableCell align="left" sx={styles.firstColumn}>
                  <Typography variant="body2">
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.phone}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <SelectRole
                    userId={user.id}
                    role={user.roles[0]}
                  />
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="settings.userStatuses"
                    statusKey={user.state}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.registrationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  {
                    user.enabled ? (
                      <TableButton
                        background="success"
                        onClick={() => onOpenDialog(user.id, lockDialog.onTrigger)}
                      >
                        <UnlockIcon />
                      </TableButton>
                    ) : (
                      <TableButton
                        background="info"
                        onClick={() => onOpenDialog(user.id, unlockDialog.onTrigger)}
                      >
                        <LockIcon />
                      </TableButton>
                    )
                  }
                  <TableButton
                    background="error"
                    onClick={() => onOpenDialog(user.id, deleteDialog.onTrigger)}
                  >
                    <DeleteIcon />
                  </TableButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </DataTable>
      <TablePagination
        size={size}
        page={page}
        total={total}
        dispatch={dispatch}
      />
      <AdminLockManagerDialog
        id={userId!}
        open={lockDialog.open}
        onClose={lockDialog.onClose}
        type="lock"
        color="info"
      />
      <AdminLockManagerDialog
        id={userId!}
        open={unlockDialog.open}
        onClose={unlockDialog.onClose}
        type="unlock"
        color="success"
      />
      <AdminDeleteDialog
        id={userId!}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};
