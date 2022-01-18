import { Technique } from '../../../common/enums';
import { TableSortType } from '../../../common/types';
import { AlarmStatus } from '../enums';

type Nullable<T> = { [K in keyof T]: T[K] | null };
export type AlarmType = 'A' | 'B';

export interface Alarm {
  id: number,
  techniqueName: Technique,
  orderId: number,
  customerPhoneNumber: string,
  vendorPhoneNumbers?: string[],
  vendorPhoneNumber?: string,
  creationDate: string,
  price: number,
  extraPrice: number,
  source: string,
  status: AlarmStatus,
}

export type AlarmsResponse = {
  total: number;
  content: Alarm[];
};

type OmitAlarmKeys =
  | 'id'
  | 'techniqueName'
  | 'creationDate'
  | 'price'
  | 'source'
  | 'status'
  | 'vendorPhoneNumbers'
  | 'extraPrice';

export interface AlarmFilterState extends Nullable<Omit<Alarm, OmitAlarmKeys>> {
  startDate: string;
  endDate: string;
  techniqueIds: [];
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  isToday: boolean;
  isMonth: boolean;
  sources: [];
  statuses: [];
}
