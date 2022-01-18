import i18n from '../../../app/i18';

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const stringRegexp = /^[а-яА-Я|a-zA-Z]*$/;
const phoneRegexp = /^((\+7|7|8)+([0-9]){10})$/;

const errorMessages = {
  requiredEmail: i18n.t('formField.requiredEmail'),
  requiredUserName: i18n.t('formField.requiredUserName'),
  requiredPhone: i18n.t('formField.requiredPhone'),
  email: i18n.t('formField.emailMessage'),
  userName: i18n.t('formField.userNameMessage'),
  lengthMessage: i18n.t('formField.lengthMessage'),
  phone: i18n.t('formField.phone'),
};

const emailControl = {
  required: { value: true, message: errorMessages.requiredEmail },
  pattern: { value: emailRegexp, message: errorMessages.email },
};

const userNameControl = {
  required: { value: true, message: errorMessages.requiredUserName },
  pattern: { value: stringRegexp, message: errorMessages.userName },
};

const phoneNumberControl = {
  required: { value: true, message: errorMessages.requiredPhone },
  minLength: { value: 12, message: errorMessages.lengthMessage },
  maxLength: { value: 12, message: errorMessages.lengthMessage },
  pattern: { value: phoneRegexp, message: errorMessages.phone },
};

export {
  emailControl,
  userNameControl,
  phoneNumberControl,
};
