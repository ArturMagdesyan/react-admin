import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import { TableFilterAction } from '../../../common/enums';
import { Technique } from '../../../components/Technique';
import { TableStatus } from '../../../components/TableStatus';
import { TablePagination } from '../../../components/TablePagination';
import { useDialog } from '../../../hooks';
import { UserOrder } from '../types';
import { TableSortType } from '../../../common/types';
import { DataTable } from '../../data-table/components';
import { UsersOrdersTableHeadColumns } from '../constants';
import { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import {
  CancelDialog,
  CommissionRefundDialog,
  TotalRefundDialog,
  AdditionalPriceDialog,
} from '../../dialogs';
import { TableButton } from '../../../components/TableButton';
import {
  AddIcon,
  CloseIcon,
  PercentIcon,
  RefundIcon,
} from '../../../components/Icons';

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
  row: {
    cursor: 'pointer',
  },
};

interface Props {
  dispatch: React.Dispatch<any>;
  userOrders: UserOrder[];
  total: number;
  page: number;
  size: number;
  orderType: TableSortType | null,
  orderColumn: string;
  isFetched: boolean;
}

export const UserOrdersTable = ({
  total,
  size,
  page,
  userOrders,
  orderType,
  orderColumn,
  isFetched,
  dispatch,
}: Props) => {
  const [orderId, setOrderId] = useState<number | null>(null);
  const additionalPriceDialog = useDialog();
  const cancelDialog = useDialog();
  const commissionRefundDialog = useDialog();
  const totalRefundDialog = useDialog();
  const { t } = useTranslation();

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
    UsersOrdersTableHeadColumns.map((column) => {
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

  return (
    <>
      <DataTable
        tableHeadColumns={tableHeadColumns}
        onFilterChange={handleChange}
        onSortClick={handleSortClick}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            userOrders.map((order) => (
              <TableRow
                key={order.id}
                sx={styles.row}
              >
                <TableCell align="center">
                  <Technique techniqueName={order.techniqueName} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {order.id}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {order.dateTime}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    1-5
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="orderStatus"
                    statusKey={order.status}
                  />
                </TableCell>
                <TableCell align="left">
                  <Box sx={styles.priceView}>
                    <TableButton
                      background="secondary"
                      disabled={!order.extraPriceAllowed}
                      onClick={() => {
                        setOrderId(order.id);
                        additionalPriceDialog.onTrigger();
                      }}
                    >
                      <AddIcon />
                    </TableButton>
                    <Box>
                      <Typography variant="body2" component="span">
                        {order.price}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', fontWeight: 500 }}
                        variant="caption"
                        color="error"
                      >
                        {order.extraPrice}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  {t(`orderPaymentMethod.${order.paymentMethod}`)}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.source}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  <TableButton
                    disabled={!order.cancelAllowed}
                    background="error"
                    onClick={() => {
                      setOrderId(order.id);
                      cancelDialog.onTrigger();
                    }}
                  >
                    <CloseIcon />
                  </TableButton>
                  <TableButton
                    disabled={!order.commissionRefundAllowed}
                    background="warning"
                    onClick={() => {
                      setOrderId(order.id);
                      commissionRefundDialog.onTrigger();
                    }}
                  >
                    <PercentIcon />
                  </TableButton>
                  <TableButton
                    disabled={!order.totalRefundAllowed}
                    background="success"
                    onClick={() => {
                      setOrderId(order.id);
                      totalRefundDialog.onTrigger();
                    }}
                  >
                    <RefundIcon />
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
      <AdditionalPriceDialog
        id={orderId!}
        open={additionalPriceDialog.open}
        onClose={additionalPriceDialog.onClose}
      />
      <TotalRefundDialog
        id={orderId!}
        open={totalRefundDialog.open}
        onClose={totalRefundDialog.onClose}
      />
      <CancelDialog
        id={orderId!}
        open={cancelDialog.open}
        onClose={cancelDialog.onClose}
      />
      <CommissionRefundDialog
        id={orderId!}
        open={commissionRefundDialog.open}
        onClose={commissionRefundDialog.onClose}
      />
    </>
  );
};
