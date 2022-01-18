import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import type {
  TableHeadColumn,
  TableFilterChange,
} from '../types';
import { TableInputField } from '../../../components/TableInputField';
import { TableSortButton } from '../../../components/TableSortButton';
import { TableSelectInput } from '../../../components/TableSelectInput';

interface Props {
  tableHeadColumns: TableHeadColumn<string>[];
  onSortClick?: (fieldName: string) => void;
  onFilterChange?: (value: TableFilterChange) => void;
}

const DataTableHead = ({
  tableHeadColumns,
  onSortClick = () => {},
  onFilterChange = () => {},
}: Props) => (
  <TableHead>
    <TableRow>
      {
        tableHeadColumns.map((column, i) => {
          const Icon = column.icon;

          return (
            <TableCell
              key={i.toString()}
              align={column?.cellProps?.align || 'left'}
              width={column?.cellProps?.width}
            >
              {!!Icon && (
                column.sortable
                  ? (
                    <Button
                      sx={{ minWidth: '24px' }}
                      onClick={() => {
                        onSortClick(column.sort!.orderColumn);
                      }}
                    >
                      <Icon />
                    </Button>
                  ) : (
                    <Icon />
                  )
              )}
              {(!column.filter && !column.sortable) && column.title}
              {
                column.filterable && (
                  column.filter?.fieldType === 'select'
                    ? (
                      <TableSelectInput
                        label={column.title}
                        items={column.filter.data}
                        onChange={(e) => {
                          onFilterChange({
                            key: column.filter!.key,
                            value: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      <TableInputField
                        label={column.title}
                        type={column.filter!.fieldType}
                        onChange={(value) => {
                          onFilterChange({
                            key: column.filter!.key,
                            value,
                          });
                        }}
                      />
                    )
                )
              }
              {
                (column.sortable && !Icon) && (
                  <TableSortButton
                    title={column.title}
                    subTitle={column.subtitle || ''}
                    orderType={column.sort!.orderType}
                    onClick={() => onSortClick(column.sort!.orderColumn)}
                  />
                )
              }
            </TableCell>
          );
        })
      }
    </TableRow>
  </TableHead>
);

export default DataTableHead;
