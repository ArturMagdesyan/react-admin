import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { OrderInnerContext } from '../contexts';
import { TablePagination } from '../../../components/TablePagination';
import { TableFilterAction } from '../../../common/enums';
import { bucketTableHeadColumns } from '../constants';
import { TableStatus } from '../../../components/TableStatus';
import { DataTable } from '../../data-table/components';
import { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';

const subTitleViewHeight = '44px';
const styles = {
  subTitleView: {
    height: subTitleViewHeight,
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px 20px 0 0',
  },
  paper: {
    height: `calc(94% - ${subTitleViewHeight})`,
    borderRadius: '0 0 20px 20px',
    '& .MuiTableHead-root': {
      '& .MuiTableRow-root': {
        '& > :first-of-type': {
          paddingLeft: (theme: Theme) => `${theme.spacing(3)} !important`,
        },
      },
    },
  },
  firstCol: {
    paddingLeft: (theme: Theme) => `${theme.spacing(3)} !important`,
  },
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
};

const BucketTable = () => {
  const {
    bucketListData: { content: bucketList, total },
    filters: { page, size, orderType, orderColumn },
    isError,
    isFetched,
    isLoading,
    dispatch,
  } = useContext(OrderInnerContext);
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
    bucketTableHeadColumns.map((column) => {
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

  if (!isFetched || isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <>
      <Box sx={styles.subTitleView}>
        <Typography variant="button" color="white">
          {t('table.headers.performers')}
        </Typography>
      </Box>
      <DataTable
        tableHeadColumns={tableHeadColumns}
        onFilterChange={handleChange}
        onSortClick={handleSortClick}
        paperStyles={styles.paper}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            bucketList.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell align="left" sx={styles.firstCol}>
                  <Typography variant="body2">
                    {vendor.phone}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.lastModifiedDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {vendor.route}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableStatus
                    translationKey="bucketListStatus"
                    statusKey={vendor.status}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    Voice
                  </Typography>
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

export default BucketTable;
