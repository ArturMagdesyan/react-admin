import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { ReactComponent as SuccessIcon } from '../../../assets/success.svg';
import { useSendEmailRequest } from '../api/sendEmailRequest';
import SignInFormFiled from '../../../components/AuthFormField';
import type { Email } from '../types';

const styles = {
  boxView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailCheckText: {
    paddingTop: (theme: Theme) => theme.spacing(3.75),
    paddingBottom: (theme: Theme) => theme.spacing(1.5),
  },
};

const ForgotPassword = () => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const { t } = useTranslation();
  const { register, trigger, getValues, formState: { errors } } = useForm<Email>();
  const sendEmailRequest = useSendEmailRequest();

  const onValidateEmail = () => {
    trigger('email').then((isValid) => {
      const values = getValues();
      if (isValid) {
        sendEmailRequest.mutate(values, {
          onSuccess: () => {
            setIsEmailValid(true);
          },
        });
      }
    });
  };

  return (
    <>
      {isEmailValid ? (
        <Box
          sx={styles.boxView}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Container maxWidth="xs">
            <Box sx={styles.boxView}>
              <SuccessIcon />
            </Box>
            <Typography
              variant="h6"
              align="center"
              sx={styles.emailCheckText}
            >
              {t('forgotPassword.emailCheck')}
            </Typography>
            <Typography
              variant="body1"
              align="center"
            >
              {t('forgotPassword.emailDescription')}
            </Typography>
          </Container>
        </Box>
      ) : (
        <Layout
          title={t('forgotPassword.title')}
          description={t('forgotPassword.description')}
        >
          <SignInFormFiled
            fieldIndicator="username"
            label={t('forgotPassword.email')}
            placeholder="i.ivanov@info.ru"
            type="text"
            error={!!errors.email}
            refs={
              register(
                'email',
                {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
              )
            }
            onClick={onValidateEmail}
          />
        </Layout>
      )}
    </>
  );
};

export default ForgotPassword;
