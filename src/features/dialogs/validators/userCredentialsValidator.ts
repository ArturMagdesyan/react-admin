import i18n from '../../../app/i18';

const numberRegexp = /^[\d]+$/;

const errorMessages = {
  requiredPhone: i18n.t('formField.requiredPhone'),
  lengthMessage: i18n.t('userCredentialsDialog.errorMessages.phoneLengthMessage'),
  phone: i18n.t('formField.phone'),
  verificationRequired: i18n.t('userCredentialsDialog.errorMessages.verificationRequired'),
  verificationLength: i18n.t('userCredentialsDialog.errorMessages.verificationLength'),
  verificationNumber: i18n.t('userCredentialsDialog.errorMessages.verificationNumber'),
};

const phoneControl = {
  required: { value: true, message: errorMessages.requiredPhone },
  minLength: { value: 10, message: errorMessages.lengthMessage },
  maxLength: { value: 10, message: errorMessages.lengthMessage },
  pattern: { value: numberRegexp, message: errorMessages.phone },
};

const phoneNumberVerificationCode = {
  required: { value: true, message: errorMessages.verificationRequired },
  minLength: { value: 4, message: errorMessages.verificationLength },
  maxLength: { value: 4, message: errorMessages.verificationLength },
  pattern: { value: numberRegexp, message: errorMessages.verificationNumber },
};

export {
  phoneControl,
  phoneNumberVerificationCode,
};
