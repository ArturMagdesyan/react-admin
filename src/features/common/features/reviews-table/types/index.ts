import { Technique } from '../../../../../common/enums';
import type { TableSortType } from '../../../../../common/types';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface FilterableReview {
  orderId: number;
  customerPhoneNumber: string;
  vendorPhoneNumber: string;
}

export interface Review extends FilterableReview{
  id: number;
  rating: number;
  techniqueNames: Technique[];
  creationDate: string;
  comment: string;
}

export interface ReviewsFilterState extends Nullable<FilterableReview> {
  page: number;
  size: number;
  isMonth: boolean;
  isToday: boolean;
  startDate: string;
  endDate: string;
  orderColumn: string;
  orderType: TableSortType | null;
}

export type ReviewResponse = {
  total: number,
  content: Review[],
};
