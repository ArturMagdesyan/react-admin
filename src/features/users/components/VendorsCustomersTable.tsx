import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { Theme } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { VendorsCustomersContext } from '../contexts';
import { TableFilterAction } from '../../../common/enums';
import { Technique } from '../../../components/Technique';
import InternalLink from '../../../components/InternalLink';
import { TableStatus } from '../../../components/TableStatus';
import { TablePagination } from '../../../components/TablePagination';
import { useDialog } from '../../../hooks';
import { DataTable } from '../../data-table/components';
import { VendorsCustomersTableHeadColumns } from '../constants';
import { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import {
  LockDialog,
  UnlockDialog,
  DeleteVendorCustomerDialog,
} from '../../dialogs';
import { TableButton } from '../../../components/TableButton';
import { DeleteIcon, UnlockIcon, LockIcon } from '../../../components/Icons';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';
import type { VendorCustomer } from '../types';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
  paper: {
    '& .MuiTableCell-root': {
      padding: (theme: Theme) => theme.spacing(0, 0.5),
    },
  },
  row: {
    cursor: 'pointer',
  },
};

const VendorsCustomersTable = () => {
  const [vendorCustomer, setVendorCustomer] = useState<VendorCustomer | null>(null);
  const deleteDialog = useDialog();
  const lockDialog = useDialog();
  const unlockDialog = useDialog();
  const {
    vendorsCustomersData: { content, total },
    filtersState: {
      orderColumn,
      orderType,
      size,
      page,
    },
    isError,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(VendorsCustomersContext);

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
    VendorsCustomersTableHeadColumns.map((column) => {
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
        paperStyles={styles.paper}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((user) => (
              <TableRow
                key={user.id}
                sx={styles.row}
              >
                <TableCell align="center">
                  <Technique techniqueName={user.techniqueNames[0]} />
                </TableCell>
                <TableCell align="left">
                  <InternalLink
                    to={`/users/users/${user.phoneNumber}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Typography variant="body2" component="span">
                      {user.phoneNumber}
                    </Typography>
                  </InternalLink>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.nameWithCompany}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.address}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="userCompanyType"
                    statusKey={user.companyType}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.vendorOrderCount}
                    /
                    {user.customerOrderCount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    1-5/1-5
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.vendorDiscount}
                    /
                    {user.customerDiscount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    color={user.balance < 0 ? 'error' : 'inherit'}
                  >
                    {user.balance}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  {
                    user.locked ? (
                      <TableButton
                        background="info"
                        onClick={() => {
                          setVendorCustomer(user);
                          unlockDialog.onTrigger();
                        }}
                      >
                        <LockIcon />
                      </TableButton>
                    ) : (
                      <TableButton
                        background="success"
                        onClick={() => {
                          setVendorCustomer(user);
                          lockDialog.onTrigger();
                        }}
                      >
                        <UnlockIcon />
                      </TableButton>
                    )
                  }
                  <TableButton
                    background="error"
                    onClick={() => {
                      setVendorCustomer(user);
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
        id={vendorCustomer?.phoneNumber!}
        open={lockDialog.open}
        onClose={lockDialog.onClose}
      />
      <UnlockDialog
        id={vendorCustomer?.phoneNumber!}
        open={unlockDialog.open}
        onClose={unlockDialog.onClose}
      />
      <DeleteVendorCustomerDialog
        id={vendorCustomer?.id!}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};

export default VendorsCustomersTable;
