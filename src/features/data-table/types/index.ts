import { SxProps } from '@mui/system';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap, Theme } from '@mui/material';
import { TableSortType } from '../../../common/types';

type CellAlign = 'left' | 'center' | 'right';
type FilterFieldType = 'number' | 'text' | 'phone' | 'select';
export type TableSelectInput = {
  key: string,
  value: string,
};

export interface TableHeadColumn<FilterKeyType> {
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  subtitle?: string;
  filterable: boolean;
  sortable: boolean;
  styles?: SxProps<Theme>;
  cellProps?: {
    align?: CellAlign;
    width?: number;
  };
  filter?: {
    key: FilterKeyType;
    fieldType: FilterFieldType;
    data?: TableSelectInput[];
  };
  sort?: {
    orderColumn: string;
    orderType: TableSortType | null;
  };
}

export interface TableFilterChange {
  key: string;
  value: string[] | string;
}
