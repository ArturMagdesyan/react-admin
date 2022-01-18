import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserCredentialTypeField } from './UserCredentialTypeField';
import { emailControl } from '../../validators';
import { useAddEmail } from '../../api';

export const EmailField = () => {
  const addEmailMutation = useAddEmail();
  const { userId } = useParams();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = () => {
    if (!userId) return;
    trigger('email').then((isValid) => {
      if (isValid) {
        const { email } = getValues();

        addEmailMutation.mutate({ userId, email });
      }
    });
  };

  return (
    <UserCredentialTypeField
      loading={addEmailMutation.isLoading}
      inputType="email"
      refs={register('email', emailControl)}
      errorMessage={errors?.email?.message!}
      onSubmit={onSubmit}
    />
  );
};
