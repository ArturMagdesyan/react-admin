import {
  OrderPaymentMethod,
  OrderStatus,
  Technique,
} from '../../../../../common/enums';
import type { TableSortType } from '../../../../../common/types';

type Nullable<T> = { [K in keyof T]: T[K] | null };

interface FilterableDocument {
  id: number;
  customerPhoneNumber: string;
  vendorPhoneNumber: string;
}

export interface Document extends FilterableDocument{
  extraPrice: number;
  price: number;
  creationDate: string;
  extraPriceAllowed: boolean;
  paymentMethod: OrderPaymentMethod;
  orderStatus: OrderStatus;
  techniqueName: Technique;
  files: Record<string, string>,
}

export interface DocumentsFilterState
  extends Nullable<FilterableDocument> {
  page: number;
  size: number;
  orderColumn: string;
  startDate: string;
  endDate: string;
  isToday: boolean;
  isMonth: boolean;
  orderType: TableSortType | null;
  paymentMethods: [];
  orderStatuses: [];
  techniqueIds: [];
}

export type DocumentsResponse = {
  total: number,
  content: Document[],
};

export interface UploadFileResponse {
  id: number,
}
