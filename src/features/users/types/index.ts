import {
  OrderPaymentMethod,
  OrderSource,
  OrderStatus,
  Technique,
  TransactionType,
} from '../../../common/enums';
import { UserCompanyType, UserType } from '../enums';
import { Order } from '../../orders/types';
import { TableSortType } from '../../../common/types';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface UsersFilterState {
  techniqueIds: number[];
  startDate: string | null;
  endDate: string | null;
}

export interface Vendor {
  id: number;
  balance: number;
  vendorDiscount: number;
  orderCount: number;
  phoneNumber: string;
  address: string;
  creationDate: string;
  locked: boolean;
  companyType: UserCompanyType;
  nameWithCompany: string;
  techniqueNames: Technique[];
  coordinates: {
    latitude: number;
    longitude: number;
  }
}

export interface Customer {
  id: number;
  orderCount: number;
  customerDiscount: number;
  balance: number;
  phoneNumber: string;
  nameWithCompany: string;
  companyType: UserCompanyType;
  creationDate: string;
  locked: boolean;
}

export interface VendorCustomer {
  id: number;
  phoneNumber: string;
  nameWithCompany: string;
  address: string;
  states: string;
  creationDate: string;
  balance: number;
  vendorDiscount: number;
  customerDiscount: number;
  vendorRating: number;
  customerRating: number;
  customerOrderCount: number;
  vendorOrderCount: number;
  locked: boolean;
  techniqueNames: Technique[];
  companyType: UserCompanyType;
}

export interface BlockListItem {
  id: number;
  orderId: number;
  discount: number;
  rating: number;
  debtAmount: string;
  vendorPhoneNumber: string;
  creationDate: string;
  comment: string;
  techniqueNames: Technique[];
}

export interface UserTransaction {
  id: number;
  type: TransactionType;
  amount: number;
  creationDate: string;
  operation: string;
}

export interface UsersTechniques {
  vendorPhoneNumber: string;
  address: string;
  id: number;
}

type VendorOmitKeys =
  | 'id'
  | 'coordinates'
  | 'locked'
  | 'techniqueNames'
  | 'companyType';

export interface VendorFilterState
  extends Nullable<Omit<Vendor, VendorOmitKeys>>, UsersFilterState {
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  companyTypes: [];
}

type CustomersOmitKeys =
  | 'id'
  | 'locked'
  | 'techniqueNames'
  | 'companyType';

export interface CustomerFilterState extends
  Nullable<Omit<Customer, CustomersOmitKeys>>,
  Omit<UsersFilterState, 'techniqueIds'> {
  page: number;
  size: number;
  orderColumn: string;
  orderType: TableSortType | null;
  companyTypes: [];
}

export interface VendorsCustomersFilterState {
  phoneNumber: string | null;
  nameWithCompany: string | null;
  address: string | null;
  page: number;
  size: number;
  orderColumn: string;
  techniqueNames: Technique[];
  orderType: TableSortType | null;
  companyTypes: [];
}

export interface UsersTechniquesFilterState {
  vendorPhoneNumber: string | null;
  address: string | null;
  orderColumn: string;
  page: number;
  size: number;
}

export type VendorsResponse = {
  total: number,
  content: Vendor[],
};

export type CustomersResponse = {
  total: number,
  content: Customer[],
};

export type VendorsCustomersResponse = {
  total: number,
  content: VendorCustomer[],
};

export type BlockListResponse = {
  total: number,
  content: BlockListItem[],
};

export type UserTransactionResponse = {
  total: number,
  content: UserTransaction[],
};

export type UsersTechniquesResponse = {
  total: number;
  content: UsersTechniques[];
};

export interface UserProfile {
  id: number;
  primaryPhoneNumber: string;
  email: string | null;
  balance: number;
  vendorDiscount: number;
  customerDiscount: number;
  rating: number | null;
  locked: boolean;
  userType: UserType;
  additionalPhoneNumbers: string[];
  additionalEmails: string[];
}

type OrderKeys =
  | 'orderStatus'
  | 'creationDate'
  | 'customerPhoneNumber'
  | 'vendorPhoneNumber';

export interface UserOrder extends Omit<Order, OrderKeys> {
  dateTime: string | null;
  rating: number;
  status: OrderStatus;
}

export type UserOrdersResponse = {
  total: number;
  content: UserOrder[];
};

type OmitOrderKeys =
  | 'techniqueName'
  | 'extraPriceAllowed'
  | 'cancelAllowed'
  | 'totalRefundAllowed'
  | 'commissionRefundAllowed'
  | 'status'
  | 'paymentMethod'
  | 'source';

export interface UserOrderFilterState
  extends Nullable<Omit<UserOrder, OmitOrderKeys>> {
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  sources: OrderSource[];
  orderStatuses: OrderStatus[];
  paymentMethods: OrderPaymentMethod[];
}

type OmitBlockListKeys =
  | 'comment'
  | 'creationDate'
  | 'id'
  | 'debtAmount'
  | 'discount';

export interface BlockListFilterState
  extends Nullable<Omit<BlockListItem, OmitBlockListKeys>>{
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
}

type OmitUserTransactionKeys =
  | 'id'
  | 'creationDate'
  | 'type'
  | 'amount'
  | 'operation';

export interface UserTransactionFilterState
  extends Nullable<Omit<UserTransaction, OmitUserTransactionKeys>> {
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  operations: [];
}

export interface UserCompanyResponse {
  organizationName: string;
  kpp: string;
  legalAddress: string;
  director: string;
  ogrn: string;
  postalCode: string;
  unrestrictedLegalAddress: string;
  tin: string;
  primary: null;
}

type Coordinates = {
  latitude: number,
  longitude: number,
};

type PriceRange = {
  min: number,
  max: number,
};

export type Subscriptions = {
  subscribedToAllCategoryOrders: boolean,
  subscribedToSelectedCategoryOrders: boolean,
  subscribedToTruckMatchingOrders: boolean,
  subscribedToNotCashOrders: boolean,
};

export interface UserSettings {
  coordinates: Coordinates;
  priceRange: PriceRange;
  radius: number;
  subscriptions: Subscriptions;
  trucksIds: number[] | null;
}
