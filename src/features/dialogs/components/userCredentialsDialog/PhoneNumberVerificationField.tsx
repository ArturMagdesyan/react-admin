import React, {
  Dispatch,
  SetStateAction,
} from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserCredentialTypeField } from './UserCredentialTypeField';
import { phoneNumberVerificationCode } from '../../validators';
import { usePhoneNumberVerification } from '../../api';
import type { Step } from './AddUserCredentialsDialog';

interface Props {
  phoneNumber: string;
  setStep: Dispatch<SetStateAction<Step>>
}

export const PhoneNumberVerificationField = ({ phoneNumber, setStep }: Props) => {
  const { userId } = useParams();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<{ smsCode: string }>();
  const { smsCode } = getValues();
  const phoneNumberVerificationMutate = usePhoneNumberVerification();

  const onSubmit = () => {
    if (!userId) return;
    trigger('smsCode').then((isValid) => {
      if (isValid) {
        phoneNumberVerificationMutate.mutate({
          userId,
          data: {
            smsCode,
            phoneNumber: `+7${phoneNumber}`,
          },
        },
        {
          onSuccess: () => {
            setStep('email');
          },
        });
      }
    });
  };

  return (
    <UserCredentialTypeField
      loading={phoneNumberVerificationMutate.isLoading}
      inputType="phoneNumberVerificationCode"
      refs={register('smsCode', phoneNumberVerificationCode)}
      errorMessage={errors?.smsCode?.message!}
      onSubmit={onSubmit}
    />
  );
};
