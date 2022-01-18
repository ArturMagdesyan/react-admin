import i18next from 'i18next';
import type { TransactionFilterState } from '../types';
import { TransactionOperation, TransactionStatus } from '../enums';
import type { TableHeadColumn } from '../../data-table/types';
import { OrderPaymentMethodData } from '../../orders/constants';
import { TransactionsIcon } from '../../../components/Icons';

export const initTransactionsFilterState: TransactionFilterState = {
  page: 0,
  size: 25,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  companyTin: null,
  phoneNumber: null,
  nameWithCompany: null,
  isToday: true,
  isMonth: false,
  orderId: null,
  paymentMethods: [],
  statuses: [],
  types: [],
  operations: [],
};

export const initData = {
  total: 0,
  content: [],
};

export const TransactionStatusData = [
  {
    key: TransactionStatus.PENDING,
    value: i18next.t(`transactions.status.${TransactionStatus.PENDING}`),
  },
  {
    key: TransactionStatus.APPROVED,
    value: i18next.t(`transactions.status.${TransactionStatus.APPROVED}`),
  },
];

export const TransactionOperationData = [
  {
    key: TransactionOperation.NOT_VERIFIED_ADD_BALANCE,
    value: i18next.t(`transactions.operation.${TransactionOperation.NOT_VERIFIED_ADD_BALANCE}`),
  },
  {
    key: TransactionOperation.VERIFIED_ADD_BALANCE,
    value: i18next.t(`transactions.operation.${TransactionOperation.VERIFIED_ADD_BALANCE}`),
  },
  {
    key: TransactionOperation.FEE_REFUND,
    value: i18next.t(`transactions.operation.${TransactionOperation.FEE_REFUND}`),
  },
  {
    key: TransactionOperation.REFUND_30_PERCENT,
    value: i18next.t(`transactions.operation.${TransactionOperation.REFUND_30_PERCENT}`),
  },
  {
    key: TransactionOperation.REFUND_70_PERCENT,
    value: i18next.t(`transactions.operation.${TransactionOperation.REFUND_70_PERCENT}`),
  },
  {
    key: TransactionOperation.FULL_REFUND,
    value: i18next.t(`transactions.operation.${TransactionOperation.FULL_REFUND}`),
  },
  {
    key: TransactionOperation.WITHDRAW,
    value: i18next.t(`transactions.operation.${TransactionOperation.WITHDRAW}`),
  },
  {
    key: TransactionOperation.EXTRA_PAYMENT,
    value: i18next.t(`transactions.operation.${TransactionOperation.EXTRA_PAYMENT}`),
  },
  {
    key: TransactionOperation.FEE_EXTRA_PAYMENT,
    value: i18next.t(`transactions.operation.${TransactionOperation.FEE_EXTRA_PAYMENT}`),
  },
  {
    key: TransactionOperation.MANUAL,
    value: i18next.t(`transactions.operation.${TransactionOperation.MANUAL}`),
  },
  {
    key: TransactionOperation.BUCKET_LIST_CHARGE,
    value: i18next.t(`transactions.operation.${TransactionOperation.BUCKET_LIST_CHARGE}`),
  },
  {
    key: TransactionOperation.EARNED_AMOUNT,
    value: i18next.t(`transactions.operation.${TransactionOperation.EARNED_AMOUNT}`),
  },
  {
    key: TransactionOperation.PAID_AMOUNT,
    value: i18next.t(`transactions.operation.${TransactionOperation.PAID_AMOUNT}`),
  },
  {
    key: TransactionOperation.EXTRA_WORK_AMOUNT,
    value: i18next.t(`transactions.operation.${TransactionOperation.EXTRA_WORK_AMOUNT}`),
  },
];

export const TransactionsTableHeadColumns: TableHeadColumn<keyof TransactionFilterState>[] = [
  {
    title: '',
    icon: TransactionsIcon,
    sortable: true,
    filterable: false,
    cellProps: {
      width: 80,
      align: 'center',
    },
    sort: {
      orderColumn: 'type',
      orderType: null,
    },
  },
  {
    title: i18next.t('table.headers.operations'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'operations',
      fieldType: 'select',
      data: TransactionOperationData,
    },
  },
  {
    title: i18next.t('table.headers.loginPhone'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'phoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18next.t('table.headers.companyTin'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'companyTin',
      fieldType: 'number',
    },
  },
  {
    title: i18next.t('table.headers.nameCompany'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'nameWithCompany',
      fieldType: 'number',
    },
  },
  {
    title: i18next.t('table.headers.date'),
    sortable: true,
    filterable: false,
    sort: {
      orderColumn: 'creationDate',
      orderType: 'DESC',
    },
  },
  {
    title: i18next.t('table.headers.status'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'statuses',
      fieldType: 'select',
      data: TransactionStatusData,
    },
  },
  {
    title: i18next.t('table.headers.sum'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'amount',
    },
  },
  {
    title: i18next.t('table.headers.payment'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'paymentMethods',
      fieldType: 'select',
      data: OrderPaymentMethodData,
    },
  },
  {
    title: i18next.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];
