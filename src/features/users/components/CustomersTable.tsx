import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';
import { CustomersContext } from '../contexts';
import { TablePagination } from '../../../components/TablePagination';
import { TableStatus } from '../../../components/TableStatus';
import { TableFilterAction } from '../../../common/enums';
import { useDialog } from '../../../hooks';
import InternalLink from '../../../components/InternalLink';
import { DataTable } from '../../data-table/components';
import { CustomersTableHeadColumns } from '../constants';
import { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import {
  LockDialog,
  DeleteCustomerDialog,
  UnlockDialog,
} from '../../dialogs';
import { TableButton } from '../../../components/TableButton';
import { DeleteIcon, UnlockIcon, LockIcon } from '../../../components/Icons';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';
import type { Customer } from '../types';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
  paper: {
    '& .MuiTableCell-root': {
      padding: (theme: Theme) => theme.spacing(0, 0.5),
    },
    '& .MuiTableHead-root': {
      '& .MuiTableRow-root': {
        '& > :first-of-type': {
          paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
        },
      },
    },
  },
  row: {
    cursor: 'pointer',
  },
  firstCol: {
    paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
  },
};

export const CustomersTable = () => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const lockDialog = useDialog();
  const unlockDialog = useDialog();
  const deleteDialog = useDialog();
  const {
    filterData: { size, page, orderColumn, orderType },
    customersDate: { content: customers, total },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(CustomersContext);

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
    CustomersTableHeadColumns.map((column) => {
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
        onSortClick={handleSortClick}
        onFilterChange={handleChange}
        paperStyles={styles.paper}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            customers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={styles.row}
              >
                <TableCell align="left" sx={styles.firstCol}>
                  <InternalLink
                    to={`/users/customers/${customer.phoneNumber}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Typography variant="body2" component="span">
                      {customer.phoneNumber}
                    </Typography>
                  </InternalLink>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {customer.nameWithCompany}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="userCompanyType"
                    statusKey={customer.companyType}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {customer.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {customer.orderCount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    1-5
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {customer.customerDiscount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    color={customer.balance < 0 ? 'error' : 'inherit'}
                  >
                    {customer.balance}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  {
                    customer.locked ? (
                      <TableButton
                        background="info"
                        onClick={() => {
                          setCurrentCustomer(customer);
                          lockDialog.onTrigger();
                        }}
                      >
                        <UnlockIcon />
                      </TableButton>
                    ) : (
                      <TableButton
                        background="success"
                        onClick={() => {
                          setCurrentCustomer(customer);
                          unlockDialog.onTrigger();
                        }}
                      >
                        <LockIcon />
                      </TableButton>
                    )
                  }
                  <TableButton
                    background="error"
                    onClick={() => {
                      setCurrentCustomer(customer);
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
        dispatch={dispatch}
        size={size}
        page={page}
        total={total}
      />
      <LockDialog
        id={currentCustomer?.phoneNumber!}
        open={lockDialog.open}
        onClose={lockDialog.onClose}
      />
      <UnlockDialog
        id={currentCustomer?.phoneNumber!}
        open={unlockDialog.open}
        onClose={unlockDialog.onClose}
      />
      <DeleteCustomerDialog
        id={currentCustomer?.id!}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};
