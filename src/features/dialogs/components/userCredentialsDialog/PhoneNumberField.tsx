import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { phoneControl } from '../../validators';
import { UserCredentialTypeField } from './UserCredentialTypeField';
import { useAddPhoneNumber } from '../../api';

interface Props {
  onSuccess: (phoneNumber: string) => void;
}

export const PhoneNumberField = ({
  onSuccess,
}: Props) => {
  const addPhoneNumberMutate = useAddPhoneNumber();
  const { userId } = useParams();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<{ phone: string }>();

  const onSubmit = () => {
    if (!userId) return;
    trigger('phone').then((isValid) => {
      if (isValid) {
        const { phone: phoneNumber } = getValues();

        addPhoneNumberMutate.mutate(
          { userId, phoneNumber },
          {
            onSuccess: () => {
              onSuccess(phoneNumber);
            },
          },
        );
      }
    });
  };

  return (
    <UserCredentialTypeField
      loading={addPhoneNumberMutate.isLoading}
      inputType="phone"
      refs={register('phone', phoneControl)}
      errorMessage={errors?.phone?.message!}
      onSubmit={onSubmit}
    />
  );
};
