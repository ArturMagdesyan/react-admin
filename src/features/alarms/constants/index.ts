import i18n from 'i18next';
import { getTodayStartDate, getTodayEndDate } from '../../../utils/dateFormat';
import { TableHeadColumn, TableSelectInput } from '../../data-table/types';
import { OrderSourceData } from '../../orders/constants';
import { AlarmStatus } from '../enums';
import { AlarmFilterState } from '../types';

export const initAlarmsFilterState: AlarmFilterState = {
  page: 0,
  size: 25,
  orderType: 'DESC',
  orderColumn: 'creationDate',
  orderId: null,
  vendorPhoneNumber: null,
  customerPhoneNumber: null,
  isMonth: false,
  isToday: true,
  startDate: getTodayStartDate(),
  endDate: getTodayEndDate(),
  sources: [],
  statuses: [],
  techniqueIds: [],
};

export const initData = {
  total: 0,
  content: [],
};

const AlarmStatusesData: TableSelectInput[] = [
  {
    value: i18n.t(`alarms.statuses.${AlarmStatus.VENDOR_CONFIRMED}`),
    key: AlarmStatus.VENDOR_CONFIRMED,
  },
  {
    value: i18n.t(`alarms.statuses.${AlarmStatus.NOT_CONFIRMED}`),
    key: AlarmStatus.NOT_CONFIRMED,
  },
];

export const AlarmTableHeaderData: TableHeadColumn<keyof AlarmFilterState>[] = [
  {
    title: i18n.t('table.headers.technique'),
    filterable: false,
    sortable: false,
    cellProps: {
      align: 'center',
    },
  },
  {
    title: i18n.t('table.headers.orderNumber'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'orderId',
      fieldType: 'number',
    },
  },
  {
    title: i18n.t('table.headers.customer'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'customerPhoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18n.t('table.headers.executor'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'vendorPhoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18n.t('table.headers.date'),
    sortable: true,
    filterable: false,
    sort: {
      orderColumn: 'creationDate',
      orderType: 'DESC',
    },
  },
  {
    title: i18n.t('table.headers.status'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'statuses',
      fieldType: 'select',
      data: AlarmStatusesData,
    },
  },
  {
    title: i18n.t('table.headers.price'),
    sortable: true,
    filterable: false,
    sort: {
      orderColumn: 'price',
      orderType: null,
    },
  },
  {
    title: i18n.t('table.headers.source'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'sources',
      fieldType: 'select',
      data: OrderSourceData,
    },
  },
  {
    title: i18n.t('table.headers.record'),
    filterable: false,
    sortable: false,
  },
  {
    title: i18n.t('table.headers.actions'),
    filterable: false,
    sortable: false,
  },
];
