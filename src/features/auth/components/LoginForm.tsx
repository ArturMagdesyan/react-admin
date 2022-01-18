import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InternalLink from '../../../components/InternalLink';
import SignInFormFiled from '../../../components/AuthFormField';
import { useAuth } from '../../../app/auth';
import FormError from '../../../components/FormError';

type Inputs = {
  username: string,
  password: string,
};

const useStyles = makeStyles({
  display: {
    display: 'none',
  },
  errorsView: {
    height: '20px',
    textAlign: 'left',
  },
  linkView: {
    float: 'left',
    marginTop: '8px',
  },
  forgotLink: {
    textDecoration: 'none',
  },
});

export const LoginForm = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [fieldIndicator, setFieldIndicator] = useState<'username' | 'password'>('username');
  const { register, trigger, reset, getValues, formState: { errors } } = useForm<Inputs>();
  const classes = useStyles();
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onValidateEmail = () => {
    if (showError) setShowError(false);

    trigger('username').then((isValid) => {
      if (isValid) {
        setFieldIndicator('password');
      }
    });
  };

  const onValidatePassword = () => {
    trigger('password').then(async (isValid) => {
      if (isValid) {
        const values = getValues();
        try {
          await login(values);
          navigate('/app');
        } catch (err) {
          setFieldIndicator('username');
          setShowError(true);
          reset({
            username: values.username,
            password: '',
          });
        }
      }
    });
  };

  return (
    <>
      <Box className={fieldIndicator === 'username' ? '' : classes.display}>
        <SignInFormFiled
          fieldIndicator="username"
          label="Электронная почта"
          placeholder="i.ivanov@info.ru"
          type="text"
          error={!!errors.username || showError}
          refs={
            register(
              'username',
              {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            )
          }
          onClick={onValidateEmail}
        />
      </Box>
      <Box className={fieldIndicator === 'password' ? '' : classes.display}>
        <SignInFormFiled
          loading={isLoggingIn}
          fieldIndicator="password"
          label="Пароль"
          placeholder="********"
          type="password"
          error={!!errors.password}
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
      <Box className={classes.errorsView}>
        {errors.username?.type === 'required' && (
          <FormError message={t('formErrors.requiredEmail')} />
        )}
        {errors.username?.type === 'pattern' && (
          <FormError message={t('formErrors.wrongEmail')} />
        )}
        {errors.password && (
          <FormError message={t('formErrors.requiredPassword')} />
        )}
        {
          (showError && !Object.keys(errors).length) && (
            <FormError message={t('formErrors.wrongCredential')} />
          )
        }
      </Box>
      <Box className={classes.linkView}>
        <InternalLink
          to="/auth/forgot-password"
          className={classes.forgotLink}
        >
          <Typography variant="body2" color="primary">
            {t('forgotPassword.buttonText')}
          </Typography>
        </InternalLink>
      </Box>
    </>
  );
};
