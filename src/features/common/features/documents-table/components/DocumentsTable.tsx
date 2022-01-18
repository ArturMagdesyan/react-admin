import React, {
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import { DataTable } from '../../../../data-table/components';
import { DocumentsTableHeadColumns } from '../constants';
import type {
  TableFilterChange,
  TableHeadColumn,
} from '../../../../data-table/types';
import { TableFilterAction } from '../../../../../common/enums';
import { TablePagination } from '../../../../../components/TablePagination';
import { Technique } from '../../../../../components/Technique';
import { TableStatus } from '../../../../../components/TableStatus';
import { TableButton } from '../../../../../components/TableButton';
import { AddIcon } from '../../../../../components/Icons';
import { useDialog } from '../../../../../hooks';
import { AdditionalPriceDialog } from '../../../../dialogs/components';
import type { DocumentsResponse, DocumentsFilterState } from '../types';
import { DocumentActionMenu } from './DocumentActionMenu';

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

interface Props {
  data: DocumentsResponse;
  filterData: DocumentsFilterState;
  isFetched: boolean;
  dispatch: React.Dispatch<any>;
}

export const DocumentsTable = ({
  data: { total, content },
  filterData: { page, size, orderColumn, orderType },
  isFetched,
  dispatch,
}: Props) => {
  const [orderId, setOrderId] = useState<null | number>(null);
  const additionalPriceDialog = useDialog();
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
    DocumentsTableHeadColumns.map((column) => {
      if (column.sortable) {
        return {
          ...column,
          sort: {
            ...column.sort,
            documentType: column.sort!.orderColumn === orderColumn ? orderType : null,
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
            content.map((document) => (
              <TableRow key={document.id}>
                <TableCell align="center">
                  <Technique techniqueName={document.techniqueName} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {document.id}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {document.customerPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {document.vendorPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {document.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="orderStatus"
                    statusKey={document.orderStatus}
                  />
                </TableCell>
                <TableCell align="left">
                  <Box sx={styles.priceView}>
                    <TableButton
                      background="secondary"
                      disabled={!document.extraPriceAllowed}
                      onClick={() => {
                        setOrderId(document.id);
                        additionalPriceDialog.onTrigger();
                      }}
                    >
                      <AddIcon />
                    </TableButton>
                    <Box>
                      <Typography variant="body2" component="span">
                        {document.price}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {document.extraPrice}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {t(`orderPaymentMethod.${document.paymentMethod}`)}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  <DocumentActionMenu
                    file={document.files}
                    documentId={document.id}
                  />
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
      <AdditionalPriceDialog
        id={orderId!}
        open={additionalPriceDialog.open}
        onClose={additionalPriceDialog.onClose}
      />
    </>
  );
};
