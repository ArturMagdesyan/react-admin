import {
  BucketStatus,
  OrderDetailServices,
  TechnicBody,
} from '../enums';
import {
  OrderPaymentMethod,
  OrderSource,
  OrderStatus,
  Technique,
} from '../../../common/enums';
import { TableSortType } from '../../../common/types';

export type Order = {
  id: number;
  customerPhoneNumber: string;
  vendorPhoneNumber: string;
  techniqueName: Technique;
  source: OrderSource;
  creationDate: string;
  orderStatus: OrderStatus;
  paymentMethod: OrderPaymentMethod;
  price: number;
  extraPrice: number;
  totalRefundAllowed: boolean;
  cancelAllowed: boolean;
  commissionRefundAllowed: boolean;
  extraPriceAllowed: boolean;
};

export type OrderResponse = {
  total: number;
  content: Order[];
};

type Nullable<T> = { [K in keyof T]: T[K] | null };

type OmitKeys =
  | 'price'
  | 'creationDate'
  | 'techniqueName'
  | 'totalRefundAllowed'
  | 'cancelAllowed'
  | 'commissionRefundAllowed'
  | 'extraPriceAllowed'
  | 'orderStatus'
  | 'source'
  | 'paymentMethod'
  | 'extraPrice';

export interface OrderFilterState extends Nullable<Omit<Order, OmitKeys>> {
  startDate: string;
  endDate: string;
  techniqueIds: number[];
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  isToday: boolean;
  isMonth: boolean;
  orderStatuses: OrderStatus[];
  paymentMethods: OrderPaymentMethod[];
  sources: OrderSource[];
}

export interface Spec {
  boardLoadCapacity: number;
  boomLoadCapacity: number;
  boardLength: number;
}

export interface Address {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Duration {
  type: string;
  address: Address[];
}

export interface OrderDetailsBody {
  id: number;
  name: TechnicBody;
}

interface OrderOption {
  id: number;
  name: OrderDetailServices;
}
export interface OrderDetails {
  orderId: number;
  phoneNumber: string;
  creationDate: number;
  orderStatus: OrderStatus;
  distance: number;
  price: number;
  fee: number;
  extraPrice: number | null;
  paymentMethod: OrderPaymentMethod;
  comment: string;
  invoiceNumber: number | null;
  truck: Technique;
  duration: Duration;
  body: OrderDetailsBody;
  orderPhotos: [];
  spec: Spec;
  options: OrderOption[];
}

export interface BucketListItem {
  id: number;
  route: number | null;
  phone: string;
  lastModifiedDate: string;
  status: BucketStatus;
  assigned: boolean;
}

type OmitBucketKeys =
  | 'assigned'
  | 'id'
  | 'status'
  | 'route'
  | 'lastModifiedDate';

export interface BucketListFilterState
  extends Nullable<Omit<BucketListItem, OmitBucketKeys>> {
  page: number;
  size: number;
  statuses: [];
  orderType: TableSortType | null,
  orderColumn: string;
}

export type BucketListResponse = {
  total: number;
  content: BucketListItem[];
};

export interface AssignVendorError {
  phoneNumber: string;
  reason: string;
}
