import i18next from 'i18next';
import type { NotificationsFilterState } from '../types';
import { getTodayEndDate, getTodayStartDate } from '../../../utils/dateFormat';
import { TableHeadColumn } from '../../data-table/types';

export const initialData = {
  total: 0,
  content: [],
};

export const initialNotificationsFilterState: NotificationsFilterState = {
  page: 0,
  size: 25,
  orderType: 'DESC',
  orderColumn: 'sentDate',
  phoneNumber: null,
  message: null,
  isMonth: false,
  isToday: true,
  startDate: getTodayStartDate(),
  endDate: getTodayEndDate(),
};

export const notificationsTableHeadColumns: TableHeadColumn<keyof NotificationsFilterState>[] = [
  {
    title: i18next.t('table.headers.user'),
    cellProps: {
      width: 250,
    },
    filterable: true,
    sortable: false,
    filter: {
      key: 'phoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18next.t('table.headers.text'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'message',
      fieldType: 'text',
    },
  },
  {
    title: i18next.t('table.headers.timeOfDispatch'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: 'DESC',
      orderColumn: 'sentDate',
    },
  },
  {
    title: i18next.t('table.headers.timeOfDelivery'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'receivedDate',
    },
  },
  {
    title: i18next.t('table.headers.actions'),
    filterable: false,
    sortable: false,
  },
];
