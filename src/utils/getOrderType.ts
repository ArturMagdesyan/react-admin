import { TableSortType } from '../common/types';

export const getOrderType = ({
  orderType,
  orderColumn,
  newOrderColumn,
}: {
  orderType: TableSortType | null,
  orderColumn: string,
  newOrderColumn: string,
}): TableSortType | null => {
  if (newOrderColumn !== orderColumn || !orderType) return 'DESC';
  if (orderType === 'DESC') return 'ASC';

  return null;
};
