import i18n from 'i18next';
import type {
  ReviewResponse,
  ReviewsFilterState,
} from '../types';
import {
  getTodayEndDate,
  getTodayStartDate,
} from '../../../../../utils/dateFormat';
import type { TableHeadColumn } from '../../../../data-table/types';
import { Technique } from '../../../../../common/enums';

export const initialData: ReviewResponse = {
  total: 0,
  content: [],
};

export const initialReviewsFilterState: ReviewsFilterState = {
  page: 0,
  size: 25,
  orderColumn: 'creationDate',
  orderType: 'DESC',
  isMonth: false,
  isToday: true,
  startDate: getTodayStartDate(),
  endDate: getTodayEndDate(),
  orderId: null,
  vendorPhoneNumber: null,
  customerPhoneNumber: null,
};

export const ReviewsTableHeaderData: TableHeadColumn<keyof ReviewsFilterState>[] = [
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
    title: i18n.t('table.headers.rating'),
    sortable: true,
    filterable: false,
    sort: {
      orderType: null,
      orderColumn: 'rating',
    },
  },
  {
    title: i18n.t('table.headers.comment'),
    cellProps: {
      width: 600,
    },
    sortable: false,
    filterable: false,
  },
];

export const ReviewsData: ReviewResponse = {
  total: 6,
  content: [
    {
      id: 1,
      techniqueNames: [Technique.MANIPULATOR, Technique.AUTO_TOWER],
      orderId: 5434,
      customerPhoneNumber: '+79161234567',
      vendorPhoneNumber: '+79161234567',
      creationDate: '23/01/21, 07:30',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      techniqueNames: [Technique.MANIPULATOR, Technique.AUTO_TOWER],
      orderId: 534,
      customerPhoneNumber: '+79161234567',
      vendorPhoneNumber: '+79161234567',
      creationDate: '23/01/21, 07:30',
      rating: 3,
      comment: '',
    },
    {
      id: 3,
      techniqueNames: [Technique.MANIPULATOR, Technique.AUTO_TOWER],
      orderId: 34,
      customerPhoneNumber: '+79161234567',
      vendorPhoneNumber: '+79161234567',
      creationDate: '23/01/21, 07:30',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 4,
      techniqueNames: [Technique.MANIPULATOR, Technique.AUTO_TOWER],
      orderId: 54,
      customerPhoneNumber: '+79161234567',
      vendorPhoneNumber: '+79161234567',
      creationDate: '23/01/21, 07:30',
      rating: 5,
      comment: '',
    },
    {
      id: 5,
      techniqueNames: [Technique.MANIPULATOR, Technique.AUTO_TOWER],
      orderId: 999,
      customerPhoneNumber: '+79161234567',
      vendorPhoneNumber: '+79161234567',
      creationDate: '23/01/21, 07:30',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 6,
      techniqueNames: [Technique.MANIPULATOR, Technique.AUTO_TOWER],
      orderId: 11111,
      customerPhoneNumber: '+79161234567',
      vendorPhoneNumber: '+79161234567',
      creationDate: '23/01/21, 07:30',
      rating: 1,
      comment: '',
    },
  ],
};
