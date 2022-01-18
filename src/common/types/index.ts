import { TableFilterAction } from '../enums';

export type TableSortType = 'DESC' | 'ASC';

export type CsvResponseData = {
  mediaType: string;
  data: string;
};

export interface ReducerAction {
  type: TableFilterAction;
  value: any;
}
