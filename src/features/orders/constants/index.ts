import i18n from 'i18next';
import { BucketListFilterState, OrderFilterState } from '../types';
import { BucketStatus } from '../enums';
import {
  OrderPaymentMethod,
  OrderSource,
  OrderStatus,
  Technique,
} from '../../../common/enums';
import { getTodayEndDate, getTodayStartDate } from '../../../utils/dateFormat';
import { TableHeadColumn } from '../../data-table/types';
import { BlockListFilterState } from '../../users/types';

export const initOrderFilterState: OrderFilterState = {
  page: 0,
  size: 25,
  isToday: true,
  isMonth: false,
  startDate: getTodayStartDate(),
  endDate: getTodayEndDate(),
  id: null,
  orderType: 'DESC',
  orderColumn: 'creationDate',
  customerPhoneNumber: null,
  vendorPhoneNumber: null,
  techniqueIds: [],
  orderStatuses: [],
  paymentMethods: [],
  sources: [],
};

export const initBucketListFilterData: BucketListFilterState = {
  page: 0,
  size: 25,
  phone: null,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  statuses: [],
};

export const initBlockListFilterData: BlockListFilterState = {
  page: 0,
  size: 25,
  vendorPhoneNumber: null,
  orderId: null,
  rating: null,
  orderType: 'DESC',
  orderColumn: 'creationDate',
  techniqueNames: [],
};

export const initData = {
  total: 0,
  content: [],
};

export const OrderStatusData = [
  {
    key: OrderStatus.SENT_TO_MANAGER,
    value: i18n.t(`orderStatus.${OrderStatus.SENT_TO_MANAGER}`),
  },
  {
    key: OrderStatus.IN_PROGRESS,
    value: i18n.t(`orderStatus.${OrderStatus.IN_PROGRESS}`),
  },
  {
    key: OrderStatus.CANCELED,
    value: i18n.t(`orderStatus.${OrderStatus.CANCELED}`),
  },
  {
    key: OrderStatus.FINISHED,
    value: i18n.t(`orderStatus.${OrderStatus.FINISHED}`),
  },
  {
    key: OrderStatus.ISSUED,
    value: i18n.t(`orderStatus.${OrderStatus.ISSUED}`),
  },
];

export const OrderPaymentMethodData = [
  {
    key: OrderPaymentMethod.CASH,
    value: i18n.t(`orderPaymentMethod.${OrderPaymentMethod.CASH}`),
  },
  {
    key: OrderPaymentMethod.NOT_CASH,
    value: i18n.t(`orderPaymentMethod.${OrderPaymentMethod.NOT_CASH}`),
  },
  {
    key: OrderPaymentMethod.CARD,
    value: i18n.t(`orderPaymentMethod.${OrderPaymentMethod.CARD}`),
  },
];

export const OrderSourceData = [
  {
    key: OrderSource.WEB,
    value: i18n.t(`orderSource.${OrderSource.WEB}`),
  },
  {
    key: OrderSource.IOS,
    value: i18n.t(`orderSource.${OrderSource.IOS}`),
  },
  {
    key: OrderSource.ANDROID,
    value: i18n.t(`orderSource.${OrderSource.ANDROID}`),
  },
];

export const TechniqueData = [
  {
    key: Technique.MANIPULATOR,
    value: i18n.t(`techniques.${Technique.MANIPULATOR}`),
  },
  {
    key: Technique.LONG_VEHICLE,
    value: i18n.t(`techniques.${Technique.LONG_VEHICLE}`),
  },
  {
    key: Technique.CRANE,
    value: i18n.t(`techniques.${Technique.CRANE}`),
  },
  {
    key: Technique.CONCRETE_PUMP,
    value: i18n.t(`techniques.${Technique.CONCRETE_PUMP}`),
  },
  {
    key: Technique.AUTO_TOWER,
    value: i18n.t(`techniques.${Technique.AUTO_TOWER}`),
  },
];

export const bucketListStatusData = [
  {
    key: BucketStatus.ACCEPTED,
    value: i18n.t(`bucketListStatus.${BucketStatus.ACCEPTED}`),
  },
  {
    key: BucketStatus.DECLINED,
    value: i18n.t(`bucketListStatus.${BucketStatus.DECLINED}`),
  },
  {
    key: BucketStatus.FINISHED,
    value: i18n.t(`bucketListStatus.${BucketStatus.FINISHED}`),
  },
  {
    key: BucketStatus.READ,
    value: i18n.t(`bucketListStatus.${BucketStatus.READ}`),
  },
  {
    key: BucketStatus.REJECTED,
    value: i18n.t(`bucketListStatus.${BucketStatus.REJECTED}`),
  },
];

export const OrdersTableHeadColumns: TableHeadColumn<keyof OrderFilterState>[] = [
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
    title: i18n.t('table.headers.source'),
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'select',
      data: OrderSourceData,
      key: 'sources',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];

export const bucketTableHeadColumns: TableHeadColumn<keyof BucketListFilterState>[] = [
  {
    title: i18n.t('table.headers.executor'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'phone',
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
    title: i18n.t('table.headers.path'),
    sortable: true,
    filterable: false,
    sort: {
      orderColumn: 'path',
      orderType: null,
    },
  },
  {
    title: i18n.t('table.headers.status'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'statuses',
      fieldType: 'select',
      data: bucketListStatusData,
    },
  },
  {
    title: i18n.t('table.headers.record'),
    sortable: false,
    filterable: false,
  },
];
