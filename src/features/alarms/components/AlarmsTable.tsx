import React, { useContext, useMemo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataTable } from '../../data-table';
import { AlarmTableHeaderData } from '../constants';
import { AlarmsContext } from '../contexts';
import { TablePagination } from '../../../components/TablePagination';
import { TableFilterAction } from '../../../common/enums';
import { TableStatus } from '../../../components/TableStatus';
import { Technique } from '../../../components/Technique';
import type { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import { TableButton } from '../../../components/TableButton';
import { AddIcon } from '../../../components/Icons';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
  priceView: {
    display: 'flex',
    '& .MuiBox-root': {
      display: 'flex',
      alignItems: 'self-start',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
};

const AlarmsTable = () => {
  const {
    alarmsData: { total, content },
    filterData: { size, page, orderColumn, orderType },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(AlarmsContext);

  const handleChange = (filterData : TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  const handleSortClick = (field: string) => {
    dispatch({
      type: TableFilterAction.ADD_SORT,
      value: field,
    });
  };

  const tableHeadColumns = useMemo(() => (
    AlarmTableHeaderData.map((column) => {
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
        tableHeadColumns={tableHeadColumns}
        onFilterChange={handleChange}
        onSortClick={handleSortClick}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((alarm) => (
              <TableRow
                key={alarm.id}
              >
                <TableCell align="center">
                  <Technique techniqueName={alarm.techniqueName} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {alarm.orderId}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {alarm.customerPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {alarm.vendorPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {alarm.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="alarms.statuses"
                    statusKey={alarm.status}
                  />
                </TableCell>
                <TableCell align="left">
                  <Box sx={styles.priceView}>
                    <TableButton
                      background="secondary"
                      onClick={() => {
                        // TODO: create action
                      }}
                    >
                      <AddIcon />
                    </TableButton>
                    <Box>
                      <Typography variant="body2" component="span">
                        {alarm.price}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', fontWeight: 500 }}
                        variant="caption"
                        color="error"
                      >
                        {alarm.extraPrice}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {alarm.source}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  reacord
                </TableCell>
                <TableCell align="left" width="130">
                  Actions
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
    </>
  );
};

export default AlarmsTable;
