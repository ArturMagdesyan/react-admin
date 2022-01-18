import React, {
  useContext,
  useMemo,
} from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { UserTransactionsTableHeadColumns } from '../constants';
import { DataTable } from '../../data-table/components';
import { UserTransactionsContext } from '../contexts';
import { TablePagination } from '../../../components/TablePagination';
import {
  TransactionInIcon,
  TransactionOutIcon,
} from '../../../components/Icons';
import {
  TableFilterAction,
  TransactionType,
} from '../../../common/enums';
import {
  TableFilterChange,
  TableHeadColumn,
} from '../../data-table/types';
import { Spinner } from '../../../components/Spinner';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
};

const toPositive = (negativeNumber: number) => `+${negativeNumber * -1}`;
const toNegative = (positiveNumber: number) => positiveNumber * -1;

export const UserTransactionsTable = () => {
  const { t } = useTranslation();
  const {
    userTransactionsData: { total, content },
    filterData: { page, size, orderType, orderColumn },
    isFetched,
    isLoading,
    dispatch,
  } = useContext(UserTransactionsContext);

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
    UserTransactionsTableHeadColumns.map((column) => {
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
        onSortClick={handleSortClick}
        onFilterChange={handleChange}
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
                      <TransactionInIcon />
                    ) : (
                      <TransactionOutIcon />
                    )}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {t(`transactions.operation.${transaction.operation}`)}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {transaction.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    color={
                      transaction.amount >= 0 ? 'error.main' : 'success.main'
                    }
                  >
                    {transaction.amount > 0
                      ? toNegative(transaction.amount)
                      : toPositive(transaction.amount)}
                  </Typography>
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
    </>
  );
};
