import React, { useContext } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material';
import { UsersTechniquesContext } from '../contexts';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';
import { DataTable } from '../../data-table/components';
import { TablePagination } from '../../../components/TablePagination';
import { TableFilterChange } from '../../data-table/types';
import { TableFilterAction } from '../../../common/enums';
import { TableButton } from '../../../components/TableButton';
import { DeleteIcon } from '../../../components/Icons';
import { UsersTechniquesHeaderData } from '../constants';

const styles = {
  isFetched: (isFetched: boolean) => (
    isFetched ? {} : { opacity: '0.1' }
  ),
  paper: {
    '& .MuiTableHead-root': {
      '& .MuiTableRow-root': {
        '& > :first-of-type': {
          paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
        },
      },
    },
  },
  firstColumn: {
    paddingLeft: (theme: Theme) => `${theme.spacing(5)} !important`,
  },
  row: {
    cursor: 'pointer',
  },
};

export const TechniqueVendorsTable = () => {
  const {
    filtersState: { page, size },
    usersTechniquesData: { content, total },
    isFetched,
    isError,
    isLoading,
    dispatch,
  } = useContext(UsersTechniquesContext);

  const handleChange = (filterData: TableFilterChange) => {
    dispatch({ type: TableFilterAction.ADD_FILTER, value: filterData });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <>
      <DataTable
        paperStyles={styles.paper}
        tableHeadColumns={UsersTechniquesHeaderData}
        onFilterChange={handleChange}
      >
        <TableBody sx={styles.isFetched(isFetched)}>
          {
            content.map((user) => (
              <TableRow
                sx={styles.row}
                key={user.id}
              >
                <TableCell sx={styles.firstColumn}>
                  <Typography variant="body2">
                    {user.vendorPhoneNumber}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {user.address}
                  </Typography>
                </TableCell>
                <TableCell align="left" width="130">
                  <TableButton
                    background="error"
                    onClick={() => {
                      // TODO: add delete api when backend will be ready
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
        page={page}
        size={size}
        total={total}
        dispatch={dispatch}
      />
    </>
  );
};
