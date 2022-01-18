import i18n from 'i18next';
import type { DocumentsFilterState, DocumentsResponse } from '../types';
import { getTodayEndDate, getTodayStartDate } from '../../../../../utils/dateFormat';
import type { TableHeadColumn } from '../../../../data-table/types';
import { OrderPaymentMethodData, OrderStatusData } from '../../../../orders/constants';

export const initialData: DocumentsResponse = {
  total: 0,
  content: [],
};

export const initialDocumentsFilterState: DocumentsFilterState = {
  page: 0,
  size: 25,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  id: null,
  customerPhoneNumber: null,
  vendorPhoneNumber: null,
  isMonth: false,
  isToday: true,
  startDate: getTodayStartDate(),
  endDate: getTodayEndDate(),
  paymentMethods: [],
  orderStatuses: [],
  techniqueIds: [],
};

export const DocumentsTableHeadColumns: TableHeadColumn<keyof DocumentsFilterState>[] = [
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
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'number',
      key: 'id',
    },
  },
  {
    title: i18n.t('table.headers.customer'),
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'phone',
      key: 'customerPhoneNumber',
    },
  },
  {
    title: i18n.t('table.headers.executor'),
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'phone',
      key: 'vendorPhoneNumber',
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
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'select',
      data: OrderStatusData,
      key: 'orderStatuses',
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
    title: i18n.t('table.headers.surcharge'),
    sortable: true,
    filterable: false,
    sort: {
      orderColumn: 'extraPrice',
      orderType: null,
    },
  },
  {
    title: i18n.t('table.headers.payment'),
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'select',
      data: OrderPaymentMethodData,
      key: 'paymentMethods',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    cellProps: {
      width: 150,
      align: 'center',
    },
    sortable: false,
    filterable: false,
  },
];

export const documentActionTypes = ['UPD', 'WAYBILL', 'PAYMENT_INVOICE', 'ADDITIONAL_PAYMENT_INVOICE'];
