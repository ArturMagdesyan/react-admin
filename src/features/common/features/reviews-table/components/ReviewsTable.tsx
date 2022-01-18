import React, { useMemo } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { DataTable } from '../../../../data-table/components';
import { ReviewsTableHeaderData } from '../constants';
import { TableFilterAction } from '../../../../../common/enums';
import { TablePagination } from '../../../../../components/TablePagination';
import { Technique } from '../../../../../components/Technique';
import type {
  ReviewResponse,
  ReviewsFilterState,
} from '../types';
import type {
  TableFilterChange,
  TableHeadColumn,
} from '../../../../data-table/types';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
};

interface Props {
  data: ReviewResponse,
  filterData: ReviewsFilterState,
  isFetched: boolean,
  dispatch: React.Dispatch<any>,
}

export const ReviewsTable = ({
  data: { total, content },
  filterData: { page, size, orderColumn, orderType },
  isFetched,
  dispatch,
}: Props) => {
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
    ReviewsTableHeaderData.map((column) => {
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
        onSortClick={handleSortClick}
        onFilterChange={handleChange}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((review) => (
              <TableRow key={review.id}>
                <TableCell align="center">
                  <Technique techniqueName={review.techniqueNames[0]} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {review.orderId}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {review.customerPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {review.vendorPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {review.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  {review.rating}
                </TableCell>
                <TableCell align="left" width="130">
                  {review.comment}
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
