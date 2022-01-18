import i18n from 'i18next';
import type {
  BlockListFilterState,
  CustomerFilterState,
  UserOrderFilterState,
  UsersFilterState,
  UsersTechniquesFilterState,
  UsersTechniquesResponse,
  UserTransactionFilterState,
  VendorFilterState,
  VendorsCustomersFilterState,
} from '../types';
import { UserCompanyType } from '../enums';
import type { TableHeadColumn } from '../../data-table/types';
import {
  OrderPaymentMethodData,
  OrderSourceData,
  OrderStatusData,
} from '../../orders/constants';
import { TransactionsIcon } from '../../../components/Icons';
import { TransactionOperationData } from '../../transactions/constants';

export const initData = {
  total: 0,
  content: [],
};

export const initVendorsFilterState: VendorFilterState = {
  page: 0,
  size: 25,
  startDate: null,
  endDate: null,
  balance: null,
  vendorDiscount: null,
  orderCount: null,
  phoneNumber: null,
  address: null,
  creationDate: null,
  nameWithCompany: null,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  companyTypes: [],
  techniqueIds: [],
};

export const initUserOrderFilterState: UserOrderFilterState = {
  id: null,
  page: 0,
  size: 25,
  price: null,
  extraPrice: null,
  rating: null,
  dateTime: null,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  orderStatuses: [],
  paymentMethods: [],
  sources: [],
};

export const initUsersFilterState: UsersFilterState = {
  techniqueIds: [],
  startDate: null,
  endDate: null,
};

export const initCustomersFilterState: CustomerFilterState = {
  page: 0,
  size: 25,
  startDate: null,
  endDate: null,
  orderCount: null,
  customerDiscount: null,
  balance: null,
  phoneNumber: null,
  orderType: 'DESC',
  orderColumn: 'creationDate',
  nameWithCompany: null,
  companyTypes: [],
  creationDate: null,
};

export const initVendorsCustomerFilterState: VendorsCustomersFilterState = {
  page: 0,
  size: 25,
  phoneNumber: null,
  nameWithCompany: null,
  address: null,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  companyTypes: [],
  techniqueNames: [],
};

export const initUsersTechniquesFilterState: UsersTechniquesFilterState = {
  page: 0,
  size: 25,
  vendorPhoneNumber: null,
  address: null,
  orderColumn: 'creationDate',
};

export const initUserTransactionsFilterState: UserTransactionFilterState = {
  page: 0,
  size: 25,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  operations: [],
};

export const usersTabNavigationData = [
  {
    title: 'vendors',
    path: '/users/vendors',
  },
  {
    title: 'customers',
    path: '/users/customers',
  },
  {
    title: 'vendorsAndCustomers',
    path: '/users/vendors-customers',
  },
  {
    title: 'blockSheet',
    path: '/users/block-list',
  },
  {
    title: 'technique',
    path: '/users/technique',
  },
];

export const userCompanyTypeData = [
  {
    key: UserCompanyType.INDIVIDUAL,
    value: i18n.t(`userCompanyType.${UserCompanyType.INDIVIDUAL}`),
  },
  {
    key: UserCompanyType.IP,
    value: i18n.t(`userCompanyType.${UserCompanyType.IP}`),
  },
  {
    key: UserCompanyType.OOO,
    value: i18n.t(`userCompanyType.${UserCompanyType.OOO}`),
  },
];

export const userProfileTabNavigationData = [
  {
    title: 'orders',
    path: 'orders',
  },
  {
    title: 'techniques',
    path: 'techniques',
  },
  {
    title: 'transactions',
    path: 'transactions',
  },
  {
    title: 'payment',
    path: 'payment',
  },
  {
    title: 'documents',
    path: 'documents',
  },
  {
    title: 'reviews',
    path: 'reviews',
  },
  {
    title: 'settings',
    path: 'settings',
  },
];

