import React from 'react';
import { SystemStyleObject } from '@mui/system';
import { Theme } from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import DataTableHead from './DataTableHead';
import { TableFilterChange, TableHeadColumn } from '../types';

const styles = {
  paper: {
    height: '100%',
    overflow: 'auto',
    borderRadius: '20px',
    boxShadow: 1,
  },
};

interface Props {
  paperStyles?: SystemStyleObject<Theme>;
  tableHeadColumns: TableHeadColumn<string>[];
  onSortClick?: (fieldName: string) => void;
  onFilterChange?: (props: TableFilterChange) => void;
}

export const DataTable: React.FC<Props> = ({
  tableHeadColumns,
  onSortClick,
  onFilterChange,
  paperStyles = {},
  children,
}) => (
  <Paper sx={{ ...styles.paper, ...paperStyles }}>
    <Table stickyHeader>
      <DataTableHead
        tableHeadColumns={tableHeadColumns}
        onSortClick={onSortClick}
        onFilterChange={onFilterChange}
      />
      {children}
    </Table>
  </Paper>
);
