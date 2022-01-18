import i18n from 'i18next';
import { ConfigurationsFilterState } from '../types';
import { TableHeadColumn } from '../../data-table/types';

export const initConfigurationsFilterState: ConfigurationsFilterState = {
  truckId: [],
  key: null,
  value: null,
  title: null,
};

export const initData = {
  total: 0,
  content: [],
};

export const ConfigurationsTableHeadColumns: TableHeadColumn<keyof ConfigurationsFilterState>[] = [
  {
    title: i18n.t('table.headers.configurationName'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'title',
      fieldType: 'text',
    },
  },
  {
    title: i18n.t('table.headers.value'),
    sortable: false,
    filterable: true,
    filter: {
      key: 'value',
      fieldType: 'number',
    },
  },
  {
    title: i18n.t('table.headers.changeDate'),
    sortable: false,
    filterable: false,
  },
  {
    title: i18n.t('table.headers.comment'),
    sortable: false,
    filterable: false,
  },
];
