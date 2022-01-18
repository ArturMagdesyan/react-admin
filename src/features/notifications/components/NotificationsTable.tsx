import React, { useContext, useMemo, useState } from 'react';
import { Theme } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { notificationsTableHeadColumns } from '../constants';
import { DataTable } from '../../data-table/components';
import { NotificationsContext } from '../contexts';
import { TablePagination } from '../../../components/TablePagination';
import type { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import { TableButton } from '../../../components/TableButton';
import { DeleteIcon } from '../../../components/Icons';
import { TableFilterAction } from '../../../common/enums';
import { useDialog } from '../../../hooks';
import { DeleteNotificationDialog } from '../../dialogs/components';
import { NoTableContent } from '../../../components/NoTableContent';
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
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
  firstColumn: {
    paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
  },
};

const NotificationsTable = () => {
  const deleteDialog = useDialog();
  const [notificationId, setNotificationId] = useState<number | null>(null);
  const {
    notificationData: { total, content },
    filterData: { page, size, orderColumn, orderType },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(NotificationsContext);

  const tableHeadColumns = useMemo(() => (
    notificationsTableHeadColumns.map((column) => {
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

  const handleChange = (filterData : TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  const handleSortClick = (field: string) => {
    dispatch({
      type: TableFilterAction.ADD_SORT,
      value: field,
    });
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
        tableHeadColumns={tableHeadColumns}
        paperStyles={styles.paper}
        onFilterChange={handleChange}
        onSortClick={handleSortClick}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell align="left" sx={styles.firstColumn}>
                  <Typography variant="body2" component="span">
                    {notification.phoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {notification.message}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {notification.sentDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {notification.receivedDate}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  <TableButton
                    background="error"
                    onClick={() => {
                      setNotificationId(notification.id);
                      deleteDialog.onTrigger();
                    }}
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
        page={page}
        size={size}
        total={total}
        dispatch={dispatch}
      />
      <DeleteNotificationDialog
        id={notificationId!}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};

export default NotificationsTable;
