export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export enum TransactionOperation {
  NOT_VERIFIED_ADD_BALANCE = 'NOT_VERIFIED_ADD_BALANCE',
  VERIFIED_ADD_BALANCE = 'VERIFIED_ADD_BALANCE',
  FEE_REFUND = 'FEE_REFUND',
  REFUND_30_PERCENT = 'REFUND_30_PERCENT',
  REFUND_70_PERCENT = 'REFUND_70_PERCENT',
  FULL_REFUND = 'FULL_REFUND',
  WITHDRAW = 'WITHDRAW',
  EXTRA_PAYMENT = 'EXTRA_PAYMENT',
  FEE_EXTRA_PAYMENT = 'FEE_EXTRA_PAYMENT',
  MANUAL = 'MANUAL',
  BUCKET_LIST_CHARGE = 'BUCKET_LIST_CHARGE',
  EARNED_AMOUNT = 'EARNED_AMOUNT',
  PAID_AMOUNT = 'PAID_AMOUNT',
  EXTRA_WORK_AMOUNT = 'EXTRA_WORK_AMOUNT',
}