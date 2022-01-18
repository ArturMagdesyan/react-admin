import React, { useEffect, useState } from 'react';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SignInFormFiled from '../../../components/AuthFormField';
import { useCreatePassword } from '../api/createPassword';
import { Layout } from './Layout';
import FormError from '../../../components/FormError';

type Form = {
  password: string,
  confirmPassword: string,
};

const styles = {
  displayNone: {
    display: 'none',
  },
  errorView: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: (theme: Theme) => theme.spacing(1),
  },
};

const CreatePassword = () => {
  const [isRepeatPassword, setIsRepeatPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const createPassword = useCreatePassword();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm<Form>();
  const { password } = watch();

  useEffect(() => {
    if (!token || !email) {
      navigate('/');
    }
  }, [navigate, token, email]);

  const onValidatePassword = () => {
    if (errors.confirmPassword) {
      clearErrors();
    }

    trigger('password').then((isValid) => {
      if (isValid) {
        setIsRepeatPassword(true);
      }
    });
  };

  const onValidateRepeatPassword = () => {
    if (!token || !email) return;

    trigger('confirmPassword').then((isValid) => {
      const { confirmPassword } = getValues();
      if (!isValid) {
        setValue('confirmPassword', '', { shouldDirty: true });
        if (errors.confirmPassword?.type === 'validate') {
          setIsRepeatPassword(false);
        }
        return;
      }
      createPassword.mutate({ password: confirmPassword, email, token }, {
        onSuccess: () => {
          navigate('/');
        },
        onError: () => {
          setIsRepeatPassword(false);
        },
      });
    });
  };

  return (
    <Layout
      title={t('createPassword.title')}
      description={t(`createPassword.${isRepeatPassword ? 'confirmDescription' : 'description'}`)}
    >
      <Box sx={isRepeatPassword ? styles.displayNone : {}}>
        <SignInFormFiled
          fieldIndicator="password"
          label={t('createPassword.label')}
          placeholder="********"
          type="password"
          error={!!errors.password || !!errors.confirmPassword}
          refs={
            register(
              'password',
              {
                required: true,
                minLength: 6,
                maxLength: 64,
              },
            )
          }
          onClick={onValidatePassword}
        />
      </Box>
      <Box sx={isRepeatPassword ? {} : styles.displayNone}>
        <SignInFormFiled
          fieldIndicator="password"
          label={t('createPassword.label')}
          placeholder="********"
          type="password"
          error={!!errors.confirmPassword}
          refs={
            register(
              'confirmPassword',
              {
                required: true,
                validate: (repeatPassword: string) => repeatPassword === password,
              },
            )
          }
          onClick={onValidateRepeatPassword}
        />
      </Box>
      <Box sx={styles.errorView}>
        {errors.password?.type === 'required' && (
          <FormError message={t('formErrors.requiredPassword')} />
        )}
        {errors.password?.type === 'minLength' && (
          <FormError message={t('formErrors.minLength')} />
        )}
        {errors.password?.type === 'maxLength' && (
          <FormError message={t('formErrors.maxLength')} />
        )}
        {errors.confirmPassword?.type === 'validate' && (
          <FormError message={t('createPassword.notMatch')} />
        )}
        {errors.confirmPassword?.type === 'required' && (
          <FormError message={t('formErrors.requiredPassword')} />
        )}
      </Box>
    </Layout>
  );
};

export default CreatePassword;
