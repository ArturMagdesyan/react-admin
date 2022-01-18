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
import { VendorsContext } from '../contexts';
import { Technique } from '../../../components/Technique';
import { TablePagination } from '../../../components/TablePagination';
import { TableStatus } from '../../../components/TableStatus';
import { TableFilterAction } from '../../../common/enums';
import { useDialog } from '../../../hooks';
import InternalLink from '../../../components/InternalLink';
import { DataTable } from '../../data-table/components';
import { VendorsTableHeadColumns } from '../constants';
import { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import {
  DeleteVendorDialog,
  LockDialog,
  UnlockDialog,
} from '../../dialogs';
import { TableButton } from '../../../components/TableButton';
import { UnlockIcon, LockIcon, DeleteIcon } from '../../../components/Icons';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';
import type { Vendor } from '../types';

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

export const VendorsTable = () => {
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const lockDialog = useDialog();
  const unlockDialog = useDialog();
  const deleteDialog = useDialog();
  const {
    vendorFilterState: { size, page, orderColumn, orderType },
    vendorsData: { content: vendors, total },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(VendorsContext);

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
    VendorsTableHeadColumns.map((column) => {
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
            vendors.map((vendor) => (
              <TableRow
                key={vendor.id}
                sx={styles.row}
              >
                <TableCell align="center">
                  <Technique techniqueName={vendor.techniqueNames[0]} />
                </TableCell>
                <TableCell align="left">
                  <InternalLink
                    to={`/users/vendors/${vendor.phoneNumber}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Typography variant="body2" component="span">
                      {vendor.phoneNumber}
                    </Typography>
                  </InternalLink>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.nameWithCompany}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.address}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="userCompanyType"
                    statusKey={vendor.companyType}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.orderCount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    1-5
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.vendorDiscount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    color={vendor.balance < 0 ? 'error' : 'inherit'}
                  >
                    {vendor.balance}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  {
                    vendor.locked ? (
                      <TableButton
                        background="info"
                        onClick={() => {
                          setCurrentVendor(vendor);
                          unlockDialog.onTrigger();
                        }}
                      >
                        <LockIcon />
                      </TableButton>
                    ) : (
                      <TableButton
                        background="success"
                        onClick={() => {
                          setCurrentVendor(vendor);
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
                      setCurrentVendor(vendor);
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
        id={currentVendor?.phoneNumber!}
        open={lockDialog.open}
        onClose={lockDialog.onClose}
      />
      <UnlockDialog
        id={currentVendor?.phoneNumber!}
        open={unlockDialog.open}
        onClose={unlockDialog.onClose}
      />
      <DeleteVendorDialog
        id={currentVendor?.id!}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};
