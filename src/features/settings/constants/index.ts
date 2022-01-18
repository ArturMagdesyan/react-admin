import i18n from 'i18next';
import { UserRole } from '../../../common/enums';
import type { TableHeadColumn, TableSelectInput } from '../../data-table/types';
import { UserStatus } from '../enums';
import type { SettingsFilterState } from '../types';

export const initData = {
  total: 0,
  content: [],
};

export const initSettingsFilterState: SettingsFilterState = {
  page: 0,
  size: 25,
  orderType: 'DESC',
  orderColumn: 'registrationDate',
  name: null,
  phone: null,
  email: null,
  states: [],
  roles: [],
};

export const UserStatusData: TableSelectInput[] = [
  {
    key: UserStatus.LOCKED,
    value: i18n.t(`settings.userStatuses.${UserStatus.LOCKED}`),
  },
  {
    key: UserStatus.UNLOCKED,
    value: i18n.t(`settings.userStatuses.${UserStatus.UNLOCKED}`),
  },
  {
    key: UserStatus.NOT_VERIFIED,
    value: i18n.t(`settings.userStatuses.${UserStatus.NOT_VERIFIED}`),
  },
];

export const UserRolesData: TableSelectInput[] = [
  {
    key: UserRole.ROLE_ADMIN,
    value: i18n.t(`settings.userRoles.${UserRole.ROLE_ADMIN}`),
  },
  {
    key: UserRole.ROLE_PARTICIPANT_ADMIN,
    value: i18n.t(`settings.userRoles.${UserRole.ROLE_PARTICIPANT_ADMIN}`),
  },
  {
    key: UserRole.ROLE_SUPER_ADMIN,
    value: i18n.t(`settings.userRoles.${UserRole.ROLE_SUPER_ADMIN}`),
  },
  {
    key: UserRole.ROLE_VIEWER_ADMIN,
    value: i18n.t(`settings.userRoles.${UserRole.ROLE_VIEWER_ADMIN}`),
  },
];

export const SettingsTableHeaderData: TableHeadColumn<keyof SettingsFilterState>[] = [
  {
    title: i18n.t('table.headers.name'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'name',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.phone'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'phone',
      fieldType: 'phone',
    },
  },
  {
    title: i18n.t('table.headers.email'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'email',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.role'),
    sortable: false,
    filterable: true,
    cellProps: {
      width: 160,
    },
    filter: {
      key: 'roles',
      fieldType: 'select',
      data: UserRolesData,
    },
  },
  {
    title: i18n.t('table.headers.status'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'states',
      fieldType: 'select',
      data: UserStatusData,
    },
  },
  {
    title: i18n.t('table.headers.date'),
    sortable: true,
    filterable: false,
    sort: {
      orderColumn: 'registrationDate',
      orderType: 'DESC',
    },
  },
  {
    title: i18n.t('table.headers.actions'),
    sortable: false,
    filterable: false,
  },
];
