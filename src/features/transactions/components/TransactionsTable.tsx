import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { TableStatus } from '../../../components/TableStatus';
import { TransactionsContext } from '../contexts';
import { DataTable } from '../../data-table/components';
import { TransactionsTableHeadColumns } from '../constants';
import { TablePagination } from '../../../components/TablePagination';
import {
  CheckIcon,
  DownloadIcon,
  TransactionInIcon,
  TransactionOutIcon,
} from '../../../components/Icons';
import { TableButton } from '../../../components/TableButton';
import {
  TableFilterAction,
  TransactionType,
  OrderPaymentMethod,
} from '../../../common/enums';
import type { TableFilterChange, TableHeadColumn } from '../../data-table/types';
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

const TransactionsTable = () => {
  const {
    transactionsData: { total, content },
    filterData: { size, page, orderColumn, orderType },
    isFetched,
    isLoading,
    dispatch,
  } = useContext(TransactionsContext);
  const { t } = useTranslation();

  const handleChange = (filterData: TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  const handleSortClick = (field: string) => {
    dispatch({
      type: TableFilterAction.ADD_SORT,
      value: field,
    });
  };

  const tableHeadColumns = useMemo(() => (
    TransactionsTableHeadColumns.map((column) => {
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

  return (
    <>
      <DataTable
        tableHeadColumns={tableHeadColumns}
        onFilterChange={handleChange}
        onSortClick={handleSortClick}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((transaction) => (
              <TableRow
                key={transaction.id}
              >
                <TableCell align="center">
                  {transaction.type === TransactionType.EXPENSE
                    ? (
                      <TransactionOutIcon />
                    ) : (
                      <TransactionInIcon />
                    )}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {t(`transactions.operation.${transaction.operation}`)}
                    {' '}
                    {transaction.orderId ? `№${transaction.orderId}` : ''}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {transaction.phoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {transaction.companyTin}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {transaction.nameWithCompany}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {transaction.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    statusKey={transaction.status}
                    translationKey="transactions.status"
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    color={
                      transaction.amount >= 0 ? 'success.main' : 'error.main'
                    }
                  >
                    {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {transaction.paymentMethod ? t(`orderPaymentMethod.${transaction.paymentMethod}`) : ''}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableButton
                    disabled={transaction.paymentMethod === OrderPaymentMethod.CASH}
                    background="secondary"
                    onClick={() => {}}
                  >
                    <DownloadIcon />
                  </TableButton>
                  <TableButton
                    disabled={!transaction.confirmed}
                    background="primary"
                    onClick={() => {}}
                  >
                    <CheckIcon />
                  </TableButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </DataTable>
      <TablePagination
        dispatch={dispatch}
        size={size}
        page={page}
        total={total}
      />
    </>
  );
};

export default TransactionsTable;
