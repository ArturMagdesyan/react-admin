import type { TableSortType } from '../../../common/types';
import { TransactionStatus } from '../enums';
import {
  OrderPaymentMethod,
  TransactionType,
} from '../../../common/enums';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface Transaction {
  id: number;
  companyTin: number;
  amount: number;
  orderId: number
  operation: string;
  phoneNumber: string;
  nameWithCompany: string;
  creationDate: string;
  confirmed: boolean;
  paymentMethod: OrderPaymentMethod,
  type: TransactionType;
  status: TransactionStatus;
}

type OmitTransactionKeys =
  | 'id'
  | 'amount'
  | 'confirmed'
  | 'paymentMethod'
  | 'type'
  | 'status'
  | 'creationDate'
  | 'operation';

export interface TransactionFilterState extends Nullable<Omit<Transaction, OmitTransactionKeys>> {
  size: number;
  page: number;
  orderType: TableSortType | null;
  orderColumn: string;
  paymentMethods: [],
  statuses: [],
  types: [],
  isToday: boolean,
  isMonth: boolean,
  operations: [],
}

export type TransactionsResponse = {
  total: number,
  content: Transaction[],
};
