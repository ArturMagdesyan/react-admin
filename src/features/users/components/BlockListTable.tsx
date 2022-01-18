import React, { useContext, useMemo, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import { DataTable } from '../../data-table/components';
import { BlockListTableHeadColumns } from '../constants';
import { TableFilterChange, TableHeadColumn } from '../../data-table/types';
import { TableFilterAction } from '../../../common/enums';
import { BlockListContext } from '../contexts';
import { Technique } from '../../../components/Technique';
import { TablePagination } from '../../../components/TablePagination';
import { TableCommentField } from '../../../components/TableCommentField';
import { useUpdateBlockListComment } from '../api';
import { TableButton } from '../../../components/TableButton';
import { DeleteIcon, LockIcon } from '../../../components/Icons';
import { NoTableContent } from '../../../components/NoTableContent';
import { useDialog } from '../../../hooks';
import { DeleteBlockListUser, EditCommentDialog, UnlockDialog } from '../../dialogs';
import type { BlockListItem } from '../types';
import { Spinner } from '../../../components/Spinner';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
};

const BlockListTable = () => {
  const [currentBlockList, setCurrentBlockList] = useState<BlockListItem | null>(null);
  const commentDialog = useDialog();
  const unlockDialog = useDialog();
  const deleteDialog = useDialog();
  const {
    blockListData: { total, content },
    filterData: { page, size, orderType, orderColumn },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(BlockListContext);
  const updateBlockListCommentMutation = useUpdateBlockListComment();

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
    BlockListTableHeadColumns.map((column) => {
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
            content.map((blockListItem) => (
              <TableRow
                key={blockListItem.id}
              >
                <TableCell align="center">
                  <Technique techniqueName={blockListItem.techniqueNames[0]} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {blockListItem.orderId}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {blockListItem.vendorPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {blockListItem.creationDate}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    1-5
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {blockListItem.discount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {blockListItem.debtAmount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <TableCommentField
                    comment={blockListItem.comment}
                    onSubmit={() => {
                      commentDialog.onTrigger();
                      setCurrentBlockList(blockListItem);
                    }}
                  />
                </TableCell>
                <TableCell align="left" width="130">
                  <TableButton
                    background="info"
                    onClick={() => {
                      setCurrentBlockList(blockListItem);
                      unlockDialog.onTrigger();
                    }}
                  >
                    <LockIcon />
                  </TableButton>
                  <TableButton
                    background="error"
                    onClick={() => {
                      setCurrentBlockList(blockListItem);
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
      <EditCommentDialog
        open={commentDialog.open}
        initialComment={currentBlockList?.comment || ''}
        onSuccess={(comment) => {
          updateBlockListCommentMutation.mutate({
            id: currentBlockList!.id,
            comment,
          });
        }}
        onClose={commentDialog.onClose}
      />
      <UnlockDialog
        id={currentBlockList?.vendorPhoneNumber!}
        open={unlockDialog.open}
        onClose={unlockDialog.onClose}
      />
      <DeleteBlockListUser
        id={currentBlockList?.vendorPhoneNumber!}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};

export default BlockListTable;
