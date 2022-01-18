import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { OrdersContext } from '../contexts';
import { TableStatus } from '../../../components/TableStatus';
import { Technique } from '../../../components/Technique';
import { useDialog } from '../../../hooks';
import { OrdersTableHeadColumns } from '../constants';
import { TableFilterAction } from '../../../common/enums';
import { TablePagination } from '../../../components/TablePagination';
import InternalLink from '../../../components/InternalLink';
import { DataTable } from '../../data-table/components';
import type { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import {
  CancelDialog,
  AdditionalPriceDialog,
  CommissionRefundDialog,
  TotalRefundDialog,
} from '../../dialogs';
import { TableButton } from '../../../components/TableButton';
import {
  AddIcon,
  CloseIcon,
  PercentIcon,
  RefundIcon,
} from '../../../components/Icons';
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
  row: {
    cursor: 'pointer',
  },
};

export const OrdersTable = () => {
  const {
    data: { content: orders, total },
    isFetched,
    isError,
    isLoading,
    dispatch,
    filters: {
      size,
      page,
      orderType,
      orderColumn,
    },
  } = useContext(OrdersContext);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const additionalPriceDialog = useDialog();
  const cancelDialog = useDialog();
  const commissionRefundDialog = useDialog();
  const totalRefundDialog = useDialog();

  const handleChange = (filterData : TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  const onNavigate = (id: number, customerPhoneNumber: string) => {
    navigate(
      `${id}`,
      { state: { id, customerPhoneNumber } },
    );
  };

  const handleSortClick = (field: string) => {
    dispatch({
      type: TableFilterAction.ADD_SORT,
      value: field,
    });
  };

  const tableHeadColumns = useMemo(() => (
    OrdersTableHeadColumns.map((column) => {
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
            orders.map((order) => (
              <TableRow
                key={order.id}
                sx={styles.row}
                onClick={() => onNavigate(order.id, order.customerPhoneNumber)}
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
                  <InternalLink
                    to={`/users/customers/${order.customerPhoneNumber}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Typography variant="body2" component="span">
                      {order.customerPhoneNumber}
                    </Typography>
                  </InternalLink>
                </TableCell>
                <TableCell align="left">
                  <InternalLink
                    to={`/users/vendors/${order.vendorPhoneNumber}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Typography variant="body2" component="span">
                      {order.vendorPhoneNumber}
                    </Typography>
                  </InternalLink>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {order.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="orderStatus"
                    statusKey={order.orderStatus}
                  />
                </TableCell>
                <TableCell align="left">
                  <Box sx={styles.priceView}>
                    <TableButton
                      background="secondary"
                      disabled={!order.extraPriceAllowed}
                      onClick={(event) => {
                        setOrderId(order.id);
                        additionalPriceDialog.onTrigger();
                        event.stopPropagation();
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
                  <Typography variant="body2">
                    {t(`orderPaymentMethod.${order.paymentMethod}`)}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {order.source}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  <TableButton
                    disabled={!order.cancelAllowed}
                    background="error"
                    onClick={(event) => {
                      setOrderId(order.id);
                      cancelDialog.onTrigger();
                      event.stopPropagation();
                    }}
                  >
                    <CloseIcon />
                  </TableButton>
                  <TableButton
                    disabled={!order.commissionRefundAllowed}
                    background="warning"
                    onClick={(event) => {
                      setOrderId(order.id);
                      commissionRefundDialog.onTrigger();
                      event.stopPropagation();
                    }}
                  >
                    <PercentIcon />
                  </TableButton>
                  <TableButton
                    disabled={!order.totalRefundAllowed}
                    background="success"
                    onClick={(event) => {
                      setOrderId(order.id);
                      totalRefundDialog.onTrigger();
                      event.stopPropagation();
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
      <TotalRefundDialog
        id={orderId!}
        open={totalRefundDialog.open}
        onClose={totalRefundDialog.onClose}
      />
    </>
  );
};
