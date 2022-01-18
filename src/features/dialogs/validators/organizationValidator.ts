import i18n from '../../../app/i18';

const stringRegexp = /^[а-яА-Я|a-zA-Z]*$/;
const numberRegexp = /^[\d]+$/;

const errorMessages = {
  requiredTin: i18n.t('addOrganization.requiredTin'),
  requiredBankIdCode: i18n.t('addOrganization.requiredBankIdCode'),
  requiredPaymentAccount: i18n.t('addOrganization.requiredPaymentAccount'),
  organizationName: i18n.t('addOrganization.organizationNameError'),
  tinMinLengthMessage: i18n.t('addOrganization.tinMinLength'),
  tinMaxLengthMessage: i18n.t('addOrganization.tinMaxLength'),
  bankIdCodeLengthMessage: i18n.t('addOrganization.bankIdCodeLength'),
  paymentAccountLengthMessage: i18n.t('addOrganization.paymentAccountLength'),
  numberMessage: i18n.t('addOrganization.numberErrorMessage'),
};

const organizationNameControl = {
  pattern: { value: stringRegexp, message: errorMessages.organizationName },
};

const tinControl = {
  required: { value: true, message: errorMessages.requiredTin },
  minLength: { value: 10, message: errorMessages.tinMinLengthMessage },
  maxLength: { value: 12, message: errorMessages.tinMaxLengthMessage },
  pattern: { value: numberRegexp, message: errorMessages.numberMessage },
};

const bankIdCodeControl = {
  required: { value: true, message: errorMessages.requiredBankIdCode },
  minLength: { value: 9, message: errorMessages.bankIdCodeLengthMessage },
  maxLength: { value: 9, message: errorMessages.bankIdCodeLengthMessage },
  pattern: { value: numberRegexp, message: errorMessages.numberMessage },
};

const paymentAccountControl = {
  required: { value: true, message: errorMessages.requiredPaymentAccount },
  minLength: { value: 20, message: errorMessages.paymentAccountLengthMessage },
  maxLength: { value: 20, message: errorMessages.paymentAccountLengthMessage },
  pattern: { value: numberRegexp, message: errorMessages.numberMessage },
};

export {
  organizationNameControl,
  tinControl,
  bankIdCodeControl,
  paymentAccountControl,
};