export const UsersOrdersTableHeadColumns: TableHeadColumn<keyof UserOrderFilterState>[] = [
  {
    title: i18n.t('table.headers.technique'),
    sortable: false,
    filterable: false,
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
    title: i18n.t('table.headers.date'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: 'DESC',
      orderColumn: 'creationDate',
    },
  },
  {
    title: i18n.t('table.headers.rating'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'rating',
    },
  },
  {
    title: i18n.t('table.headers.status'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'orderStatuses',
      fieldType: 'select',
      data: OrderStatusData,
    },
  },
  {
    title: i18n.t('table.headers.price'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'price',
    },
  },
  {
    title: i18n.t('table.headers.payment'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'paymentMethods',
      fieldType: 'select',
      data: OrderPaymentMethodData,
    },
  },
  {
    title: i18n.t('table.headers.source'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'sources',
      fieldType: 'select',
      data: OrderSourceData,
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];

export const CustomersTableHeadColumns: TableHeadColumn<keyof CustomerFilterState>[] = [
  {
    title: i18n.t('table.headers.loginPhone'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'phoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18n.t('table.headers.nameCompany'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'nameWithCompany',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.category'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'companyTypes',
      fieldType: 'select',
      data: userCompanyTypeData,
    },
  },
  {
    title: i18n.t('table.headers.date'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: 'DESC',
      orderColumn: 'date',
    },
  },
  {
    title: i18n.t('table.headers.orders'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'orders',
    },
  },
  {
    title: i18n.t('table.headers.rating'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'rating',
    },
  },
  {
    title: i18n.t('table.headers.discount'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'discount',
    },
  },
  {
    title: i18n.t('table.headers.balance'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'balance',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];

export const VendorsTableHeadColumns: TableHeadColumn<keyof VendorFilterState>[] = [
  {
    title: i18n.t('table.headers.technique'),
    sortable: false,
    filterable: false,
    cellProps: {
      align: 'center',
    },
  },
  {
    title: i18n.t('table.headers.loginPhone'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'phoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18n.t('table.headers.nameCompany'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'nameWithCompany',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.address'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'address',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.category'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'companyTypes',
      fieldType: 'select',
      data: userCompanyTypeData,
    },
  },
  {
    title: i18n.t('table.headers.date'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: 'DESC',
      orderColumn: 'creationDate',
    },
  },
  {
    title: i18n.t('table.headers.orders'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'orderCount',
    },
  },
  {
    title: i18n.t('table.headers.rating'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'rating',
    },
  },
  {
    title: i18n.t('table.headers.discount'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'discount',
    },
  },
  {
    title: i18n.t('table.headers.balance'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'balance',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    filterable: false,
    sortable: false,
  },
];

export const VendorsCustomersTableHeadColumns:
TableHeadColumn<keyof VendorsCustomersFilterState>[] = [
  {
    title: i18n.t('table.headers.technique'),
    filterable: false,
    sortable: false,
    cellProps: {
      align: 'center',
    },
  },
  {
    title: i18n.t('table.headers.loginPhone'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'phoneNumber',
      fieldType: 'phone',
    },
  },
  {
    title: i18n.t('table.headers.nameCompany'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'nameWithCompany',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.address'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'address',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.category'),
    filterable: true,
    sortable: false,
    filter: {
      key: 'companyTypes',
      fieldType: 'select',
      data: userCompanyTypeData,
    },
  },
  {
    title: i18n.t('table.headers.date'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: 'DESC',
      orderColumn: 'creationDate',
    },
  },
  {
    title: i18n.t('table.headers.orders'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'orders',
    },
  },
  {
    title: i18n.t('table.headers.rating'),
    subtitle: i18n.t('table.headers.vendorsAndCustomers'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'rating',
    },
  },
  {
    title: i18n.t('table.headers.discount'),
    subtitle: i18n.t('table.headers.vendorsAndCustomers'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'discount',
    },
  },
  {
    title: i18n.t('table.headers.balance'),
    subtitle: i18n.t('table.headers.vendorsAndCustomers'),
    filterable: false,
    sortable: true,
    sort: {
      orderType: null,
      orderColumn: 'balance',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    filterable: false,
    sortable: false,
  },
];

export const BlockListTableHeadColumns:
TableHeadColumn<keyof BlockListFilterState>[] = [
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
      key: 'orderId',
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
      orderType: 'DESC',
      orderColumn: 'creationDate',
    },
  },
  {
    title: i18n.t('table.headers.rating'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'rating',
    },
  },
  {
    title: i18n.t('table.headers.discount'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'discount',
    },
  },
  {
    title: i18n.t('table.headers.balance'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'balance',
    },
  },
  {
    title: i18n.t('table.headers.comment'),
    sortable: false,
    filterable: false,
    cellProps: {
      width: 350,
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];

export const UserTransactionsTableHeadColumns:
TableHeadColumn<keyof UserTransactionFilterState>[] = [
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
      orderType: null,
      orderColumn: 'type',
    },
  },
  {
    title: i18n.t('table.headers.operations'),
    sortable: false,
    filterable: true,
    cellProps: {
      width: 550,
    },
    filter: {
      key: 'operations',
      fieldType: 'select',
      data: TransactionOperationData,
    },
  },
  {
    title: i18n.t('table.headers.date'),
    sortable: true,
    filterable: false,
    cellProps: {
      width: 200,
    },
    sort: {
      orderColumn: 'creationDate',
      orderType: 'DESC',
    },
  },
  {
    title: i18n.t('table.headers.sum'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'price',
    },
  },
];

export const UsersTechniquesHeaderData: TableHeadColumn<keyof UsersTechniquesFilterState>[] = [
  {
    title: i18n.t('table.headers.executor'),
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'text',
      key: 'vendorPhoneNumber',
    },
  },
  {
    title: i18n.t('table.headers.address'),
    sortable: false,
    filterable: true,
    filter: {
      fieldType: 'text',
      key: 'address',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];

export const UsersTechniquesTable: UsersTechniquesResponse = {
  total: 6,
  content: [
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 1,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 2,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 3,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 4,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 5,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 6,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 7,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 8,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 9,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 10,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 11,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 12,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 13,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 14,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 15,
    },
    {
      vendorPhoneNumber: '+79161234567',
      address: 'Москва, улица Школьная 27',
      id: 16,
    },
  ],
};
