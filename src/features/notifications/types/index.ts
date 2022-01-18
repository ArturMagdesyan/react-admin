import { TableSortType } from '../../../common/types';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface Notification {
  id: number;
  phoneNumber: string;
  message: string;
  sentDate: string;
  receivedDate: string | null;
}

export type NotificationResponse = {
  total: number,
  content: Notification[],
};

export interface NotificationsFilterState
  extends Nullable<Omit<Notification, 'id' | 'sentDate' | 'receivedDate'>> {
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  startDate: string;
  endDate: string;
  isMonth: boolean;
  isToday: boolean;
}
